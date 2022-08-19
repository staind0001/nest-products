import * as WhatsappWeb from 'whatsapp-web.js'

export class WhatsappWebAdapter {
    
    private readonly WhatsappWeb = WhatsappWeb

    async newClient(){
        const  client = new this.WhatsappWeb.Client({
                authStrategy: new WhatsappWeb.NoAuth(),
                puppeteer:{headless:true}
            })
            client.initialize();

            
            const QRCode = new Promise((resolve, reject) => {
                client.on('qr', qr => { 
                resolve(qr)})
            })
            const res =  await QRCode.then()
            return res;

        }
 
}