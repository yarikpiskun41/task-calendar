import {eventHookType, eventType} from "../../../../Hooks/eventHook";
import {TaskTagType} from "../../../../Hooks/taskTagController";

export type DayEventsProps = {
  events: eventHookType;
  day: {
    day: number;
    isCurrentMonth: boolean;
  },
  month: number;
  year: number;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, day: number, index: number) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>, day: number, index: number) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, day: number, index: number) => void;
  onEdit: (event: eventType, day: number) => void;
  onDelete: (event: eventType, day: number) => void;
  filteredTag: TaskTagType | null;
  eventSearchString: string;
  globalHolidays: {
    day: number,
    month: number,
    year: number,
    name: string,
    countryCode: string
  }[];
}