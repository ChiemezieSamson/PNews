import {BiImageAdd} from "react-icons/bi";
import { Posts } from "../../../../data";
import CreatePostAside from "./CreatePostAside";
import TextEditor from "./TextEditor";

const CreatePostComponents = ({state}) => {

  return (
    <div className="grid lg:grid-cols-4 relative">
       {/* write post start here */}
      <div className='text-left lg:col-span-3 order-2 lg:order-1'>
        <div className="mt-5 mb-7">
          <input type="text" placeholder='My Title ...' id="title" name="head_title" 
          className='text-3xl text-[#444444] border-0 focus:border-b focus:outline-0 shadow-none p-5 pb-px' 
          autoFocus={true} required form="post_form"/>
        </div>

        <img src={Posts[4].image} alt="postImage" className='w-full h-80 rounded-xl object-cover' loading="lazy"/>

        {/* write post form */}
        <form className="mt-2.5" id="post_form">
          {/* write form groups */}
          <label htmlFor="fileInput" className="bg-violet-50 px-2 rounded-full mr-3 hover:bg-violet-100 transition-all duration-200 ease-linear">
            <BiImageAdd className="inline-block" />
          </label>
          <input type="file" id="fileInput" className='w-auto text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#f70d28]
            hover:file:bg-violet-100 focus:outline-none focus:border-0 transition-all duration-200 ease-linear' name="image" required/>
        </form>

        <TextEditor state={state}/>
      </div>
      <div className="lg:order-2 order-1 text-left lg:col-span-1">
        <CreatePostAside />
      </div>
    </div>
  )
}


export default CreatePostComponents


