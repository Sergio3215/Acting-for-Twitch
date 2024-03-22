'use client';
export default function Button({ classname, text, onClick, children }) {

    return (
        <>
            <button className={classname} onClick={onClick}>
                {
                    text == undefined ?
                        children
                        :
                        text
                }
            </button>
        </>
    )
}