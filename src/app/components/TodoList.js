/**************************************************************************** 
 ****************************************************************************
                        TODO AND TODO COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoItem from "./TodoItem";
import TodoCreator from "./TodoCreator";

export default function TodoList({
  todos,
  onCreate,
  onTodoUpdate,
  onTodoDelete,
}) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="mt-5 px-10">
        <ul>
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              text={t.text}
              done={t.done}
              onTodoUpdate={onTodoUpdate}
              onTodoDelete={onTodoDelete}
            />
          ))}
        </ul>
      </div>
      <div className="">
        <TodoCreator onCreate={onCreate} />
      </div>
    </div>
  );
}
