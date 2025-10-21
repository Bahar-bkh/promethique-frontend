export default function PhoneInput({ value, onChange, lang='fa' }){
  return (
    <div style={{display:'flex',gap:8}}>
      <select className="input" style={{width:120}} defaultValue={'+98'}>
        <option value="+98">+98</option>
        <option value="+1">+1</option>
        <option value="+49">+49</option>
      </select>
      <input className="input" value={value} onChange={e=>onChange(e.target.value)} placeholder={lang==='fa'? 'مثلاً 0912...' : 'e.g. +98912...'} />
    </div>
  );
}
