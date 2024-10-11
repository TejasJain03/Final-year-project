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
          <Footer />
          <Toaster />
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
