import "./CalendarTable.css"
import {getMonthData} from "./calendarFunctions";
import {CalendarTableProps} from "./CalendarTableProps";
import Plus from "../Icons/Plus";
import React, {useEffect, useRef, useState} from "react";
import EventHookModal from "./Components/EventHookModal/EventHookModal";
import eventHook, {eventMonthsNumber, eventType, months} from "../../Hooks/eventHook";
import {TaskTagType} from "../../Hooks/taskTagController";
import DayEvents from "./Components/DayEvents/DayEvents";
import EventHookEditModal from "./Components/EventHookModal/EventHookEditModal";
import Spinner from "../Spinner/Spinner";
import Download from "../Icons/Download";
import Photo from "../Icons/Photo";
import html2canvas from "html2canvas";

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const CalendarTable = ({month, year, tags, filteredTag}: CalendarTableProps) => {
  const {createEvent, events, setAndSaveEvents} = eventHook();

  const eventTable = useRef<HTMLTableElement>(null)

  const [taskModalState, setTaskModalState] = useState<boolean>(false)
  const [taskEditModalState, setTaskEditModalState] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<{ day: number, month: eventMonthsNumber, year: number } | null>(null)

  const [editingEvent, setEditingEvent] = useState<eventType>()
  const [editingEventParams, setEditingEventParams] = useState<{ day: number }>()

  const monthData = getMonthData(year, month);

  const [searchString, setSearchString] = useState<string>("");

  const [countriesCodes, setCountriesCodes] = useState<string[]>([]);
  const [globalHolidays, setGlobalHolidays] = useState<{
    day: number,
    month: number,
    year: number,
    name: string,
    countryCode: string
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCountriesCodes = async () => {
    try {
      const response = await fetch("https://date.nager.at/api/v3/AvailableCountries");
      const data: { "countryCode": string, "name": string }[] = await response.json();
      return data.map((country) => country.countryCode);
    } catch (e) {
      console.log(e)
      return [];
    }

  }

  const getHolidays = async (year: number, month: number, countryCode: string) => {
    try {
      const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
      const data: {
        "date": string,
        "localName": string,
        "name": string,
        "countryCode": string,
        "fixed": boolean,
        "global": boolean,
        "counties": string[],
        "launchYear": number,
        "type": string
      }[] = await response.json();
      return data.filter(holiday => holiday.global).map((holiday) => {
        const date = new Date(holiday.date);
        return {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          name: holiday.name,
          countryCode: holiday.countryCode
        }
      });
    } catch (e) {
      console.log(e)
      return [];
    }
  }

  const getHolidaysForMonthForAllCountries = async (year: number, month: number) => {
    const holidays: { day: number, month: number, year: number, name: string, countryCode: string }[] = [];
    for (const countryCode of countriesCodes) {
      const countryHolidays = await getHolidays(year, month, countryCode);
      holidays.push(...countryHolidays);
    }
    return holidays;
  }

  useEffect(() => {
    setLoading(true)
    getCountriesCodes().then((codes) => {
      setCountriesCodes(codes)
      setLoading(false)
    });
  }, [])

  useEffect(() => {
    if (countriesCodes.length > 0) {
      setLoading(true)
      getHolidaysForMonthForAllCountries(year, month).then((holidays) => {
        setLoading(false);
        setGlobalHolidays(holidays)
      });
    }

  }, [month, year, countriesCodes])

  const openEventModal = (day: number, month: eventMonthsNumber, year: number) => {
    setSelectedDate({day, month, year})
    setTaskModalState(true)
  }
  const onSaveEvent = (event: { name: string, tags: TaskTagType[] }) => {
    if (selectedDate) {
      createEvent(selectedDate.year, selectedDate.month, selectedDate.day, event.name, event.tags)
      setTaskModalState(false)
      setSelectedDate(null);
    }
  }
  const handleDragStart = (event: React.DragEvent, sourceDay: number, sourceIndex: number) => {
    event.dataTransfer.setData('sourceDay', sourceDay.toString());
    event.dataTransfer.setData('sourceIndex', sourceIndex.toString());
  };

  const handleDragOver = (event: React.DragEvent, day: number, destinationIndex: number) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'move';
    } catch (e) {
      console.log(e)
    }


  };

  const handleDrop = (event: React.DragEvent, day: number, destinationIndex: number) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      const sourceDay = parseInt(event.dataTransfer.getData('sourceDay'));
      const sourceIndex = parseInt(event.dataTransfer.getData('sourceIndex'));

      if (day !== sourceDay || destinationIndex !== sourceIndex) {
        const updatedEvents = {...events};

        const sourceDayEvents = updatedEvents[year][months[month]][sourceDay - 1];
        const [draggedEvent] = sourceDayEvents.splice(sourceIndex, 1);

        const destinationDayEvents = [...updatedEvents[year][months[month]][day - 1]];
        destinationDayEvents.splice(destinationIndex, 0, draggedEvent);

        updatedEvents[year][months[month]][day - 1] = destinationDayEvents;

        setAndSaveEvents(updatedEvents);
      }
    } catch (e) {
      console.log(e)
    }
  };

  const handleEditEvent = (event: eventType, day: number) => {
    setEditingEventParams({day})
    setEditingEvent(event);
    setTaskEditModalState(true);
  }

  const saveEditedEvent = (event: eventType) => {
    const {day} = editingEventParams as { day: number };
    const updatedEvents = {...events};
    const sourceDayEvents = updatedEvents[year][months[month]][day - 1];
    const index = sourceDayEvents.findIndex((e) => JSON.stringify(e) === JSON.stringify(event));
    sourceDayEvents.splice(index, 1, event);
    setAndSaveEvents(updatedEvents);
    setTaskEditModalState(false);
    setEditingEvent(undefined);
  }

  const deleteEvent = (event: eventType, day: number) => {
    const updatedEvents = {...events};
    const sourceDayEvents = updatedEvents[year][months[month]][day - 1];
    const index = sourceDayEvents.findIndex((e) => JSON.stringify(e) === JSON.stringify(event));
    sourceDayEvents.splice(index, 1);
    setAndSaveEvents(updatedEvents);
    setTaskEditModalState(false);
    setEditingEvent(undefined);
  }

  const closeEditEventModal = () => {
    setEditingEvent(undefined);
    setTaskEditModalState(false);
  }

  const exportEvents = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events));
    const fakeLink = document.createElement('a');
    fakeLink.setAttribute("href", dataStr);
    fakeLink.setAttribute("download", "custom-events" + ".json");
    fakeLink.click();
    fakeLink.remove();
  }

  const exportAsImage = async (table: HTMLTableElement | null, imageFileName: string) => {
    if (table) {
      const canvas = await html2canvas(table);
      const image = canvas.toDataURL("image/png", 1.0);
      const fakeLink = window.document.createElement("a");
      fakeLink.download = imageFileName;
      fakeLink.href = image;
      fakeLink.click();
      fakeLink.remove();
    }
  };


  return (
    <>
      <div className={"calendar-table-controls"}>
        <input onChange={(e) => {
          setSearchString(e.target.value)
        }} className={"calendar-table-controls-search"} placeholder={"Search event"}/>
        <button onClick={exportEvents} className={"calendar-table-controls-button --download"}>
          <Download/>
        </button>
        <button onClick={() => exportAsImage(eventTable.current, "your-calendar")}
                className={"calendar-table-controls-button --download-photo"}>
          <Photo/>
        </button>
        {loading && <Spinner/>}
      </div>
      <table ref={eventTable} className={"calendar-table"}>
        <thead className={"calendar-table-head"}>
        <tr className={"calendar-table-days-names"}>
          {days.map((day) => (
            <th className={"calendar-table-day-name"} key={day}>{day}</th>
          ))}
        </tr>
        </thead>
        <tbody className={"calendar-table-body"}>
        {monthData.map((week, index) => (
          <tr className={"calendar-table-day-numbers"} key={index}>
            {week.map((day, index) => (
              <td className={`calendar-table-day-number-cell ${day.isCurrentMonth ? "" : "--not-now-month"}`}
                  key={index}
                  onDragOver={(event) => day.isCurrentMonth && handleDragOver(event, day.day, events[year][months[month]][day.day - 1].length)}
                  onDrop={(event) =>
                    day.isCurrentMonth && handleDrop(event, day.day, events[year][months[month]][day.day - 1].length)
                  }
              >
                <div className={"calendar-table-day-number"}>{day.day}</div>
                <button onClick={() => openEventModal(day.day, month as eventMonthsNumber, year)}
                        className={"add-event-button"}>
                  <Plus/>
                </button>
                <DayEvents onDelete={deleteEvent} onEdit={handleEditEvent} events={events} day={day}
                           month={month} year={year} handleDragStart={handleDragStart} eventSearchString={searchString}
                           handleDragOver={handleDragOver} handleDrop={handleDrop} filteredTag={filteredTag}
                           globalHolidays={globalHolidays}
                />
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      {
        taskModalState && <EventHookModal onSave={onSaveEvent} close={() => setTaskModalState(false)} tags={tags}/>
      }
      {
        taskEditModalState &&
        <EventHookEditModal tags={tags} close={closeEditEventModal} onSave={saveEditedEvent} event={editingEvent}/>
      }
    </>
  )
}

export default CalendarTable;