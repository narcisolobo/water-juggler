import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useUser = () => {
  const context = useContext(AuthContext);
  console.log(context.user);

  if(!context) {
    throw new Error('useUser must be used inside an AuthContextProvider.');
  }

  return context;
}

export default useUser;