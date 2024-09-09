import React from 'react';

import linkf from './assets/link.svg'

import facebook from './assets/face.svg'
import mio from './assets/mio.jpg'

const Presentacion = ({ setBackgroundColor, darkMode  }) => (
  
<>

<div className='flex align-top'>
  <div className='flex gap-6'>
  <img src={mio} alt="Descripción de la imagen" className="object-contain h-16 border-radius-custom flex-shrink-0" />
  <button onClick={() => setBackgroundColor(darkMode ? '#ffffff' : '#000000')}>

  {darkMode ? (
            <span className="material-symbols-outlined">
            mode_night
            </span>
          ) : (
            <span className="material-symbols-outlined">
routine
</span>
          )}
  
      </button>
 
  </div>
  </div>
    <h1 className="text-5xl  font-extrabold  text-left mt-5 mb-5">
    <span className=" text-5xl font-extrabold color-header">Juan</span> <br/>  
    <span className="text-4xl font-extrabold color-header ">de la cruz</span>  
    <span className="text-4xl font-extrabold color-header pl-2">huamani</span>
  </h1>
  <h2 className='text-2xl color-header font-bold '>Full Stack Developer</h2>
  
  
    <p className='mt-4 text-2xl color-header text-start' >
    Soy un desarrollador web Full Stack apasionado por la tecnología y con experiencia en varios lenguajes de programación
    </p>
    <nav className=' flex float-start pl-30 mt-5' >
                  <ul >
                      <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>About</span></a></li>
                      <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>Experience</span></a></li>
                      <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>My expertis</span></a></li>
                      <li><a href=""><span className="border-b-4  border-gray-500 pl-9  first-of-type"></span><span className='text-2xl color-header'>Project</span></a></li>
              
  
                  </ul>
  
              </nav>
   
    <div className='flex flex-block'>
    <ul className="flex flex-wrap justify-start items-center gap-3 mt-10">
      <li>
        <a href="https://www.linkedin.com/in/juan-de-la-cruz-huamani-b50649186/" target='-blanck'>
          <img src={linkf} alt="Descripción de la imagen" className="object-contain h-10 rounded" />
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/juandelacruz.ncy?locale=es_LA" target='-blanck'>
          <img src={facebook} alt="Descripción de la imagen" className="object-contain h-10 rounded" />
        </a>
      </li>
      <li>
        <a href="https://drive.google.com/file/d/1gvwX0cVSg4HZ5VuRqDBuXV8j3Vz15sQs/view?usp=sharing" target="_blank">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Descargar CV
          </button>
        </a>
      </li>
    </ul>
  </div>
  </>
  
);

export default Presentacion;


















