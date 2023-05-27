// 在 Create.js
import React from 'react';
import './Create.css';

function Create() {
  return (
    <div className="create-page">
      <h1>新增活動</h1>
      <h2>請填寫活動詳細資訊</h2>
      <select name="category" className="create-select">
        <option value="">選擇活動類別</option>
        <option value="遊戲">遊戲</option>
        <option value="戶外">戶外</option>
        <option value="時尚">時尚</option>
        <option value="教育">教育</option>
        <option value="教育">家庭</option>
        <option value="教育">文創</option>
        <option value="教育">其他</option>
      </select>
      <input type="text" className="create-input" placeholder="活動名稱" />
      <textarea className="create-input create-textarea" placeholder="活動描述"></textarea>
      <input type="text" className="create-input" placeholder="價格" />
      <input type="text" className="create-input" placeholder="最低活動人數" />
      <input type="date" className="create-input" />
      <input type="file" className="create-input" />
      <button className="create-button">發佈活動</button>
    </div>
  );
}

export default Create;
