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
import Login from "./pages/Login";
import "./App.css";
import ActionResult from "./components/ActionResult";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./redux/Store.ts";

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where the header should be hidden
  const hideTopNavPath = ["rsvp", "login"];

  return (
    <>
      {!hideTopNavPath.find((it) => location.pathname.indexOf(it) > 0) && (
        <TopNav />
      )}
      <main>{children}</main>
    </>
  );
};

const App = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/me" element={<Me />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rsvp/:id" element={<RSVPForm />} />
              <Route path="/result" element={<ActionResult />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
