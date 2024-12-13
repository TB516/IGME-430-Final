import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const AuthBlocker = ({ child }: { child: React.JSX.Element}) => {
    const auth = Cookies.get('sessionCookie') === undefined ? true : false;    

    return auth ? child : <Navigate to={'/'}></Navigate>;
}

export default AuthBlocker;
