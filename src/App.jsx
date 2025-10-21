import { useState } from "react";
import axios from "axios";

const API = "https://promethique-backend.onrender.com"; // ← بک‌اندت اینه ✅

export default function App() {
  const [lang, setLang] = useState("fa");
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [msg, setMsg] = useState("");

  const t = (f, e) => (lang === "fa" ? f : e);

  async function sendCode() {
    setMsg(t("در حال ارسال کد...", "Sending code..."));
    await axios.post(`${API}/api/auth/request-otp`, { phone, countryCode: "+98" });
    setStep(2);
    setMsg(t("کد ارسال شد ✅", "Code sent ✅"));
  }

  async function verify() {
    const r = await axios.post(`${API}/api/auth/verify-otp`, { phone, code });
    if (r.data.already) {
      setMsg(t("قبلاً ثبت‌نام کرده‌اید", "Already registered"));
    } else setStep(3);
  }

  async function register() {
    await axios.post(`${API}/api/auth/register`, {
      ...form,
      phone,
      countryCode: "+98",
    });
    setMsg(t("ثبت‌نام با موفقیت انجام شد 🎉", "Registered successfully 🎉"));
  }

  return (
    <div style={{ direction: lang === "fa" ? "rtl" : "ltr", padding: "2rem", maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select onChange={(e) => setLang(e.target.value)} value={lang}>
          <option value="fa">فارسی</option>
          <option value="en">English</option>
        </select>
      </div>
      <h2>{t("به پرومتیک خوش آمدید", "Welcome to Promethique")}</h2>

      {step === 1 && (
        <>
          <p>{t("شماره موبایل خود را وارد کنید:", "Enter your mobile number:")}</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("مثلاً 09121234567", "e.g. +989121234567")}
          />
          <button onClick={sendCode}>{t("ارسال کد", "Send Code")}</button>
        </>
      )}

      {step === 2 && (
        <>
          <p>{t("کد پیامک‌شده را وارد کنید:", "Enter the code you received:")}</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={verify}>{t("تأیید", "Verify")}</button>
        </>
      )}

      {step === 3 && (
        <>
          <p>{t("اطلاعات خود را وارد کنید:", "Enter your information:")}</p>
          <input
            placeholder={t("نام", "First Name")}
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            placeholder={t("نام خانوادگی", "Last Name")}
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            placeholder={t("ایمیل (اختیاری)", "Email (optional)")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button onClick={register}>{t("ثبت‌نام", "Register")}</button>
        </>
      )}
      <p style={{ marginTop: "1rem", color: "#3c55a5" }}>{msg}</p>
    </div>
  );
}
