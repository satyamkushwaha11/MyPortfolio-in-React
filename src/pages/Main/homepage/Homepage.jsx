import React from 'react'
import './homepage.css'
import Section1 from '../../../components/homepage-sections/section1/Section1'
import Section2 from '../../../components/homepage-sections/section2/Section2'
import AboutUs from '../../../components/homepage-sections/aboutUs/AboutUs'
import ContactMe from '../../../components/homepage-sections/contactMe/ContactMe'
import Section3 from '../../../components/homepage-sections/section3/Section3'
import Section4 from '../../../components/homepage-sections/section4/Section4'

const Homepage = () => {
    return (

        <div className='homepage-container   ' >
            <Section1 />
            <div className='theme-bg'>
                <Section2 />
                <Section3 />
                <Section4 />
                {/* <AboutUs /> */}
                <ContactMe />
            </div>
        </div>
    )
}

export default Homepage