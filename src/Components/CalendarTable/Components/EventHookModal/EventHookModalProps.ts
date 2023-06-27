import {TaskTagType} from "../../../../Hooks/taskTagController";
import {eventType} from "../../../../Hooks/eventHook";

export type EventHookModalProps = {
  close: () => void;
  tags: TaskTagType[];
  onSave: (event: eventType) => void;
}

export type EventHookEditModalState = EventHookModalProps & {
  event?: eventType;
}