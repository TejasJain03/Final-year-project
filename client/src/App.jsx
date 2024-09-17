import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import React from 'react';
import allRoutes from "./utils/routes";
import Redirect from "./pages/Redirect";

function App() {
  return (
    <Router>
      <div className="App flex flex-col">
        <React.Suspense fallback={<h1>Loading...</h1>}>
          {/* <ScrollToTop /> */}
          {/* <Navbar /> */}
          {/* <Sidebar /> */}
          <Routes>
            {allRoutes.map((route) => {
              return (
                <Route
                  key={route.id}
                  exact
                  path={route.path}
                  element={route.element}
                />
              );
            })}
            <Route exact path="*" element={<Redirect />} />
          </Routes>
          {/* <Footer /> */}
        </React.Suspense>
      </div>
    </Router>
  )
}

export default App
