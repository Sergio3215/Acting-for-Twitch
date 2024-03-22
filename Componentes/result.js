import { useEffect, useState } from "react"
import ResultText from "./ResultText";
import Ranking from "./ranking";

export default function Result({ wait, winner, ranking }) {

    const [timing, setTiming] = useState(false);

    useEffect(() => {
        let key = false;
        if (winner != '') {
            key = true;
        }
        else {
            if (wait) {
                key = true;
            }
            else {
                key = false;
            }
        }

        setTimeout(() => {
            setTiming(key);
        }, 2000);

        console.log(ranking)

    }, [wait, winner])

    return (
        <>
            {
                !timing ?
                    <ResultText wait={wait} winner={winner} />
                    :
                    ranking.length > 0 ?
                        <Ranking ranking={ranking} />
                        :
                        <ResultText wait={wait} winner={winner} />
            }
        </>
    )
}