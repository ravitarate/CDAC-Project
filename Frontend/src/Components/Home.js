import React from 'react'
import Slide1 from './Slide1'
import Slide2 from './Slide2'
import Section1 from './Section1'
import Section2 from './Section2'
import Footer from './Footer'
import Navbar from './Navbar'

function Home() {
  return (
    <div>
      <Navbar/>
      <Slide1/>
      <Slide2/>
      <Section2/>
      <Footer/>
    </div>
  )
}

export default Home
