import { LightningElement } from 'lwc';

const QUERY_SHIPMENT_ENDPOINT_URL = 'https://merzcommunities--mel.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus?';
export default class ShipmentTracking extends LightningElement {

    async handleSearch(event) {
        try {
            debugger;
            const RESPONSE = await fetch(this.QUERY_SHIPMENT_ENDPOINT_URL,{
                headers: {
                  'Accept': 'application/json',
                },
                method: "GET"
            });

            // const STATUS = await RESPONSE.json();
            console.log('RESPONSE',RESPONSE);

            const TEXT_RESPONSE = await RESPONSE.text();
            const DATA = await new window.DOMParser().parseFromString(TEXT_RESPONSE, "text/xml");
            console.log('DATA',DATA);


            //const BODY =  await RESPONSE.body.text();
            // console.log('BODY',BODY);
            // const STRING = await new window.DOMParser().parseFromString(BODY, "text/xml");


            // console.log('STRING',STRING);
            
            
            
            // const STATUS = await RESPONSE.json();
            // console.log('RESPONSE',JSON.stringify(RESPONSE.body));
            // console.log('STATUS',STATUS);
            // console.log('RESPONSE',RESPONSE.status);

        } catch (error) {
            console.log(error);
        }
    }
}