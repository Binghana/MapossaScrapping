/**
 * 
 * @param {SMS} sms le sms dont on souhaite vérifier le service center
 * @returns {boolean}
 */
 export function verifyServiceCenter(sms) {

  if ( "service_center" in sms ) {

      for (const operator of operators) {
          if ( sms.service_center == operator.serviceCenter ){
              return true
          }
      }
      return -1

  }
  return -2;
}

