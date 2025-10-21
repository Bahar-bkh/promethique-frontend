import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import QRCode from 'qrcode.react';
import JsBarcode from 'jsbarcode';
import html2canvas from 'html2canvas';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile(){
  const { id } = useParams();
  const [user,setUser]=useState(null);
  const barcodeRef = useRef();

  useEffect(()=>{ (async()=>{ const r=await api.get('/users/'+id); setUser(r.data.user); })(); },[id]);
  useEffect(()=>{ if(user && barcodeRef.current){ JsBarcode(barcodeRef.current, user.barcode16 || '', {format:'CODE128', displayValue:true}); } },[user]);

  const downloadCard=()=>{
    const el = document.getElementById('member-card');
    html2canvas(el).then(canvas=>{
      const a=document.createElement('a'); a.download='promethique-card.png'; a.href=canvas.toDataURL(); a.click();
    });
  };

  if(!user) return null;
  return (
    <div className="container" style={{paddingTop:24}}>
      <Card>
        <h2>کارت عضویت / Membership Card</h2>
        <div id="member-card" style={{textAlign:'center',padding:16,border:'1px dashed var(--border)',borderRadius:'12px'}}>
          <div style={{fontWeight:700,fontSize:18}}>{user.firstName||''} {user.lastName||''}</div>
          <div style={{display:'flex',justifyContent:'center',marginTop:12}}>
            <QRCode value={user.phonePlain||''} size={160} />
          </div>
          <svg ref={barcodeRef} style={{marginTop:12}}></svg>
        </div>
        <div style={{marginTop:12}}><Button onClick={downloadCard}>دانلود کارت</Button></div>
      </Card>
    </div>
  );
}
