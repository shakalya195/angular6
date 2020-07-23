import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  project:any ={};
  input:any={};
  loginData:any={};

  constructor(
    private msg:MessagingService,
    private auth:AuthService
  ) { }

  ngOnInit() {

    this.auth.loginData$.subscribe(res => {
        this.loginData = res;
    });

    this.msg.initSocket().then(
      this.msg.socket.on('messageFromServer', (response: any) =>{
        console.log('SOCKET RES=>',response);
      })
    );
  }

  sendMessage(){
    console.log('sending sendMessage',this.input)
    this.msg.socket.emit('sendMessage', this.loginData, async (res: any) => {
      console.log('m res', res);
    });
  }
  
  getProject(){
    this.project = JSON.parse(localStorage.getItem('project'));
    return this.project;
  }

}
