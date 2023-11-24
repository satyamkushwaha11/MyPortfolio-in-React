import React from 'react'
import './contact.css'
import SimpleBtn from '../../buttons/SimpleBtn/SimpleBtn'
import { ImLocation } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'


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
                        <div className='flex flex-col gap-6 mb-5'>
                            <div className='flex gap-4'>

                                <div className='icon-contact-me text-[#f75023] bg-[#fedfd7]'>
                                    <ImLocation size={32} />
                                </div>
                                <div className='flex flex-col gap-3 py-1'>
                                    <h5 className='text-[30px] font-semibold'>Address</h5>
                                    <div className='text-[#6f6b80]'>
                                        Noida,India
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-4'>

                                <div className='icon-contact-me text-[#1cbe59] bg-[#ddf5e6]'>
                                    <MdEmail size={32} />
                                </div>
                                <div className='flex flex-col gap-3 py-1'>
                                    <h5 className='text-[30px] font-semibold'>Email</h5>
                                    <div className='text-[#6f6b80]'>
                                        satyamkushwaha1101@gmail.com
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-4'>
                                <div className='icon-contact-me text-[#8067f0] bg-[#ece8fd]'>
                                    <FaPhoneAlt size={27} />
                                </div>
                                <div className='flex flex-col gap-3 py-1'>
                                    <h5 className='text-[30px] font-semibold'>Phone</h5>
                                    <div className='text-[#6f6b80]'>
                                        +91-9625110686
                                    </div>
                                </div>

                            </div>
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