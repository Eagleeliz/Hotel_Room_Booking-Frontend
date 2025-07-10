import React from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Footer from '../components/Footer'
import HomeHero from '../Hero/HomeHero'
export const Home: React.FC = () => {
  return (
    <>
    <Container className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col gap-6">
        <Navbar />
           </Container>
           <HomeHero/>
           <Footer/>
    </>
  )
}