import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProperty } from '../common/property';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public parameter: IProperty = {};

  public searchText = new BehaviorSubject<any>({});
  searchText$ = this.searchText.asObservable();

  public loginData = new BehaviorSubject<any>({});
  loginData$ = this.loginData.asObservable();

  public loaderState = new BehaviorSubject<any>({});
  loaderState$ = this.loaderState.asObservable();

  public modalState = new BehaviorSubject<any>({});
  modalState$ = this.modalState.asObservable();

  public scrollState = new BehaviorSubject<any>({});
  scrollState$ = this.scrollState.asObservable();

  public project = new BehaviorSubject<any>({});
  project$ = this.project.asObservable();


  projects:any=[{}];

  constructor(private http: HttpClient) {

  }


  updateToken(accessToken){
    // let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6IlVTRVIiLCJfaWQiOiI1ZWRjYTlhMThlMjJiMzE0YzNhZWRkZGMiLCJuYW1lIjoidXNlcjEwMCIsImVtYWlsIjoidXNlcjEwMEBnbWFpbC5jb20iLCJ0aW1lIjoiMjAyMC0wNi0wN1QwODo0NzozMC4wNzlaIiwiaWF0IjoxNTkxNTE5NjUwfQ.QXc6GUXFgn7u8VQzC6oo00xYTVlI7OdffItqHLfgkGI';
    localStorage.setItem('token',accessToken);
    let jwtHelper = new JwtHelperService()
    let data = jwtHelper.decodeToken(accessToken);
    this.loginData.next(data);
    console.log('decodeToken',data);
  }

  getAuthToken () {
    return localStorage.getItem('token');
  }

  getUserId(){
    return localStorage.getItem('id');    
  }

  showLoader(){
    this.loaderState.next(true)
  }

  hideLoader(){
    this.loaderState.next(false)
  }
  
  hideModal(){
    this.modalState.next(false);
  }

  getDataApi(url: string, params: any) {
    return this.http.get(environment.baseUrl + url, {params:params});
  }

  postDataApi(url: string, input: any) {
    const accessToken = this.getAuthToken();
    if (!accessToken) {
      return this.http.post(environment.baseUrl + url, input);
    } else {
      return this.http.post(environment.baseUrl + url, input);
    }
  }

  putDataApi(url: string, input: any) {
    return this.http.put(environment.baseUrl + url, input);
  }

  deleteDataApi(url: string, input: any) {
    return this.http.delete(environment.baseUrl + url);
  }

  getDataApiWithoutHeaders(url: string, input: any) {
    return this.http.get(environment.baseUrl + url,{params:input});
  }



  public uploadVideo(data) {
    let uploadURL = `${environment.baseUrl}uploadVideo`;
    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }


  
}
