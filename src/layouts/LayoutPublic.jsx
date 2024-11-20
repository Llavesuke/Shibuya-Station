import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

function LayoutPublic() {
    return (
        <>
            <Navbar/> 
            <main>
                <Outlet /> {/* Elemento que muestra el conttenido variable enrutado*/}
            </main>

            {/* <Footer/> */}
        
        </>
    );
}

export default LayoutPublic;
