import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Forgot = () => {
  const { forgotPassword } = UserAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setMessage("Se ha enviado un correo a tu cuenta");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-xl p-10">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Recuperar contraseña
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Correo electrónico"
            />
          </div>
          <div className="text-center mb-4">
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleForgot}
              className="border border-blue-500 bg-blue-500 text-white px-6 py-2 my-4 mx-auto"> Enviar </button>
          </div>

            <div className="text-center">
                <Link to="/" className="text-blue-500 hover:text-blue-700"> Iniciar sesión </Link>
            </div>

        </form>
      </div>
    </div>
  );
};

export default Forgot;
