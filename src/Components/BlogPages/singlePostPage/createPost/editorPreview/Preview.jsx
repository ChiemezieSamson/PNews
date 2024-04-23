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
