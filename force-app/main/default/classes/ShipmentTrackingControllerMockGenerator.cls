/**
 * @description       : 
 * @author            : eabhijith@gmail.com
 * @group             : 
 * @last modified on  : 03-28-2023
**/
@isTest
global with sharing class ShipmentTrackingControllerMockGenerator implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        System.assertEquals('GET', req.getMethod(),'Validation for End Point request type');
        System.assert(req.getEndpoint().contains('callout:MockShipmentStatus'),'Validation for EndPoint URL');
        
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        
        
        if (req.getEndpoint().contains('?trackingNumber=')) {
            res.setBody(UtilityConstants.SHIPMENT_STATUS_ON_TIME);
        } else {
            res.setBody(UtilityConstants.SHIPMENT_STATUS_NUMBER_MISSING);
        }
        res.setStatusCode(200);
        return res;
    }
}