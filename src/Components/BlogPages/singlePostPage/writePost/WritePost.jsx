import { ContentState, convertFromHTML } from 'draft-js';
import React from 'react'
import CreatePostComponents from '../createPost/CreatePostComponents.jsx';

const WritePost = () => {
    const sampleMarkup = '<p>My post ...! |</p>'
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
  return (
    <div>
      <CreatePostComponents state={state}/>
    </div>
  )
}

export default WritePost
