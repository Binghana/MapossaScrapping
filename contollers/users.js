import { auth } from "../environment/config";
import AuthStateError from "./Errors/AuthStateError";


export async function setIdToken () {
    
}

export async function getIdToken () {
    const user = auth.currentUser
    if (! user ) throw new AuthStateError(AuthStateError.ERROR_USER_LOGOUT);
    return await user.getIdToken();
}