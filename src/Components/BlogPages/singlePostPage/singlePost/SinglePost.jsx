import React, { useEffect, useRef, useState } from 'react'
import {  FaMinus, FaPlus, FaRedo, FaRegComment, FaRegStar, FaStar} from 'react-icons/fa'
import { BiFontFamily } from "react-icons/bi";
import StickyBox from "react-sticky-box";
import { isFecthingStyle, useHover, useWindowSize} from '../../../SharedAsset/SharedAssets';
import Aside from '../../asidePage/Aside';
import CommentForm from './CommentComponent/CommentForm';
import Comment from './CommentComponent/Comment';
import Preview from '../createPost/editorPreview/Preview';
import { Link, useNavigate } from 'react-router-dom';
import PreviousNextPost from './singlePostComponets/PreviousNextPost';
import SinglePostShareComponent from "./singlePostComponets/singlePostShareComponent"
import { useFetchedPostById } from '../../../SharedAsset/Spinners/postsSpinner';
import {  useFetchedUserById, useFetchedUserByPostId } from '../../../SharedAsset/Spinners/userSpinner';
import { useDeleteExistingPostMutation, useMarkPostFavouriteStatusMutation } from '../../../../Reduxstore/Slices/posts/PostsSlice';
import { publicFolder } from '../../../../data';
import UserValidation from '../../../SharedAsset/Vaidations/UserValidation';
import { handelPassWordValidation } from '../../../SharedAsset/Vaidations/bcrypt';
import { useFetchedCommentById } from '../../../SharedAsset/Spinners/commentSpinner';
import { SkeletonTextTwo } from '../../../SharedAsset/Spinners/Spinner';
import { handleUserPassword } from '../../../SharedAsset/Vaidations/RegularExpression';


