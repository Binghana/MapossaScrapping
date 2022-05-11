export const mapossaScrappingData = {
    "currentVersion" : "0.0.11",
}
export class AppError extends Error {
    static ERROR_APP_VERSION_DISMATCH ="La version de l'application que vous utilisez actuellement n'est pas le plus récente, veuillez la mettre à jour"
    constructor(message) {
        super(message)
    }
}