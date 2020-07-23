import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IProperty } from '../../common/property';
import { UserData } from '../../model/user-data.model';
import { Router } from '@angular/router';
import { MessagingService } from '../../services/messaging.service';
import { SocialLoginService } from '../../services/social-login.service';
import { TranslateService } from 'src/app/lang/translate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/common/constants';
import { apiUrl } from '../../common/urls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public model: UserData;
  navClass = 'navbar navbar-expand-lg navbar-dark fixed-top bg-white';
  public parameter: IProperty = {};
  public parameter2: IProperty = {};
  loginData:any;
  project:any={};

  @ViewChild('loginOpen') loginOpen:any;
  @ViewChild('registerClose') registerClose:any;
  @ViewChild('loginClose') loginClose:any;
  @ViewChild('forgotClose') forgotClose:any;

  role='user';

  constructor(
    private socialAuthService: SocialLoginService,
    private messagingService: MessagingService, 
    public auth: AuthService, 
    public router: Router, 
    public formBuilder: FormBuilder, 
    public constants: Constants,
    public ts:TranslateService,
    ) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    // if(localStorage.getItem('role')){this.role = localStorage.getItem('role');}

    this.auth.loginData$.subscribe(res => {
      if (Object.keys(res).length) {
        this.loginData = res;
      }
      else {
        this.loginData = {};
      }
    })


    this.auth.project$.subscribe(res => {
      if (Object.keys(res).length) {
        this.project = res;
      }
      else {
        this.project = {};
      }
    });


    this.auth.scrollState$.subscribe(height => {
      if (Object.keys(height).length) {
        if (height.value > 500) {
          this.navClass = 'navbar navbar-expand-lg navbar-dark fixed-top bg-white newClass';
        } else {
          this.navClass = 'navbar navbar-expand-lg navbar-dark fixed-top bg-white'
        }
      }
    });

    this.initRegister();
    this.initLogin();

    this.auth.modalState$.subscribe(res=>{
      console.log('modalCloseres',res);
      if(res==false){
        this.registerClose.nativeElement.click();
        this.loginClose.nativeElement.click();
        this.forgotClose.nativeElement.click();
      }
      if(res=='LOGIN'){
        this.changeRole('user');
        this.loginOpen.nativeElement.click();
      }
    });

  }

  selectProject(item){
    // localStorage.setItem('project',JSON.stringify(item));
    this.auth.putDataApi(`user/projectsSelect/${item._id}`,{}).subscribe(r=>{
      console.log('/user/projectsSelected',r);
    })
  }

  getProject(){
    let project = localStorage.getItem('project');
    return JSON.parse(project);
  }

  async logout() {
    let res = await this.messagingService.confirmAlert(this.ts.lang['logout?'], this.ts.lang['sure?'], this.ts.lang['yes'] , this.ts.lang['cancel'], '')
    if (res == 'success') {
      this.auth.loginData.next({});
      localStorage.clear();
      let a=this.socialAuthService.signOut();
      this.router.navigate(['']);
    }
  }

  registerForm: FormGroup;
  show: false;
  
  initRegister(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.pattern(this.constants.regex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    });
  }

  get registerform() { return this.registerForm.controls; }

  onFocus() {
    this.parameter.submitted = false;
    this.parameter2.submitted = false;
  }

  register(formData) {
    console.log('REGISTER')
    this.parameter2.submitted = true;
    let fd:any={};
    fd.name = formData.name;
    fd.key = formData.email;
    fd.password = formData.password;
    fd.provider = 'EMAIL';
    fd.language_type = this.ts.lang_code;
    fd.device_type = 'WEB';
    fd.playerId = this.messagingService.playerId;
    // delete fd.email;
    if (!this.registerForm.invalid) {
      this.userSignup(fd);
    }
  }

  userSignup(fd) {
    this.auth.postDataApi('user/register', fd).subscribe(success => {
      if (success) {
        this.auth.updateToken(success['data']['accessToken']);
        this.registerClose.nativeElement.click();
        this.router.navigate(['/internal/dashboard']);
      }
    }, error => {
      this.messagingService.errorAlert(error.error.msg)
    })
  }

  _keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loginForm:FormGroup;
  btnLoader:any=false;
  initLogin() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    })
  }
  get loginform() { return this.loginForm.controls; }

  login(fd) {
    this.parameter.submitted = true;

    if (fd.email.match(".*[a-zA-Z]+.*")) {
      if (!fd.email.match(this.constants.regex)) {
        this.loginForm.controls['email'].setErrors({ 'pattern': true });
      }
    }
    else {
      var reg = /^[0-9]*$/;
      if (!fd.email.match(reg) || fd.email.length > 15) {
        this.loginForm.controls['email'].setErrors({ 'pattern': true });
      }
    }

    fd.language_type = this.ts.lang_code;
    fd.device_type = 'WEB';
    fd.playerId = this.messagingService.playerId;
    if (!this.loginForm.invalid) {
      this.userLogin(fd);
    }
    console.log(fd);
  }

  userLogin(fd) {
    this.btnLoader = true;
    this.auth.postDataApi('user/login', fd).subscribe(async success => {
      console.log('LOGIN ',success);
      localStorage.clear();
      this.auth.updateToken(success['data']['accessToken']);
      this.loginClose.nativeElement.click();
      this.router.navigate(['/internal/dashboard']);
      // if (!success['isRegisterComplete']) {
      //   this.router.navigate(['profile']);
      // }
      this.loginForm.reset();

    }, error => {
      this.btnLoader = false;
      this.messagingService.errorAlert(error.error.message);
    })
  }

  forgotEmail:any;
  err:any={};
  forgotPassword() {
    if(!this.validateEmail(this.forgotEmail)){
      this.err.emailValidError = true;
      return false;
    }
    let input:any={};
    input.langauge_type = localStorage.getItem('lang');
    input.email = this.forgotEmail;
    let api = localStorage.getItem('role')=='talent' ? apiUrl.forgotTalentPassword : apiUrl.forgotPassword;
    this.auth.postDataApi(api, input).subscribe(success => {
      if (success) {
        this.messagingService.successAlert(success['msg'])
        this.router.navigate(['/login']);
      }
    }, error => {
      this.messagingService.errorAlert(error.error.msg)
    })
   
  }

  changeRole(role){
    this.role = role;
    localStorage.setItem('role',role);
  }

  validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

}
