import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import rigoImageUrl from "../../img/rigo-baby.jpg"; // Asegúrate de que la ruta sea correcta

export const Home = () => {
	const { store, actions } = useContext(Context);

	// useEffect para llamar a getAllUsers al menos una vez cuando el componente se monta
	useEffect(() => {
		actions.getAllUsers();
	}, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montarse
console.log(store.users)
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
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
				{store.users ? (
					<ul>
						{store.users.map((user, index) => (
							<div key={index} className="text-black">{user.email}</div>
						))}
				</ul>
				) : (
					<p>No users loaded yet.</p>
				)}
			</div>
			
		</div>
	);
};
