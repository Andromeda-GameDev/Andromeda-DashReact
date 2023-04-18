import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
//import Account from './components/Account';
import Professor from './components/professor';
import Student from './components/student';
import Groups from './components/groups';
import Statistics from './components/statistics';
import StatisticsStudent from './components/statisticsStudent';
import SignSuperAdmin from './components/SignSuperAdmin';
//import Settings from './components/settings';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Forgot from './components/Forgot';
import Settings from './components/settings';
import Admin from './components/admin';
import ProfessorSettings from './components/professorSettings';
import StudentSettings from './components/studentSettings';

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
          <Route path='/signin/admin' element= {<SignSuperAdmin /> }/>
          <Route path='/admin' element={ <ProtectedRoute> <Admin /> </ProtectedRoute>}/>
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/admin/settings' element={ <ProtectedRoute> <Settings /> </ProtectedRoute>}/>
          <Route path='/professor/settings' element={ <ProtectedRoute> <ProfessorSettings /> </ProtectedRoute>}/>
          <Route path='/student/settings' element={ <ProtectedRoute> <StudentSettings /> </ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
