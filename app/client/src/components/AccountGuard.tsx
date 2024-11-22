import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const AccountGuard = () => {
    const [auth] = useState(true);

    return(
        auth ? <Outlet></Outlet> : <Navigate to={''}></Navigate>
    )
}

export default AccountGuard;