import React, { useState, useEffect } from 'react';
import Presentacion from './Presentacion'; 
import Scrollers from './Scrollers';

const Secciones = ({ setBackgroundColor, darkMode }) => {
  

  return (
    <section className="container mx-auto text-center">
      <article>
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-2/5 p-4 flex flex-col items-left text-start justify-center">
            <Presentacion setBackgroundColor={setBackgroundColor} darkMode={darkMode}/>
          </div>
          <div id="scrollers-section" className="w-full lg:w-3/5 p-4 relative flex flex-col items-center justify-center">
            <Scrollers/>
           
          </div>
        </div>
      </article>
    </section>
  );
};

export default Secciones;
