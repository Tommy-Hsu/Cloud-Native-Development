import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
    const categories = ['遊戲', '戶外', '時尚', '教育', '家庭', '文創', '其他'];

    return (
        <div className="sidebar">
            <Link to="/" className="sidebar-title">
            <h1>ChillTan</h1>
            </Link>
            <h2>探索專案類別</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
            <Link to="/create"className="sidebar-button">揪團Chill一下~</Link>
        </div>
    );
}

export default Sidebar;
