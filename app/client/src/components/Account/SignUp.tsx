import { useState } from "react";
import { SubmitCallback } from "../../Pages/AccountPortal";

const SignUp = ({submitCallback}: { submitCallback: SubmitCallback }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return <form onSubmit={(e) => {
        e.preventDefault();

        submitCallback(username, password, passwordConfirm);
    }}>
        <label className="label">
            Username: <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} className="input"></input>
        </label>
        <label className="label">
            Password: <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="input"></input>
        </label>
        <label className="label">
            Confirm Password: <input type="password" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} className="input"></input>
        </label>
        
        <input type="submit" value="Sign Up" className="input"></input>
    </form>
}

export default SignUp;
