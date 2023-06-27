import {TaskTagModalProps} from "./TaskTagModalProps";
import {useState} from "react";
import Plus from "../Icons/Plus";
import './TaskTagModal.css'
import TagList from "./Components/TagList/TagList";
import CloseThick from "../Icons/CloseThick";

const TaskTagModal = ({tags, addTag, removeTag, editTag, closeModal}: TaskTagModalProps) => {
  const [filter, setFilter] = useState<string>("")
  const [isAddTag, setIsAddTag] = useState<boolean>(false)
  const [isEditTagIndex, setIsEditTagIndex] = useState<number | null>(null)
  const [addingTagName, setAddingTagName] = useState<string>("")
  const [addingTagColor, setAddingTagColor] = useState<string>("")
  const onAddTag = () => {
    if (addingTagName) {
      addTag({name: addingTagName, color: addingTagColor})
      setIsAddTag(false)
      setAddingTagName("");
      setAddingTagColor("");
    }
  }

  const onAddingTag = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setAddingTagColor(`#${randomColor ? randomColor : "000"}`)
    setIsAddTag(!isAddTag)
  }

  const onEditingTag = (i: number) => {
    setIsEditTagIndex(i);
    setAddingTagColor(tags[i].color);
    setAddingTagName(tags[i].name);
  }

  const onEditTag = () => {
    editTag(isEditTagIndex, {name: addingTagName, color: addingTagColor})
    setAddingTagName("");
    setAddingTagColor("");
    setIsEditTagIndex(null);
  }

  const cancelEditing = () => {
    setAddingTagName("");
    setAddingTagColor("");
    setIsEditTagIndex(null);
  }

  return <div className={"task-tag-modal-background"}>
    <div className={"task-tag-modal"}>
      <div className={"task-tag-modal-close"} onClick={closeModal}><CloseThick/></div>
      <h2 className={"task-tag-modal-title"}>TAGS</h2>
      <div className={"task-tag-modal-controls"}>
        <button className={`task-tag-modal-control-add ${isAddTag ? "--adding" : ""}`} onClick={onAddingTag}>
          <Plus/>
        </button>
        <input placeholder={"Search tag"} className={"task-tag-modal-control-filter"}
               onChange={(e) => setFilter(e.target.value)}/>
      </div>
      <TagList isAddTag={isAddTag} onAddTag={onAddTag} isEditTagIndex={isEditTagIndex} filter={filter} tags={tags}
               addTag={addTag} addingTagColor={addingTagColor} setAddingTagColor={setAddingTagColor}
               addingTagName={addingTagName} setAddingTagName={setAddingTagName} onEditTag={onEditTag}
               cancelEditing={cancelEditing} onEditingTag={onEditingTag} removeTag={removeTag} editTag={editTag}/>
    </div>
  </div>

}

export default TaskTagModal