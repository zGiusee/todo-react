/**************************************************************************** 
 ****************************************************************************
                        MAIN AND MAIN COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoList from "./TodoList";

export default function AppMain({ todos, onListClick }) {
  return (
    <div className="flex-1">
      {/* TODO CONTAINER */}
      <div className="">
        <div>
          <TodoList todos={todos} onListClick={onListClick} />
        </div>
      </div>
    </div>
  );
}
