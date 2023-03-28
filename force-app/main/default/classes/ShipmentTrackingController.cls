/**
 * @description       : 
 * @author            : eabhijith@gmail.com
 * @group             : 
 * @last modified on  : 03-28-2023
**/
public class ShipmentTrackingController {

    
    /**
    * @description : Method to Retrieve Status of Shipment based on tracking number
    * @author eabhijith@gmail.com | 03-28-2023 
    * @param trackingNumber 
    * @return string 
    **/
    @AuraEnabled
    public static string retrieveStatus(String trackingNumber){
        try {
            //Retrun Variable
            String statusResponse = '';

            //Formated Input parameter to the query
            String formatedTrackingNumber = String.isNotEmpty(trackingNumber) ? 'trackingNumber='+String.escapeSingleQuotes(trackingNumber) : '';
            //Beging Apex Callout
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('callout:MockShipmentStatus?'+formatedTrackingNumber);
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            //Validate the response 
            if(response.getStatusCode() == 200) {
                statusResponse = response.getBody();
            } else{
                throw new AuraHandledException(UtilityConstants.CONTACT_ADMIN_MESSAGE);
            }
            return statusResponse;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}