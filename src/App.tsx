import React, {useState} from 'react';
import './App.css';
import CalendarTable from "./Components/CalendarTable/CalendarTable";
import CalendarController from "./Components/CalendarController/CalendarController";
import TaskTagModal from "./Components/TaskTagModal/TaskTagModal";
import TaskTagController, {TaskTagType} from "./Hooks/taskTagController";

function App() {
  const nowDate = new Date();
  const [month, setMonth] = useState<number>(nowDate.getUTCMonth());
  const [year, setYear] = useState<number>(nowDate.getUTCFullYear());
  const [taskTagModal, setTaskTagModal] = useState<boolean>(false);

  const {taskTags, addTag, editTag, removeTagByIndex} = TaskTagController();
  const [filteredTag, setFilteredTag] = useState<TaskTagType | null>(null);

  return (
    <div className="App">
      <CalendarController taskTagModalOpen={taskTagModal} setTaskTagModalOpen={setTaskTagModal} month={month}
                          setMonth={setMonth} year={year} tasks={taskTags}
                          setYear={setYear} filteredTag={filteredTag} setFilteredTag={setFilteredTag}/>
      <main>
        <div className={"calendar-table-holder"}>
          <CalendarTable filteredTag={filteredTag} tags={taskTags} year={year} month={month}/>
        </div>
      </main>
      {taskTagModal &&
        <TaskTagModal editTag={editTag} closeModal={() => setTaskTagModal(false)} tags={taskTags} addTag={addTag}
                      removeTag={removeTagByIndex}/>}
    </div>
  );
}

export default App;
