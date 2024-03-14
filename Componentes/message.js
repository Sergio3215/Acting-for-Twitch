import { useEffect, useState } from "react"

export default function MessageLog({ message }) {
    const [msg, setMsg] = useState([]);

    useEffect(() => {
        // console.log(message);
        if (message.user !== undefined) {
            let messageArr = msg;
            messageArr.push(message);
            setMsg(messageArr);
        }
    }, [message]);

    return (
        <>
            <div>
                {
                    msg.map((m, index) => {
                        return (
                            <>
                                <div key={index} id="body--message">
                                    <div>{m.user}:</div>
                                    <div>{m.message}</div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}