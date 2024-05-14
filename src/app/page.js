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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";
library.add(faBars, faFilm, faBook, faBookmark);

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

const list = [
  { id: 1, name: "Importante", icon: faBookmark, undone_count: 0 },
  { id: 2, name: "Film da vedere", icon: faFilm, undone_count: 2 },
  { id: 3, name: "Libri da leggere", icon: faBook, undone_count: 0 },
  { id: 4, name: "Libri da leggere4", icon: faBook, undone_count: 0 },
];

const todos = [
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
  const [selectedList, setSelectedList] = useState(1);

  //* DEFINISCO I DATI DELLE TODOS APPLICANDOGLI SUBITO IL FILTRO
  const [filteredTodos, setFilteredTodos] = useState(
    todos.filter((elem) => elem.listId === selectedList)
  );

  //* FUNZIONE CHE VIENE RICHIAMATA PER EFFETTUARE IL FILTRAGGIO DELLE TODOS
  const setTodosByListId = (listId) => {
    // RICHIAMO DEL SETTER PER DARE IL VALORE CORRETTO AL DATO
    setSelectedList(listId);

    // RICHIAMO DEL SETTER PER DARE LE TODOS CORRETTE
    setFilteredTodos(todos.filter((elem) => elem.listId === listId));
  };

  return (
    <div className="flex">
      <AppSidebar
        user={user}
        list={list}
        setTodosByListId={setTodosByListId}
        setSelectedList={setSelectedList}
        selectedList={selectedList}
      />
      <AppMain todos={filteredTodos} />{" "}
      {/* Passa filteredTodos invece di todos */}
    </div>
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
