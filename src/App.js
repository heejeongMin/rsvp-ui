import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import TopNav from "./components/TopNav";
import Home from "./pages/Home";
import Me from "./pages/Me";
import RSVPForm from "./pages/RSVPForm";
import Contact from "./pages/Contact";
import "./App.css";
import Success from "./components/Success";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where the header should be hidden
  const hideTopNavPath = "rsvp";

  return (
    <>
      {location.pathname.indexOf(hideTopNavPath) < 0 && <TopNav />}
      <main>{children}</main>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/me" element={<Me />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rsvp/:id" element={<RSVPForm />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
