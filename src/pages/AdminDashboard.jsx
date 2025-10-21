import { useEffect, useState } from 'react';
import { api } from '../api';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';

export default function AdminDashboard(){
  const [token,setToken]=useState('');
  const [password,setPassword]=useState('');
  const [summary,setSummary]=useState(null);
  const [locations,setLocations]=useState([]);
  const [form,setForm]=useState({ name:'', address:'', managerUsername:'', managerPassword:'' });

  const login= async()=>{ const r= await api.post('/admin/login',{ username:'nikanAdm', password }); setToken(r.data.token); };
  const loadData= async()=>{ const s= await api.get('/admin/summary', { headers:{ Authorization:'Bearer '+token }}); setSummary(s.data); const l = await api.get('/locations', { headers:{ Authorization:'Bearer '+token }}); setLocations(l.data.rows||[]); };
  useEffect(()=>{ if(token) loadData(); },[token]);

  const createLocation= async()=>{
    await api.post('/locations', form, { headers:{ Authorization:'Bearer '+token }});
    setForm({ name:'', address:'', managerUsername:'', managerPassword:'' });
    loadData();
  };

  const columns=[
    {key:'name', title:'نام محل'},
    {key:'address', title:'آدرس'},
    {key:'managerUsername', title:'مدیر'}
  ];

  return (
    <div className="container" style={{paddingTop:24}}>
      {!token ? (
        <Card>
          <h3>ورود نیکان‌ادمین</h3>
          <input className="input" placeholder="رمز عبور ادمین" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{marginTop:12}}><Button onClick={login}>ورود</Button></div>
        </Card>
      ) : (
        <>
          <Card>
            <h3>آمار کلی</h3>
            {summary && (
              <div className="grid grid-2">
                <div className="card"><b>کل اسکن‌ها:</b> {summary.totalScans}</div>
                <div className="card"><b>تعداد محل‌ها:</b> {summary.totalLocations}</div>
                <div className="card"><b>پیش‌ثبت‌نام:</b> {summary.preRegistered}</div>
                <div className="card"><b>ثبت‌نام روز رویداد:</b> {summary.eventDayRegistered}</div>
              </div>
            )}
          </Card>

          <Card>
            <h3>ایجاد محل رویداد جدید</h3>
            <div className="grid grid-2">
              <input className="input" placeholder="نام محل" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
              <input className="input" placeholder="آدرس" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
              <input className="input" placeholder="نام کاربری مدیر" value={form.managerUsername} onChange={e=>setForm({...form, managerUsername:e.target.value})} />
              <input className="input" placeholder="رمز مدیر" type="password" value={form.managerPassword} onChange={e=>setForm({...form, managerPassword:e.target.value})} />
            </div>
            <div style={{marginTop:12}}><Button onClick={createLocation}>ثبت محل</Button></div>
          </Card>

          <Card>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3>محل‌های رویداد</h3>
              <a className="btn btn-ghost" href="#" onClick={e=>{e.preventDefault(); window.open(`${api.defaults.baseURL.replace('/api','')}/api/users/export.csv`, '_blank');}}>خروجی کاربران (CSV)</a>
            </div>
            <Table columns={columns} data={locations} />
          </Card>
        </>
      )}
    </div>
  );
}
