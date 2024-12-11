import { useState } from "react";
import Login from "../components/Account/Login";
import SignUp from "../components/Account/SignUp";
import { SERVER_URL } from "../config";
import { useNavigate } from "react-router-dom";

type SubmitCallback = (username: string, password: string, passwordConfirm?: string) => void;

const AccountPortal = () => {
    const [logingIn, setLoginIn] = useState(true);
    const nav = useNavigate();

    const formSubmit: SubmitCallback = async (username, password, passwordConfirm) => {
        const action = logingIn ? 'login' : 'create';
        const body = { username: username, pass: password, pass2: passwordConfirm }
        
        try {
            const request = await fetch(`${SERVER_URL}/accounts/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                credentials: "include",
            });

            if (request.ok) {
                console.log('Cookie should be set now');

                nav('/');
                return;
            }
            throw new Error('Login Failed');
        }
        catch {
            alert('Invalid Username or Password!');
        }
    };

    return <>
        <h1>IGME 430 Final</h1>

        {logingIn ? <Login submitCallback={formSubmit}></Login> : <SignUp submitCallback={formSubmit}></SignUp>}

        {
            logingIn ? 
            <h2>Don't have an account <button onClick={() => {setLoginIn(false)}}>Sign Up Here</button></h2> 
            : 
            <h2>Already have an account <button onClick={() => {setLoginIn(true)}}>Log In Here</button></h2>
        }
    </>
};

export type { SubmitCallback }
export default AccountPortal;