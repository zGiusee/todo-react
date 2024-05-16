/**************************************************************************** 
 ****************************************************************************
                                TODO TEXT
*****************************************************************************
*****************************************************************************/

import { useState } from "react";

export default function todoText({ text, done, onChange }) {
  const todoTextClasses = `${done ? "line-through" : ""} text-sm`;

  const [editableText, setEditableText] = useState(text);
  return (
    <div className="w-full">
      <input
        className="focus:outline-none w-full border-collapse"
        onChange={(event) => setEditableText(event.target.value)}
        onBlur={() => (editableText.length > 0 ? onChange(editableText) : "")}
        value={editableText}
        type="text"
      ></input>
    </div>
  );
}
