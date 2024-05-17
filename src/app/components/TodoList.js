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
  lists,
  selectedList,
}) {
  const nonCompletedTodos = todos.filter((t) => t.done === false);
  const completedTodos = todos.filter((t) => t.done === true);
  const list = lists.filter((l) => l.id === selectedList);

  const completedCointainerClasses = `${
    nonCompletedTodos.length > 0 ? "mt-12" : ""
  } mb-10`;
  return (
    <div className="h-screen overflow-auto">
      <div className="flex my-8 justify-between items-center">
        <div>
          {list.map((l) => (
            <h1 className="text-6xl mx-5">{l.name}</h1>
          ))}
        </div>
        <div className="mx-5">
          <button type="button">Update</button>
          <button type="button">Delete</button>
        </div>
      </div>

      <hr class="h-px mx-auto bg-gray-100 border-0 md:my-10 dark:bg-gray-300" />

      <div className="flex flex-col justify-between task-container">
        <div className="mt-5 px-10 overflow-auto">
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
                <hr className="h-px mx-auto bg-gray-100 border-0 md:mt-10 dark:bg-gray-300" />
              </div>
            ) : (
              <></>
            )}
            <ul></ul>
          </div>
          <div className={completedCointainerClasses}>
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
    </div>
  );
}
