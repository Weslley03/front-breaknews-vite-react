import { useContext } from "react";
import { UserContext }  from "../../context/UserContext.jsx";

export function Profile(){

    const { user } = useContext(UserContext)
    return(
        <h1>Profile do {user.name}</h1>
    )
}