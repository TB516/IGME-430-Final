import { useState } from "react";
import { SubmitCallback } from "../../Pages/AccountPortal";

const Login = ({submitCallback}: { submitCallback: SubmitCallback }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <form onSubmit={(e) => {
        e.preventDefault();

        submitCallback(username, password);
    }}>
        <label>
            Username: <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
        </label>
        <label>
            Password: <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        </label>
        
        <input type="submit" value="Login"></input>
    </form>
}

export default Login;
