const { connectToDatabase } = require('../../../lib/mongodb');
import crypto from "crypto";


function createHash(input) {
    const md5sum = crypto.createHash("md5");
    md5sum.update(Buffer.from(input));
    return md5sum.digest("hex");
}

export default async (req, res) => {
    let { db } = await connectToDatabase();
    if (req.method == "POST") {
        const { emailReq } = req.query
        console.log(req.body);
        console.log(`Email Subsrek adalah ${emailReq}`)
        const subscriptionRequest = req.body;
        const subscriptionReqString = JSON.stringify(subscriptionRequest);     
        const susbscriptionId = createHash(subscriptionReqString);
        await db.collection('tbl_notifikasi_mitra').updateOne(
            { id: susbscriptionId, emailReq: emailReq },
            { $set: { id: susbscriptionId, subscribe_req: subscriptionReqString, email:emailReq } },
            { upsert: true }
        );
        res.json({
            id: susbscriptionId
        });
    }
}