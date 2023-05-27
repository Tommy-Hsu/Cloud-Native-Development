import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './Navbar';
// import Navbar from "./components/navbar.component";
import Sidebar from './sidebar/Sidebar';
import Create from './sidebar/create'
import ActivitiesList from "./components/activity-list.component";
import EditActivities from "./components/edit-activity.component";
import CreateActivity from "./components/create-activity.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        {/* <Home /> */}
        <Sidebar />
        <div className="content">
            <Routes>
              <Route path="/" exact>
                {/* 首頁的內容 */}
                
              </Route>
              <Route path="/Create" element={<Create />} />
            </Routes>
          </div>
      </div>
    </div>
    </Router>
    // <Router>
    //     <div className="container">
    //         <Navbar />
    //         <br />
    //         <Routes>
    //           <Route path="/" exact element={<ActivitiesList />} />
    //           <Route path="/edit/:id" element={<EditActivities />} />
    //           <Route path="/Create" element={<CreateActivity />} />
    //           <Route path="/user" element={<CreateUser />} />
    //         </Routes>
    //     </div>
    //     <div className="sidebar">
    //       <Sidebar />
    //     </div>
    // </Router>
  );
}

export default App;