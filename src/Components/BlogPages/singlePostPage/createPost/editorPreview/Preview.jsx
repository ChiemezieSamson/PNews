import React, { useEffect, useState } from 'react'
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { convertToRaw } from 'draft-js';



const Preview = ({editorText, postContent}) => {
  const [convertedContent, setConvertedContent] = useState("")
  const [convertedPosts, setConvertedPosts] = useState("")
   

  useEffect(() => {
    if (postContent) {
      setConvertedPosts(() => postContent)
    }
  },[postContent])

  useEffect(() => {
    const defaultText = {blocks:[{key:"9f98v",text:"My post ...! |",type:"unstyled",depth:0,inlineStyleRanges:[],entityRanges:[],data:{}}],entityMap:{}}
    let html = draftToHtml(convertedPosts !== "" ? convertedPosts : editorText  ? convertToRaw(editorText) : defaultText)
    setConvertedContent(html)  
  }, [convertedContent, editorText, convertedPosts])

  // useEffect(() => {
  //   console.log(convertedPosts);
  // },[convertedPosts])
 

  const  handleMarkUp = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div dangerouslySetInnerHTML={handleMarkUp(convertedContent)} className="editor"></div>
  )
}

export default Preview
