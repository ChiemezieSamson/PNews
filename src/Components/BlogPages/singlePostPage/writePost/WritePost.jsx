import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import React from 'react'
import CreatePostComponents from '../createPost/CreatePostComponents.jsx';

const WritePost = () => {
    const sampleMarkup = '<p>My post ...! |</p>'
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    const defaultState = EditorState.createWithContent(state)

  return (
    <section className='md:mt-20 md:mb-60'>
      <CreatePostComponents state={defaultState}/>
    </section>

  )
}

export default WritePost
