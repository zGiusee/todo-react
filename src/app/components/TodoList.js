/**************************************************************************** 
 ****************************************************************************
                        TODO AND TODO COMPONENTS 
*****************************************************************************
*****************************************************************************/
import TodoItem from "./TodoItem";

export default function TodoList({ todos }) {
  // ! Eseguo il richiamo della funzione
  const todoList = getTodos(todos);
  return <ul>{todoList}</ul>;
}

// ! DEFINISCO UNA FUNZIONE CHE FA RITORNARE L'ARRAY GIà CICLATO CON LA COMPONENTE
// RITORNERA UNA COSA TIPO => [<TodoItem/>,<TodoItem/>,<TodoItem/>]
// ANCHE SE L'ID IN QUESTO CASO NON L'HO UTILIZZIAMO REACT NE HA BISOGNO PER DISTINGUERE GLI ELEMENTI CICLATI
// * FUNZIONE DI PER SE UN Pò INUTILE DATO CHE POTEVO INSERIRLA DIRETTAMENTE NELL export di TodoList() MA CHE LASCIO COMUNQUE A SCOPO DIMOSTRATIVO
function getTodos(list) {
  return list.map((elem) => (
    <TodoItem key={elem.id} text={elem.text} done={elem.done} />
  ));
}