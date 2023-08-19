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
      <div className='skeleton w-full lg:h-6 h-4 mb-0.5 rounded-sm'></div>
      <div className='skeleton w-[80%] lg:h-6 h-4 mb-0 rounded-sm'></div>
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

// Book, qute, category etc component hero Spinner
export const HeroOneThreeImageSpinner = ({groupStyle, oneimageStyle, threeimageStyle, threegroupStyle, threecoverStyle}) => {
  const EmptyValues = [...Array(3)]
  const content  = EmptyValues.map((title, id) => ({id: id, title: title}))

  return (    
    <div className={`${groupStyle}`}>
      <div className={`skeleton rounded-sm my-4 h-screen ${oneimageStyle}`}></div>

      <div className={`${threecoverStyle}`}>
        <ul className={`${threegroupStyle}`}>
          {content.map((post) => {
            return (
              <li className={`skeleton rounded-sm my-4 h-screen ${threeimageStyle}`}  key={post.id}></li>
            )
          })}        
        </ul>
      </div>
    </div>    
  )
}


// Bussiness component hero Spinner
export const HeroOneBussinessFavoriteImageSpinner = ({groupStyle, imageStyle, image}) => {
  const EmptyValues = [...Array(image)]
  const content  = EmptyValues.map((title, id) => ({id: id, title: title}))

  return (
    <div>
      <ul className={`${groupStyle}`}>
        {content.map((post) => {
          return (
            <li className={`skeleton rounded-sm ${imageStyle}`}  key={post.id}></li>
          )
        })}        
      </ul>     
    </div>
  )
}




export const SearchPostSpinner = ({groupStyle, imageStyle, textStyle}) => {
  const EmptyValues = [...Array(8)]
  const content  = EmptyValues.map((title, id) => ({id: id, title: title}))

  return (
    <ul>
      {content.map((post, index) => {

      return ( 
        <li className={`${groupStyle}`} key={index}>
          <div className={`skeleton rounded-sm my-4 h-screen ${imageStyle}`}></div>

          <div className={`${textStyle}`}>
            <SkeletonTextTwo />
            <div className='skeleton w-[35%] lg:mt-3 mt-2 lg:h-3 h-2 rounded-sm'></div>
            <div className='skeleton w-full lg:h-4 h-3 lg:mt-4 mt-3 mb-0.5 rounded-sm'></div>
            <div className='skeleton w-full lg:h-4 h-3 mb-0.5 rounded-sm'></div>
            <div className='skeleton w-full lg:h-4 h-3 mb-0.5 rounded-sm'></div>
            <div className='skeleton w-[80%] lg:h-4 h-3 mb-0.5 rounded-sm'></div>
          </div>
        </li>)
      })}
    </ul>
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