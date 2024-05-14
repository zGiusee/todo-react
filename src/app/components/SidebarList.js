/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faFilm,
  faBook,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faBars, faFilm, faBook, faBookmark);
import Page from "../page.js";

/**************************************************************************** 
 ****************************************************************************
                            SIDEBAR LIST & COMPONENTS 
*****************************************************************************
*****************************************************************************/

export default function SidebarList({
  list,
  setTodosByListId,
  setSelectedList,
  selectedList,
}) {
  // DEFINISCO LO STATO DELLA FUNZIONE

  // * FORMO LA ARROW FUNCTION CON LE FUNZIONI PASSATE DA PAGE.JS
  const changeListAndTodos = (listId) => {
    // Cambia il valore della lista selezionata
    setSelectedList(listId);

    // Richiama la funzione definita in page.js
    // dove si effettua il .filter dell'array in base all'id della lista
    setTodosByListId(listId);
  };

  return (
    <ul className="mx-5 my-3">
      {list.map((elem, index) => (
        <ListLink
          // RICHIAMO LA FUNZIONE APPLICANDO COME PARAMETRO L'ID CORRETTO DEL COMPONENTE
          onClick={() => changeListAndTodos(elem.id)}
          key={elem.id}
          linkName={elem.name}
          icon={elem.icon}
          count={elem.undone_count}
          isActive={elem.id === selectedList}
        />
      ))}
    </ul>
  );
}

function ListLink(props) {
  const listedClasses = `${
    props.isActive ? "my-active" : ""
  } py-4 ps-2 flex items-center cursor-pointer`;

  return (
    <li onClick={props.onClick} className={listedClasses}>
      <FontAwesomeIcon icon={props.icon} className="text-sm" />{" "}
      <span className="ms-2 text-sm">{props.linkName}</span>
    </li>
  );
}
