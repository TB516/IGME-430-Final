import { useState } from "react";
import fullStar from '../assets/starFull.png';
import emptyStar from '../assets/starEmpty.png';

type StarCallback = () => Promise<void>;

const Star = ({ defaultStared, star, unstar }: { defaultStared: boolean, star: StarCallback, unstar: StarCallback }): React.JSX.Element => {
    const [stared, setStared] = useState(defaultStared);

    const tryStar = async () => {
        try {
            await star();
            setStared(true);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            alert(e.message);
        }
    }

    const tryUnstar = async () => {
        try {
            await unstar();
            setStared(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            alert(e.message);
        }
    }

    return stared ? <img width="40px" src={fullStar} alt="Stared" onClick={tryUnstar} /> : <img width="40px" src={emptyStar} alt="Not Stared" onClick={tryStar}/>
};

export default Star;