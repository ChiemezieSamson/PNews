import { ContentState, convertFromHTML } from 'draft-js';
import React from 'react'
import { sampleMarkup } from '../../../../data.js';
import CreatePostComponents from '../createPost/CreatePostComponents.jsx';

const EditPost = () => {
  
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

export default EditPost
