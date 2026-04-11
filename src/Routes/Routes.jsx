import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/LogIn";

import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home";
import TreatmentDetails from "../Pages/TreatmentPage/TreatmentDetails";
import Activity from "../Pages/ActivityPage/Activity";



const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:
            [
                {
                    path: '/',
                    element:<Home></Home>
                },
                {
                    path: '/registration',
                    element: <Registration></Registration>,
                },
                {
                    path: '/login',
                    element: <Login></Login>,
                },
                {
                    path: "/treatments/:slug",
                    element: <TreatmentDetails />,
                },
                {
                    path: "/activity",
                    element: <Activity />,
                },
            ]
    }
]);


export default Routes;