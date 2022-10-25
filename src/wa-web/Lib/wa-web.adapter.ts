
import * as WhatsappWeb from 'whatsapp-web.js'
import { cleanNumber, isvalidNumber } from './handle';
import { initialData } from '../../seed/data/seed-data';

export class WhatsappWebAdapter {
    
    private readonly WhatsappWeb = WhatsappWeb
    private Client = null;
    private RecivedMeesages = [];
 

    async newClient(){
        this.Client = new this.WhatsappWeb.Client({
                authStrategy:new WhatsappWeb.LocalAuth(),
                puppeteer:{headless:true,args: ['--no-sandbox']},
            })

            this.Client.initialize()
           
            const QRCode = new Promise((resolve, reject) => {
                this.Client.on('qr', qr => { 
                //console.log()
                resolve(qr)} )
            });

            const res : string = await QRCode.then()
          
            this.Client.on('authenticated', () => {
                console.log('AUTHENTICATED'); 
            });

            this.Client.initialize()
         
            return {Client:this.Client,QR:res};
    }
    
    

        
}