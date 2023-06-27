import {TaskTagType} from "../../Hooks/taskTagController";

export type CalendarControllerPropsType = {
  month: number;
  setMonth: (month: number) => void;
  year: number;
  setYear: (year: number) => void;
  setTaskTagModalOpen: (open: boolean) => void;
  taskTagModalOpen: boolean;
  tasks: TaskTagType[];
  filteredTag: TaskTagType | null;
  setFilteredTag: (tag: TaskTagType | null) => void;
}