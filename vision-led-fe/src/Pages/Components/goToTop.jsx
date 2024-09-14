import React, { useEffect, useState } from 'react'
import {FaArrowUp} from "react-icons/fa"

export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const goToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    const listenToScroll = () => {
        let heightToHidden = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > heightToHidden) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
    }, [])

    return (
        <>
            {(isVisible === true) ? <div className="top-btn" onClick={goToTop}><FaArrowUp className='top-btn--icon' /></div> : ""}
        </>
    )
}
