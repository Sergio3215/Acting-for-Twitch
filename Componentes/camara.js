import { useEffect, useState } from "react"

import opt from "../app/api/option.json"
import Button from "./Button";
import { btnOpt, btnBack, lbTextOpt, drpDifficulty} from "../public/stage.module.css"

let opts = opt[0];

// console.log(opts);

export default function Camara({ setAfirmacion, setWinner, afirmacion, setWait, setTimeSelected }) {

    const [category, setCategory] = useState('');
    const [ready, setReady] = useState(false);
    const [optionValues, setOptionValues] = useState([
        {
            opt: "Muy Fácil",
            time: 450
        },
        {
            opt: "Fácil",
            time: 400
        },
        {
            opt: "Medio",
            time: 100
        },
        {
            opt: "Difícil",
            time: 50
        }
    ]);
    const [optionSelected, setOptionSelected] = useState(optionValues[0].time);

    useEffect(() => {
        if (afirmacion == '') {
            setCategory('');
            setReady(false);
        }
    }, [afirmacion])

    return (
        <>
            <div>
                {
                    afirmacion == '' ?
                        (ready) ?

                            (category == '') ?
                                <>
                                <Button text="Atras" onClick={() => {
                                    setCategory('');
                                    setAfirmacion('');
                                    setWinner('');
                                    setReady(false);
                                }} classname={btnBack} />
                                    <div className={lbTextOpt}>
                                        Elige tu categoría preferida.
                                    </div>
                                    {
                                        opts.category.map(cat => {
                                            return (
                                                <Button text={cat.name} onClick={() => setCategory(cat.name)} classname={btnOpt} />
                                            )
                                        })
                                    }
                                </>
                                :
                                <>
                                    <Button text="Atras" onClick={() => {
                                        setCategory('');
                                        setAfirmacion('');
                                        setWinner('');
                                    }} classname={btnBack} />
                                    <div className={lbTextOpt}>
                                        Elige una opcion para actuar.
                                    </div>
                                    <div>
                                        {
                                            opts.category.filter(cat => cat.name === category)[0].list.map(cat => {
                                                return (
                                                    <Button text={cat.titulo} classname={btnOpt} onClick={(e) => {
                                                        setAfirmacion(e.target.innerText);
                                                        setWait(false);
                                                        setWinner('')
                                                    }} />
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            :
                            <>
                                <h1>Coloque aquí la cámara, elija la dificultad deseada y cuando lo haga pulse "Listo"</h1>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <select className={drpDifficulty} onChange={(e) => {
                                        setTimeSelected(parseInt(e.target.value));
                                        setOptionSelected(e.target.value);
                                    }}>
                                        {
                                            optionValues.map((op, ii) => {
                                                return (
                                                    <option value={op.time} key={ii} selected={op.time == optionSelected}>{op.opt}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <Button text={"Listo"} onClick={() => setReady(true)} />
                                </div>
                            </>
                        :
                        <div style={{
                            fontSize: "48px"
                        }}>
                            Tu has seleccionado {afirmacion}
                        </div>

                }
            </div>
        </>
    )
}