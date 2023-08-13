const Spinner = ({ text = '', size = '2em' }) => {
  const header = text ? <h4>{text}</h4> : null
  return (
    <div className="text-center">
      {header}
      <div className="animate-spin border-8 rounded-full border-solid border-r-rose-400 border-y-rose-400
       border-l-rose-500 mx-auto" style={{ height: size, width: size }}></div>
    </div>
  )
}


export const SkeletonTextTwo = () => {
  return (
    <>
      <div className='skeleton w-full h-5 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-[80%] h-5 mb-0 rounded-sm'></div>
    </>
  )
}


export const SkeletonTextFour = () => {
  return (
    <>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-[80%] h-4 mb-0 rounded-sm'></div>
    </>
  )
}

export const SearchPostSpinner = ({groupStyle, imageStyle, textStyle}) => {
  return (
    <div className={`${groupStyle}`}>
      <div className={`skeleton rounded-sm my-4 h-screen ${imageStyle}`}></div>

      <div className={`${textStyle}`}>
        <SkeletonTextTwo />
        <div className='skeleton w-[35%] mt-3 h-4 mb-0 rounded-sm'></div>
        <div className='skeleton w-full h-4 mt-3 mb-0.5 rounded-sm'></div>
        <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
        <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
        <div className='skeleton w-[80%] h-4 mb-0.5 rounded-sm'></div>
      </div>
    </div>
  )
}


export const SinglePostSpinner = () => {
  return (
    <>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-[70%] h-4 mb-0 rounded-sm'></div>
     <div className='skeleton w-full mt-3 h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>

     {/* Image */}
     <div className='skeleton rounded-sm my-4 h-screen w-screen HeroImageOne'></div>

     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
     <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-[80%] h-4 mb-0 rounded-sm'></div>
    </>
  )
}

export const CommentSpinner = () => {
  return (
    <>
      <div className='skeleton w-[30%] h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-full h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-[80%] h-4 mb-0 rounded-sm'></div>
      <div className='skeleton w-[45%] h-4 mb-0 mt-2.5 rounded-sm'></div>
    </>
  )
}



export default Spinner