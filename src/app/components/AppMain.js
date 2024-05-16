/**************************************************************************** 
 ****************************************************************************
                        MAIN AND MAIN COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoList from "./TodoList";

export default function AppMain({
  todos,
  onCreate,
  onTodoUpdate,
  onTodoDelete,
}) {
  return (
    <div className="flex-1 overflow-auto">
      {/* TODO CONTAINER */}
      <div>
        <TodoList
          todos={todos}
          onTodoUpdate={onTodoUpdate}
          onCreate={onCreate}
          onTodoDelete={onTodoDelete}
        />
      </div>
    </div>
  );
}
