import { useEffect, useState } from "react";
import MessageLog from "./message";
import Camara from "./camara";
import { containerGeneral, containerLateral, camaraContainer, resultContainer, messageContainer } from "../public/stage.module.css"
import Result from "./result";
import Timer from "./timer";

export default function Stage({ message }) {
    const [load, setLoad] = useState(false);
    const [afirmacion, setAfirmacion] = useState('');
    const [winner, setWinner] = useState('');
    const [wait, setWait] = useState(false);
    const [ranking, setRanking] = useState([]);
    const [timeSelected, setTimeSelected] = useState(550);

    useEffect(() => {
        if (localStorage.getItem("ranking") != null && localStorage.getItem("ranking") != undefined) {
            let rk = localStorage.getItem("ranking");
            setRanking(rk);
        }
    }, [])

    useEffect(() => {
        setLoad(!load);
        resultManager(message.message, message.user);
    }, [message]);

    const createRanking = (user) => {
        let rank = ranking;
        let rankBool = false;
        let pointDefault = 5

        if (rank.length > 0) {

            rank.map(rnk => {
                if (user == rnk.name) {
                    rnk.point = rnk.point + pointDefault;
                    rankBool = true;
                }
            });

            if (!rankBool) {
                rank.push({
                    name: user,
                    point: pointDefault
                });
            }
        }
        else {
            rank.push({
                name: user,
                point: pointDefault
            })
        }

        setRanking(rank);

        // localStorage.setItem('ranking', rank);
    }

    const resultManager = (value, user) => {
        try {
            if (value.toLowerCase() == afirmacion.toLowerCase()) {
                setWinner(user);
                setAfirmacion('');
                setWait(false);
                createRanking(user);
            }
        } catch (error) {

        }
    }

    const myStyle = {
        contentTitle: {
            textAlign: "center",
            fontSize: "40px",
            marginTop: "var(--size-layout)"
        }
    }

    return (
        <>
            <div>
                <div className={containerGeneral}>
                    <div className={camaraContainer}>
                        <Camara setAfirmacion={setAfirmacion} setWinner={setWinner} afirmacion={afirmacion} setWait={setWait} setTimeSelected={setTimeSelected} />
                    </div>
                    <div className={containerLateral}>
                        <div style={myStyle.contentTitle}>Chat</div>
                        <div className={messageContainer}>
                            <MessageLog message={message} />
                        </div>
                        <div style={myStyle.contentTitle}>Resultado</div>
                        <div className={resultContainer}>
                            <Result wait={wait} winner={winner} ranking={ranking} />
                        </div>
                    </div>
                </div>
                <div>
                    <Timer afirmacion={afirmacion}
                        setAfirmacion={setAfirmacion}
                        setWait={setWait}
                        winner={winner}
                        timeSelected={timeSelected} />
                </div>
            </div>
        </>
    )
}