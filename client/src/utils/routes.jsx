/* eslint-disable react-refresh/only-export-components */
import React from "react";
const Home = React.lazy(() => import("../pages/Home"));
const Authenticate = React.lazy(() => import("../pages/Authenticate"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Pricing = React.lazy(() => import("../pages/Pricing"));
const Payment = React.lazy(() => import("../pages/Payment"));
const ResumeForm = React.lazy(() => import("../pages/ResumeForm"));
const Templates = React.lazy(() => import("../pages/Templates"));
const Login = React.lazy(() => import("../components/Authentication/Login"));
const Register = React.lazy(() =>
  import("../components/Authentication/Register")
);

const allRoutes = [
  {
    id: 1,
    path: "/",
    element: <Home />,
    status: false,
  },
  {
    id: 2,
    path: "/auth",
    element: <Authenticate />,
    status: false,
  },
  {
    id: 3,
    path: "/profile",
    element: <Profile />,
    status: false,
  },
  {
    id: 4,
    path: "/pricing",
    element: <Pricing />,
    status: false,
  },
  {
    id: 5,
    path: "/payment",
    element: <Payment />,
    status: false,
  },
  {
    id: 6,
    path: "/create-resume",
    element: <ResumeForm />,
    status: false,
  },
  {
    id: 7,
    path: "/templates",
    element: <Templates />,
    status: false,
  },
  {
    id: 8,
    path: "/auth/login",
    element: <Login />,
    status: false,
  },
  {
    id: 9,
    path: "/auth/register",
    element: <Register />,
    status: false,
  },
];
export default allRoutes;
