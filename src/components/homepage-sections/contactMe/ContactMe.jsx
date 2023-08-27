import React from 'react'
import './contact.css'
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn'
const ContactMe = () => {
    return (
        <div className='contact-me-container '>
            <div className='container'>

                <div className='text-center mb-[4rem] px-4'>
                    <div className='color-orange text-[20px] font-bold mb-2'>
                        Contact Me
                    </div>
                    <div className='text-[2.5rem] mb-3 font-bold'>
                        I Want To Hear From You
                    </div>
                    <p className='w-full  lg:w-2/4 mx-auto text-gray-400'>
                        Please fill out the form on this section to contact with me. Or call between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday
                    </p>
                </div>

                <div className='lg:flex px-5 lg:px-0 '>
                    <div className='w-full lg:w-1/2'>
                        <div>
                            <div>Location</div>
                            <div>Email</div>
                            <div>Phone Number</div>
                            <div>Instagram</div>
                            <div>Linkedin</div>
                            <div>Github</div>
                            <div>Facebook</div>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 '>
                        <form >

                            <div className='flex justify-between pb-5 '>
                                <div className='flex flex-col w-[48%]'>
                                    {/* <label for="name" >Name</label> */}
                                    <input type="text" className='rounded-lg  input-contact-me py-5 px-2' id='name' placeholder='Name' />
                                </div>
                                <div className='flex flex-col w-[48%]'>
                                    {/* <label for="name">Email</label> */}
                                    <input type="email" className='rounded-lg  input-contact-me py-5 px-2   ' id='' placeholder='Email' />
                                </div>
                            </div>
                            <div className='flex justify-between pb-5'>
                                <div className='flex flex-col w-[48%]'>
                                    {/* <label for="name">Your Phone</label> */}
                                    <input type="tel" className='rounded-lg  input-contact-me py-5 px-2' id='' placeholder='Phone Number' />
                                </div>
                                <div className='flex flex-col w-[48%]'>
                                    {/* <label for="name">Subject</label> */}
                                    <input type="text" className='rounded-lg  input-contact-me py-5 px-2' id='' placeholder='Subject' />
                                </div>
                            </div>
                            <div className='w-full'>
                                {/* <label for="name">Message</label> */}
                                <textarea placeholder='Write Your Message Here...' rows="10" cols="30" className='w-full px-3 py-5 rounded-lg  input-contact-me'></textarea>
                            </div>

                            <SimpleBtn fill={true} className='mt-4'>Submit Now</SimpleBtn>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactMe