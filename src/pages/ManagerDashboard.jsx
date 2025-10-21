import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { api } from '../api';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';

export default function ManagerDashboard(){
  const [token,setToken]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [rows,setRows]=useState([]);
  const [eventLocationId,setEventLocationId]=useState(null);
  const scannerRef = useRef(null);

  const login= async()=>{
    const r= await api.post('/admin/login',{ username, password });
    setToken(r.data.token);
    setEventLocationId(r.data.eventLocationId || null);
  };

  useEffect(()=>{
    if(!token) return;
    const scanner = new Html5QrcodeScanner('reader', { fps:10, qrbox:250 });
    scanner.render(async (text)=>{
      await api.post('/scan', { payload:text }, { headers:{ Authorization:'Bearer '+token }});
      refresh();
      alert('ثبت شد ✅');
    }, ()=>{});
    scannerRef.current=scanner;
    return ()=> scanner.clear();
  },[token]);

  const refresh= async()=>{
    const r= await api.get('/scan/my', { headers:{ Authorization:'Bearer '+token }});
    setRows(r.data.rows||[]);
  };

  const cols=[
    {key:'scannedAt', title:'زمان'},
    {key:'phoneAtScan', title:'موبایل'},
    {key:'barcodeAtScan', title:'بارکد'},
    {key:'peerCodeAtScan', title:'کد همتا'}
  ];

  return (
    <div className="container" style={{paddingTop:24}}>
      {!token ? (
        <Card>
          <h3>ورود مدیر</h3>
          <input className="input" placeholder="نام کاربری" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className="input" style={{marginTop:8}} placeholder="رمز عبور" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div style={{marginTop:12}}><Button onClick={login}>ورود</Button></div>
        </Card>
      ) : (
        <>
          <Card>
            <h3>اسکن QR/بارکد</h3>
            <div id="reader" />
          </Card>
          <Card>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3>گزارش اسکن‌های من</h3>
              <a className="btn btn-ghost" href={`/api/scan/export.csv`} onClick={e=>{e.preventDefault(); window.open(`${api.defaults.baseURL.replace('/api','')}/api/scan/export.csv`, '_blank');}}>خروجی CSV</a>
            </div>
            <Table columns={cols} data={rows} />
          </Card>
        </>
      )}
    </div>
  );
}
