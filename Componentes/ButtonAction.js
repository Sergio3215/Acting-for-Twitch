'use client';
import { useEffect, useState } from "react";
import Button from "./Button";
import { useGetToken } from "../connectTwitch";
import {lbStatus} from "../public/stage.module.css"

let recall = false;

export default function ButtonAction({ refreshClient }) {

    let clientID_ = process.env.NEXT_PUBLIC_ClientID;
    let secretID_ = process.env.NEXT_PUBLIC_SecretID;

    const [client, setClient] = useState({});
    const [twitchConnected, setTwitchConnected] = useState(false);

    const setHash = () => {
        if (sessionStorage.getItem("key") == undefined) {
            sessionStorage.setItem("key", false);
        }

        if (location.hash.includes("token")) {

            if (sessionStorage.getItem("key").includes("false")) {
                sessionStorage.setItem("key", true);

                let token = location.hash.split("#access_token=")[1].split("&")[0];
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("key", false);
                // connectWithToken();
                // location.href = location.origin;
            }
            else {
                sessionStorage.setItem("key", false);
            }

        }
    }

    const connectWithToken = () => {
        if (sessionStorage.getItem("token") != undefined && sessionStorage.getItem("token") != null) {
            if (!recall) {
                recall = true;
                let token = sessionStorage.getItem("token");
                useGetToken(token, clientID_, setClient);
                // sessionStorage.setItem("key", false);
            }
        }


        if (sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null) {
            setTwitchConnected(false);
        }
        else {
            setTwitchConnected(true);
        }
    }

    async function getConnect() {
        if (client.connect !== undefined) {
            await client.connect().catch((err) => {
                console.log(err.message)
            });
            refreshClient(client);
        }
    }

    useEffect(() => {
        setHash();
        connectWithToken();
    }, []);

    useEffect(() => {
        getConnect();
    }, [client])

    return (
        <>
            <div>
                <Button text="Conectarse con Twitch" onClick={() => {
                    location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID_}&redirect_uri=http://localhost:3000&scope=chat%3Aread+chat%3Aedit`;
                }} />

                <br />
                <div className={lbStatus}>
                    Status:
                    <br />
                    {
                        (twitchConnected) ?
                            <>Connected</>
                            :
                            <>No connected</>
                    }
                </div>
            </div>
        </>
    )
}