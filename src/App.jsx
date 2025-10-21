import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddVIP from './pages/AddVIP';

export default function App(){
  const [lang,setLang]=useState('fa');
  return (
    <div className={lang==='fa'?'rtl':'ltr'}>
      <Navbar lang={lang} setLang={setLang} />
      <div className="container" style={{paddingTop:16}}>
        <div className="tabs">
          <Link className="tab" to="/">خانه</Link>
          <Link className="tab" to="/manager">پنل مدیر</Link>
          <Link className="tab" to="/admin">نیکان‌ادمین</Link>
          <Link className="tab" to="/vip">افزودن VIP</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Auth lang={lang} />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/vip" element={<AddVIP />} />
      </Routes>
    </div>
  );
}
