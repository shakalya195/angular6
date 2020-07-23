import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { reject } from 'q';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../lang/translate.service';
import * as io from 'socket.io-client';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/internal/operators/first';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  playerId:any;
  notifications:any=[];

  socket:any={};
  socket_id:any;
  connected:any= false;
  loginData:any={};
  attempt = 0;

  // content: "Check out your requestes"
  // data: {gender: "male", age: "20"}
  // heading: "Order delivered"
  // icon: "https://img.onesignal.com/t/02c7355a-655e-48af-81b4-eed44a66ff4f.png"
  // id: "b4c97086-7c90-4706-a885-9f6605bbb04a"
  // url: "https://www.famcam.co/my-profile"
  // this.toastr.success('Hello world!', 'Toastr fun!');

  constructor(
    private toastr: ToastrService,
    public ts:TranslateService,
    private admin: AuthService
  ) { 

    this.initSocket();

    // var OneSignal = window['OneSignal'] || [];
    // console.log("Init OneSignal");
    // OneSignal.push(["init", {
    //   appId: "da66c523-9f80-44c1-94ef-60b800cfbf84",
    //   autoRegister: false,
    //   allowLocalhostAsSecureOrigin: true,
    //   notifyButton: {
    //     enable: false
    //   }
    // }]);
    
    // console.log('OneSignal Initialized');
    // if(window['OneSignal']){
    //   OneSignal.showNativePrompt();
    //   OneSignal.on('notificationDisplay',(res)=>{
    //     console.log('PUSH DATA',res);
    //     this.notifications.unshift(res);
    //     this.toastr.success(res.heading, res.content);
    //   });
    //   window['OneSignal'].getUserId().then((userId)=> {
    //     this.playerId = userId;
    //   });
    // }
    
    
  }


  public async initSocket() {
     console.log('==========>',this.loginData);
    // this.loginData$$ = this.admin.loginData$.subscribe(loginData=>{
      let loginData = await this.admin.loginData$.pipe(take(2)).toPromise();
      this.loginData = loginData;
      console.log('==========>',this.loginData);
      if(this.loginData._id && this.attempt < 1){
        if(!this.socket.connected ){
          console.log('WEB SOCKET ATTEMPT',loginData);
          this.socket = io.connect(environment.socket_url,{query:"token="+localStorage.getItem('token')+'&id='+loginData._id, transports: ['websocket'],secure: true } );
        }
        
        // this.socket.on('disconnect', fun=>{
        //   if(!this.connected){
        //     this.connected = false;
        //     this.initSocket();
        //   }
        // });

        this.socket.on('connect', fun=>{
          console.log('socket',this.socket)
          this.socket_id = this.socket.id;
          this.connected = this.socket.connected;
          if(this.connected){ 
            console.log('Socket Connected ==>',this.socket_id);
            return true;
          }else{
            this.connected = false;
            return false;
          }
        });

        this.attempt++;

      }else{
        console.log('WEB SOCKET FAILED');
        // this.cs.modalPositionToggle('login');
      }
    // });

  }

  // getPlayerId(){
  //   return new Promise(resolve => {
  //     window['OneSignal'].getUserId().then(function (userId) {
  //       console.log('resolve');
  //       resolve(userId);
  //     }).catch(err=>{
  //       console.log('reject');
  //       reject(false);
  //     });
  //   });

  //   // return await window['OneSignal'].getUserId();
  //   // .then(function (userId) {
  //   //   return userId;
  //   // });
  // }

  async successAlert(message) {
    await Swal.fire({
      title: 'Success',
      text: message,
      type: 'success',
    })
    return 'success';
  }

 async errorAlert(message) {
    message = message ? message : this.ts.lang['SomethingWentWrong']
    await Swal.fire({
      title:  this.ts.lang['oops'],
      text: message,
      type: 'error',
    })
    return 'success';
  }
  confirmAlert(message, title, confirmText, cancelText, successText) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        text: message,
        type: 'question',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
      }).then((result) => {
        if (result.value) {
          if (!!successText) {
            Swal.fire(
              'Success',
              successText,
              'success'
            )
          }
          resolve('success');
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          resolve('cancel');
        }
      })
    })
  }

  // componentDidMount() {
  //   this.getOneSignalId()
  // }

  // getOneSignalId = async () => {
  //   try {
  //     const OneSignal = window['OneSignal'] || []
  //     OneSignal.push(() => {
  //       OneSignal.isPushNotificationsEnabled(isEnabled => {
  //         if (isEnabled) {
  //           // user has subscribed
  //           OneSignal.getUserId(userId => {
  //             console.log(`player_id of the subscribed user is : ${userId}`)
  //             // Make a POST call to your server with the user ID
  //           })
  //         }
  //       })
  //     })
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

}
