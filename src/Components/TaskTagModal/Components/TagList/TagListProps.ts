import {TaskTagType} from "../../../../Hooks/taskTagController";

export type TagListProps = {
  isAddTag: boolean;
  onAddTag: () => void;
  isEditTagIndex: number|null;
  filter: string;
  tags: TaskTagType[];
  addTag: (tag: TaskTagType) => void;
  addingTagColor: string;
  setAddingTagColor: (color: string) => void;
  addingTagName: string;
  setAddingTagName: (name: string) => void;
  onEditTag: () => void;
  cancelEditing: () => void;
  onEditingTag: (index:number) => void;
  removeTag: (index: number) => void;
  editTag: (index:number|null, tag: TaskTagType) => void;
}