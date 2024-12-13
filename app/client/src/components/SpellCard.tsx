import Star from "./Star";
import ISpell from "../Models/ISpell";
import { SERVER_URL } from "../config";

const SpellCard = ({ spell, type, favorite }: { spell: ISpell, type: string, favorite: boolean }): React.JSX.Element => {
    const addFavorite = async () => {
        const body = { type: type, favorite: spell.m_name };

        const request = await fetch(`${SERVER_URL}/favorites/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: "include",
        });

        
        if (!request.ok) {
            throw new Error(request.statusText);
        }
    }

    const removeFavorite = async () => {
        const body = { type: type, favorite: spell.m_name };

        const request = await fetch(`${SERVER_URL}/favorites/remove`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: "include",
        });

        if (!request.ok) throw new Error(request.statusText);
    }

    return (
        <div className="card">
            <div className="card-image">
                <img src={spell.m_image} alt={spell.m_name}></img>
            </div>

            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4"><Star defaultStared={favorite} star={addFavorite} unstar={removeFavorite}></Star> - {spell.m_name}</p>
                    </div>
                </div>

                <div className="content">
                    <p>{spell.m_description}</p>
                </div>
            </div>
        </div>
    )
};

export default SpellCard;