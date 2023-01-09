//@ts-check
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Router from 'next/router';


export default function Login() {
    const { data: session, status } = useSession()

    let router = useRouter()
    const handleSignOut = (e) => {
        signOut({ callbackUrl: '/register' })
    }

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/checkmail?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let emailDb = data['message']
    console.log(emailDb)

    //======= start
    let subscriptionId = null
    let userSubscription = null
    let userSubscriptionText = ""

    

    const updateUserConsent = (userConsent) => {
        console.log(userConsent);
        if (userConsent === "granted") {
            console.log("Diperbolehkan");
        } else {
            console.log("Tidak Diperbolehkan");
        }
    }
    const initializePushNotifications = () => {
        return Notification.requestPermission(function (result) {
            return result;
        });
    }
    const AskPermission = () => {
        initializePushNotifications().then(async ()=>{
            updateUserConsent(Notification.permission);
             createNotificationSubscription()
            
        })
        
    }
    const AskPermissionUser = () => {
        initializePushNotifications().then(async ()=>{
            updateUserConsent(Notification.permission);
             createNotificationSubscriptionUser()
            
        })
        
    }
    const createNotificationSubscriptionUser = () => {
        const pushServerPublicKey = "BL3Sv8nFM_tvnILPoGNG6rlLPqubF_mEOpDkaaeyNM2KU3BLih-PLJAtdgfGPPnwZFTDB_KCZJp1hiYSUx9wfxs";
        return navigator.serviceWorker.ready.then(function (serviceWorker) {
            return serviceWorker.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: pushServerPublicKey
                })
                .then(function (subscription) {
                    console.log("User is subscribed.", subscription);
                    SendSubscriptionToPushServerUser(subscription)
                    
                    return subscription;
                });
        });
    }
    const createNotificationSubscription = () => {
        const pushServerPublicKey = "BL3Sv8nFM_tvnILPoGNG6rlLPqubF_mEOpDkaaeyNM2KU3BLih-PLJAtdgfGPPnwZFTDB_KCZJp1hiYSUx9wfxs";
        return navigator.serviceWorker.ready.then(function (serviceWorker) {
            return serviceWorker.pushManager
                .subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: pushServerPublicKey
                })
                .then(function (subscription) {
                    console.log("User is subscribed.", subscription);
                    SendSubscriptionToPushServerMitra(subscription)
                    
                    return subscription;
                });
        });
    }
    const SendSubscriptionToPushServerMitra = async (subscriptionText) => {
        const res = await fetch(`/api/notifikasiMitra?emailReq=${session?.user?.email}`, {
            credentials: "omit",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(subscriptionText)
        })

        if (res.status >= 200 && res.status < 300) {
            res.json().then((dt) => {
                subscriptionId = dt.id;
                console.log("suksek push to server: " + dt.id);
                Router.push('/mitra/home')
            })
                .catch((err) => {
                    console.log("gagal");

                })
        }
        else {
            console.log("gagal Error");
        }
    }
    const SendSubscriptionToPushServerUser = async (subscriptionText) => {
        const res = await fetch(`/api/notifikasiUser?emailReq=${session?.user?.email}`, {
            credentials: "omit",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            body: JSON.stringify(subscriptionText)
        })

        if (res.status >= 200 && res.status < 300) {
            res.json().then((dt) => {
                subscriptionId = dt.id;
                console.log("suksek push to server: " + dt.id);
                Router.push('/')
            })
                .catch((err) => {
                    console.log("gagal");

                })
        }
        else {
            console.log("gagal Error");
        }
    }
    const SendNotification = async () => {
        const res = await fetch('/api/notifikasi/' + subscriptionId, {
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
    const SendNotificationLocal = async () => {
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
    const isPushNotificationSupported = () => {
        return "serviceWorker" in navigator && "PushManager" in window;
    }
    const getUserSubscription = () => {
        //wait for service worker installation to be ready, and then
        return navigator.serviceWorker.ready
            .then(function (serviceWorker) {
                return serviceWorker.pushManager.getSubscription();
            })
            .then(function (pushSubscription) {
                return pushSubscription;
            });
    }
    let pushNotificationSuported = isPushNotificationSupported();
    if (pushNotificationSuported) {
        updateUserConsent(Notification.permission);
        getUserSubscription();
    }
    //=========end
    const RegisterService = () => {
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

        if (session) {
            if (emailDb.mitra.length === 0 && emailDb.user.length === 0 && emailDb.mitraPending.length === 0) {
                alert('Anda belum terdaftar, Mohon untuk register')
                handleSignOut()
            } else if (emailDb.user.length != 0) {
                AskPermissionUser()
                
            } else if (emailDb.mitra.length != 0) {
                AskPermission()
                
            } else if (emailDb.mitraPending.length != 0) {
                alert('Mohon Tunggu untuk persetujuan kami :)')
                handleSignOut()
            }
        }


    return (
        <>
            {session &&
                <div><h3 className='text-white'>Logged In</h3></div>
            }
            {!session &&
                <div><h2 className='text-white'>Not Logged In</h2></div>
            }
        </>
    )


}
