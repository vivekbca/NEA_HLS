import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators"
import { BehaviorSubject, Observable, throwError } from "rxjs";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(public httpClient: HttpClient) { }

 public apiUrl = 'http://localhost:59944/api/'
  // public apiUrl = 'https://nea.echoltech.com/api/'
public token = localStorage.getItem('token')


  get httpOptions() {
    return {
      headers: new HttpHeaders(
        {
          'Authorization': 'Bearer ' + this.token,
          //'Content-Type': 'application/json'
        })
    };
  }

  handleError(error:any){
    return throwError(error.status)
  }
//:Observable<any> 
  public getMethod(apiname:any){
    return this.httpClient.get(this.apiUrl + apiname, this.httpOptions)
    .pipe(catchError(this.handleError))
  }

  public postMethod(apiname:any,body:any){
    return this.httpClient.post(this.apiUrl + apiname,body, this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  public getMethod2(apiname:any){
    return this.httpClient.get(apiname, this.httpOptions)
    .pipe(catchError(this.handleError))
  }
  public getLogin(apiname:any,body:any,headers:any){
    return this.httpClient.post(this.apiUrl + apiname,body, headers)
    .pipe(catchError(this.handleError))
  }

  public swalError(arg:any) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: arg,
      showConfirmButton: false,
      timer: 1500
    })
  }

  // public swalSuccess(arg:any) {
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: arg,
  //     showConfirmButton: true
  //   })
    
  // }
  public swalSuccess(arg:any) {
  Swal.fire({
    position: 'center',
    title: arg,
    icon: 'success',
    showConfirmButton: true
  }).then((result) => {
    location.reload();
  })
}


}
