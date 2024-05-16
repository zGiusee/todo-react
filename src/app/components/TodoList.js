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
  const nonCompletedTodos = todos.filter((t) => t.done === false);
  const completedTodos = todos.filter((t) => t.done === true);
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="mt-5 px-10">
        <div>
          {nonCompletedTodos.length > 0 ? (
            <div>
              <h3 className="text-2xl">Attività da completare</h3>
              {nonCompletedTodos.map((t) => (
                <TodoItem
                  key={t.id}
                  id={t.id}
                  text={t.text}
                  done={t.done}
                  onTodoUpdate={onTodoUpdate}
                  onTodoDelete={onTodoDelete}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
          <ul></ul>
        </div>

        <div className="mt-10">
          <div>
            {completedTodos.length > 0 ? (
              <div>
                <h3 className="text-2xl">Attività completate</h3>
                {completedTodos.map((t) => (
                  <TodoItem
                    key={t.id}
                    id={t.id}
                    text={t.text}
                    done={t.done}
                    onTodoUpdate={onTodoUpdate}
                    onTodoDelete={onTodoDelete}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <TodoCreator onCreate={onCreate} />
      </div>
    </div>
  );
}
