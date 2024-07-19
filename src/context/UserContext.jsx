import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }){
    const [ user, setUser ] = useState(() => {
        const saveUser = localStorage.getItem('user')
        return saveUser ? JSON.parse(saveUser) : null
    })

    useEffect(() => {
        if (user){
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    return(
        <UserContext.Provider value={{ user, setUser }}>  
            { children }
        </UserContext.Provider>
    );
}