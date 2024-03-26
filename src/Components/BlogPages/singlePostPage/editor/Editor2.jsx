import React, { useEffect, useState } from 'react'
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {HeadingNode, $createHeadingNode} from "@lexical/rich-text"
import { $createTextNode, $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import {$setBlocksType} from "@lexical/selection"
import {INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListItemNode, ListNode} from "@lexical/list"
import {ListPlugin} from "@lexical/react/LexicalListPlugin"
import { BannerPlugin, CustomParagraph, INSERT_BANNER_COMMAND } from './PlugIns/Banner/BannerPlugin';

const theme = {
  heading: {
    h1: "text-red-400"
  },
 text: {
  bold: "text-4xl font-bold text-blue-500"
 },
 banner: "text-5xl text-green-400",
 list: {
  nested: {
    listitem: 'editor-nested-listitem',
  },
  ol: 'text-4xl text-sky-500',
  ul: 'text-6xl text-pink-500',
  listitem: 'editor-listItem',
  listitemChecked: 'editor-listItemChecked',
  listitemUnchecked: 'editor-listItemUnchecked',
}
}

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

const MyheadingPlugin = () => {
  const [editor] = useLexicalComposerContext();

const handleClick = (e) => {
  editor.update(() => {
    // const root = $getRoot()
    // root.append($createHeadingNode("h1").append($createTextNode("Hello world")))
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, () => $createHeadingNode(e))
    }
  })
}

return (
  <>
    {["h1", "h2", "h3"].map((head, index )=> (
      <button onClick={() => handleClick(head)} key={index}>{head}</button>
    ))}

  </>
)
}

const ListToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

const handleClick = (e) => {
  if (e === "ol") {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    return
  }
  editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
}

return (
  <>
    {["ol", "ul"].map((head, index )=> (
      <button onClick={() => handleClick(head)} key={index}>{head}</button>
    ))}

  </>
)
}

const BannerToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

const handleClick = (e) => {
  editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined)
}
return <button onClick={() => handleClick()}>Div</button>
}

const ToolBarPlugin = () => {
  return (
    <div className='grid grid-flow-col'>
       <MyheadingPlugin/>
        <ListToolbarPlugin />
        <BannerToolbarPlugin />
    </div>
  )
}

const OnChangePlugin = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    
    return editor.registerUpdateListener(({editorState}) => {
      // call onChange here to pass the latest state up to the parent.
      onChange(editorState);
    });
  }, [editor, onChange]);

}

const onError = (error) => {
  console.error(error);
}

const Editor2 = () => {
  const [initialConfig , setinitialConfig ] = useState({
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      CustomParagraph,
    ]
  });
  return (
   <div className='relative'>
      <LexicalComposer initialConfig={initialConfig}>
        <ToolBarPlugin />
        <BannerPlugin />
        <ListPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className='h-80 w-full border border-solid border-red-500 text-left'/>}
          placeholder={<div className='absolute top-3 px-4 text-lg font-medium'>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <OnChangePlugin onChange={(editorState) => console.log(editorState)} /> */}
        {/* <MyCustomAutoFocusPlugin />  */}
      </LexicalComposer>
   </div>

  )
}

export default Editor2
