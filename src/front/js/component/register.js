import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export default function Register() {
  const { store, actions } = useContext(Context);


// Estado local para manejar los valores del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    is_active: true, // Puedes establecer un valor predeterminado si es necesario
  });
// Manejar cambios en los campos de entrada del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "is_active" ? e.target.checked : value,
    });
  };

  const clearForm = () => {
    setFormData({
      email: "",
      password: "",
      username: "",
      is_active: true, // Restablece este valor al predeterminado si es necesario
    });
  };
 // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postUser(formData).then(() => {
      clearForm(); // Limpiar el formulario después de enviar los datos
    });
  };

  return (
    <div>
      <div className="container w-50 mt-4 text-center">
        <h2>Create a New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            <label htmlFor="username" className="form-label">
              Username
            </label>
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
          <div className="mb-3 form-check text-center w-25">
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
}
