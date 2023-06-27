import {ReactNode} from "react";
import "./Tooltip.css"
const Tooltip = ({children, text, className}: { children: ReactNode; text: string; className?: string}) => {
  return <div className={`tooltip ${className ? className : ""}`}>
    <div className="tooltip-title">{children}</div>
    <div className="tooltip-text">{text}</div>
  </div>
}

export default Tooltip;