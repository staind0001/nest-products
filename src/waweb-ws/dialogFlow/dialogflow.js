import * as dialogFlow from '@google-cloud/dialogflow'
import {v4 as uuid } from 'uuid'


const PROJECTID = process.env.DIALOGFLOW_PROJECT_ID
const PRIVATEKEY = process.env.DIALOGFLOW_PRIVATE_KEY
const CLIENTEMAIL = process.env.DIALOGFLOW_CLIENT_EMAIL
const LANGUAGE = process.env.DIALOGFLOW_LANGUAGE

const CONFIGURATION = {
    credentials:{
        private_key: PRIVATEKEY,
        client_email: CLIENTEMAIL,
    }
}

const sessionClient = new dialogFlow.SessionsClient(CONFIGURATION)

const detectIntent = async (queryText) => {
    let media = null
    const sessionId = 1; //uuid.v4()
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId)
    const languageCode = LANGUAGE
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const [singleResponse] = responses;
    const { queryResult } = singleResponse
    const { intent } = queryResult || { intent: {} }
    const parseIntent = intent['displayName'] || null
    const parsePayload = queryResult['fulfillmentMessages'].find((a) => a.message === 'payload');
    // console.log(singleResponse)
    if (parsePayload && parsePayload.payload) {
        const { fields } = parsePayload.payload
        media = fields.media.stringValue || null
    }
    const customPayload = parsePayload['payload']

    const parseData = {
        replyMessage: queryResult.fulfillmentText,
        media,
        trigger: null
    }
    return parseData
}

const getDataIa = (message = '', cb = () => { }) => {
    detectIntent(message).then((res) => {
        cb(res)
    })
}

const getIA = (message) => new Promise((resolve, reject) => {

    let resData = { replyMessage:'', media: null, trigger: null }
    getDataIa(message,(dt) => {
        resData = { ...resData, ...dt }
        resolve(resData)
    })

})

export const botResponse = async (message) => {
    const data = await getIA(message)
   return data
}
