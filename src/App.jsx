import React from 'react';
import Home from './pages/Home';
import Data from './pages/Data';
import User from './pages/User';
import Report from './pages/Report';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <nav style={{ width: 180, background: '#f5f5f5', padding: 20 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/data">数据展示</Link></li>
            <li><Link to="/user">用户管理</Link></li>
            <li><Link to="/report">报表页面</Link></li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<Data />} />
            <Route path="/user" element={<User />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}