import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Observable, Subscription } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  resetpassword:any;
  userid:any
  passw:any
  observableRef: any;
  sub: any;
  myList:any;
  mySubscription: Subscription | undefined
  id:any

  constructor(private http:HttpClient,private SpinnerService:NgxSpinnerService,public apicall:ApiserviceService,public route:Router) { }

  ngOnInit(): void
   {
  //   this.mySubscription= interval(10*60*1000).subscribe((x =>{
  //     this.doStuff();
  // }));
  this.id='User/Snapshot?location=Singapore';
  // this.apicall.getMethod(this.id).subscribe((res:any)=>{
  //   console.log('camlist-> ',res)
  // })

  //var base64encodedData = Buffer.from('admin' + ':' + 'echol123').toString('base64');
  // var authInfo = 'admin' + ":" + 'echol123';
  // authInfo = Convert.ToBase64String(Encoding.Default.GetBytes(authInfo));

 // const headers = new HttpHeaders(
  //  {
     // "Authorization": "Basic " + btoa("admin:echol123"),
      //"Authorization" : 'Basic ' + base64encodedData,
      //'Access-Control-Allow-Origin': '*',
      //"Access-Control-Allow-Headers":'*'
      //'Access-Control-Allow-Methods': 'POST',
      //'Accept': '*/*',
      //'Content-Type': 'application/x-www-form-urlencoded',
      //'Access-Control-Allow-Credentials': 'true',
    // });
    
    //admin:echol123@
    // this.http.post("https://nea.echoltech.com/live/cck_cam1/cgi-bin/ptz.cgi?action=start&channel=1&code=ZoomTele&arg1=0&arg2=multiple&arg3=0",headers).subscribe((resp:any)=>
    // {
    //     console.log("Auth->",resp)
    // })

  }
//   doStuff(){
//     let param={
//       'cameraid':1,
//       'location':'Singapore'
//     }
//     this.apicall.postMethod('User/SaveSnap',param).subscribe((res:any)=>{
//       console.log('cam-> ',res)
//     })
// }

  submit(){
    
    let param = {
      userid: this.userid,
      password: this.passw
    }
     this.SpinnerService.show();  
    this.apicall.postMethod('User/UserLogin',param).subscribe((res:any)=>{
      // console.log("Login data",res);
      this.SpinnerService.hide();  
      if(res.message == 'success'){
        // console.log("ID",res.data.UserID)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('role',res.data.role)
        localStorage.setItem('subrole',res.data.subrole)
        localStorage.setItem('subrole1',res.data.subrole1)
        localStorage.setItem('userid',this.userid)
        // console.log("userid",res.data.userid)
        localStorage.setItem('ID',this.id)
        localStorage.setItem('ptzcontrol',res.data.permission)
        if(res.data.permission=='VIEW-ONLY'){
          this.route.navigate(['/container/dashboardviewonly'])
        }
        else{
          this.route.navigate(['/container/dashboard'])
        }
       
        let param = {
          id : res.data.UserID
        }
        this.apicall.postMethod('User/LoginDataCapture',param).subscribe((res:any)=>{
        })
        setTimeout( ()=>{
          this.apicall.getMethod('User/LastLoginData').subscribe((res:any)=>{
            // console.log('loginid',res)
            localStorage.setItem('loginid',res)
          })
        },1000)
      }else{
        this.apicall.swalError('Invalid username/password')
      }
    })
    
  }
  changepass()
  {
    let param={
      email:this.resetpassword
    }
    this.apicall.postMethod('User/ChangeUserPassword',param).subscribe((res:any)=>{
      // console.log(res)
      if(res.message=="success")
      {
        this.apicall.swalSuccess("New Password sent to your E-mail ID")
      }
      else{
        this.apicall.swalError("Your E-Mail ID is not Registered")
      }
    })
  }
}
