import { useState } from "react";
import { SERVER_URL } from "../../config";

const PasswordChangeForm = () => {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    const changePassword = async () => {
        const body = { password, passwordConfirm };

        const request = await fetch(`${SERVER_URL}/accounts/change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: "include",
        });

        if (!request.ok) {
            alert(request.statusText);
            return;
        }

        alert('Success');
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();

            changePassword();
        }}>
            <label className="label">
                Password: <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="input"></input>
            </label>
            <label className="label">
                Confirm Password: <input type="password" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} className="input"></input>
            </label>

            <input type="submit" value="Change Password" className="input"></input>
        </form>
    )
}

export default PasswordChangeForm;