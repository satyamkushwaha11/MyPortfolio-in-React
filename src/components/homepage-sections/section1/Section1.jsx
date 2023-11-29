import React from 'react'
import UpdownIcon from '../../logo/UpdownIcon/UpdownIcon'
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn'
import './section1.css'
import SocialMedia from '../../social media/SocialMedia'

const Section1 = () => {
    return (
        <div className='section_1  '>
            <div className='section_1_background_img'>
            </div>
            <div className="container lg:h-[100vh]S ">
                <div className='section1_content'>
                    <div className='my-info px-2 pb-5 text-center lg:text-left lg:w-1/2  text-[var(--reverse-color)]'>
                        <div className='text-[3rem] font-semibold text-[var(--orange)]'>
                            Hello, I'm
                        </div>
                        <h3 className='text-[3rem] lg:text-[4rem] font-bold leading-[3.3rem]  mt-5 mb-[2rem]'>
                            Satyam Kushwaha
                        </h3>
                        <div className='text-[1.5rem] mt-3 mb-4 '>
                            A <span className='text-[#1cbe59]'>   Full Stack Web Developer  </span>  From<span className='text-[var(--orange)]'>  India</span>.
                        </div>
                        <p className='text-[1rem]   mb-5'>
                            I'm a talented full-stack web developer from India, merging creative design with powerful functionality. Passionate about crafting seamless user experiences and building robust digital solutions.
                        </p>
                        <div className='flex flex-col lg:flex-row gap-5 mt-[2rem] items-center'>
                            <SimpleBtn fill={true}>About Me</SimpleBtn>

                            <SocialMedia />
                        </div>
                    </div>
                    <div className='my-img-container  lg:w-1/2 flex items-center h-full  justify-end'>


                        <div className='relative'>
                            <UpdownIcon classNamee='floating-element top-[50px] left-[80px] ' imageUrl={'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png'} />
                            <UpdownIcon classNamee='floating-element top-[110px] right-[50px] ' imageUrl={'https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png'} />

                            <UpdownIcon classNamee='floating-element top-[250px] left-[30px] ' imageUrl={'https://www.rlogical.com/wp-content/uploads/2023/03/Rlogical-Blog-Images-thumbnail-1.webp'} />
                            <UpdownIcon classNamee='floating-element bottom-[190px] right-[50px] ' imageUrl={'https://repository-images.githubusercontent.com/410214337/070f2aba-d9d6-4699-b887-9a0f29015b1b'} />
                            <UpdownIcon classNamee='floating-element bottom-[110px] left-[210px] ' imageUrl={'https://camo.githubusercontent.com/f85f882cb31eeaeee657ec955313015c30378e8f56c3dc2f06933b617a276cfd/68747470733a2f2f77372e706e6777696e672e636f6d2f706e67732f3734372f3739382f706e672d7472616e73706172656e742d6d7973716c2d6c6f676f2d6d7973716c2d64617461626173652d7765622d646576656c6f706d656e742d636f6d70757465722d736f6674776172652d646f6c7068696e2d6d6172696e652d6d616d6d616c2d616e696d616c732d746578742d7468756d626e61696c2e706e67'} />



                            <img src="/images/satyam1.png" alt="" className='mt-[100px]s lg:mt-[150px]s lg:mr-[0px] w-[580px]' />
                        </div>


                    </div>

                </div>
               
                <div class="animate-bouncess dizme_tm_down hidden lg:flex justify-center text-[var(--reverse-color)] ">
                    <a class="anchor" href="#process">
                        <svg
                            width="26px"
                            height="100%"
                            viewBox="0 0 247 390"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            style={{
                                fillRule: 'evenodd',
                                clipRule: 'evenodd',
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: '1.5',
                            }}
                        >
                            <path
                                id="wheel"
                                d="M123.359,79.775l0,72.843"
                                style={{
                                    fill: 'none',
                                    strokeWidth: '20px',
                                }}
                            />
                            <path
                                id="mouse"
                                d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                                style={{
                                    fill: 'none',
                                    strokeWidth: '20px',
                                }}
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Section1