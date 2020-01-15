import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform, public backend: HomeService) {
    this.plt.ready()
    .then(() => {
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          console.log(data);
          console.log("Received in background");
          this.pushes.push({
            body: data.body,
            title: data.title
          })
          console.log(this.pushes)
        } else {
          console.log(data)
          console.log("Received in foreground");
          this.pushes.push({
            body: data.body,
            title: data.title
          })
          console.log(this.pushes)

        };
        
      });
      this.fcm.getToken().then(token => {
        const user = {
            user: "ABS",
            token: token
        };
        console.log("Here");
        // this.db.collection('users').add(user).then(result => {
        //     console.log("saved", result);
        //   }).catch(error => {
        //     console.log(error);
        //   });
        })
        .catch((err)=>{
          console.log(err);
        });
      this.fcm.onTokenRefresh().subscribe(token => {
        // Register your new token in your back-end if you want
        // this.backend.registerToken(token);

      });





      this.subscribeToTopic();
    });

}
subscribeToTopic() {
  this.fcm.subscribeToTopic('doKaam')
  .then((data)=>{
    this.pushes.push({
      body: data.body,
      title: data.title
    });
  });
}
getToken() {
  this.fcm.getToken().then(token => {
    // Register your new token in your back-end if you want
    // backend.registerToken(token);
  });
}
unsubscribeFromTopic() {
  this.fcm.unsubscribeFromTopic('doKaam');
}
}
