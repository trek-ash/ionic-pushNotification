import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FCM } from '@ionic-native/fcm/ngx';
@Injectable({
    providedIn: 'root'
})

export class HomeService {

      // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    constructor(private db: AngularFirestore, private fcm: FCM ) {}

    registerToken(userPhone) {
        this.fcm.getToken().then(token => {
            const user = {
                user: userPhone,
                token: token
            };
            this.db.collection('users').add(user).then(result => {
                console.log("saved", result);
              }).catch(error => {
                console.log(error);
              });
            })
            .catch((err)=>{
              console.log(err);
            });
    }
}