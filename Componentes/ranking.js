import { useEffect, useState } from "react"

import { RankingContainer, RankingItems, lbRanking } from "../public/stage.module.css"


export default function Ranking({ ranking }) {

    const [rank, setRank] = useState([]);

    useEffect(() => {
        let topRanking = ranking;
        topRanking.sort((a, b) => {
            return a.point - b.point
        }).sort(() => -1);

        let arrTemp = [];

        topRanking.map((r, ii)=>{
            if(ii < 3){
                arrTemp.push(r);
            }
        });

        topRanking = arrTemp;

        setRank(topRanking);

    }, [ranking])

    return (
        <>
            <div className={lbRanking}>Ranking Top 3</div>
            <div className={RankingContainer}>
                {
                    rank.map(r => {
                        return (
                            <>
                                <div className={RankingItems}>
                                    <div>{r.name}</div>
                                    <div>{r.point}</div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}