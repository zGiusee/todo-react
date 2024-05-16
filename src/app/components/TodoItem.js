/**************************************************************************** 
 ****************************************************************************
                                COMPONENT IMPORTS
*****************************************************************************
*****************************************************************************/
import StatutsCheckbox from "./input_components/StatusCheckbox";
import DeleteButton from "./input_components/DeleteButton";
import TodoText from "./input_components/TodoText";

/**************************************************************************** 
 ****************************************************************************
                                TODO ITEM
*****************************************************************************
*****************************************************************************/

export default function TodoItem({ id, text, done, updateTodo }) {
  const todoTextClasses = `${done ? "line-through" : ""} text-sm`;

  return (
    <li className="p-2 todo-item mt-4 flex justify-between rounded-lg border border-gray-300">
      {/* CHECK BOX AND TASK NAME */}
      <div className="ms-1 flex items-center ">
        <StatutsCheckbox
          onChange={() => updateTodo(id, { done: !done })}
          done={done}
        />

        <TodoText done={done} text={text} />
      </div>
      {/* ICONS/BUTTONS */}
      <div className="me-2">
        <DeleteButton />
      </div>
    </li>
  );
}
