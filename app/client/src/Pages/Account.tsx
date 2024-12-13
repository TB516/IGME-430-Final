import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../config";
import PasswordChangeForm from "../components/Account/ChangePassword";

const Account = () => {
    const nav = useNavigate();

    const logout = async () => {
        const request = await fetch(`${SERVER_URL}/accounts/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        });

        if (!request.ok) {
            alert(request.statusText)
            return;
        }

        nav('/login');
    };

    return <main>
        <section className="section">
            <PasswordChangeForm></PasswordChangeForm>
        </section>

        <section className="section">
            <button onClick={logout} className="button">Logout</button>
        </section>
    </main>
}

export default Account;