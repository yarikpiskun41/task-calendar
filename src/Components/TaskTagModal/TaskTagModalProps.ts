import {TaskTagType} from "../../Hooks/taskTagController";

export type TaskTagModalProps = {
  tags: TaskTagType[];
  addTag: (tag: TaskTagType) => void;
  removeTag: (index: number|null) => void;
  editTag: (index:number|null, tag: TaskTagType) => void;
  closeModal: () => void;
}