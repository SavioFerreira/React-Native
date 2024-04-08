import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useContext } from "react";

export type AuthContextDataProps = {
  user: UserDTO;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '2',
        name: 'savi',
        email: 'savio@email.com',
        avatar: 'savi.png'
      } 
    }}>
      {children}
    </AuthContext.Provider>
  )
}