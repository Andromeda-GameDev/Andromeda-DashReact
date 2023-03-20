import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import Dashboard from './components/dashboard';
import Student from './components/student';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={ <ProtectedRoute> <Account /> </ProtectedRoute>}/>
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
          <Route path='/student' element={ <ProtectedRoute> <Student /> </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
