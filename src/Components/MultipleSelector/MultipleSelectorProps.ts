import {TaskTagType} from "../../Hooks/taskTagController";

export type MultipleSelectorProps = {
  items: {
    id: string;
    item: TaskTagType;
  }[];
  onChange: (items: { id: string; item: TaskTagType; }[]) => void;
  defaultSelectedItems?: {
    id: string;
    item: TaskTagType;
  }[]
}