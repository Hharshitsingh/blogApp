import { createContext, useState } from "react"

export const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [acc, setAcc] = useState({fullname : '', username : ''})

    return (
        <DataContext.Provider value={{
            acc,
            setAcc
        }}>
            {children}

        </DataContext.Provider>
    )
}

