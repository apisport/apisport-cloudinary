const { connectToDatabase } = require('../../../../lib/mongodb');
import crypto from "crypto";
import { stat } from "fs";
import webpush from "web-push";
const ObjectId = require('mongodb').ObjectId;

const vapidKeys = {
    privateKey: "yl03sSfv_nCxNy8SbZJXm168M7KVeUOLjHYRVyuVt3Y",
    publicKey: "BL3Sv8nFM_tvnILPoGNG6rlLPqubF_mEOpDkaaeyNM2KU3BLih-PLJAtdgfGPPnwZFTDB_KCZJp1hiYSUx9wfxs"
};

webpush.setVapidDetails("mailto:api.sport.team@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

export default async (req, res) => {
    let { db } = await connectToDatabase();
    if (req.method == "GET") {
        const { email,status,tglMain,namaVenue } = req.query;
        // const idTransaksi = new ObjectId(idTransaksiReq)

        let getSubscribeData = await db.collection('tbl_notifikasi_user').find({ email: email }).toArray();
        // let getTransaksiData = await db.collection('transaksi').find({ _id: idTransaksi }).toArray();
        console.log(getSubscribeData);
        // console.log(getTransaksiData);
        const pushSubscription = JSON.parse(getSubscribeData[getSubscribeData.length-1].subscribe_req);
        webpush.sendNotification(
            pushSubscription,
            JSON.stringify({
                title: `Transaksi Anda ${status} di ${namaVenue}`,
                text: `Transaksi Anda di ${namaVenue} telah ${status} dengan tanggal Main ${tglMain}`,
                image: "/ico.png",
                tag: "new-transaction",
                url: `/list-nota`
            })
        )
            .catch(err => {
                console.log(err);
            });

        res.status(202).json({});
    }
}