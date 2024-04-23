import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({editorState, state, setEditorState, userAction}) => {

  return (
    <Editor 
      toolbarOnFocus
      editorState={editorState}                  
      defaultEditorState={state}
      onEditorStateChange={setEditorState}

      wrapperClassName="p-0 focus-within:pt-4 mt-7 focus-within:bg-gray-200/40
      border-0 border-t-1 border-x-0 border-solid border-neutral-100 my-5"
      editorClassName="focus:py-4 px-4 bg-white text-base overflowScrollSmallScreen"
      toolbarClassName="border border-solid border-[#eee] cursor-pointer mx-1.5"

      spellCheck
      readOnly={!userAction}

      hashtag={{
        separator: " ",
        trigger: "#"
      }}
      
      toolbar={{
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
        alt: { present: true, mandatory: true },
        colorPicker: {
          className: "!hidden lg:!flex",
          popupClassName: "!hidden lg:!grid lg:!grid-flow-row",
        },
        emoji: {
          className: "!hidden lg:!flex",
          popupClassName: "overflowScrolllgallScreen !hidden lg:!flex",
        },
        image: {
          className: "!hidden lg:!flex",
          popupClassName: "!hidden lg:!grid lg:!grid-flow-row",
          defaultSize: {
            height: "auto",
            width: "auto",
          },
          alt: { present: true, mandatory: true },
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        },
        embedded: {
          className: "!hidden lg:!flex",
          popupClassName: "!hidden lg:!grid lg:!grid-flow-row",
          defaultSize: {
            height: "100%",
            width: "100%",
          },
        }
      }}
    />  
  )
}

export default TextEditor
