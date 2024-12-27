/* eslint-disable react/jsx-no-undef */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import allRoutes from "./utils/routes";
import Redirect from "./pages/Redirect";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/static/Loader";
import Footer from "./components/Footer/Footer";
import Toaster from "./components/static/Toaster";

function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <React.Suspense fallback={<Loader />}>
          {/* <ScrollToTop /> */}
          <Navbar />
          <Routes>
            {allRoutes.map((route) => {
              if (route.children) {
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children.map((child) => (
                      <Route
                        key={child.id}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                  </Route>
                );
              }

              return route.path === "/profile" ? (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<PrivateRoute>{route.element}</PrivateRoute>}
                />
              ) : (
                <Route
                  key={route.id}
                  exact
                  path={route.path}
                  element={route.element}
                />
              );
            })}

            {/* Login and Register Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />

            {/* Redirect for unmatched routes */}
            <Route path="*" element={<Redirect />} />
          </Routes>
          <Footer />
          <Toaster />
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
