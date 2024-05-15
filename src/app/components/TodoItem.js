/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faTrash);

/**************************************************************************** 
 ****************************************************************************
                                TODO ITEM
*****************************************************************************
*****************************************************************************/

export default function TodoItem({ text, done }) {
  const todoTextClasses = `${done ? "line-through" : ""} text-sm`;

  return (
    <li className="p-2 mt-4 flex justify-between rounded-lg border border-gray-300">
      <div className="ms-1 flex items-center">
        <div>
          <input
            type="checkbox"
            readOnly={true}
            className="mx-2"
            checked={done}
          />
        </div>
        <div>
          <span className={todoTextClasses}>{text}</span>
        </div>
      </div>
      <div className="me-2">
        <button type="button" className="mx-2 my-btn-delete rounded-lg">
          <FontAwesomeIcon icon={faTrash} className="text-sm my-delete-icon" />
        </button>
      </div>
    </li>
  );
}
