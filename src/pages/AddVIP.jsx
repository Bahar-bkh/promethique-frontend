import { useState } from 'react';
import { api } from '../api';
import Card from '../components/Card';
import Button from '../components/Button';

export default function AddVIP(){
  const [token,setToken]=useState('');
  const [password,setPassword]=useState('');
  const [form,setForm]=useState({ firstName:'', lastName:'', phone:'', email:'' });

  const login= async()=>{ const r= await api.post('/admin/login',{ username:'nikanAdm', password }); setToken(r.data.token); };
  const createVIP= async()=>{ await api.post('/users/vip', form, { headers:{ Authorization:'Bearer '+token }}); alert('VIP ساخته شد'); setForm({ firstName:'', lastName:'', phone:'', email:'' }); };

  return (
    <div className="container" style={{paddingTop:24}}>
      {!token ? (
        <Card>
          <h3>ورود نیکان‌ادمین</h3>
          <input className="input" placeholder="رمز عبور ادمین" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{marginTop:12}}><Button onClick={login}>ورود</Button></div>
        </Card>
      ) : (
        <Card>
          <h3>افزودن کاربر VIP</h3>
          <div className="grid grid-2">
            <input className="input" placeholder="نام" value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} />
            <input className="input" placeholder="نام خانوادگی" value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} />
            <input className="input" placeholder="شماره موبایل" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <input className="input" placeholder="ایمیل (اختیاری)" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div style={{marginTop:12}}><Button onClick={createVIP}>ثبت VIP</Button></div>
        </Card>
      )}
    </div>
  );
}
