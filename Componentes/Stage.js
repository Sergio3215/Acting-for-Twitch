import { useEffect, useState } from "react";
import MessageLog from "./message";
import Camara from "./camara";
import {containerGeneral, containerLateral, camaraContainer, resultContainer, messageContainer} from "../public/stage.module.css"

export default function Stage({message}) {
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(!load);
    }, [message])

    return (
        <>
            <div>
                <div className={containerGeneral}>
                    <div className={camaraContainer}>
                        <Camara />
                    </div>
                    <div className={containerLateral}>
                        <div className={messageContainer}>
                            <MessageLog message={message}/>
                        </div>
                        <div className={resultContainer}>
                            resultado
                        </div>
                    </div>
                </div>
                <div>
                    Timer
                </div>
            </div>
        </>
    )
}