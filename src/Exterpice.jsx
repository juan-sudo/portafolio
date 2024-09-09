import React from 'react';
import delopment from './assets/deveploment.svg' 
import java from './assets/java.svg' 
import react from './assets/ireact.svg' 
import bd from './assets/bd.svg' 
import angular from './assets/angular.svg'
import posgres from './assets/postgre12.svg'
import mongo from './assets/mongo.svg'
import python from './assets/python.svg'

const Expertice = () => (
  
  <article >
    <div className='mt-4 flex justify-between '>
      <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center text-left'>
    <img src={java} alt="" className='h-10 mr-2' /> 
    <span>Software development</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Experiencia de 3 años usando la tecnología Postgres, Oracle, MongoDB
    </div>
  </div>
</div>

</div>
 <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center'>
    <img src={mongo} alt="" className='h-10 mr-2' /> 
    <span>Software development</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Experiencia de 3 años usando la tecnología Postgres, Oracle, MongoDB
    </div>
  </div>
</div>

</div>
 <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center'>
    <img src={react} alt="" className='h-10 mr-2' /> 
    <span>Desarrollador React</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Desarrollador React con experiencia en la creación de interfaces dinámicas y eficientes, así como en el manejo efectivo de múltiples componentes.
    </div>
  </div>
</div>

</div>
 
    </div>

    <div className='mt-4 flex justify-between '>
      <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center text-left'>
    <img src={angular} alt="" className='h-10 mr-2' /> 
    <span>Desarrollador Angular</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Desarrollador Angular experimentado en el manejo de múltiples componentes y en la creación de interfaces dinámicas y eficientes.
    </div>
  </div>
</div>

</div>
 <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center'>
    <img src={posgres} alt="" className='h-10 mr-2' /> 
    <span>Software development</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Experiencia de 3 años usando la tecnología Postgres, Oracle, MongoDB
    </div>
  </div>
</div>

</div>
 <div className="w-full sm:w-1/3 p-4 border border-gray-300 rounded-lg relative">
  <h3 className='text-2xl color-header font-bold flex items-center'>
    <img src={python} alt="" className='h-10 mr-2' /> 
    <span>Software development</span>
  </h3>

  <div className='flex justify-center mt-5'>
  <div className="border-l-4 border-gray-400 w-4/5 ">
    <div className="before absolute top-0 left-0 w-full h-px bg-gray-400"></div>

    
    <div className="pl-4">
      Experiencia de 3 años usando la tecnología Postgres, Oracle, MongoDB
    </div>
  </div>
</div>

</div>
 
    </div>
  
  


    
   
  </article>
  );
  
  export default Expertice;
  




