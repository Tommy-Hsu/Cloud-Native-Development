import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ActivitiesList from "./components/activity-list.component";
import EditActivities from "./components/edit-activity.component";
import CreateActivity from "./components/create-activity.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <div className="container">
            <Navbar />
            <br />
            <Routes>
              <Route path="/" exact element={<ActivitiesList />} />
              <Route path="/edit/:id" element={<EditActivities />} />
              <Route path="/create" element={<CreateActivity />} />
              <Route path="/user" element={<CreateUser />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;