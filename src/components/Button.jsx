export default function Button({ children, variant='primary', ...props }){
  const cls = variant==='ghost' ? 'btn btn-ghost' : variant==='accent' ? 'btn btn-accent' : 'btn';
  return <button className={cls} {...props}>{children}</button>;
}
