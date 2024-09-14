import React, { useState } from 'react'
import ProductsHeader from './Components/ProductsHeader/productsHeader'
import ProductsContent from './Components/ProductsContent/productsContent'
import ProductsFooter from './Components/ProductsFooter/productsFooter'
import "./products.css"
export default function Products() {
    return (
        <>
            <ProductsHeader />
            <ProductsContent />
            <ProductsFooter />
        </>
    )
}