import { useEffect, useState } from "react"

import opt from "../app/api/option.json"
import Button from "./Button";
import {btnOpt, btnBack} from "../public/stage.module.css"

let opts = opt[0];

// console.log(opts);

export default function Camara() {

    const [category, setCategory] = useState('');
    const [ready, setReady] = useState(false);

    const getOptions = () => {

    }

    useEffect(() => {

    }, [])

    return (
        <>
            <div>
                {
                    (ready) ?

                        (category == '') ?
                            <>
                                {
                                    opts.category.map(cat => {
                                        return (
                                            <Button text={cat.name} onClick={() => setCategory(cat.name)} classname={btnOpt}/>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                <Button text="Atras" onClick={() => setCategory('')} classname={btnBack}/>
                                <div>
                                    {
                                        opts.category.filter(cat => cat.name === category)[0].list.map(cat => {
                                            return (
                                                <Button text={cat.titulo} classname={btnOpt}/>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        :
                        <>
                            <h1>Coloque aqui la camara y cuando lo haga pulse "Listo"</h1>
                            <Button text={"Listo"} onClick={()=>setReady(true)}/>
                        </>

                }
            </div>
        </>
    )
}