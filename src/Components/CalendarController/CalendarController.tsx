import {CalendarControllerPropsType} from "./CalendarControllerPropsType";
import {useEffect} from "react";
import "./CalendarController.css";
import ChevronUp from "../Icons/ChevronUp";
import ChevronDown from "../Icons/ChevronDown";
import Tag from "../Icons/Tag";
import TagFilter from "./Components/TagFilter";

const CalendarController = ({
                              month,
                              setMonth,
                              year,
                              setYear,
                              setTaskTagModalOpen,
                              taskTagModalOpen,
                              tasks,
                              filteredTag,
                              setFilteredTag
                            }: CalendarControllerPropsType) => {

  const nextYear = () => {
    setYear(year + 1);
  }
  const prevYear = () => {
    setYear(year - 1);
  }
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }


  useEffect(() => {
    const changeDate = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevMonth();
      } else if (e.key === "ArrowRight") {
        nextMonth();
      }
      if (e.key === "ArrowUp") {
        nextYear();
      }
      if (e.key === "ArrowDown") {
        prevYear();
      }
    }
    window.addEventListener("keydown", changeDate);
    return () => {
      window.removeEventListener("keydown", changeDate);
    }
  })

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <header>
        <div className={"calendar-controller"}>
          <div className={"calendar-controller-task-filter"}>
            <button className={"calendar-controller-task-add-button"}
                    onClick={() => setTaskTagModalOpen(!taskTagModalOpen)}>
              <Tag/>
            </button>
            <TagFilter filteredTag={filteredTag} setFilteredTag={setFilteredTag} tags={tasks}/>
          </div>
          <div className={"calendar-controller-month-holder"}>
            <button className={"change-date-button calendar-controller-prev-month"} onClick={prevMonth}>
              <ChevronDown/>
            </button>
            <span className={"date-title --month"}>{months[month]}</span>
            <button className={"change-date-button calendar-controller-next-month"} onClick={nextMonth}>
              <ChevronUp/>
            </button>
          </div>
          <div className={"calendar-controller-year-holder"}>
            <button className={"change-date-button calendar-controller-prev-year"} onClick={prevYear}>
              <ChevronDown/>
            </button>
            <span className={"date-title --year"}>{year}</span>
            <button className={"change-date-button calendar-controller-next-year"} onClick={nextYear}>
              <ChevronUp/>
            </button>
          </div>
        </div>
      </header>
    </>

  );
}

export default CalendarController;