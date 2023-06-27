import Check from "../../../Icons/Check";
import Close from "../../../Icons/Close";
import Pencil from "../../../Icons/Pencil";
import Trash from "../../../Icons/Trash";
import {TagListProps} from "./TagListProps";

const TagList = ({
                   tags,
                   isEditTagIndex,
                   filter,
                   addingTagColor,
                   setAddingTagColor,
                   addingTagName,
                   setAddingTagName,
                   onEditTag, cancelEditing, removeTag, onAddTag, isAddTag, onEditingTag
                 }: TagListProps) => {
  return (
    <ul className={"task-tag-modal-task-list"}>
      {
        tags.filter((tag) => tag.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1).map((tag, i) => <li
          className={"task-tag-modal-task"}
          key={i}>
          {
            isEditTagIndex === i
              ?
              <>
                <input value={addingTagColor} onChange={(e) => setAddingTagColor(e.target.value)}
                       className={"task-tag-modal-task-color-input"} type="color"/>
                <input value={addingTagName} onChange={(e) => setAddingTagName(e.target.value)}
                       className={"task-tag-modal-task-name-input"}
                       type="text"/>
                <div className={"task-tag-modal-task-buttons"}>
                  <button disabled={!addingTagName || !addingTagColor} onClick={onEditTag}
                          className={"task-tag-modal-task-button --success"}>
                    <Check/>
                  </button>
                  <button disabled={!addingTagName} onClick={cancelEditing}
                          className={"task-tag-modal-task-button --delete"}>
                    <Close/>
                  </button>
                </div>
              </>
              :
              <>
                <div style={{backgroundColor: tag.color}} className={"task-tag-modal-task-color"}>
                </div>
                <div className={"task-tag-modal-task-name"}>
                  {tag.name}
                </div>
                <div className={"task-tag-modal-task-buttons"}>
                  <button onClick={() => onEditingTag(i)} className={"task-tag-modal-task-button --edit"}>
                    <Pencil/>
                  </button>
                  <button onClick={() => removeTag(i)} className={"task-tag-modal-task-button --delete"}>
                    <Trash/>
                  </button>
                </div>
              </>

          }

        </li>)
      }
      {
        isAddTag && <li className={"task-tag-modal-task"}>
          <input value={addingTagColor} onChange={(e) => setAddingTagColor(e.target.value)}
                 className={"task-tag-modal-task-color-input"} type="color"/>
          <input onChange={(e) => setAddingTagName(e.target.value)} className={"task-tag-modal-task-name-input"}
                 type="text"/>
          <div className={"task-tag-modal-task-buttons"}>
            <button disabled={!addingTagName} onClick={onAddTag} className={"task-tag-modal-task-button --success"}>
              <Check/>
            </button>
          </div>
        </li>
      }
    </ul>

  )
}

export default TagList;