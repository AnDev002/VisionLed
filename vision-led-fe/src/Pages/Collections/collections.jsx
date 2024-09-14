import React from 'react'
import CollectionsHeader from './Components/CollectionsHeader/collectionsHeader'
import CollectionsContent from './Components/CollectionsContent/collectionsContent'
import './Components/collections.css'

export default function Collections() {
    return (
        <>
            <CollectionsHeader />
            <CollectionsContent />
        </>
    )
}