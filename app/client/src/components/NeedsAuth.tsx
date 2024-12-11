import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const NeedsAuth = ({ child }: { child: React.JSX.Element}) => {
    const auth = Cookies.get('sessionCookie') !== undefined ? true : false;    

    return auth ? child : <Navigate to={'/login'}></Navigate>;
}

export default NeedsAuth;
