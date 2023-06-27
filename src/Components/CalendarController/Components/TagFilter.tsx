import Filter from "../../Icons/Filter";
import {TaskTagType} from "../../../Hooks/taskTagController";
import {useState} from "react";

const TagFilter = ({tags,filteredTag,setFilteredTag}: { tags: TaskTagType[], filteredTag: TaskTagType | null, setFilteredTag: (tag:TaskTagType | null)=>void }) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const isFiltered = (tag: TaskTagType) => {
    return filteredTag && tag.name === filteredTag.name && tag.color === filteredTag.color;
  }
  return <div className={"calendar-controller-task-filter-window"}>
    <button className={"calendar-controller-task-filter-button"} onClick={() => setOpenFilter(!openFilter)}>
      <Filter/>
    </button>
    {
      openFilter && <div className={"calendar-controller-task-filter-holder"}>
        <div className={"calendar-controller-task-filter-title"}>Filter:</div>
        <ul className={"calendar-controller-task-filter-list"}>
          <li onClick={()=>setFilteredTag(null)} className={"calendar-controller-task-filter-list-item"}>
            <label>
              <input value={JSON.stringify(null)} checked={!filteredTag} readOnly type="radio"/>
              <span>None</span>
            </label>
          </li>
          {tags.map((tag, i) => (
            <li onClick={()=>setFilteredTag(tag)} className={"calendar-controller-task-filter-list-item"} key={i}>
              <label>
                <input value={JSON.stringify(tag)} checked={!!isFiltered(tag)} readOnly type="radio"/>
                <span className={"calendar-controller-task-filter-color"} style={{backgroundColor: tag.color}}/>
                <span>{tag.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    }
  </div>
}

export default TagFilter;