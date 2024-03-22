import { useEffect } from 'react'
import { timeLine, containerTimer } from '../public/timer.module.css'

export default function Timer({ afirmacion, setAfirmacion, setWait, winner, timeSelected }) {

    useEffect(() => {
        if (afirmacion !== '') {

            let count = 1;
            let myWidthMax = 68.5;
            let time = setInterval(() => {
                count = count + 0.5;
                // let percentage = (count * 100) / maxcount;
                // let size = myWidthMax - ((percentage * myWidthMax) / 100);
                if (count !== myWidthMax) {
                    if (document.querySelector("#timeLine") != null) {
                        document.querySelector("#timeLine").style.width = count + "vw";
                    }
                }
                else {
                    setWait(true);
                    setAfirmacion('');
                    clearInterval(time);
                }
            }, timeSelected);

            return () => clearInterval(time);
        }
    }, [afirmacion, timeSelected])

    return (
        <>
            {
                afirmacion != '' && winner == '' ?
                    <div className={containerTimer}>
                        <div className={timeLine} id="timeLine">

                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}