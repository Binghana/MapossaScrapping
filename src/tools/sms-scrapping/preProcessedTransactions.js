import TouchHistoryMath from "react-native/Libraries/Interaction/TouchHistoryMath";

export class PreProcessedTransaction {

    constructor(baseSMS) {


        this.baseSMS = baseSMS;
        
        this.initialType = null;
        this.finalType = null;
        this.decision = null;
        this.flux = null;
        this.operator = null;
        this.serviceCenter = null;
        
        this.accountId = null;

        this.userPhoneNumber = null;
        
        this.amount = null;
        this.fees = null;
        this.date = null;
        this.hour = null;
        this.transactionID = null;

        this.senderName = null;
        this.senderPhoneNumber = null;

        this.receiverName = null;
        this.receiverPhoneNumber = null;

        this.balance = null;
        
        this.isAuto = true;

        this.hasError = false ;

        this.amount_error = false;
        this.fees_error = false;
        this.date_error = false;

        this.balance_error = false;
        
        this.classification_error = false ;
        this.verification_error = false;

        this.user_verification = false;

    }
    
    checkError() {
        this.hasError = ( this.amount_error || this.balance_error || this.fees_error || this.date_error );
    }
}
