const Spinner = ({ text = '', size = '2em' }) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div className="text-center">
      {header}
      <div className="animate-spin border-8 rounded-full border-solid border-r-rose-400 border-y-rose-400
       border-l-rose-500 mx-auto" style={{ height: size, width: size }}/>
    </div>
  )
}


export default Spinner