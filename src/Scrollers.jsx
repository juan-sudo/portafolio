import React, { useState, useEffect,useRef  } from 'react';
import java from './assets/java.svg';
import venta from './assets/venta.jpg';
import react from './assets/ireact.svg';
import angular from './assets/angular.svg';
import mongo from './assets/mongo.svg';

const Scrollers = () => {
    const [scrollY, setScrollY] = useState(0);
    const scrollRef = useRef(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const detectarScroll = () => {
        if (scrollRef.current) {
            const scrollTop = scrollRef.current.scrollTop;
            
            const isAtBottom = scrollTop > 100; // 50 es un valor arbitrario, puedes ajustarlo según tus necesidades
            setShowScrollToTop(isAtBottom);
           
            console.log('Scroll detectado:', scrollTop);
            console.log('¿Está en el fondo?', isAtBottom);
        }
    };
    
    useEffect(() => {

       
        detectarScroll();

        // Agregar un listener de scroll al elemento
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', detectarScroll);
        }

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', detectarScroll);
            }
        };
    }, [scrollRef]);

    const scrollToTop = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      };
  return (

    <div ref={scrollRef} className='mb-0 overflow-y-auto altura-scroll' >
       <div className='mx-12 text-left'>
       
        <p className='text-left color-header'>Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an advertising agency, a start-up, a huge corporation, and a digital product studio.

        </p>
        <p className='my-5 color-header '>My main focus these days is building accessible user interfaces for our customers at Klaviyo. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood. In my free time, I've also released an online video course that covers everything you need to know to build a web app with the Spotify API.
        </p>
        <p className='mb-5 color-header'>When I’m not at the computer, I’m usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds
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
    <p>{scrollY}</p>

    



      {/* Rest of your content */}
      <button
        className={`fixed bottom-5 right-5 bg-blue-500 text-white py-2 px-4 rounded mb-20 mr-20 ${
          showScrollToTop ? "visible" : "invisible"
        }`}
        onClick={scrollToTop}
      >
        <span class="material-symbols-outlined">
expand_less
</span>
        
      </button>
    
    </div>
  );
};

export default Scrollers;
