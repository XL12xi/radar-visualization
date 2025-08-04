// 1. 导入依赖和页面组件
import React from 'react';
import Home from './pages/Home';
import Data from './pages/Data';
import User from './pages/User';
import Report from './pages/Report';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// 2. 顶部导航栏组件，负责页面导航
function TopNav() {
  const location = useLocation();
  const navs = [
    { path: '/', label: '首页' },
    { path: '/data', label: '数据展示' },
    { path: '/report', label: '报表' },
    { path: '/user', label: '用户管理' },
  ];
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      height: 48,
      minHeight: 48,
      zIndex: 2000,
    }}>
      {/* 导航链接，当前页面高亮 */}
      {navs.map(nav => (
        <Link
          key={nav.path}
          to={nav.path}
          style={{
            margin: '0 32px',
            fontSize: 18,
            color: location.pathname === nav.path ? '#1976d2' : '#333',
            fontWeight: location.pathname === nav.path ? 700 : 400,
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: 6,
            background: location.pathname === nav.path ? 'rgba(25,118,210,0.08)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          {nav.label}
        </Link>
      ))}
    </div>
  );
}

// 3. 应用主组件，负责路由和页面内容渲染
export default function App() {
  return (
    <Router>
      {/* 顶部导航栏始终显示 */}
      <TopNav />
      {/* 主内容区，包含路由页面，顶部留出导航栏高度 */}
      <div style={{ width: '100%', minHeight: '100vh', paddingTop: 48 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/user" element={<User />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}