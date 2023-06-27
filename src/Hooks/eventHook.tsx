import {useState} from "react";
import {TaskTagType} from "./taskTagController";

type Month =
  "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December"

export type eventType = {
  name: string,
  tags: TaskTagType[]
}


type eventHookMonthType = {
  [month in Month]: eventType[][]
}

export type eventHookType = {
  [year: number]: eventHookMonthType
}


export const months: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type eventMonthsNumber = IntRange<0, 11>

const EventHook = () => {
  const saveEvents = (events: eventHookType) => {
    localStorage.removeItem("events")
    localStorage.setItem("events", JSON.stringify(events))
  }

  const loadEvents = () => {
    const events = localStorage.getItem('events')
    if (events) return JSON.parse(events) as eventHookType
    return null
  }

  const [events, setEvents] = useState<eventHookType>(loadEvents() || {});

  const getMonthDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }
  const initYear = (year: number) => {
    const newYear = {} as eventHookMonthType;

    for (let i = 0; i <= 11; i++) {
      const days = getMonthDays(year, i + 1)
      newYear[months[i]] = new Array(days).fill([])
    }

    return newYear;
  }


  const createEvent = (year: number, month: eventMonthsNumber, day: number, taskName: string, taskTags: TaskTagType[]) => {
    const newValue = {...events}
    if (!events[year]) {
      newValue[year] = initYear(year)
    }
    let selectedMonth = months[month]

    const dayData = [...newValue[year][selectedMonth][day - 1]];
    dayData.push({name: taskName, tags: taskTags})
    newValue[year][selectedMonth][day - 1] = dayData;
    setEvents(newValue)
    saveEvents(newValue)
  }

  const setAndSaveEvents = (events: eventHookType) => {
    setEvents(events)
    saveEvents(events)
  }


  return {events, createEvent, setAndSaveEvents}
}

  export default EventHook