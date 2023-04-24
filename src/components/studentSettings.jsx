import React, { useState } from "react";
import {
  getAuth,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import HeaderPanel from "../components/headerPanel";
import StudentSideBar from "../components/StudentSideBar";
import { useNavigate } from "react-router-dom";

const StudentSettings = () => {
    const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");


  const handleChangeEmail = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(auth.currentUser, email);
      console.log(email)
      setMessage("Email actualizado correctamente");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await updatePassword(auth.currentUser, newPassword);
      setPasswordMessage("Contraseña actualizada correctamente");
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      await deleteUser(auth.currentUser);
      navigate("/");

    } catch (error) {
      setDeleteMessage(error.message);
    }
  };

  const navigate = useNavigate();

  return (
    
    <div className="flex bg-gray-100">
      <StudentSideBar />

      <div className="flex flex-col w-full ml-56">

        <div className="container mx-auto py-12">
          <h2 className="text-2xl font-semibold mb-8 px-14">
            Ajustes de cuenta
          </h2>

          {/* Change Email */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 px-6 mx-12">
            <h3 className="text-xl font-semibold mb-4">Change Email</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Email
                </label>
                <input onChange={(e) => setEmail(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md' type="email" />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={handleChangeEmail}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Confirm Change
                </button>
                <div className="text-center mb-4 ml-4">
                  {message && <p className="text-green-600">{message}</p>}
                  {error && <p className="text-red-600">{error}</p>}
                </div>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 mx-12">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input onChange={(e) => setPassword(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md' type="password" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input onChange={(e) => setNewPassword(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md' type="password" />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md' type="password" />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={handleChangePassword}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                  Confirm Change
                </button>
                <div className="text-center mb-4 ml-4">
                  {passwordMessage && <p className="text-green-600">{passwordMessage}</p>}
                  {passwordError && <p className="text-red-600">{passwordError}</p>}
                </div>
              </div>
            </form>
          </div>

          {/* Delete Account */}
          <div className="bg-white rounded-lg shadow-md p-6 mx-12">
            <h3 className="text-xl font-semibold mb-4">Delete Account</h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                  Delete Account
                </button>
                <div className="text-center mb-4 ml-4">
                    {deleteMessage && <p className="text-green-600">{deleteMessage}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
