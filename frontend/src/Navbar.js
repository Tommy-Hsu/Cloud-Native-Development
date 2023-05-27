import React,{ useState } from 'react';
const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    const handleSearch = () => {
        console.log('Searching:', searchTerm);
        // 實現搜尋功能
    };

    return (
      <nav className="navbar">
        <div className='search-exercise'>
        <input
            type="text"
            placeholder="搜尋集資項目、揪團活動"
            value={searchTerm}
            onChange={handleChange}
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        <div className="links">
          <a href="/">Sign up</a>
          <a href="/User" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>User</a>
        </div>
      </nav>
    );
  }
   
  export default Navbar;