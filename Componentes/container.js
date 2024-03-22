'use client'
import { useEffect, useState } from "react";
import ButtonAction from "./ButtonAction";
import Button from "./Button";
import Stage from "./Stage";
import { containerInicio, bntInicio, txtInicio } from "../public/stage.module.css"


export default function Container() {

    const [client, setClient] = useState({});
    const [connected, setConnected] = useState(false);
    const [start, setStart] = useState(false);
    const [message, setMessage] = useState({});

    const refreshClient = (cl) => {
        setClient(cl);
    }

    useEffect(() => {
        if (client.on !== undefined) {
            setConnected(true);
            client.on("message", (channel, userState, msg) => {
                const { username, badges } = userState;

                if (!username) {
                    return;
                }

                console.log(msg)

                if (msg != "") {
                    setMessage({
                        user: username,
                        message: msg
                    })
                }
            })
        }
    }, [client])

    return (
        <>
            {
                (!start) ?
                    <div className={containerInicio}>
                        <div className={txtInicio}>
                            <div>
                                Acting on Twitch!
                            </div>
                            <label>_</label>
                        </div>
                        <div>
                            {
                                (!connected) ?
                                    <ButtonAction refreshClient={refreshClient} />
                                    :
                                    <>
                                        <Button text={"Comenzar"} onClick={() => {
                                            setStart(true);
                                        }} classname={bntInicio} />
                                    </>
                            }
                        </div>
                    </div>
                    :
                    <>
                        <Stage message={message} />
                    </>
            }
        </>
    )
}