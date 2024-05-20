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
import { useState } from "react";
import { useEffect } from "react";
import store from "./store.js";
import { Provider } from "react-redux";
import { v4 as uuid } from "uuid";

/**************************************************************************** 
 ****************************************************************************
                                COMPONENTS IMPORTS
*****************************************************************************
*****************************************************************************/

import Layout from "./layout.js";
import Image from "next/image";
import AppSidebar from "./components/AppSidebar.js";
import AppMain from "./components/AppMain.js";
import NoListView from "./components/NoListView.js";
import { list } from "postcss";

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
  { id: 1, name: "Importante", icon: faBookmark, undone_count: 3 },
  { id: 2, name: "Film da vedere", icon: faFilm, undone_count: 0 },
  { id: 3, name: "Libri da leggere", icon: faBook, undone_count: 0 },
  { id: 4, name: "Libri da leggeress", icon: faBook, undone_count: 0 },
];

const initialTodos = [
  { id: 1, listId: 1, text: "Prima Attività", done: false },
  { id: 7, listId: 1, text: "Prima Attività", done: false },
  { id: 8, listId: 1, text: "Prima Attività", done: true },
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

  // ! Effect che si attiva ogni volta che allTodos cambia
  useEffect(() => {
    // Filtra i todos in base alla lista selezionata
    const filtered = allTodos.filter((todo) => todo.listId === selectedList);
    // Aggiorna lo stato delle todos filtrate
    setFilteredTodos(filtered);
  }, [allTodos, selectedList]); // Dipendenze dell'effetto laterale

  // ! FUNZIONE DI CREAZIONE DI UNA NUOVA TODO
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

  // ! FUNZIONE CHE CAMBIA IL VALORE DELLE CHECKBOX E CHE MODIFICA IL COUNT DELLE TODO COMPLETATE
  const handelUpdateTodo = (id, data) => {
    // Recupero l'index dell todo usando findIndex
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    // Recupero l'oggetto usando l'index
    const todoToUpdate = allTodos[todoIdx];

    // * Definisco l'oggetto con lo spread operator
    // * e inserendo anche il nuovo dato definito come parametro in TodoItem
    // * Definito così: onChange={() => updateTodo(id, { done: !done })}
    // * Quindi qua è come se gli stessimo passando un oggetto che lui automaticamente cambia
    const updateTodo = {
      ...todoToUpdate,
      ...data,
    };

    // Definico un array temporaneo di todos
    const tempTodos = [...allTodos];
    // Sostituisco l'oggetto cambiato
    tempTodos[todoIdx] = updateTodo;
    // Ed infine setto di nuovo tutte le todo
    setAllTodos(tempTodos);

    // Recupero l'index lista selezionata
    const listIdx = getListIdx(selectedList);

    if (todoToUpdate.done != updateTodo.done) {
      // Controllo sul valore della todo DOPO l'aggiornamento
      if (updateTodo.done) {
        addToListCount(listIdx, -1);
      } else {
        addToListCount(listIdx, +1);
      }
    }
  };

  const handleTodoDelete = (id) => {
    // Recupero l'index dell todo usando findIndex
    const todoIdx = allTodos.findIndex((t) => t.id === id);
    // Recupero l'oggetto usando l'index
    const todo = allTodos[todoIdx];

    // Definico un array temporaneo di todos
    const tempTodos = [...allTodos];
    // Rimuovo dall'array l'elemento
    tempTodos.splice(todoIdx, 1);
    // Ed infine setto di nuovo tutte le todo
    setAllTodos(tempTodos);

    const listIdx = getListIdx(selectedList);
    addToListCount(listIdx, todo.done ? 0 : -1);
  };

  const handleListDelete = (id) => {
    const listIdx = allLists.findIndex((l) => l.id === id);
    const list = allLists[listIdx];
    const tempLists = [...allLists];
    tempLists.splice(listIdx, 1);
    setAllLists(tempLists);
    setSelectedList(-1);
  };

  const handleListUpdate = (id, data) => {
    const listIdx = allLists.findIndex((l) => l.id === id);
    const listToUpdate = allLists[listIdx];
    const updateList = {
      ...listToUpdate,
      ...data,
    };
    const tempLists = [...allLists];
    tempLists[listIdx] = updateList;
    setAllLists(tempLists);
  };

  const handleCreateList = () => {
    // const tempLists = [...allLists];
    const newList = {
      id: uuid(),
      name: "Lista nuova",
      icon: faBookmark,
      undone_count: 0,
    };

    setAllLists((prevList) => [...prevList, newList]);
  };

  const addToListCount = (listIdx, num) => {
    // Definisco un array temporaneo che poi andrà a sostituire quello vecchio
    const tempLists = [...allLists];

    // Recupero la lista selezionata
    // E con l'operatore spread ne vado a creare un altra per poi modificare
    // il valore di undone_count
    tempLists[listIdx] = { ...tempLists[listIdx] };
    tempLists[listIdx].undone_count += num;

    // Utilizzo il setter per cambiare il valore
    setAllLists(tempLists);
  };

  //* FUNZIONE CHE VIENE RICHIAMATA PER EFFETTUARE IL FILTRAGGIO DELLE TODOS
  const setTodosByListId = (listId) => {
    // RICHIAMO DEL SETTER PER DARE IL VALORE CORRETTO AL DATO
    setSelectedList(listId);

    // RICHIAMO DEL SETTER PER DARE LE TODOS CORRETTE
    setFilteredTodos(allTodos.filter((t) => t.listId === listId));
  };

  // FUNZIONE CHE MI RITORNA IL ListIdx dall' list id
  const getListIdx = (id) => {
    return allLists.findIndex((l) => l.id === selectedList);
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
        onCreateList={handleCreateList}
      />
      {selectedList === -1 ? (
        <NoListView />
      ) : (
        <AppMain
          lists={allLists}
          selectedList={selectedList}
          todos={filteredTodos}
          onTodoUpdate={handelUpdateTodo}
          onTodoDelete={handleTodoDelete}
          onCreate={handleCreateTodo}
          onListDelete={handleListDelete}
          onListUpdate={handleListUpdate}
        />
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
