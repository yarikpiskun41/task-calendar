import {TaskTagType} from "../../Hooks/taskTagController";

export type CalendarTableProps = {
  year: number;
  month: number;
  tags: TaskTagType[];
  filteredTag: TaskTagType | null;
}