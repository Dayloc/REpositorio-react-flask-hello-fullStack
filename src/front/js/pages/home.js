import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext"; // Asegúrate de que la ruta sea correcta
import rigoImageUrl from "../../img/rigo-baby.jpg"; // Asegúrate de que la ruta sea correcta

export const Home = () => {
	const { store, actions } = useContext(Context);

	// Estado local para manejar los valores del formulario
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		username: "",
		is_active: true // Puedes establecer un valor predeterminado si es necesario
	});

	// useEffect para llamar a getAllUsers al menos una vez cuando el componente se monta
	useEffect(() => {
		actions.getAllUsers();
	}, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montarse

	// Manejar cambios en los campos de entrada del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "is_active" ? e.target.checked : value
		});
	};

	// Manejar el envío del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		actions.postUser(formData); // Llamar a la función postUser con los datos del formulario
	};

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

			{/* Formulario para crear un nuevo usuario */}
			<div className="mt-4">
				<h2>Create a New User</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">Username</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3 form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="is_active"
							name="is_active"
							checked={formData.is_active}
							onChange={handleChange}
						/>
						<label className="form-check-label" htmlFor="is_active">
							Is Active
						</label>
					</div>
					<button type="submit" className="btn btn-primary">
						Create User
					</button>
				</form>
			</div>
		</div>
	);
};
