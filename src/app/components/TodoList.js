/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faTrash);

/**************************************************************************** 
 ****************************************************************************
                        TODO AND TODO COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoItem from "./TodoItem";
import TodoCreator from "./TodoCreator";
import DeleteButton from "./input_components/DeleteButton";
import DeleteModal from "./modals/DeleteModal";
import ListTitle from "./input_components/ListTitle";

export default function TodoList({
  todos,
  onCreate,
  onTodoUpdate,
  onTodoDelete,
  lists,
  selectedList,
  onListDelete,
}) {
  const nonCompletedTodos = todos.filter((t) => t.done === false);
  const completedTodos = todos.filter((t) => t.done === true);
  const list = lists.filter((l) => l.id === selectedList);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const completedCointainerClasses = `${
    nonCompletedTodos.length > 0 ? "mt-12" : ""
  } mb-10`;
  return (
    <div className="h-screen overflow-auto">
      {list.map((l) => (
        <div className="flex my-8 justify-between items-center">
          <ListTitle text={l.name} />
          <div className="mx-5">
            <div className="me-2">
              <DeleteButton onClick={() => setDeleteModalState(true)} />
              {deleteModalState && (
                <DeleteModal
                  type="list"
                  text={l.name}
                  onDelete={() => onListDelete(l.id)}
                  onCancel={() => setDeleteModalState(false)}
                />
              )}
            </div>
          </div>
        </div>
      ))}

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
