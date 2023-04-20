import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercises from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <div className="container">
            <Navbar />
            <br />
            <Routes>
              <Route path="/" exact element={<ExercisesList />} />
              <Route path="/edit/:id" element={<EditExercises />} />
              <Route path="/create" element={<CreateExercise />} />
              <Route path="/user" element={<CreateUser />} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;