import { useEffect, useState } from "react";
import ISpell from "../Models/ISpell";
import { API_URL, DEFAULT_AD, SERVER_URL } from "../config";
import SpellCard from "../components/SpellCard";

const GenericSpellPage = ({ type }: { type: string }): React.JSX.Element => {
    const [spells, setSpells] = useState<ISpell[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const loadSpells = async () => {
        const spellsRequest = fetch(`${API_URL}/${type}`, {
            method: "GET",
        });

        const favoritesRequest = fetch(`${SERVER_URL}/favorites?type=${type}`, {
            method: "GET",
            credentials: "include",
        });

        const spellsResponse = await spellsRequest;
        const favoriteResponse = await favoritesRequest;


        if (!spellsResponse.ok){
            return;
        }
        if (!favoriteResponse.ok) {
            return;
        }

        const spellsJson = await spellsResponse.json() as ISpell[];
        const favJson = (await favoriteResponse.json() as ISpell[]).map((spell => { return spell.m_name }));

        spellsJson.push(DEFAULT_AD as ISpell);

        setSpells(spellsJson);
        setFavorites(favJson);
    };

    const isFavorite = (name: string): boolean => {
        return favorites.includes(name);
    }

    const spellCompare = (spellA: ISpell, spellB: ISpell): number => {
        const aFav = isFavorite(spellA.m_name);
        const bFav = isFavorite(spellB.m_name);

        if ((aFav && bFav) || (!aFav && !bFav)) {
            return spellA.m_name < spellB.m_name ? -1 : 1;
        }

        if (aFav && !bFav) {
            return -1;
        }

        return 1;
    }

    useEffect(() => {
        loadSpells();
    }, []);

    return (
        <main>
            <div className="has-text-centered">
                <ul>
                {
                    spells.sort(spellCompare).map((spell) => (
                        <li key={spell.m_id}>
                            <SpellCard spell={spell} type={type} favorite={isFavorite(spell.m_name)}></SpellCard>
                        </li>
                    ))
                }
                </ul>
            </div>
        </main>
    )
};

export default GenericSpellPage;