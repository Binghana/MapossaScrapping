
export default class ScrappingError extends Error {
    static ERROR_MORE_THAN_2_NUMBERS = "il ya plus de 2 numéros du même Operateur";
    static ERROR_NO_FINANCIAL_SMS = "Il n'ya pas de sms financier sur le terminal"

    constructor(message) {
        super(message)
        this.code = message;
    }
}