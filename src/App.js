import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
//import Account from './components/Account';
import Professor from './components/professor';
import Student from './components/student';
import Groups from './components/groups';
import Statistics from './components/statistics';
import StatisticsStudent from './components/statisticsStudent';
//import Settings from './components/settings';
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
          <Route path='/student' element={ <ProtectedRoute> <Student /> </ProtectedRoute>}/>
          <Route path='/student/statistics' element={ <ProtectedRoute> <StatisticsStudent /> </ProtectedRoute>}/>
          <Route path='/professor' element={ <ProtectedRoute> <Professor /> </ProtectedRoute>}/>
          <Route path='/professor/groups' element={ <ProtectedRoute> <Groups /> </ProtectedRoute>}/>
          <Route path='/professor/statistics' element={ <ProtectedRoute> <Statistics /> </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
