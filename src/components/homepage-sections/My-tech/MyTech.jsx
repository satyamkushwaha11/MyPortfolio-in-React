import React from 'react'
import { FaStar } from "react-icons/fa";


const colors=['#7F96FF','#e76f51','#00b4d8','#386641','#fca311',"#00509d","#9d4edd","#fe01e6","#580aff"]

const MyTechStackList = [
    {
        label: "Languages",
        data: [
            {
                name: 'Javascript',
                description: "JavaScript is a scripting language that enables you to create dynamically updating content.",
                image: 'js.png',
                rating: '4'
            },
            {
                name: 'Typescript',
                description: "TypeScript is a strongly typed programming language that builds on JavaScript. ",
                image: 'typescript.png',
                rating: '4'
            },
            {
                name: 'Python',
                description: "An interpreted, object-oriented, high-level programming language with dynamic semantics.",
                image: 'python.png',
                rating: '3'
            },
            {
                name: 'C++',
                description: "C++ is a versatile, object-oriented programming language with features like polymorphism and templates for efficient development.",
                image: 'c++.png',
                rating: '4'
            },
            {
                name: 'C',
                description: "C is a powerful, low-level programming language known for efficiency and close hardware interaction.",
                image: 'c.png',
                rating: '3'
            },

        ]
    },
    {
        label: "Frontend",
        data: [
            {
                name: 'HTML',
                description: "HTML is the standard markup language for documents designed to be displayed in a browser",
                image: 'html-5.png',
                rating: '5'
            },
            {
                name: 'CSS',
                description: "CSS is use for  styling the html code.",
                image: 'css.png',
                rating: '4'
            },
            {
                name: 'Reactjs',
                description: "JavaScript library for building user interfaces based on UI components",
                image: 'react.png',
                rating: '5'
            },
            {
                name: 'React-Native',
                description: "JavaScript Framework for building Hybrid App",
                image: 'reactNative.png',
                rating: '3'
            },
            {
                name: 'Nextjs',
                description: "A React framework that gives you building blocks to create web applications.",
                image: 'nextjs.png',
                rating: '4'
            },
            {
                name: 'Material UI',
                description: "An open-source project that features React components that implement Google's Material Design",
                image: 'materialUI.png',
                rating: '4'
            },
            {
                name: 'Bootstrap',
                description: "Most popular CSS Framework for developing responsive and mobile-first websites",
                image: 'boostrap.png',
                rating: '4'
            },
            {
                name: 'Redux',
                description: "An open-source JavaScript library for managing and centralizing application state",
                image: 'redux.png',
                rating: '4'
            },

        ]
    },
    {
        label: "Backend",
        data: [
            {
                name: 'Nodejs',
                description: "cross-platform, back-end JavaScript runtime environment that runs on a JavaScript Engine",
                image: 'nodejs.png',
                rating: '5'
            },
            {
                name: 'Express Js',
                description: "A back-end web application framework for building RESTful APIs with Node.js",
                image: 'expressjs.jpeg',
                rating: '4'
            },
            {
                name: 'MongoDB',
                description: "MongoDB is a document-oriented NoSQL database, uses JSON-like documents with optional schemas.",
                image: 'mongoDb.png',
                rating: '5'
            },
            {
                name: 'MySql',
                description: "MySql is a  NoSQL database.",
                image: 'mysql.png',
                rating: '4'
            },
            {
                name: 'PgSQL',
                description: "PgSQL is a  NoSQL database.",
                image: 'pgsql.png',
                rating: '3'
            },

        ]
    },
    {
        label: "Other",
        data: [
            {
                name: 'Git & Github',
                description: "Worked with Github, Bitbucket, & Gitlab",
                image: 'github.png',
                rating: '4'
            },
            {
                name: 'AWS',
                description: "Worked with Aws functionalities like EC2,Serverless,DynamoDB etc.                ",
                image: 'aws.png',
                rating: '3'
            },
            {
                name: 'IDE',
                description: "Using VS Code",
                image: 'vscode.png',
                rating: '4'
            },
            {
                name: 'Productivity Tools',
                description: " Worked with Jira, Trello, & Asana",
                image: 'tools.png',
                rating: '3'
            },

        ]
    },


]





const MyTech = () => {
    return (
        <div className='my-[5rem] lg:my-[5rem]'>
            <div className='container '>
                <div className='flex'>
                    <div className='text-center mb-[3rem] px-4 mx-auto'>
                        <div className='color-orange text-[20px] font-bold mb-2'>
                            Expertises
                        </div>
                        <div className='text-[2.5rem] mb-3 font-bold'>
                            My Tech-Stack
                        </div>
                        <p className='w-full  lg:w-3/4 mx-auto text-gray-400'>
                            Most common methods for designing & developing websites that work well on desktop is responsive and adaptive design
                        </p>
                    </div>
                </div>


                {
                    MyTechStackList.map(item => (
                        <div className='mb-[25px] px-5 md:px-0'>
                            <h1 className='text-[25px] font-bold my-2'>
                                {/* <span className='text-[var(--orange)]'>
                                    {'>>> '}
                                    
                                </span> */}
                                <span className=''>
                                    <span>
                                        {item?.label}
                                    </span>
                                    <div className=' w-[12%] mt-1 mb-2 h-[5px] bg-[var(--orange)]'>
                                    </div>
                                </span>
                            </h1>
                            <div className='grid grid-cols-2  md:grid-cols-3  gap-x-8 gap-y-8 pt-3 pb-5'>

                                {
                                    item?.data.map(tech => {
                                        const starColor=colors[Math.floor(Math.random() * colors.length)]
                                        return (
                                            <div className='flex gap-4 w-full '>
                                                <div className='w-1/3 h-[120px]  '>
                                                    <img src={  `/icons/tech/${tech?.image}`} alt="no Images" className='rounded-sm  w-full h-full  text-[red] ' />
                                                </div>
                                                <div className=' w-2/3 flex flex-col justify-between ps-1'>
                                                    <div className='w-full'>
                                                        <span>
                                                            {tech?.name}
                                                        </span>
                                                        <p className='text-[11px] w-[70%]'>{tech?.description}</p>
                                                    </div>
                                                    <div className={`flex gap-2 w-full `} style={{color:starColor}}>
                                                        {Array.from({ length: tech?.rating }, (_, index) => index + 1).map(item => (<FaStar size={18} />
                                                        ))}
                                                        {Array.from({ length: (5-tech?.rating) }, (_, index) => index + 1).map(item => (<FaStar className='text-[#e7dcdc47] ' size={18} />
                                                        ))}
                                                    </div>
                                                   
                                                </div>

                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default MyTech
