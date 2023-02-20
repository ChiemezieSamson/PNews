import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaFacebookSquare, FaMinus, FaPlus, FaRedo, FaRegComment, FaShare, FaTwitter } from 'react-icons/fa'
import { BiFontFamily } from "react-icons/bi";
import StickyBox from "react-sticky-box";
import { CategoriesComponentBotton, PagesDivider, PostTitleMedium, PostTitleSmall, TimeComponentColor, useHover, useWindowSize } from '../../../SharedAsset/SharedAssets';
import { Posts, SocialMediaIcons } from '../../../../data';
import Aside from '../../asidePage/Aside';


const SinglePost = () => {
  const [hoverRef, isHovered] = useHover();
  const [sizeLine, setSizeLine] = useState(20)
  const [textSize, setTextSize] = useState("prose-base")

  const size = useWindowSize()

  const handleMinus = () => {
    sizeLine !== 20 && setSizeLine((size) => size - 20)
  }

  const handlePlus = () => {
    sizeLine !== 100 && setSizeLine((size) => size + 20)
  }

  const handleResetFontSize = () => {
    setSizeLine(() =>  20)
  }

  useEffect(() => {
    const handleTextSize = () => {
      sizeLine >= 80 && setTextSize(() => "prose-2xl")
      sizeLine === 60 && setTextSize(() => "prose-xl")
      sizeLine === 40 && setTextSize(() => "prose-lg")
      sizeLine === 20 && setTextSize(() => "prose-base")  
    }
    handleTextSize()
  },[sizeLine, textSize])

  const fontSizeButton = [
    {
      id: 1,
      icon: <FaMinus className='inline-block mx-2' onClick={handleMinus } />,
    },
    {
      id: 2,
      icon: <FaPlus className='inline-block mx-2' onClick={handlePlus}/>,
    },
    {
      id: 3,
      icon: <FaRedo className='inline-block mx-2' onClick={handleResetFontSize}/>,
      title: 'reset'
    },
  ]
  

  return (
    <article className='text-left md:grid grid-cols-3'>
      <div className='col-span-2 md:mr-[4%] overflow-x-hidden'>
        <article>
          {/* navigation display */}

          <span className="inline-block lg:mb-8 lg:mt-8 mb-4">
            <small>Home &gt; books &gt; <span className='text-[#7a7a7a]'>{Posts[12].cat}</span></small>
          </span>

          {/* Post Title start here */}      

          <h1 className=" text-black tracking-wide lg:text-4xl text-3xl font-bold font-lora" title='title'>
            <strong>
            {Posts[12].title}
            </strong> 
          </h1>

          {/*Admin image , name, post date and category , text size adjuster and comment number start here  */}

          <div className='mt-5 flex content-center justify-between'>

            {/* Admin Image */}

            <div className='text-[#7a7a7a]'>
              <span className='w-10 h-10 inline-block rounded-full align-bottom mr-2'>
                <img loading='lazy' src={Posts[12].image} alt="AdminImage" className='h-full w-full object-cover rounded-full cursor-pointer'/>
              </span>

              {/* Admin name, Post date and category */}

              <address className='align-top mt-1.5 inline-block'>
                <small className="text-[#7a7a7a] mt-[3px] font-lora whitespace-nowrap tracking-wider font-extrabold text-xs lg:text-sm md:text-[11px] leading-4 inline-block"
                  title='post admin'>
                    By
                    <span className="text-[#f70d28] cursor-pointer"> Admin</span>
                </small>
                <span className='mx-2 align-text-top inline-block'>&#9473;</span>
                <span className="mt-1 font-lora tracking-wide whitespace-nowrap text-xs lg:text-sm md:text-xs"
                title='date'>
                <time dateTime='2022-11-3 4:45' className="whitespace-nowrap cursor-pointer mt-0.5 ml-0.5 inline-block">{Posts[12].date}</time>
                </span>
                <span className='mx-2 font-lora text-xs lg:text-sm md:text-xs cursor-pointer'>
                  in 
                  <span className='font-extrabold'>
                  {" Health"}
                  </span>              
                </span>
              </address>           
            </div>

            {/* Text size adjuster and comment number */}

            <span className='align-top text-lg sm:mt-0.5 inline-block'>
              <span className='relative mx-3'>
                <span className='' title='text size' ref={hoverRef}>
                  <BiFontFamily  className='inline-block text-[#7a7a7a]' />
                  {isHovered &&
                  <div className='absolute top-full -translate-x-[50%] pt-4 z-20 whitespace-nowrap w-48 text-center'>
                    <div className='bg-white rounded -translate-x-[30%] shadow-[0_6px_20px_0_rgba(0,0,0,19%)] grid grid-cols-2 after:absolute after:right-2
                    after:bottom-full  after:bg-white after:-ml-1.5 after:border-b-[12px] after:border-x-[10px] after:border-solid after:border-b-white  after:border-x-[rgba(0,0,0,2%)]
                    after:border-t-[rgba(0,0,0,2%)]'>
                      {fontSizeButton.map((bnt) => {
                        return (
                          <button key={bnt.id} className="last:col-span-2 text-sky-500 last:text-gray-400/70 last:border-t-2 last:border-solid
                          last:border-sky-500 first:border-r first:border-solid first:border-gray-400/50 py-1.5" title={bnt.title ? bnt.title : ""}>
                            {bnt.icon}
                          </button>
                        )
                      })}                  
                      </div>                   
                      <div className="absolute inset-x-0 z-30 h-[2px] max-w-[192px] top-[57%] -left-[30%] bg-red-400" style={{
                        width: `${sizeLine}%`
                      }}></div>
                  </div>               
                    }
                </span>                     
              </span>

              {/* Comment number */}
              <span className='hidden sm:inline-block'>
                <FaRegComment className="text-[#2e9fff] inline-block mr-1.5 align-middle"/> 
                <span className='mb-0.5 text-[#7a7a7a]/80 leading-4 align-middle inline-block font-medium'>{5}</span>
              </span>
            </span>
          </div>

          {/* post image */}

          <div className='lg:mt-7 mt-3 lg:mb-7 mb-4'>
            <img loading='lazy' src={Posts[11].image} alt="PostImage" className='w-full max-h-[370px] object-cover cursor-pointer'/>
          </div>

          {/* share number and views number */}

          <div className='grid md:grid-cols-5 grid-cols-12 lg:mb-8 mb-4'>
            <div className='lg:grid lg:grid-cols-2 whitespace-nowrap max-w-[130px] col-span-1 pt-1 mx-auto lg:mx-0'>
              <span className='font-extrabold text-[#f70d28] font-round text-2xl leading-none'>
                {"551"}
                <div className='text-[#7a7a7a] uppercase text-xs  font-lora font-normal -mt-0.5'>shares</div>
              </span>         
          
              <span className='font-extrabold relative hidden lg:inline-block text-slate-400 font-round text-2xl leading-none after:w-px after:h-full
              after:bg-[#e0e0e0] after:block after:absolute after:right-0 after:-top-0.5 after:rotate-[15deg] after:z-0'>
                {"3.9k"}
                <div className='text-[#7a7a7a] uppercase text-xs pl-1.5 font-lora font-normal -mt-0.5'>views</div>
              </span>
            </div>

            {/* facebook ,twitter share , email, share button*/}

            <div className='md:col-span-4 col-span-11 grid sm:grid-cols-6 grid-flow-col ml-8 sm:ml-4'>
              <span className='px-3 whitespace-nowrap inline-block bg-[#45629f] hover:bg-[rgba(69,98,159,.9)] w-auto text-center text-white rounded mr-1.5 mb-1.5
              h-10 leading-10 sm:col-span-2 cursor-pointer transition-all duration-200 ease-linear'>
                <FaFacebookSquare className='inline-block text-lg text-white align-middle mb-1'/>
                <span className='ml-2.5 font-bold text-xs md:-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on facebook</span>
              </span>
              <span className='px-3 whitespace-nowrap inline-block bg-[#5db2ef] hover:bg-[rgba(94,178,239,.9)] w-auto text-center text-white rounded mr-1.5 mb-1.5
              h-10 leading-10 sm:col-span-2 cursor-pointer transition-all duration-200 ease-linear'>
                <FaTwitter className='inline-block text-lg text-white align-middle'/>
                <span className='ml-2.5 font-bold text-xs md:text-[13px] hidden md:hidden xl:inline-block sm:inline-block'>Share on twitter</span>
              </span>
              <span className='h-10 col-span-1 leading-10 whitespace-nowrap inline-block px-2.5 rounded text-center text-white bg-[#eb4d3f] mr-1.5 mb-1.5
              cursor-pointer hover:bg-[rgba(235,77,63,.9)] transition-all duration-200 ease-linear'>
                <FaEnvelope className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
              <span className='h-10 col-span-1 leading-10 whitespace-nowrap inline-block px-2.5 rounded text-center text-white bg-[#bdbdbd] mr-1.5 mb-1.5 cursor-pointer
              hover:bg-[rgba(189,189,189,.9)] transition-all duration-200 ease-linear'>
                <FaShare className='inline-block text-lg text-white align-middle mb-1'/>
              </span>
            </div>
          </div>

          {/* post text start here */}
          <div className={`${textSize} tracking-wide text-[#444444]`}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit ducimus eligendi quo alias, sit, labore minus expedita possimus temporibus quaerat, esse rem iusto voluptates tenetur debitis? Quisquam culpa libero fuga. Ipsum dolor sit amet consectetur adipisicing elit. Fugit ducimus eligendi quo alias, sit, labore eligendi quo alias, sit, labore.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque saepe architecto, nulla eum odit autem tempora officiis commodi aliquid, recusandae expedita atque deleniti magni aperiam nobis at non adipisci eligendi.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur tempora nesciunt illo, quibusdam beatae veritatis vero nam ex, possimus harum recusandae numquam eius quod sed, laborum nulla vitae aut minima!
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem ipsa quibusdam sed reprehenderit! Quae quam, eum ea minus laborum impedit? Voluptatem, tempora. Dolorum ratione, tempora quod ipsam fugiat deleniti doloremque?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dignissimos explicabo maxime debitis? Blanditiis, debitis vel esse, tenetur cum magni temporibus consectetur laboriosam beatae quasi architecto consequatur culpa? Deserunt, modi! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Debitis est ea ipsam tempora illo iure nemo temporibus adipisci quibusdam aperiam nam doloremque ab a, dolorem laborum? Unde minima ipsam aspernatur.
            </p>

              {/* BlockQuote post points here */}
            <div className='lg:mt-12 lg:mb-14'>
              <div className='relative max-w-[38rem] pt-4 pb-5 text-center mx-auto before:absolute before:top-0 before:inset-x-0 before:w-16 before:mx-auto before:inline-block before:h-0.5 before:bg-[#e0e0e0] after:absolute after:bottom-0 after:inset-x-0 after:w-16 after:mx-auto after:inline-block after:h-0.5 after:bg-[#e0e0e0] 
              font-lora text-lg lg:text-[22px] leading-8 text-[#7a7a7a] cursor-pointer'>
                The truth is you don't know what is going to happen tomorrow. Life is a crazy ride, and nothing is guaranteed.
              </div> 
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius odit quis saepe ab iure asperiores, eos et vero iusto quibusdam est atque ad, eum sit similique veritatis itaque voluptatem aperiam. vero iusto quibusdam est atque ad, eum sit similique veritatis itaque 
            </p>
          </div>

          {/* sub section one start here */}

          <section className='pt-6'>
            <h3 className='lg:text-2xl text-xl font-lora font-normal text-[#212121] mb-5'>
              <b>
                Exercise Keeps the Brain Young: Study
              </b>
            </h3>
            <div className='w-full h-auto mb-4'>
              <img loading='lazy' src={Posts[8].image} alt="postimage2" className='max-h-[480px] w-full object-cover cursor-pointer'/>
            </div>

            <div className={`${textSize} tracking-wide`}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas cupiditate itaque obcaecati numquam minima, atque iusto quia ullam nam magni neque, id hic corrupti harum sapiente, sunt blanditiis laborum aspernatur? 
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magni nostrum tempore similique nulla molestiae ducimus obcaecati ipsam reiciendis, itaque minima hic dolor omnis accusantium corrupti doloremque laudantium? Voluptatem, accusamus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio facilis veniam rerum eaque magni illum tempore, laudantium aut ea cum odio. Eaque quo, itaque sit soluta illo quisquam odio quia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi dolores, harum atque ipsam placeat magni totam quos! Accusantium quo quibusdam assumenda consequuntur recusandae id maxime? Architecto blanditiis delectus soluta.
              </p>
            </div>
          </section>

          {/* sub section two start here */}

          <section className='py-6'>
            <h3 className='lg:text-2xl text-xl font-lora font-normal text-[#212121] mb-5'>
              <b>
                The most advanced Blog & News WordPress Theme
              </b>
            </h3>        
                          
            <div className={`${textSize} tracking-wide clear-both`}>
              <img loading='lazy' src={Posts[9].image} alt="postimage2" className='h-auto max-w-full sm:max-w-[40%] sm:h-[500px] object-cover cursor-pointer sm:mt-1.5 sm:mb-5 sm:mr-5 sm:ml-0 sm:float-left'/>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas cupiditate itaque obcaecati numquam minima, atque iusto quia ullam nam magni neque, id hic corrupti harum sapiente, sunt blanditiis laborum aspernatur? 
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis magni nostrum tempore similique nulla molestiae ducimus obcaecati ipsam reiciendis, itaque minima hic dolor omnis accusantium corrupti doloremque laudantium? Voluptatem, accusamus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio facilis veniam rerum eaque magni illum tempore, laudantium aut ea cum odio. Eaque quo, itaque sit soluta illo quisquam odio quia! 
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi dolores, harum atque ipsam placeat magni totam quos! Accusantium quo quibusdam assumenda consequuntur recusandae id maxime? Architecto blanditiis delectus soluta.
              </p>
              <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi dolores, harum atque ipsam placeat magni totam quos! Accusantium quo quibusdam assumenda consequuntur recusandae id maxime? Architecto blanditiis delectus soluta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quasi dolores, harum atque ipsam placeat magni totam quos! Accusantium quo quibusdam assumenda consequuntur recusandae id maxime? Architecto blanditiis delectus soluta.
              </p>
            </div>
          </section>

          <span className='inline-block lg:py-5 mb-3 lg:text-sm text-xs'>
            <b className='mr-1.5 text-[#444444]'>Tags:</b>
            {Posts[12].tag.map((tag,index) => {
              return (
                <span key={index} className="text-[#616161] bg-[#f5f5f5] inline-block py-0.5 px-2.5 hover:bg-[#f70d28]
                hover:text-white mb-1.5 mr-[3px] tracking-wider transition-all duration-300 ease-linear cursor-pointer">{tag}</span>
              )
            })}
          </span>

          <div className='border-y border-solid border-[#eee] mb-[30px] py-5 mt-3 text-center sm:text-left grid grid-cols-2'>
            <span className='group'>
              <span className='text-[#a0a0a0] font-bold'>
                Previous Post
              </span>
              <h3 className='border-l-[10px] border-solid border-[#eee] mt-2.5 mb-2.5 pl-3 text-[#212121]
              font-bold transition-all duration-200 ease-linear group-hover:border-[#f70d28] cursor-pointer
              hidden sm:block'>
                Sony shares a list of 39 titles that will be optimized for the PS4 Pro at launch
              </h3>
            </span>

            <span className='group'>
              <span className='text-[#a0a0a0] font-bold'>
                Next Post
              </span>
              <h3 className='border-l-[10px] border-solid border-[#eee] mt-2.5 mb-2.5 pl-3 text-[#212121]
              font-bold transition-all duration-200 ease-linear group-hover:border-[#f70d28] cursor-pointer
              hidden sm:block'>
                5 Fashion stories from around the web you might have missed this week
              </h3>
            </span>
          </div>

          <section className='lg:grid-cols-6 lg:grid p-7 mb-7 border border-solid border-[#eee] text-center sm:text-left'>
            <span className='w-[80px] h-20 inline-block rounded-full align-bottom mr-2 col-span-1'>
              <img loading='lazy' src={Posts[10].image} alt="AdminImage" className='h-full w-full object-cover rounded-full cursor-pointer'/>
            </span>
            <div className='col-span-5'>
              <h3 className='mb-2.5 text-lg font-bold'>
                <span className='text-[#f70d28] cursor-pointer'>John Doe</span>
              </h3>
              <p className='text-[#a0a0a0] text-[15px] leading-5'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam ex consequuntur quod molestias nulla repellendus.
              </p>

              <ul className='m-0 pt-4'>
                {
                  SocialMediaIcons.map((icon) => {
                    return (
                      <li key={icon.id} className="inline-block mr-2.5 mt-2.5 mb-5 text-[#999] text-base transition-all duration-200 ease-linear cursor-pointer hover:text-[#212121]">{icon.icon}</li>
                    )
                  })
                }
              </ul>
            </div>
          </section>
        </article>

        <div className= "mb-5">
          <PagesDivider text={"Similar News"} />
        </div>

        <ul className="mb-2 pt-1.5 min-w-[200px] md:grid md:grid-cols-3">
        {/* featured posts other post start here */}
        {Posts.slice(0,6).map((post) => {
          return (
            <li key={post.id} className="md:mr-[6%] mb-7 last:mb-0 md:mb-0">

              <div className="basis-1/6 md:basis-1/3 mb-1 min-w-[90px] relative">
                <img src={post.image} alt={"posts"} className="w-full h-44 imgxs:h-[240px] md:h-36 lg:h-44 object-cover cursor-pointer" loading="lazy"/>
                <CategoriesComponentBotton cat={post.cat} />
              </div>

              <div className="basis-5/6 md:basis-2/3 pt-1">
                {size.width > 768 ? <PostTitleSmall post={post.title} /> : <PostTitleMedium post={post.title}/>}
                <TimeComponentColor time={post.date}/>
              </div>
            </li>
          )
          })}
        </ul>

          {/* comments section start here */}
          
        <section className='pt-8 pb-4'>
          <span>
            <h4 className='capitalize font-bold text-[27px] leading-8 inline-block align-bottom font-lora'>Comments</h4>
            <span className='inline-block px-3 bg-[#999] mx-4 text-white rounded-md'>{0}</span>
          </span>

          {/* comments */}

          <div className='h-[3px] w-full bg-gray-200/50 mt-12 mb-4'></div>

          {/* Form section start here */}

          <strong className='text-2xl inline-block mb-2 font-lora'>Leave a Reply</strong>
          <p className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 text-sm'>Your email address will not be published. Required fields are marked</p>

          <form className='py-4 text-[#444444]'>
            <label htmlFor="comment" className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 font-semibold text-sm'>Comment</label>
            <textarea name="comment" id="comment" cols="30" rows="7"></textarea>
            <label htmlFor="name" className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 font-semibold text-sm'>Name</label>
            <input type="text" id='name' name='name' />
            <span className='grid grid-cols-2 gap-x-4'>
              <span>
                <label htmlFor="email" className='after:content-["*"] after:ml-1 after:text-lg after:text-red-500 font-semibold text-sm'>Email</label>
                <input type="email" name="email" id="email" />
              </span>
              <span>
                <label htmlFor="website" className='after:ml-1 after:text-lg after:text-red-500 font-semibold text-sm'>
                Website</label>
                <input type="text" id='website' name='website'/>
              </span>
            </span>
            <span className='grid grid-cols-12 lg:inline-block'>
              <input type="checkbox" name="save-data" id="save-data" className='outline-0 focus:outline-0 focus:ring-0 align-middle h-3 w-3 rounded-sm mt-2 sm:mt-1.5 lg:mt-px col-span-1'/>
              <small className="inline-block mx-2 mb-3 font-semibold col-span-11">Save my name, email and website in this browser for the next time i comment.</small>
            </span>
            <br />
            <input type="submit" value="Post Comment" className='uppercase lg:mt-6 block md:w-auto md:inline-block text-xs font-bold tracking-wider pt-[13.2px] pb-[11.1px] px-6 text-white bg-[#f70d28]'/>
          </form>
          
        </section>
      </div>

      <aside className='col-span-1 lg:ml-[4%] mt-4'>
        <StickyBox offsetTop={0} offsetBottom={0}>
          <Aside />
        </StickyBox>
      </aside>
    </article>
  )
}

export default SinglePost
