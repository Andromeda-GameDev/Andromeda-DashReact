//import { async } from "@firebase/util";
import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [groupId, setGroupId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {createUser} = UserAuth()

    // Por el momento unicamente se registran alumnos a traves de la platrforma de registro

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser({email: email, password: password, name: name, last_name: lastName, group: groupId});
            navigate('/student');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
        <div className = 'max-w-[600px] mx-auto my-16 p-4'> 
            <h1 className='text-center text-3xl font-bold pb-10'>
                Bienvenido a Andromeda
            </h1>
            <div>
                <h1 className = 'text-2xl font-bold'> Crear una cuenta </h1>
                <p> Ya tienes una cuenta? 
                    <Link to = '/' className = 'text-blue-500'> Inicia sesión </Link>
                </p>
            </div>
            <form className="flex flex-col justify-between" onSubmit = {handleSubmit}> 
                <div className = 'flex flex-col'>
                    <label className='py-2 font-medium'> Nombre </label>
                    <input onChange={(e) => setName(e.target.value)} className='border p-3' type="text" />
                </div>
                <div className = 'flex flex-col'>
                    <label className='py-2 font-medium'> Apellido </label>
                    <input onChange={(e) => setLastName(e.target.value)} className='border p-3' type="text" />
                </div>
                <div className = 'flex flex-col'>
                    <label className='py-2 font-medium'> Correo Electrónico </label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>
                <div className="flex flex-col">
                    <label className="py-2 font-medium">ID de tu Grupo</label>
                    <input onChange={(e) => setGroupId(e.target.value)} className="border p-3" type="text"></input>
                </div>
                <div className = 'flex flex-col'>
                    <label className='py-2 font-medium'> Contraseña </label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>
                <button className='border border-blue-500 bg-blue-500 text-white px-6 py-2 my-4'> Crear cuenta </button>
            </form>
        </div>
    );
};

export default Signup;
