import React from 'react';
import Secciones from './Secciones';
import java from './assets/java.svg';
import venta from './assets/venta.jpg';
import react from './assets/ireact.svg' 
import angular from './assets/angular.svg'
import mongo from './assets/mongo.svg'
const Experience = () => (
    <section className="flex mt-8">

        <div className="w-2/5 text-left "> {/* 80% del ancho */}
            <h2 className='text-2xl color-header font-bold '>Full Stack Developer</h2>
            <p className='text-3xl color-header m-5 ml-0'>I build pixel-perfect, engaging, and accessible digital experiences.</p>

            <nav className=' flex float-start pl-30' >
                <ul >
                    <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>About</span></a></li>
                    <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>Experience</span></a></li>
                    <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>My expertis</span></a></li>
                    <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>Project</span></a></li>

                </ul>

            </nav>
        </div>


        <div className="w-3/5 "> {/* 20% del ancho */}

            <div className='mb-0 overflow-y-auto max-h-80 '>
                <div className='mx-12 text-left'>
                    <p className='text-left'>Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an advertising agency, a start-up, a huge corporation, and a digital product studio.

                    </p>
                    <p className='my-5'>My main focus these days is building accessible user interfaces for our customers at Klaviyo. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood. In my free time, I've also released an online video course that covers everything you need to know to build a web app with the Spotify API.
                    </p>
                    <p className='mb-5'>When I’m not at the computer, I’m usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds
                    </p>

                </div>

                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <h3 className='text-left ml-10 m-5 text-3xl color-header font-bold'>My expertices</h3>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10  text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 flex justify-center'>
                            <img src={java} alt="" className='h-10' />
                        </div>

                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Java developer</span> <i className="fas fa-arrow-right"></i> </a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10  text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 flex justify-center'>
                            <img src={react} alt="" className='h-10' />
                        </div>

                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >React fronend</span> <i className="fas fa-arrow-right"></i> </a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10  text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 flex justify-center'>
                            <img src={angular} alt="" className='h-10' />
                        </div>

                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Java developer</span> <i className="fas fa-arrow-right"></i> </a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10  text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 flex justify-center'>
                            <img src={mongo} alt="" className='h-10' />
                        </div>

                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Java developer</span> <i className="fas fa-arrow-right"></i> </a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <h3 className='text-left ml-10 m-5 text-3xl color-header font-bold'>My proyects</h3>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10  text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 flex justify-center'>
                            <img src={venta} alt="" className='h-12' />
                        </div>

                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Sistema de venta de pasaje turistico</span> <i className="fas fa-arrow-right"></i> </a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>
                <ol>
                    <li className='flex'>
                        <div className='w-1/5 text-center z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2'>
                            2020-2021
                        </div>
                        <div className='w-4/5 text-left'>
                            <a href="" className='text-2xl color-header font-bold'><span >Edsin Cloud E.I.R.L.</span> <span> Acceso libres <i className="fas fa-arrow-right"></i> </span></a>

                            <p className='pt-3 text-ms leading-normal color-header '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius provident expedita commodi, necessitatibus a harum neque et possimus, quo esse eveniet. Iste, omnis nemo repellat ducimus maiores voluptatum illo aliquid?</p>
                            <ul className='mt-2 flex flex-wrap'>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li> <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>
                                <li className='mr-1.5 mt-2'>
                                    <div className='flex items-center rounded-full bg-teal-400/10 px-2 py-1 mx-1 my-0.5 text-xs font-medium leading-5 text-teal-300'>
                                        JavaScript
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>

                </ol>

            </div>
        </div>


    </section>
);

export default Experience;

