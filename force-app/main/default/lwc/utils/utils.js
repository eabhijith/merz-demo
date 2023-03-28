import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { api, LightningElement } from 'lwc';

export default class UtilsClass extends LightningElement {

    @api showSuccess(message) {
        this.ShowToastMessage('Success', message);
    }

    @api showError(message) {
        this.ShowToastMessage('Error', message);
    }

    ShowToastMessage(type, message){
        const toastEvent = new ShowToastEvent({
            title: type,
            message: message,
            variant: type,
            mode: 'sticky'
        });
     
        this.dispatchEvent(toastEvent);
       
    }
}

export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            // Remove null/undefined items
            .filter(error => !!error)
            // Extract an error message
            .map(error => {
                // UI API read errors
                if (Array.isArray(error.body)) {
                    return error.body.map(e => e.message);
                }
                // UI API DML, Apex and network errors
                else if (error.body && typeof error.body.message === 'string') {
                    if(error.body.message.includes('FIELD_CUSTOM_VALIDATION_EXCEPTION')) {
                        let retError = error.body.message.replace(/[^a-zA-Z ]/g, "")?.split('FIELDCUSTOMVALIDATIONEXCEPTION')[1];
                        return retError;
                    }
                    return error.body.message;
                }
                // JS errors
                else if (typeof error.message === 'string') {

                    return error.message;
                }


                // Unknown error shape so try HTTP status text
                return error.statusText;
            })
            // Flatten
            .reduce((prev, curr) => prev.concat(curr), [])
            // Remove empty strings
            .filter(message => !!message)
    );
}