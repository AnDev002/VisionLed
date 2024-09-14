import React from 'react'
import ProductDetailsHeader from './Components/ProductDetailsHeader/productDetailsHeader'
import ProductDetailsContent from './Components/ProductDetailsContent/productDetailsContent'
import ProductDetailsFooter from './Components/ProductDetailsFooter/productDetailsFooter'
// import 'react-sticky-header/styles.css';
// import StickyHeader from 'ReactStickyHeader'
export default function ProductDetails() {
  return (
    <>
      <ProductDetailsHeader/>
      <ProductDetailsContent/>
      <ProductDetailsFooter/>
    </>
  )
}