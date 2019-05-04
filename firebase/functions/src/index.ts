import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

export const getEvent = functions.https.onRequest(async (req, res) =>{
    const docs = await admin.firestore().collection('event').get()
    res.send(docs.docs.map(doc => doc.data()))
})
