import { RouteObject, createBrowserRouter } from 'react-router-dom';
import PublicRouter from './PublicRouter';
import ProfessorRouter from './ProfessorRouter';
import StudentRouter from './StudentRouter';
import AdminRouter from './AdminRouter';
import { ROUTES } from './constants';
import { SignIn } from '../pages/SignIn';
import {
    ProfessorGroups,
    ProfessorHome,
    ProfessorStatistics,
    ProfessorSettings,
    StudentHome,
    StudentStatistics,
    StudentSettings,
    Register
} from "../pages";


const routes: RouteObject[] = [
    {
        path: '/', element: <PublicRouter/>,
        children: [
            { index: true, element: <SignIn/>},
            { path: "register", element: <Register/> },
        ]
    },
    {
        path: ROUTES.PROFFESOR, element: <ProfessorRouter/>,
        children: [
            { index: true, element: <ProfessorHome/>},
            { path: "groups", element: <ProfessorGroups/> },
            { path: "statistics", element: <ProfessorStatistics/>},
            { path: "settings", element: <ProfessorSettings/> },
        ]
    },
    {
        path: ROUTES.STUDENT, element: <StudentRouter/>,
        children: [
            { index: true, element: <StudentHome/> },
            { path: "statistics", element: <StudentStatistics/>},
            { path: "settings", element:  <StudentSettings/>},
        ]
    },
    {
        path: ROUTES.ADMIN, element: <AdminRouter/>,
        children: [
            { index: true, element: <div> Admin Home </div> },
        ]
    }
]

export const router = createBrowserRouter(routes);