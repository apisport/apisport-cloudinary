
import React, { Component, createRef, useRef } from 'react'


export default class extends Component {

    constructor(props) {
        super(props);
        this.videBackground = createRef();
        this.state = {
            tinggi: 0,
            userSubscrition: null,
            userSubscritionText: "",
            subscritionId: null,
        }
    }
    //======= start
    updateUserConsent = (userConsent) => {
        console.log(userConsent);
        if (userConsent === "granted") {
            console.log("Diperbolehkan");
        } else {
            console.log("Tidak Diperbolehkan");
        }
    }
    initializePushNotifications = () => {
        return Notification.requestPermission(function (result) {
            return result;
        });
    }
    AskPermission = () => {
        this.initializePushNotifications().then(this.updateUserConsent);
    }
    createNotificationSubscription = () => {
        const pushServerPublicKey = "BL3Sv8nFM_tvnILPoGNG6rlLPqubF_mEOpDkaaeyNM2KU3BLih-PLJAtdgfGPPnwZFTDB_KCZJp1hiYSUx9wfxs";
        return navigator.serviceWorker.ready.then(function (serviceWorker) {
            return serviceWorker.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: pushServerPublicKey
                })
                .then(function (subscription) {
                    console.log("User is subscribed.", subscription);
                    return subscription;
                });
        });
    }
    CreateSubscription = () => {
        this.createNotificationSubscription().then((subscrition) => {
            this.showUserSubscription(subscrition);
        });
    }
    showUserSubscription = (subscrition) => {
        this.setState({
            userSubscrition: subscrition,
            userSubscritionText: JSON.stringify(subscrition, null, " ")
        })
    }
    SendSubscriptionToPushServer = async () => {
        const res = await fetch('/api/notifikasi', {
            credentials: "omit",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(this.state.userSubscrition)
        })

        if (res.status >= 200 && res.status < 300) {
            res.json().then((dt) => {
                this.state.subscritionId = dt.id;
                console.log("suksek push to server: " + dt.id);
            })
                .catch((err) => {
                    console.log("gagal");

                })
        }
        else {
            console.log("gagal Error");
        }
    }
    SendNotification = async () => {
        const res = await fetch('/api/notifikasi/' + this.state.subscritionId, {
            credentials: "omit",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
        })

        if (res.status >= 200 && res.status < 300) {
            res.json().then((dt) => {
                console.log("suksek send notification : " + dt);
            })
                .catch((err) => {
                    console.log("gagal");

                })
        }
        else {
            console.log("gagal Error");
        }
    }
    SendNotificationLocal = async () => {
        const img = "http://localhost:3000/ico.png";
        const text = "Pembayaran Anda dengan No. Invoice #128988 Telah diterima!";
        const title = "Pembayaran Diterima";
        const options = {
            body: text,
            icon: "logo_stikom.ico",
            vibrate: [200, 100, 200],
            tag: "new-product",
            image: img,
            // badge: "logo_stikom.ico",
            actions: [{ action: "Detail", title: "View", icon: "logo_stikom.ico" }]
        };
        navigator.serviceWorker.ready.then(function (serviceWorker) {
            serviceWorker.showNotification(title, options);
        });
    }
    isPushNotificationSupported = () => {
        return "serviceWorker" in navigator && "PushManager" in window;
    }
    getUserSubscription = () => {
        //wait for service worker installation to be ready, and then
        return navigator.serviceWorker.ready
            .then(function (serviceWorker) {
                return serviceWorker.pushManager.getSubscription();
            })
            .then(function (pushSubscription) {
                return pushSubscription;
            });
    }
    //=========end
    RegisterService = () => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/service-worker.js").then(
                    function (registration) {
                        console.log(
                            "Service Worker registration successful with scope: ",
                            registration.scope
                        );
                    },
                    function (err) {
                        console.log("Service Worker registration failed: ", err);
                    }
                );
            });
        }
    }
    componentDidMount() {
        let pushNotificationSuported = this.isPushNotificationSupported();
        if (pushNotificationSuported) {
            this.updateUserConsent(Notification.permission);
            this.getUserSubscription().then((subscrition) => {
                if (subscrition) {
                    this.showUserSubscription(subscrition);
                }
            });
        }


    }
    render() {
        return (
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <button type="button" className="btn btn-primary" onClick={this.AskPermission}>Ask Permission</button><br />
                        <button type="button" className="btn btn-primary" onClick={this.CreateSubscription}>Create Notification Subscription</button><br />
                        <button type="button" className="btn btn-primary" onClick={this.SendSubscriptionToPushServer}>Send subscription to push server</button><br />
                        <button type="button" className="btn btn-primary" onClick={this.SendNotification}>Send a push notification</button><br />
                        <button type="button" className="btn btn-primary" onClick={this.SendNotificationLocal}>Send a push notification Local</button><br />

                        <textarea className="form-control" value={this.state.userSubscritionText} onChange={() => { }}></textarea>
                    </div>
                </div>
        )
    };
}