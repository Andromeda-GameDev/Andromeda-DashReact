import { getDatabase, get, ref } from "firebase/database";
import React from "react";
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignSuperAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = UserAuth();


    // dependiendo del tipo de usuario se redirecciona a una pagina u otra
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({email: email, password: password});
            const creds = await login({email: email, password: password});
            const db = getDatabase();
            const { uid } = creds.user;
            
            const adminReference = ref(db, `admin/${uid}`);
            const adminSnap = await get(adminReference);
            if (adminSnap.exists()) {
                //console.log(adminSnap.val());
                navigate('/admin');
            }else{
                // Mark error
                console.log('No existe');
            }
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <div className = 'max-w-[600px] mx-auto my-32 p-8'>
                <h1 className='text-center text-3xl font-bold pb-10'>
                    Panel de administración - Andromeda
                </h1>
                <div>
                    <h1 className = 'text-2xl font-bold'> Iniciar sesión </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className = 'flex flex-col py-4'>
                        <label className='py-2 font-medium'> Correo Electrónico </label>
                        <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                    </div>
                    <div className = 'flex flex-col py-2'>
                        <label className='py-2 font-medium'> Contraseña </label>
                        <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                    </div>
                    <button className='border border-blue-500 bg-blue-500 text-white px-6 py-2 my-4'> Iniciar sesión </button>
                </form>
            </div>
    )
}

export default SignSuperAdmin;