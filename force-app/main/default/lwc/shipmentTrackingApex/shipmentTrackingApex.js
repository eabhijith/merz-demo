import { LightningElement } from 'lwc';
import getContactList from '@salesforce/apex/ShipmentTrackingController.retrieveStatus';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { reduceErrors } from 'c/utils';

export default class ShipmentTrackingApex extends LightningElement {

    trackingStatus = '';
    showSpinner = false;

    state ={
        inputMissingWarning: 'Tracking Number Cannot be Empty!',
        title : 'Shipment tracking (Apex)',
        input : {
            name : 'tracking-search',
            label : 'Click Enter to search status',
            type : 'search',
            placeholder:'Please type the Tracking number and click `Enter`'
        },

    }

    handleKeyUp(event) {
        const isEnterKey = event.keyCode === 13;
        this.trackingStatus = '';
        if (isEnterKey) {
            const trackingNumber = event.target.value;
            this.showSpinner = true;

            //Validate if the Value is Empty
            if (!trackingNumber) {
                this.showToastNotification('Warning',this.state.inputMissingWarning,'warning');
                this.showSpinner = false;
                return;
            }
            //Make a Callout if the value is not Empty
            this.fetchResponse(trackingNumber);
        }
    }

    async fetchResponse(trackingNumber){
        try {
            const response = await getContactList({trackingNumber});
            this.trackingStatus = response;
        } catch (error) {
            this.showToastNotification('Error',reduceErrors(error).join(', '),'Error'); 
            console.log('error',error);
        }
        this.showSpinner = false;
    }

    get displayTrackingStatus() {
        return this.trackingStatus;
    }

    showToastNotification(title,message,variant) {
        const evt = new ShowToastEvent({title,message,variant});
        this.dispatchEvent(evt);
    }
}