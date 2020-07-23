import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit {

  loginData:any;
  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.auth.loginData$.subscribe(res => {
      if (Object.keys(res).length) {
        this.loginData = res;
        if(this.loginData.project){
          this.auth.getDataApi(`user/projects/${this.loginData.project}`,{}).subscribe(res=>{
            console.log('user/projects/id',res);
            this.auth.project.next(res['data']);
          });
        }
      }
      else {
        this.loginData = {};
      }
    });

    this.auth.getDataApi('user/projects',{}).subscribe(res=>{
      console.log('user/projects',res); 
      this.auth.projects = res['data']['listing'];
    });
  }

}
