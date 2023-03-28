/**
 * @description       : 
 * @author            : eabhijith@gmail.com
 * @group             : 
 * @last modified on  : 03-28-2023
**/
@isTest
public class ShipmentTrackingControllerTest {

    @IsTest
    static void retrieveStatus_onTime(){
        String sampleTrackingNumber = 'Sample';
        String response;
        Test.startTest();
        System.runAs(new User(Id = userinfo.getuserid())){
            Test.setMock(HttpCalloutMock.class, new ShipmentTrackingControllerMockGenerator());
            response = ShipmentTrackingController.retrieveStatus(sampleTrackingNumber);

        }
        Test.stopTest();
        System.assertEquals(response, UtilityConstants.SHIPMENT_STATUS_ON_TIME,'Validation for on-Time Status');
        
    }

    @IsTest
    static void retrieveStatus_numberMissing(){
        String response;
        Test.startTest();
        System.runAs(new User(Id = userinfo.getuserid())){
            Test.setMock(HttpCalloutMock.class, new ShipmentTrackingControllerMockGenerator());
            response = ShipmentTrackingController.retrieveStatus('');

        }
        Test.stopTest();
        System.assertEquals(response, UtilityConstants.SHIPMENT_STATUS_NUMBER_MISSING,'Validation for missing Tracking number');
        
    }
}