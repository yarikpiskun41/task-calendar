import {useState} from "react";

export type TaskTagType = {
  name: string,
  color: string
}

const TaskTagController = () => {
  const loadTags = () => {
    const tags = localStorage.getItem('taskTags')
    if (tags) return JSON.parse(tags) as TaskTagType[]
    return null
  }

  const [taskTags, setTaskTags] = useState<TaskTagType[]>(loadTags() || [
    {name: 'Meeting', color: '#0080ff'},
  ])

  const saveTags = (tags = taskTags) => {
    localStorage.removeItem("taskTags")
    localStorage.setItem("taskTags", JSON.stringify(tags))
  }

  const addTag = (tag: TaskTagType) => {
    if (taskTags.find((taskTag) => taskTag.name === tag.name && taskTag.color === tag.color)) {
      alert('Tag already exists')
      return
    }
    const newTags = [...taskTags, tag]
    setTaskTags(newTags)
    saveTags(newTags)
  }

  const removeTag = (tag: TaskTagType) => {
    const newTags = taskTags.filter((taskTag) => taskTag.name !== tag.name && taskTag.color !== tag.color)

    setTaskTags(newTags)
    saveTags(newTags)
  }

  const removeTagByIndex = (index: number | null) => {
    if (index === null) return
    const newTags = [...taskTags]
    newTags.splice(index, 1)
    setTaskTags(newTags)
    saveTags(newTags)
  }

  const editTag = (index: number | null, tag: TaskTagType) => {
    if (index === null) return
    const newTags = taskTags.map((taskTag, i) => {
      if (index === i) return tag
      return taskTag
    })
    setTaskTags(newTags)
    saveTags(newTags)
  }

  return {taskTags, addTag, removeTag, loadTags, saveTags, setTaskTags, editTag, removeTagByIndex}
}

export default TaskTagController