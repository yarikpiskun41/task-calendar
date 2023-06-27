import {eventType, months} from "../../../../Hooks/eventHook";
import Tooltip from "../../../Tooltip/Tooltip";
import React from "react";
import {DayEventsProps} from "./DayEventsProps";
import Pencil from "../../../Icons/Pencil";
import Close from "../../../Icons/Close";
import {TaskTagType} from "../../../../Hooks/taskTagController";

const DayEvents = ({
                     day,
                     month,
                     year,
                     events,
                     handleDragStart,
                     handleDragOver,
                     handleDrop,
                     onEdit,
                     onDelete,
                     filteredTag,
                     eventSearchString,
                     globalHolidays
                   }: DayEventsProps) => {

  const renderEvents = (events: eventType[]) => {
    return day.isCurrentMonth && events.map((event, index) => {
        if (event) {
          return <div draggable={true} className={"calendar-table-event"}
                      onDragStart={(event) => handleDragStart(event, day.day, index)} key={index}
                      onDragOver={(event) => handleDragOver(event, day.day, index)}
                      onDrop={(event) => handleDrop(event, day.day, index)}
          >
            <div className={"calendar-table-event-tags"}>
              {
                event.tags.map((tag, index) => {
                  return <Tooltip key={index} text={tag.name}>
                    <div className={"calendar-table-event-tag"} key={index}
                         style={{backgroundColor: tag.color}}>
                    </div>
                  </Tooltip>
                })
              }
            </div>
            <div className={"calendar-table-event-name"}>
              {
                event.name
              }
            </div>
            <div className={"calendar-table-event-controls"}>
              <button onClick={() => onEdit(event, day.day)} className={"calendar-table-event-control --edit"}>
                <Pencil/></button>
              <button onClick={() => onDelete(event, day.day)} className={"calendar-table-event-control --delete"}>
                <Close/></button>
            </div>
          </div>
        }
        return null;
      }
    )
  }

  const displayEvents = () => {
    if (events && events[year] && events[year][months[month]] && events[year][months[month]][day.day - 1]) {
      const dayEvents = events[year][months[month]][day.day - 1]
      if (filteredTag && !eventSearchString) {
        const eventsResult = [...dayEvents.filter((event) => {
          return event.tags.find((tag) => filteredTag && JSON.stringify(tag) === JSON.stringify(filteredTag))
        })];
        return renderEvents(eventsResult)
      }
      if (eventSearchString && !filteredTag) {
        const eventsResult = [...dayEvents.filter((event) => {
          return event.name.toLowerCase().includes(eventSearchString.toLowerCase())
        })];
        return renderEvents(eventsResult)
      }
      if (filteredTag && eventSearchString) {
        const eventsResult = [...dayEvents.filter((event) => {
          return event.name.toLowerCase().includes(eventSearchString.toLowerCase())
            &&
            event.tags.find((tag) => (filteredTag as TaskTagType) && JSON.stringify(tag) === JSON.stringify(filteredTag))
        })];
        return renderEvents(eventsResult)
      }

      return renderEvents(dayEvents)
    }
    return null;
  }

  return (
    <div className={"calendar-table-events"}>
      {
        day.isCurrentMonth && globalHolidays.filter(holiday => {
          if (eventSearchString) {
            return holiday.month === month && holiday.day === day.day && holiday.year === year && holiday.name.toLowerCase().includes(eventSearchString.toLowerCase())
          }
          return holiday.month === month && holiday.day === day.day && holiday.year === year
        }).map((holiday, index) => {
          return <div className={"calendar-table-event --holiday"} key={index}>
            <div className={"calendar-table-event-tags"}>
              <Tooltip text={`${holiday.countryCode} holiday`}>
                <div className={"calendar-table-event-tag"} key={index}
                     style={{backgroundColor: "#ffb700"}}>
                </div>
              </Tooltip>
            </div>
            <div className={"calendar-table-event-name"}>
              {
                holiday.name
              }
            </div>
          </div>
        })
      }
      {
        displayEvents()
      }
    </div>
  )
}

export default DayEvents;