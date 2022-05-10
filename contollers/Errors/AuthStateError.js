export default class AuthStateError extends Error {
    
    static ERROR_USER_LOGOUT = "Il n'ya aucun utilisateur connecté";
    constructor(message) {
        super(message)
    }
}