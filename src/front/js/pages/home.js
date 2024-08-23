import React, { useContext, useEffect, useState  } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);



  // useEffect para llamar a getAllUsers al menos una vez cuando el componente se monta
  useEffect(() => {
    actions.getAllUsers();
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montarse

 

 


  return (
    <div className="text-center mt-5">
      <div>
        <Link to="/register" className="btn btn-secondary"> {/* Usando Link correctamente */}
          Register
        </Link>
      </div>

      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
      {/* Botón para obtener todos los usuarios manualmente */}
      <button onClick={actions.getAllUsers} className="btn btn-primary">
        Get All Users
      </button>
      {/* Mostrar la lista de usuarios */}
      <div className="mt-4">
				<div className="container w-50 bg-info">
        {store.users ? (
          <ul>
            {store.users.map((user, index) => (
              <div key={index} className="text-black">
                {user.email}
              </div>
            ))}
          </ul>
        ) : (
          <p>No users loaded yet.</p>
        )}
				</div>
      </div>

      
      
    </div>
  );
};
