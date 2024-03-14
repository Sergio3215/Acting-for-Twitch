'use client';
export default function Button({ classname, text, onClick }) {

    return (
        <>
            <button className={classname} onClick={onClick}>
                {text}
            </button>
        </>
    )
}