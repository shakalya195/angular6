import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private auth:AuthService) { }

  ngOnInit() {
    this.auth.loaderState.subscribe(data=>{
      if(data){
        this.spinner.show();
      }
      else{
        this.spinner.hide();
      }
    })
  }

}
