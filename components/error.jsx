const Index = ({children, data={}, id="",className=""}) => {
    return (
        <div id={id} className={`error ${className}`} {...data}>
            {children}
        </div>
    )
}
export default Index