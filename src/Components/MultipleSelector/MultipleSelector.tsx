import {useEffect, useState} from "react";
import {MultipleSelectorProps} from "./MultipleSelectorProps";
import {TaskTagType} from "../../Hooks/taskTagController";
import ChevronDown from "../Icons/ChevronDown";
import "./MultipleSelector.css";

const MultipleSelector = ({items, onChange, defaultSelectedItems}: MultipleSelectorProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (defaultSelectedItems) {
      setSelectedItems(defaultSelectedItems.map((item) => item.id));
    }
    return () => {
      setSelectedItems([]);
    }
  }, []);
  const returnSelectedItems = (selected: string[]) => {
    return items.filter((item) => selected.includes(item.id));
  }

  const toggleOption = (id: string) => {
    let newArray = [...selectedItems];
    if (newArray.includes(id)) {
      const filteredArray = newArray.filter((item) => item !== id);
      onChange(returnSelectedItems(filteredArray));
      return setSelectedItems(filteredArray);
    } else {
      newArray = [...newArray, id];
      onChange(returnSelectedItems(newArray));
      return setSelectedItems(newArray);
    }
  };

  const renderUiElements = (options: {
    id: string;
    item: TaskTagType;
  }[]) => {
    return options.map((option, i) => {
      const isSelected = selectedItems.includes(option.id);
      return (
        <li
          className="select_option"
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            toggleOption(option.id);
          }}
        >
          <input type="checkbox" readOnly checked={isSelected} className="select_option-checkbox"/>
          <div className={"select_option-title"}>
            <div className={"select_option-title_color"} style={{backgroundColor:option.item.color}}></div>
            <span className={"select_option-title_name"}>{option.item.name}</span>
          </div>
        </li>
      );
    })
  }

  const renderOptions = () => {
    if (searchString) {
      return renderUiElements(items.filter((option) => option.item.name.indexOf(searchString) !== -1))
    }
    return renderUiElements(items)
  };

  return (
    <div className={`select ${isComponentVisible ? "--opened" : ""}`}>
      <div onClick={() => setIsComponentVisible(!isComponentVisible)} className="select_dropdown">
        <div className={`select_text ${selectedItems.length ? "" : "--empty"}`}>
          {selectedItems.length ? `${selectedItems.length} selected` : "Select..."}
        </div>
        <span className={`select_icon ${isComponentVisible ? "--opened" : ""}`}>
					<ChevronDown/>
				</span>
      </div>
      <div className={`select_options ${isComponentVisible ? "--opened" : ""}`}>
        <div className="select_controls">
          <input
            className="select-search"
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <ul>
          {renderOptions()}
        </ul>
      </div>
    </div>
  );
}

export default MultipleSelector