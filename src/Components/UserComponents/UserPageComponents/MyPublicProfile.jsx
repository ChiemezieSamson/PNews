import React, { useLayoutEffect, useState } from 'react'
import { FaEnvelopeOpen, FaFacebookF, FaGlobe, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaTwitter, FaYoutubeSquare } from 'react-icons/fa';
import { useUpdateExistingUserPublicProFileMutation } from '../../../Reduxstore/Slices/users/UsersSlice';
import { UserInfoHeading, isFecthingStyle } from '../../SharedAsset/SharedAssets'
import { useFetchedUserById } from '../../SharedAsset/Spinners/userSpinner';
import { handleEmailPattern, handlePhoneNumbers, handleUrlLinks, textAndNumberOnly } from '../../SharedAsset/Vaidations/RegularExpression';

const MyPublicProfile = () => {
  // fetching the user from the server
  const {singleUser, userAction, isFetching} = useFetchedUserById()
  // Redux toolkit function use to update user public information
  const [userPublicProfile, {isLoading}] = useUpdateExistingUserPublicProFileMutation()

  const [nickname, setNickname] = useState("")
  const [biography, setBiography] = useState("")
  const [secondaryEmail, setSecondaryEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [twitter, setTwitter] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [youTube, setYouTube] = useState("")
  const [website, setWebsite] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const [errMsgOn, setErrMsgOn] = useState(false) // Indicate that there is an error
  const [onChangeMade, setOnChangeMade] = useState(false) // make sure a change is made before allowing the button to save

  const [nickNameIsValid, setNickNameIsValid] = useState(false); // regular expressions
  const [emailIsValid, setEmailIsValid] = useState(true); // regular expressions
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true); // regular expressions
  const [linkedInIsValid, setLinkedInIsValid] = useState(true); // regular expressions
  const [twitterIsValid, setTwitterIsValid] = useState(true); // regular expressions
  const [facebookIsValid, setFacebookIsValid] = useState(true); // regular expressions
  const [instagramIsValid, setInstagramIsValid] = useState(true); // regular expressions
  const [youTubeIsValid, setYouTubeValid] = useState(true); // regular expressions
  const [websiteValid, setwebsiteIsValid] = useState(true); // regular expressions

  const user = singleUser

  // handling setting the value of nick name
  const handleNickName = (e) => {
    setOnChangeMade(() => true) 

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = textAndNumberOnly(value); // function for texting the entered text format

    setNickNameIsValid(isValid);
    setNickname(() => value)
  }


  // handling save the textarea content
  const handleTextarea = (event) => {
    setOnChangeMade(() => true)

    const { value } = event.target;  

    setBiography(() => value)
  }


  // handling save the email content
  const handleSetSecondaryEmail = (event) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = event.target;    
    const { isValid } = handleEmailPattern(value);// function for texting the entered text format

    setEmailIsValid(isValid)

    if (value) {

      setSecondaryEmail(() => value)
    }
  }


  // handling setting the value of phone number
  const handlePhone = (e) => {
    setOnChangeMade(() => true) 

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handlePhoneNumbers(value); // function for texting the entered text format

    setPhoneNumberIsValid(isValid);
    setPhone(() => value)
  }


  // handling setting the value of Linkedin
  const handleLinkedIn = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setLinkedInIsValid(isValid);
    setLinkedIn(() => value)
  }


  // handling setting the value of twitter
  const handleTwitter = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setTwitterIsValid(isValid);
    setTwitter(() => value)
  }


  // handling setting the value of facebook
  const handleFacebook = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setFacebookIsValid(isValid);
    setFacebook(() => value)
  }


  // handling setting the value of instagram
  const handleInstagram = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setInstagramIsValid(isValid);
    setInstagram(() => value)
  }


  // handling setting the value of youtube
  const handleYouTube = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setYouTubeValid(isValid);
    setYouTube(() => value)
  }


  // handling setting the value of website
  const handleWebsite = (e) => {
    setOnChangeMade(() => true)

    // close the error message(if any), once the user change any input
    if(errMsgOn) {

      setErrMsg(() => "")
      setErrMsgOn(() => false)
    }

    const { value } = e.target;
    const { isValid } = handleUrlLinks(value); // function for texting the entered text format

    setwebsiteIsValid(isValid);
    setWebsite(() => value)
  }


 // UPDATE USER PUBLIC PROFILE
  const canSave = [nickname, nickNameIsValid, onChangeMade].every(Boolean) && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if(canSave) {

      try {
        
        await userPublicProfile({userId: user?._id, nickname, biography, secondaryEmail, phone, linkedIn, twitter, facebook, instagram, youTube, website})
  
        setNickname(() => "")
        setBiography(() => "")
        setSecondaryEmail(() => "")
        setPhone(() => "")
        setLinkedIn(() => "")
        setTwitter(() => "")
        setFacebook(() => "")
        setInstagram(() => "")
        setYouTube(() => "")
        setWebsite(() => "")
        setOnChangeMade(() => false)
      } catch (err) {

        console.error('Failed to update: ', err)
        setErrMsg('Failed to update');
        setErrMsgOn(() => true)
      }
    }
  }

  // update the input once fetch is complete
  useLayoutEffect(() => {

    if (userAction) {

      setNickname(() => user?.username)

      if (user?.username) {
        setNickNameIsValid(() => true)
      }
      setBiography(() => user?.bio)

      if(user?.email?.secondary?.length > 0) {

        setSecondaryEmail(() => user?.email?.secondary[user?.email?.secondary?.length - 1])
      }

      setPhone(() => user?.phonenumber)
      setLinkedIn(() => user?.socialLinks?.linkedin)
      setTwitter(() => user?.socialLinks?.twitter)
      setFacebook(() => user?.socialLinks?.facebook)
      setInstagram(() => user?.socialLinks?.instagram)
      setYouTube(() => user?.socialLinks?.youtube)
      setWebsite(() => user?.socialLinks?.website)
    }
  },[userAction, user])
 

  return (
    <div className={`text-left px-5 mt-8 font-source pt-7 pb-5 disabled:opacity-40 ${isFecthingStyle(isFetching)}`}>

      {/* introduction headers */}
      <UserInfoHeading head={"Public URL"} text={"Share your accomplishments with the world"}/>

      <small className='text-sm font-normal my-1 italic text-red-500'>

        <p className='p-px pl-0 mt-2'>
          Provide a 
          <span className='text-red-600 font-semibold'> "Nickname"</span>,
            to create your public admin profile
        </p>
      </small>

      {/* User Contact and Social media contact section start here */}       
      <UserInfoHeading head={"Contact Me"} text={"How visitors will get in touch with you"}/>
        
      <form className='my-7' onSubmit={handleSubmit}>

        {/* Nickname for the user start here */}
        <div className='py-2 mt-3'>

          <label htmlFor="usernickname" className='sm:flex sm:gap-x-2.5'>

            <span className='text-stone-800 sm:text-lg font-semibold mt-3'>NickName:</span>

            <div className='w-full'>

              <input 
                type="text" 
                id='usernickname' 
                name='usernickname' 
                className={`rounded-full placeholder:text-neutral-400 disabled:opacity-40 px-1.5 mb-1.5 capitalize ${(!nickNameIsValid && nickname) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" :
                ""}`} 
                placeholder={user?.username ? user?.username : ""}
                aria-label='text' 
                maxLength={10}
                autoFocus={true}              
                required
                disabled={!userAction}
                value={nickname}
                onChange={handleNickName}
              />

              {/* notification on how adim name show be */}
              <p className='text-sm font-normal text-neutral-600 mx-4 italic'>

                <small>This will be the name displayed as admin on your posts. </small>

                <small>
                  No use of  
                  <span className='px-1'>
                    &#91; &#8208; &#64; &#33; &#35; &#36; &#37; &#43; &#x204E; &#38; 
                  &#60; &#62; &#8242; &#8243; &#8260; &#8901; &#93;</span> etc on Nick name.
                </small>
              </p>
            </div>
          </label>
        </div>

        {errMsgOn && <p className='text-xs text-rose-500 tracking-wider font-lora'>{errMsg}</p>}

        {/* User Bio section start here */}
        <div className='my-10'>

          <UserInfoHeading head={"Bio"} text={"write a short introduction to best describe yourself to visitors"}/>

          <textarea 
            name="userbio" 
            id="userbio" 
            placeholder={user?.bio ? user?.bio : ""} 
            value={biography}
            maxLength={800}
            rows={4}
            disabled={!userAction}
            className="mt-1 p-1 border border-gray-400 rounded-md w-full mb-0 resize-none overflow-hidden disabled:opacity-40"
            onChange={handleTextarea}
          ></textarea>
        </div>
      
          {/* User Secondary Email  */}
        <label htmlFor="usercontactemail" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaEnvelopeOpen className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Email
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="email" 
              id="usercontactemail" 
              name="usercontactemail"
              aria-label="email"  
              disabled={!userAction}
              placeholder={user?.email?.secondary ? user?.email?.secondary[user?.email?.secondary?.length - 1] : ""}
              value={secondaryEmail}
              className={`${(!emailIsValid && secondaryEmail) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40 mb-0`}
              onChange={handleSetSecondaryEmail}
            />

          </div>
        </label>

        {/* User Phone Number  */}
        <label htmlFor="usercontactphone" className="sm:grid sm:grid-cols-4 sm:gap-x-4 mt-5">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaPhoneAlt className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Phone
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="tel" 
              aria-label="phone" 
              id="usercontactphone" 
              name="usercontactphone" 
              disabled={!userAction} 
              placeholder={user?.phonenumber  ? user?.phonenumber : ""}
              value={phone}
              className={`${(!phoneNumberIsValid && phone) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handlePhone}
            />

          </div>
        </label>

        {/* User LinkedIn contact */}
        <label htmlFor="usercontactlinkedin" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaLinkedinIn className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Linkedin
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction} 
              id="usercontactlinkedin" 
              name="usercontactlinkedin" 
              aria-label='linkedIn' 
              placeholder={user?.socialLinks?.linkedin ? user?.socialLinks?.linkedin : ""}
              value={linkedIn}
              className={`${(!linkedInIsValid && linkedIn) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleLinkedIn}
            />

          </div>
        </label>

        {/* User Twitter contact */}
        <label htmlFor="usercontacttwitter" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaTwitter className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Twitter
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction}
              id="usercontacttwitter" 
              name="usercontacttwitter"
              aria-label='twitter'   
              placeholder={user?.socialLinks?.twitter ? user?.socialLinks?.twitter : ""}
              value={twitter}
              className={`${(!twitterIsValid && twitter) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleTwitter}
            />

          </div>
        </label>

            {/* User Facebook contact */}
        <label htmlFor="usercontactfacebook" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaFacebookF className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Facebook
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction} 
              id="usercontactfacebook" 
              name="usercontactfacebook"
              aria-label='facebook'    
              placeholder={user?.socialLinks?.facebook ? user?.socialLinks?.facebook : ""}
              value={facebook}
              className={`${(!facebookIsValid && facebook) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleFacebook}
            />

          </div>
        </label>

        {/* User Instagram contact */}
        <label htmlFor="usercontactinstagram" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

            <FaInstagram className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Instagram
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction} 
              id="usercontactinstagram" 
              name="usercontactinstagram"  
              aria-label='instagram'
              placeholder={user?.socialLinks?.instagram ? user?.socialLinks?.instagram : ""}
              value={instagram}
              className={`${(!instagramIsValid && instagram) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleInstagram}
            />

          </div>
        </label>

        {/* User YouTube contact */}
        <label htmlFor="usercontactyoutube" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

              <FaYoutubeSquare className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              YouTube
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction} 
              id="usercontactyoutube" 
              name="usercontactyoutube"  
              aria-label='youTube'
              placeholder={user?.socialLinks?.youtube ? user?.socialLinks?.youtube : ""}
              value={youTube}
              className={`${(!youTubeIsValid && youTube) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleYouTube}
            />

          </div>
        </label>

        {/* User Website contact */}
        <label htmlFor="usercontactwebsite" className="sm:grid sm:grid-cols-4 sm:gap-x-4">

          <span className='text-stone-800 sm:text-lg py-1 mt-1 whitespace-nowrap sm:col-span-1'>

              <FaGlobe className="inline-block align-text-top" />

            <span className='text-stone-800 min-w-fit p-1 ml-4 font-semibold inline-block'>
              Website
            </span>
          </span>

          <div className='w-full sm:col-span-3'>

            <input 
              type="url"
              disabled={!userAction} 
              id="usercontactwebsite" 
              name="usercontactwebsite"  
              aria-label='website'
              placeholder={user?.socialLinks?.website ? user?.socialLinks?.youtube : ""}
              value={website}
              className={`${(!websiteValid && website) ? "border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500" : ""} placeholder:text-neutral-400 disabled:opacity-40`}
              onChange={handleWebsite}
            />

          </div>
        </label>


        <div className='mt-5 p-2 grid place-items-end'>

          <button 
            className='text-neutral-600 bg-neutral-200 capitalize border-0 py-2.5 px-8 rounded-full cursor-pointer 
            text-base shadow-neutral-400 shadow-sm disabled:opacity-40 hover:bg-neutral-300 TextHeadertransition' 
            type='submit' 
            name="submit" 
            disabled={!canSave}
          >Save</button>
        </div>
      </form>
    </div>     
  )
}

export default MyPublicProfile