import { ContentState, convertFromHTML } from 'draft-js';
import React from 'react'
import CreatePostComponents from '../createPost/CreatePostComponents.jsx';

const EditPost = () => {
  const sampleMarkup = `<p>My post Becoming a more effective learner can take time and It always takes practice and determination to establish new habits. Starting a new field of skills, career, work or learning something </p>
                        <p>new always seems to be the difficult thing Most of us have to pass through. It takes extra energy, time and sometimes strength for most of us to concentrate and dissect what is in front of us. ...! |</p>`
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