const SinglePost = () => {
  // Getting the current post useing the url id
  const {singlePost , postAction, postId, isFetching} = useFetchedPostById() 
  // fetching the authour of the post using the url id
  const {singleUser, userAction, isFetching: AuthorIsfetching} = useFetchedUserByPostId()
  // getting the user for authenticatin, authorisation and security
  const {singleUser: byUserId, userAction: byUserIdAction} = useFetchedUserById()
  // Delete a post only if authorized
  const [postDeleted, {isLoading, isFetching: DeleteIsfetching}] = useDeleteExistingPostMutation()
  // marking a post as favourite post (done only by authenticated users)
  const [markfavourite, {isLoading: favouriteIsLoading}] = useMarkPostFavouriteStatusMutation()
  // fetching all the comments made on a particural post and its replies
  const {singleContent, contentAction, isFetching: commentIsFetching, postId: commentPostId} = useFetchedCommentById() 

  const [favourite, setFavourite] = useState(false)
  const [openValidation, setOpenValidation] = useState(false)
  const [wrongPassword, setWrongPassword] = useState(false)
  const [isValid, setIsValid] = useState(false) // regular expressions

  const [userpassword, setGetUserpassword] = useState("")

  const [hoverRef, isHovered] = useHover() // handling hovering of the textsize icon

  const [sizeLine, setSizeLine] = useState(20)
  const [textSize, setTextSize] = useState("prose-base")

  // getting the offsetTop value of the form in to create users first comment
  const offsetOfForm = useRef(null)

  const Post = singlePost
  const User = singleUser
  const userByUserId = byUserId
  const comments = singleContent
  const canOpen = [postAction, userAction, contentAction].every(Boolean)
  const onAnyIsfetching = isFetching || AuthorIsfetching || DeleteIsfetching || commentIsFetching

  const size = useWindowSize()

  // changing the tag arrary to object with id for keys
  const TagsLinks = Post?.postTags?.map((title, id) => ({id: id, title: title}))

  const navigate = useNavigate();

  // handle substraction of the textsize
  const handleMinus = () => {

    sizeLine !== 20 && setSizeLine((size) => size - 20)
  }

  // handle addission of the textsize
  const handlePlus = () => {

    sizeLine !== 100 && setSizeLine((size) => size + 20)
  }

  // handle reset of the textsize
  const handleResetFontSize = () => {

    setSizeLine(() =>  20)
  }

  // handing getting and setting users password for before a user can delete a post
  const handleSetGetUserpassword = (e) => {

    const { value } = e.target;
    const { isValid } = handleUserPassword(value)
    setIsValid(isValid);
    setGetUserpassword(() => value)
  }

  // handle opening the box for delete post crealification
  const handleDeletePost = () => {

    setOpenValidation(() => true)
  }

   // handle closing the box for delete post
  const handleCloseValidation = () => {

    setOpenValidation(() => false)
    setGetUserpassword(() => "")
  }


  const canDelete = [userpassword, postId, isValid].every(Boolean) && !isLoading && Post?.postAuthor === userByUserId?._id

  // user validation and posts deletion if user is authentic
  const handleOnSubmitValidation = async (e)  => {
    e.preventDefault();

    if (!handelPassWordValidation(userpassword, userByUserId)){

      setWrongPassword(() => true)
      setGetUserpassword(() => "")
    }

    if(canDelete && handelPassWordValidation(userpassword, userByUserId)) {

      try {

        await postDeleted({postId, postAuthor: userByUserId?._id})
      } catch (err) {

        console.error("Something went wrong!", err)
      }

      navigate("/")
      setWrongPassword(() => true)
      setGetUserpassword(() => "")
      setOpenValidation(() => false)
    }
  }

  // making posts as favourite
  const handleMarkFavourite = async () => {

    if(postId && !favouriteIsLoading && Post?.postAuthor === userByUserId?._id){

      try {

        await markfavourite({postId, favourite: !favourite, postAuthor: userByUserId?._id})
      } catch (err) {

        console.error("Something went wrong!", err)
      }
    }

    setFavourite((change) => !change)
  }


  useEffect(() => {

    const handleTextSize = () => {

      sizeLine >= 80 && setTextSize(() => "prose-2xl")
      sizeLine === 60 && setTextSize(() => "prose-xl")
      sizeLine === 40 && setTextSize(() => "prose-lg")
      sizeLine === 20 && setTextSize(() => "prose-base")  
    }

    handleTextSize()
  },[sizeLine, textSize])

  // Text size Buttons
  const fontSizeButton = [
    {
      id: 1,
      icon: <FaMinus className='inline-block mx-2'/>,
      onClick: handleMinus
    },
    {
      id: 2,
      icon: <FaPlus className='inline-block mx-2'/>,
      onClick: handlePlus
    },
    {
      id: 3,
      icon: <FaRedo className='inline-block mx-2'/>,
      title: 'reset',
      onClick: handleResetFontSize
    },
  ]

  // getting all the possible image on the post and adding style to them
  useEffect(() => {

    const removerEditorTextStlye = document.querySelectorAll("span")
    const removerEditorImageStlye = document.querySelectorAll("img")

    removerEditorTextStlye.forEach((span) => {

      span.style = ""
    })
     
    removerEditorImageStlye.forEach((img) => {

      img.style = ""
      img.setAttribute("alt", "postimage")
      img.setAttribute("loading", "lazy")
    })    
  },[])

  return (
    <div className='relative'>
      <article className='text-left md:grid md:grid-cols-3'>

        {/* Posts content start here */}
        <div className='md:col-span-2 md:mr-[4%] overflow-x-hidden'>

          <article className={isFecthingStyle(onAnyIsfetching)}>
            {/* navigation display */}

            <div className="lg:mb-8 lg:mt-8 mb-4 grid grid-flow-col justify-between text-stone-800">

              <small>Home &gt; single &gt; {canOpen ? Post?.postCategory[0] : <div className='skeleton h-2 w-14 inline-block'></div>}</small>

              {/* user make favourite, edit post and delete post buttons */}
              {(byUserIdAction && Post?.postAuthor === userByUserId?._id) && 
                <div className='px-2 mx-0.5'>

                  {/* Favourite */}
                  <button
                    type='button'
                    name="favouriteButton"
                    className="text-[#f7c90d] cursor-pointer whitespace-nowrap font-lora tracking-wide font-semibold lg:text-base text-base md:text-sm mx-2 disabled:opacity-40" 
                    disabled={!canOpen}
                    title="favourite"
                    onClick={handleMarkFavourite}
                  >                    
                    {
                      Post?.optional?.favourite === true ? 
                      
                      <FaStar className='p-[1px] -mt-0.5 inline-block'/> 
                      :
                      <FaRegStar className='p-[1px] -mt-0.5 inline-block'/>
                    }
                  </button>

                  {/* Edit */}
                  <span className={isFecthingStyle(!canOpen)}>

                    <Link 
                      to={`/editpost/${postId}`} 
                      type='button'                     
                      className="mx-1 uppercase rounded-md text-xs font-bold tracking-widest text-gray-400 hover:text-gray-700 TextHeadertransition"
                    >edit</Link>
                  </span>

                  {/* Delete */}
                  <button 
                    type='button'
                    name='singlepagedeleteButton' 
                    className='mx-1 uppercase rounded-md text-xs font-bold tracking-widest text-rose-400 hover:text-rose-700 TextHeadertransition disabled:opacity-40' 
                    disabled={!canOpen}
                    onClick={handleDeletePost}
                  >delete</button>
                </div>
              }
            </div>

            {/* Post Title start here */}   
            <h1 className="my-1.5 text-stone-900 tracking-wide lg:text-4xl text-3xl font-bold font-lora first-letter:capitalize" title='title'>

              {canOpen ? 

                <strong>
                  {Post?.postTitle}
                </strong> 
                :
                 <SkeletonTextTwo />
              } 
            </h1>

            {/*Admin image , name, post date and category , text size adjuster and comment number start here  */}
            <div className='mt-5 grid grid-flow-col content-center justify-between'>              
             
              <div className='text-neutral-400'>

                {/* Admin Image */}
                {canOpen ?

                  <Link to={`/categories?user=${User?._id}`} className="max-w-[40px] max-h-10 inline-block rounded-full align-bottom mr-2">
                      <img loading='lazy' src={publicFolder + User?.profileImage} alt="AdminImage" className='rounded-full'/> 
                  </Link>
                  :
                  <div className='w-[40px] h-10 skeleton rounded-full inline-block mr-2'></div>
                }

                {/* Admin name, Post date and category */}
                {canOpen ?

                  <address className='align-top mt-1.5 inline-block'>

                    <small className="text-neutral-500 mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-sm md:text-[11px] leading-4 inline-block"
                      title='post-admin'>
                        By &nbsp;

                        <Link to={`/categories?user=${User?._id}`} className="text-[#f70d28] cursor-pointer">{User.username}</Link>
                    </small>

                    <span className='mx-2 align-text-top inline-block'>&#9473;</span>

                    <span className="mt-1 font-lora tracking-wide whitespace-nowrap" title='date'> 

                      <time 
                        dateTime={new Date(Post?.createdAt).toDateString()} 
                        className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block text-xs lg:text-sm md:text-xs"
                      >{new Date(Post?.createdAt).toDateString()}</time>                    

                      <span className='mx-2 text-sm md:text-sm lg:text-base text-neutral-500 cursor-pointer'>
                        in 

                        <Link to={`/categories?category=${Post?.postCategory[0]}`}className='font-extrabold hover:text-neutral-700'>
                          &nbsp;{Post.postCategory[0]}
                        </Link>              
                      </span>                      
                    </span>

                  </address>           
                  : 
                  <div className='skeleton h-3 w-60 inline-block mb-2'></div>
                }
              </div>
              
              
              {/* Text size adjuster and comment number */}
              <span className='align-top text-lg sm:mt-0.5 inline-block'>

                {/* Text size adjuster */}
                <span className='relative mx-3'>

                  <span title='text size' ref={hoverRef}>

                    <BiFontFamily  className='inline-block text-neutral-500'/>

                    {isHovered &&

                      <div className='absolute top-full -translate-x-[50%] pt-4 z-20 whitespace-nowrap w-48 max-h-[104px] text-center'>

                        <div className='bg-neutral-50 relative rounded -translate-x-[30%] shadow-sm shadow-neutral-300 grid grid-cols-2 grid-rows-2 after:absolute after:right-2
                          after:bottom-full after:bg-white after:-ml-1.5 after:border-b-[12px] after:border-x-[10px] after:border-solid after:border-b-white  after:border-x-[rgba(0,0,0,2%)]
                          after:border-t-[rgba(0,0,0,2%)]'>

                          {fontSizeButton.map((bnt) => {

                            return (

                              <button 
                                key={bnt.id}
                                name='textsizeButton' 
                                className="last:col-span-2 text-sky-500 last:text-neutral-300 last:hover:text-neutral-500 py-1.5 last:border-t-2 last:border-solid 
                                last:border-sky-500 first:border-r first:border-solid first:border-neutral-300 relative isolate after:absolute  after:inset-0 after:z-30" 
                                title={bnt.title ? bnt.title : ""} 
                                onClick={bnt.onClick}
                              >
                                {bnt.icon}
                              </button>
                            )
                          })}                  
                        </div> 

                        <div className="absolute inset-x-0 z-30 h-[2px] top-[58%] -left-[30%] bg-red-500" style={{width:`${sizeLine}%`}}></div>
                      </div>                                 
                    }
                  </span>                     
                </span>

                {/* Comment number */}
                <span className='hidden sm:inline-block'>

                  <FaRegComment className="text-[#2e9fff] inline-block mr-1.5 align-middle"/> 

                  {       canOpen ? 

                    <span className='mb-0.5 text-[#7a7a7a]/80 leading-4 align-middle inline-block font-medium'>{comments?.length}</span>
                    :
                    <div className='skeleton h-3.5 w-3 inline-block -mb-0.5'></div>
                  }
                </span>
              </span>
            </div>

            {/* post image */}
            <div className='lg:mt-7 mt-3 lg:mb-7 mb-4 rounded-sm max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]'>

              {canOpen ? 

                <img 
                  loading='lazy' 
                  src={publicFolder + Post?.postImage} 
                  alt="PostImage" 
                  className='rounded-sm max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]'
                />
                :
                <div className='skeleton rounded-sm h-screen w-screen max-h-64 imgxs:max-h-72 sm:max-h-80 md:max-h-96 xl:max-h-[400px] 2xl:max-h-[450px]'></div>
              }         
            </div>
                
            {/* post share component start here */}

            <SinglePostShareComponent
              Post={Post}
              size={size}
              canOpen={canOpen}
            />

            {/* post text start here */}
            <div className={`${textSize} tracking-wide text-stone-800`}>
              {postAction ? <Preview postContent={Post?.postContent}/>
                :
                singlePost
              }
            </div>

            {/* post tags start here */}
            <span className='inline-block lg:py-5 mb-3 lg:text-sm text-xs'>
              <b className='mr-2 text-neutral-800'>Tags:</b>
              {postAction ? TagsLinks?.map((tag) => {
                return (
                  <Link 
                  to={`/tags?tag=${tag.title}`}
                  key={tag.id} className="text-stone-700 bg-neutral-100 inline-block py-0.5 px-2.5 hover:bg-[#f70d28]
                  hover:text-neutral-50 mb-1.5 mr-[3px] last:mr-0 tracking-wider TextHeadertransition cursor-pointer">{tag.title}</Link>
                )
              }) 
              : 
              <div className='skeleton h-3 w-60 inline-block'></div>
              }
            </span>
          </article>

          {/* previous button, next button , user info and similar news sectio start here */}        
          <PreviousNextPost
            size={size}  
            post={Post} 
            User={User} 
            userContent={singleUser} 
            useraction={userAction}
            postAction={postAction}
          />

          {/* Comments section start here */}            
          <section className='pt-8 pb-4'>
        
            <div className='mb-6 disabled:opacity-40' disabled={commentIsFetching}>              
              <Comment 
                comments={comments}
                postId={commentPostId} 
                byUserId={byUserId}
                postAuthor={Post?.postAuthor}
                offsetOfForm={offsetOfForm}
                contentAction={contentAction}
              />            
            </div> 
     

            {/* comment form section start here */}
            <strong className='text-2xl inline-block mb-2 font-lora'  ref={offsetOfForm}>Leave a Reply</strong>
            <p className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 text-sm'>Your email address will not be published. Required fields are marked</p>
            <CommentForm postId={postId} commentIsFetching={commentIsFetching}/>
            
          </section>
        </div>

        <aside className='md:col-span-1 lg:ml-[4%] mt-4'>
          <StickyBox offsetTop={0} offsetBottom={0}>
            <Aside />
          </StickyBox>
        </aside>
      </article>

      <UserValidation 
        openValidation={openValidation} 
        onSubmitValidation={handleOnSubmitValidation} 
        onWrongUserPassword={wrongPassword} 
        handleClose={handleCloseValidation}
        Userpassword={userpassword} 
        handleSetGetUserpassword={handleSetGetUserpassword} 
        textContentOfTheClickedButton={"Delete"}
        canDelete={canDelete}
        isValid={isValid}
        message={"Enter your password to delete this post"}
      />
    </div>
  )
}

export default SinglePost
