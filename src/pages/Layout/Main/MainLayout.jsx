import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from './Footer'



const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <div className="content" style={{ paddingTop: '101px', paddingBottom: '99px' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout