import TouchHistoryMath from "react-native/Libraries/Interaction/TouchHistoryMath";

export class PreProcessedTransaction {

    constructor(baseSMS , operator = null , service_center = null) {

        this.baseSMS = baseSMS;
        
        this.initialType = null;
        this.finalType = null;
        this.decision = null;
        this.flux = null;
        this.operator = operator;
        this.serviceCenter = service_center;
        
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

        this.risk = false;
        this.error = false;
        this.problem = false;

    }
}
