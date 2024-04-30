import React, { useEffect, useState } from 'react'
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';
import parse from 'html-react-parser';


const Preview = ({editorText, postContent}) => {
  const [convertedContent, setConvertedContent] = useState("")
  const [convertedPosts, setConvertedPosts] = useState("")
   

  useEffect(() => {

    if (postContent) {

      setConvertedPosts(() => postContent)
    }
  },[postContent])

  useEffect(() => {

    const defaultText = EditorState.createEmpty()
    let html = draftToHtml(convertedPosts !== "" ? JSON.parse(convertedPosts) : editorText  ? convertToRaw(editorText) : defaultText)

    setConvertedContent(html)  
  }, [convertedContent, editorText, convertedPosts])


  return (
    <>
      <div className="editor">
        {parse(convertedContent, {
            replace(domNode) {
              if (domNode.attribs) {
                if(domNode.name === "img") {
                  domNode.attribs.alt = "postimage"
                  domNode.attribs.loading = "lazy"
                }
                if(domNode.name === "iframe" ) {
                  domNode.attribs.title = "YouTube Video"
                  domNode.attribs.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  domNode.attribs.referrerpolicy = "strict-origin-when-cross-origin" 
                  domNode.attribs.allowfullscreen = true 
                  domNode.attribs.sandbox = "allow-same-origin allow-scripts allow-presentation"
                  domNode.attribs.frameBorder = "0"
                  if(domNode.attribs.height === "100%" || domNode.attribs.height === "auto") {
                    domNode.attribs.height = "400px"
                  }
                }
                return domNode.attribs.style = "";
              }              
            },
          })
        }          
      </div>
    </>
  )
}

export default Preview
