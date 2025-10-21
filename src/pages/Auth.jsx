import { useState } from 'react';
import { api } from '../api';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import PhoneInput from '../components/PhoneInput';

export default function Auth({ lang }){
  const [step,setStep]=useState(1);
  const [phone,setPhone]=useState('');
  const [code,setCode]=useState('');
  const [form,setForm]=useState({ firstName:'', lastName:'', email:'' });
  const t=(fa,en)=> lang==='fa'?fa:en;

  const requestOtp= async()=>{ await api.post('/auth/request-otp',{ phone, countryCode:'+98' }); setStep(2); };
  const verify= async()=>{ const r= await api.post('/auth/verify-otp',{ phone, code }); if(r.data.already){ alert(t('شما قبلاً ثبت نام کرده‌اید','Already registered')); } else setStep(3); };
  const register= async()=>{ const r= await api.post('/auth/register',{ ...form, phone, countryCode:'+98' }); if(r.data.ok){ alert(t('ثبت نام شما با موفقیت انجام شد','Registered successfully')); window.location.href = '/profile/'+r.data.userId; } };

  return (
    <div className="container" style={{paddingTop:24}}>
      <div className="grid grid-2">
        <Card>
          <h2>{t('به پرومتیک خوش آمدید','Welcome to Promethique')}</h2>
          {step===1 && (
            <>
              <p>{t('جهت ثبت نام شماره موبایل خود را وارد نمایید','Enter your mobile number to sign up')}</p>
              <PhoneInput value={phone} onChange={setPhone} lang={lang} />
              <div style={{marginTop:12}}><Button onClick={requestOtp}>{t('ارسال کد','Send Code')}</Button></div>
            </>
          )}

          {step===2 && (
            <>
              <div className="label">{t('کد یکبارمصرف','One-time code')}</div>
              <Input value={code} onChange={e=>setCode(e.target.value)} />
              <div style={{marginTop:12}}><Button onClick={verify}>{t('تأیید','Verify')}</Button></div>
            </>
          )}

          {step===3 && (
            <>
              <h3 style={{marginTop:0}}>{t('اطلاعات شما','Your Information')}</h3>
              <p>{t('فقط یک قدم دیگر تا ثبت نام پرومتیک فاصله دارید!','Just one more step to complete Promethique signup!')}</p>
              <div className="label">{t('نام','First name')}</div>
              <Input value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} />
              <div className="label" style={{marginTop:8}}>{t('نام خانوادگی','Last name')}</div>
              <Input value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} />
              <div className="label" style={{marginTop:8}}>{t('ایمیل (اختیاری)','Email (optional)')}</div>
              <Input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
              <div style={{opacity:.7,marginTop:8}}>{t('شماره موبایل: ','Mobile: ')}{phone}</div>
              <div style={{marginTop:12}}><Button onClick={register}>{t('ثبت نام','Register')}</Button></div>
              <div style={{marginTop:12}}>
                <b>{t('قبلاً ثبت نام کرده‌اید؟','Already registered?')}</b>
                <div style={{marginTop:8}}><Button variant='accent'>{t('ورود','Login')}</Button></div>
              </div>
            </>
          )}
        </Card>
        <Card style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:260}}>
          <div>
            <h3 style={{marginTop:0}}>{t('پرومتیک — تجربه ورود سریع و امن','Promethique — Fast & Secure Entry')}</h3>
            <p style={{color:'var(--muted)'}}>{t('ثبت‌نام، کارت دیجیتال، و ورود با QR/بارکد','Signup, digital card, and QR/Barcode entry')}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
