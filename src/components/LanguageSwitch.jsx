export default function LanguageSwitch({ lang, setLang }){
  return (
    <select value={lang} onChange={e=>setLang(e.target.value)} className="input" style={{width:120}}>
      <option value="fa">فارسی</option>
      <option value="en">English</option>
    </select>
  );
}
