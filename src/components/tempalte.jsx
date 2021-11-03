const Index = ({ children, data = {}, id = '', className = '' }) => {
  return (
    <div id={id} className={`template ${className}`} {...data}>
      {children}
    </div>
  )
}
export default Index
