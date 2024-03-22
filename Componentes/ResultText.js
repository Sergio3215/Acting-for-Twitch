import { useEffect, useState } from "react"

export default function ResultText({ wait, winner }) {

    useEffect(() => {

    }, [wait, winner])

    return (
        <>
            {
                winner != "" ?
                    <>
                        El ganador es {winner}
                    </>
                    :
                    wait ?
                        <>
                            El tiempo de espera se acabo
                        </>
                        :
                        <>
                            Acá se verá el resultado de la partida
                        </>
            }
        </>
    )
}