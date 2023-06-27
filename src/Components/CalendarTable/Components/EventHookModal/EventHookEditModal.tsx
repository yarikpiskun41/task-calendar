import "./EventHookModal.css"
import CloseThick from "../../../Icons/CloseThick";
import MultipleSelector from "../../../MultipleSelector/MultipleSelector";
import {EventHookEditModalState} from "./EventHookModalProps";
import {useState} from "react";
import {TaskTagType} from "../../../../Hooks/taskTagController";

const EventHookEditModal = ({tags, close, onSave, event}: EventHookEditModalState) => {
  const mappedTags = (() => {
    let mergedTags = []
    if (!event) {
      mergedTags = tags
    } else {
      mergedTags = [...tags, ...event.tags]
    }
    const uniqueArray: TaskTagType[] = mergedTags.reduce((acc: TaskTagType[], obj) => {
      const existingObj = acc.find(item => JSON.stringify(item) === JSON.stringify(obj));
      if (!existingObj) {
        acc.push(obj);
      }
      return acc;
    }, []);
    return uniqueArray.map((tag, i) => {
      return {
        id: i.toString(),
        item: tag,
      }
    })
  })()

  const mappedSelectedTags = (() => {
    if (!event) {
      return []
    }
    return mappedTags.filter((tag) => {
      return event.tags.find((eventTag) => {
        return JSON.stringify(eventTag) === JSON.stringify(tag.item)
      })
    })

  })()

  const [eventName, setEventName] = useState<string>(event ? event.name : "")
  const [selectedTags, setSelectedTags] = useState<TaskTagType[]>(event ? event.tags : [])

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
        Edit event
      </h2>
      <div className={"event-hook-modal-inputs"}>
        <input value={eventName} onChange={e => setEventName(e.target.value)}
               className={"event-hook-modal-title-event-input"}
               name={"event_name"} type="text" placeholder={"Event name"}/>
        <MultipleSelector defaultSelectedItems={mappedSelectedTags} onChange={onChangeTags} items={mappedTags}/>
      </div>
      <button disabled={!eventName || !selectedTags.length}
              onClick={() => onSave({name: eventName, tags: selectedTags})} className={"event-hook-modal-save-button"}>
        EDIT
      </button>
    </div>
  </div>
}

export default EventHookEditModal;