import { createContext } from "react";

const UserContext = createContext ({
    loggedUser : "Default Name"
});

export default UserContext;