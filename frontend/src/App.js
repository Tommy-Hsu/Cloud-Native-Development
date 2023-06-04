import React, { useState } from 'react';
import './App.css';
import CustomCard from './com/Card';
import Navbar from './com/Navbar';
import Login from './com/Login';
import Register from './com/Register';
import Carousel from './com/Carousel';
import Footer from './com/footer';
import Detailpage from './com/newpage'
import User from './com/user'
import Create from './com/create'

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const cardData = [
    { id: 1, title: 'Card 1', imageSrc: 'url-to-image-1', avatarSrc: 'url-to-avatar-1', description: 'Description 1' },
    { id: 2, title: 'Card 2', imageSrc: 'url-to-image-2', avatarSrc: 'url-to-avatar-2', description: 'Description 2' },
    // ... 其他数据项
  ];
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path="/" exact>
            <div className="home">
              <Navbar />
              <Carousel />
              <CustomCard data={cardData} /> 
              <Footer />      
            </div>
          </Route>

          <Route path="/register">
            <div className='register'>
              <Register />
            </div>
          </Route>

          <Route path="/login">
            <div className='login'>
              <Login />
            </div>
          </Route>

          <Route path="/user">
            <div className='user'>
            <Navbar />
              <User />
            </div>
          </Route>

          <Route path="/detail">
            <div className='Detailpage'>
            <Navbar />
              <Detailpage />
            </div>
          </Route>

          <Route path="/create">
            <div className='create'>
            <Navbar />
              <Create />
            </div>
          </Route>

        </Switch>
      </div>
    </Router>
  );
  // return (
  //   <Router>
  //   <div className="App">
  //       <Switch>
  //         <Route path="/" >
  //         <Bar collapsed={collapsed} setCollapsed={setCollapsed}>
  //         <CustomCard data={cardData} />
  //         </Bar>
  //         </Route>
  //       </Switch>
      
      
  //   </div>
  //   </Router>
  // );
}

export default App;

