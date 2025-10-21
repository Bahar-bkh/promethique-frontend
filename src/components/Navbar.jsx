import LanguageSwitch from './LanguageSwitch';
export default function Navbar({ lang, setLang }){
  return (
    <div className="header">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px'}}>
        <div className="brand">Promethique</div>
        <LanguageSwitch lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}
