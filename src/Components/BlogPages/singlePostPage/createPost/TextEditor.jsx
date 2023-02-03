import React, { useEffect, useRef } from 'react'
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';



const TextEditor = ({state}) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithContent(state),
  )
  const [convertedContent, setConvertedContent] = useState(null)

  const editorRef = useRef(null);

  const setEditorReference = (ref) => {
    editorRef.current = ref;
    // ref.focus();
  }

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setConvertedContent(() => html)
    console.log(html)
  }, [editorState])


  const  handleMarkUp = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  
  return (
    <div>
       <Editor 
          toolbarOnFocus
          editorState={editorState}
          onEditorStateChange={ setEditorState  }
          wrapperClassName="p-0 focus-within:pt-4 mt-7 leading-3 focus-within:bg-gray-200/40
           border border-b-0 border-x-0 border-solid border-[#eee]"
          editorClassName="focus:py-4 px-4 bg-[#fff] text-base"
          toolbarClassName="border border-solid border-[#eee] cursor-pointer mx-1.5"
          spellCheck
          hashtag={{
            separator: "",
            trigger: "#"
          }}
          toolbar={{
            // inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          editorRef={setEditorReference}
        />       
        <div dangerouslySetInnerHTML={handleMarkUp(convertedContent)} className="editor py-4 mt-4"></div>
    </div>
  )
}

export default TextEditor
