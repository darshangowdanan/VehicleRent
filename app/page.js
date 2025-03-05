'use client';
import React from 'react';
import { Navbar } from '../app/components/Navbar/page'; 
import { Main} from '../app/components/Main/page';
import Mainv from './components/Mainv/page';
import HowDoesItWork from './components/HowDoesItWork/page';
import Footer from './components/Footer/page';
import AboutUs from './components/AboutUs/page';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Main className="w-100vw h-100vh"/>
      <HowDoesItWork/>
      <Mainv/>
      <AboutUs/>
      <Footer/>
    </div>
  );
}
