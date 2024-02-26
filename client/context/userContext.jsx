/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});
//usercontext.jsx lets the use to login throughout the webapp
export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}