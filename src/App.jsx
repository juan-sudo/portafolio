
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Secciones  from './Secciones'

import React, { useState } from 'react';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#fffff');
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <>
    <div style={{ backgroundColor: backgroundColor }} className='className="bg-gray-100 h-screen w-screen flex flex-col justify-center items-center'>
    
      <Secciones
     
      setBackgroundColor={setBackgroundColor}
      darkMode={darkMode}
      />
    </div>
      

      

      

    </>
  )
}

export default App
