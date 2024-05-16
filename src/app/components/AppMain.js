/**************************************************************************** 
 ****************************************************************************
                        MAIN AND MAIN COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoList from "./TodoList";

export default function AppMain({ todos, onCreate }) {
  return (
    <div className="flex-1 overflow-auto">
      {/* TODO CONTAINER */}
      <div>
        <div>
          <TodoList todos={todos} onCreate={onCreate} />
        </div>
      </div>
    </div>
  );
}
