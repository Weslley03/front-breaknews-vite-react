export function TextLimit({text, limit}) {
    const TextLimited = text?.length > limit ? `${text.substring(0, limit)}...` : text;  

    return(<p> {TextLimited} </p>)
}