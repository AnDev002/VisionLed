import React from "react";
import HomeHeader from './Components/HomeHeader/homeHeader'
import HomeContent from './Components/HomeContent/homeContent'
import './home.css'
import HomeFooter from './Components/HomeFooter/homeFooter'
import GoToTop from "../Components/goToTop";

// import 'react-sticky-header/styles.css';
// import StickyHeader from 'ReactStickyHeader'
export default function Home() {
  return (
    <>
      <GoToTop />
      <HomeHeader />
      <HomeContent />
      <HomeFooter />
    </>
  )
}