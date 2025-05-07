import React from 'react'
import NavBarAdmin from './NavBarAdmin'
import { Outlet } from 'react-router'
import FooterAdmin from './FooterAdmin'


const AdminLayout = () => {
    return (
        <div>
            <NavBarAdmin />
            <Outlet />
            <FooterAdmin />
        </div>
    )
}

export default AdminLayout