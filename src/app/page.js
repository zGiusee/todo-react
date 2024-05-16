"use client";

/**************************************************************************** 
 ****************************************************************************
                                GENERAL IMPORTS
*****************************************************************************
*****************************************************************************/

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faFilm,
  faBook,
  faBookmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faBars, faFilm, faBook, faBookmark, faTrash);

/**************************************************************************** 
 ****************************************************************************
                                COMPONENTS IMPORTS
*****************************************************************************
*****************************************************************************/

import Layout from "./layout.js";
import Image from "next/image";
import AppSidebar from "./components/AppSidebar.js";
import AppMain from "./components/AppMain.js";
import { useState } from "react";
import { useEffect } from "react";
import store from "./store.js";
import { Provider } from "react-redux";
import { v4 as uuid } from "uuid";
import NoListView from "./components/NoListView.js";

/**************************************************************************** 
 ****************************************************************************
                        DYNAMIC DATA AND APP DEPLOY 
*****************************************************************************
*****************************************************************************/

const user = {
  name: "Giuseppe",
  age: 20,
  image: null,
  id: 1,
};

const initialLists = [
  { id: 1, name: "Importante", icon: faBookmark, undone_count: 2 },
  { id: 2, name: "Film da vedere", icon: faFilm, undone_count: 0 },
  { id: 3, name: "Libri da leggere", icon: faBook, undone_count: 0 },
  { id: 4, name: "Libri da leggeress", icon: faBook, undone_count: 0 },
];

const initialTodos = [
  { id: 1, listId: 1, text: "Prima Attività", done: false },
  { id: 2, listId: 1, text: "Seconda Attività", done: false },
  { id: 3, listId: 2, text: "Terza Attività", done: true },
  { id: 4, listId: 3, text: "Quarta Attività", done: true },
  { id: 5, listId: 4, text: "Quarta Attività", done: true },
  { id: 6, listId: 4, text: "Quarta Attività", done: true },
];

/**************************************************************************** 
 ****************************************************************************
                 RENDER FINALE DELLA PAGINA
*****************************************************************************
*****************************************************************************/

export default function App() {
  //* DATO DELLA LISTA SELEZIONATA
  const [selectedList, setSelectedList] = useState(-1);
  // * DATO DELLE LISTE
  const [allLists, setAllLists] = useState(initialLists);
  // * DATO DELLE TODOS
  const [allTodos, setAllTodos] = useState(initialTodos);

  // * DEFINISCO I DATI DELLE TODOS APPLICANDOGLI SUBITO IL FILTRO
  const [filteredTodos, setFilteredTodos] = useState(
    allTodos.filter((t) => t.listId === selectedList)
  );

  // Effect che si attiva ogni volta che allTodos cambia
  useEffect(() => {
    // Filtra i todos in base alla lista selezionata
    const filtered = allTodos.filter((todo) => todo.listId === selectedList);
    // Aggiorna lo stato delle todos filtrate
    setFilteredTodos(filtered);
  }, [allTodos, selectedList]); // Dipendenze dell'effetto laterale

  // FUNZIONE DI CREAZIONE DI UNA NUOVA TODO
  const handleCreateTodo = (text) => {
    const newTodo = {
      listId: selectedList,
      id: uuid(),
      done: false,
      text: text,
    };

    const tempLists = [...allLists];
    const listToUpdate = tempLists.find((list) => list.id === selectedList);
    if (listToUpdate) {
      listToUpdate.undone_count++;
      setAllLists(tempLists);
    } else {
      console.error("List with id:", selectedList, "not found.");
    }

    setAllTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  //* FUNZIONE CHE VIENE RICHIAMATA PER EFFETTUARE IL FILTRAGGIO DELLE TODOS
  const setTodosByListId = (listId) => {
    // RICHIAMO DEL SETTER PER DARE IL VALORE CORRETTO AL DATO
    setSelectedList(listId);

    // RICHIAMO DEL SETTER PER DARE LE TODOS CORRETTE
    setFilteredTodos(allTodos.filter((t) => t.listId === listId));
  };

  return (
    // <Provider store={store}>
    <div className="flex">
      <AppSidebar
        user={user}
        list={allLists}
        setTodosByListId={setTodosByListId}
        setSelectedList={setSelectedList}
        selectedList={selectedList}
      />
      {selectedList === -1 ? (
        <NoListView />
      ) : (
        <AppMain todos={filteredTodos} onCreate={handleCreateTodo} />
      )}
    </div>
    // </Provider>
  );
}

/**************************************************************************** 
 ****************************************************************************
                          GENERAL FUNCTIONS 
*****************************************************************************
*****************************************************************************/

// FUNZIONE CHE RITORNA LA STRINGA IN UPPER CASE (Manipolazione dei dati)
function toUP(str) {
  return str.toUpperCase();
}
