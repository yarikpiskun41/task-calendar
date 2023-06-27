import "./EventHookModal.css"
import CloseThick from "../../../Icons/CloseThick";
import MultipleSelector from "../../../MultipleSelector/MultipleSelector";
import {EventHookModalProps} from "./EventHookModalProps";
import {useState} from "react";
import {TaskTagType} from "../../../../Hooks/taskTagController";

const EventHookModal = ({tags, close, onSave}: EventHookModalProps) => {
  const mappedTags = tags.map((tag, i) => {
    return {
      id: i.toString(),
      item: tag,
    }
  })

  const [eventName, setEventName] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<TaskTagType[]>([])

  const onChangeTags = (mappedTags: { id: string, item: TaskTagType }[]) => {
    const tags = mappedTags.map((tag) => tag.item)
    setSelectedTags(tags)
  }

  return <div className={"event-hook-modal-background"}>
    <div className={"event-hook-modal"}>
      <div onClick={close} className={"event-hook-modal-close"}>
        <CloseThick/>
      </div>
      <h2 className={"event-hook-modal-title"}>
        Add event
      </h2>
      <div className={"event-hook-modal-inputs"}>
        <input onChange={e => setEventName(e.target.value)} className={"event-hook-modal-title-event-input"}
               name={"event_name"} type="text" placeholder={"Event name"}/>
        <MultipleSelector onChange={onChangeTags} items={mappedTags}/>
      </div>
      <button disabled={!eventName || !selectedTags.length}
              onClick={() => onSave({name: eventName, tags: selectedTags})} className={"event-hook-modal-save-button"}>
        SAVE
      </button>
    </div>
  </div>
}

export default EventHookModal;