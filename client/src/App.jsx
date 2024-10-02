import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import allRoutes from "./utils/routes";
import Redirect from "./pages/Redirect";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/static/Loader";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <React.Suspense fallback={<Loader />}>
          <Navbar />
          <Routes>
            {allRoutes.map((route) => {
              if (route.children) {
                return (
                  <Route key={route.id} path={route.path} element={route.element}>
                    {route.children.map((child) => (
                      <Route key={child.id} path={child.path} element={child.element} />
                    ))}
                  </Route>
                );
              }

              return route.path === '/profile' ? (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      {route.element}
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route key={route.id} exact path={route.path} element={route.element} />
              );
            })}

            {/* Login and Register Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Redirect for unmatched routes */}
            <Route path="*" element={<Redirect />} />
          </Routes>
          <Footer />
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;