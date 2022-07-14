import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map, min } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import 'src/assets/js/hlsplay.js';
import 'src/assets/js/hlsplay1.js';
import 'src/assets/js/hlsplay2.js';
import 'src/assets/js/hlsplay3.js';
import 'src/assets/js/hlsplay4.js'; 
import 'src/assets/js/hlsplay5.js';
import 'src/assets/js/hlsplay6.js';
import 'src/assets/js/hlsplay7.js';
import 'src/assets/js/hlsplay8.js';
import 'src/assets/js/hlsplay9.js';
import 'src/assets/js/hlsplay10.js';
import 'src/assets/js/hlsplay11.js';
import 'src/assets/js/hlsplay12.js';
import 'src/assets/js/hlsplay13.js';
import 'src/assets/js/hlsplay14.js';
import 'src/assets/js/hlsplay15.js';
import 'src/assets/js/hlsplay16.js';
import 'src/assets/js/hlsplay17.js';
//import 'node_modules/hls.js/dist/hls.js'
import 'src/assets/hlsjs/hls.min.js';
import {DomSanitizer} from '@angular/platform-browser';
import { Subscription ,interval} from 'rxjs';

declare const init_api:any;
declare const playClick:any;
declare const StopStream:any;
declare const callhls:any;
declare const callhls1:any;
declare const callhls2:any;
declare const callhls3:any;
declare const callhls4:any;
declare const callhls5:any;
declare const callhls6:any;
declare const callhls7:any;
declare const callhls8:any;
declare const callhls9:any;
declare const callhls10:any;
declare const callhls11:any;
declare const callhls12:any;
declare const callhls13:any;
declare const callhls14:any;
declare const callhls15:any;
declare const callhls16:any;
declare const callhls17:any;
declare const callhls18:any;
declare const callhls19:any;
declare const callhls20:any;
declare const StopWebSocket:any;
declare const StopWebSocket1:any;
declare const StopWebSocket2:any;
declare const StopWebSocket3:any;
declare const StopWebSocket4:any;
declare const StopWebSocket5:any;
declare const StopWebSocket6:any;
declare const StopWebSocket7:any;
declare const StopWebSocket8:any;
declare const StopWebSocket9:any;
declare const StopWebSocket10:any;
declare const StopWebSocket11:any;
declare const StopWebSocket12:any;
declare const StopWebSocket13:any;
declare const StopWebSocket14:any;
declare const StopWebSocket15:any;
declare const StopWebSocket16:any;
declare const StopWebSocket17:any;
declare const StopWebSocket18:any;
declare const StopWebSocket19:any;
declare const StopWebSocket20:any;


declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');



@Injectable()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable()
export class DashboardComponent implements OnInit {

  cam1:any
  showUser = false
  
  id:any
  subrole:any
  role:any
  camList:any
  substring:any
  mySubscription: Subscription | undefined  
  //camip:any
  showControl = true
  showCCK = false
  showMCC = false
  userid: any;
  camname:any
  player:any;
  headers:any;
  url1:any;
  camlength:any;
  data:any
  urlconfig:any;
  number:any
  Options:any;
  value:any;
  tilescount:any;
  loginid:any;
  cameraname:any;
  UserIDPrime:any;

  constructor(private route: Router,private apicall:ApiserviceService,private http:HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.value= this.number = 1;
    options: this.Options = {
    floor: 1,
    ceil: 8
  };
   this.tilescount=4;
    this.urlconfig="https://nea.echoltech.com/auth";
    //new callhls('wss://nea.echoltech.com/rtsp-to-web-ws/stream/3ad2fa17-5c1d-4906-8e63-02b740e03583/channel/0/mse?uuid=3ad2fa17-5c1d-4906-8e63-02b740e03583&channel=0') //#HLS
      // new init_api();
    
    // this.http.get("https://nea.echoltech.com/live/cck_cam1/cgi-bin/mjpg/video.cgi?channel=1&subtype=1",{ withCredentials: true})
    // .subscribe((res:any)=>{  
      
    // });
    //this.changeCam("https://nea.echoltech.com/live/cck_cam1/cgi-bin/mjpg/video.cgi?channel=1&subtype=1")
    //this.cam1="https://nea.echoltech.com/live/cck_cam1/cgi-bin/mjpg/video.cgi?channel=1&subtype=1"
    let userid = localStorage.getItem('userid')

    this.apicall.postMethod('User/GetUserLoginID',{id:userid}).subscribe((res:any)=>{
      //  console.log('get id -> ',res)
      this.id = res.data
    })
     
    this.role = localStorage.getItem('role')
    this.userid = localStorage.getItem('userid')
    this.UserIDPrime = localStorage.getItem('ID')
    if(localStorage.getItem('subrole')){
      this.subrole = localStorage.getItem('subrole')
    }
    if(localStorage.getItem('subrole1')){
      this.subrole = localStorage.getItem('subrole1')
    }
    
    let param = {
      role : this.role,
      subrole : this.subrole
    }


    if(this.role == 'admin'){
      this.showUser = true
      // this.showCCK = true
      //   this.showMCC = true
      this.apicall.getMethod('User/CameraConfig').subscribe((res:any)=>{
        // console.log('all cam -> ',res)
        this.camList = res.data
        // console.log('camList -> ',this.camList)  
        this.camlength=this.camList.length
        // console.log("list length",this.camlength)
        this.data=JSON.stringify(this.camList);
      })
    }else{
      this.showUser = false
        this.apicall.postMethod('User/CameraConfigByRole',param).subscribe((res:any)=>{
          // console.log('cam by role -> ',res)
          this.camList = res.data
          // console.log('camList -> ',this.camList)
          this.data=JSON.stringify(this.camList);
          this.camlength=this.camList.length
          // console.log("list length",this.camlength)
        })
       
    }

   
    let control = localStorage.getItem('ptzcontrol')
    if(control == 'VIEW-ONLY'){
      this.showControl = false
     
    }
   
    setTimeout( ()=>{
      if(1<=this.camlength)
       {
        var key1=Object.values(this.camList[0])[0]
        new callhls1(key1) //#HLS
      }
      if(2<=this.camlength && this.tilescount==4)
      {
        var key2=Object.values(this.camList[1])[0]
        new callhls2(key2) //#HLS
      } 
      if(3<=this.camlength && this.tilescount==4)
      {
        var key3=Object.values(this.camList[2])[0]
        new callhls3(key3) //#HLS
      } 
      if(4<=this.camlength)
      {
        var key4=Object.values(this.camList[3])[0]
        new callhls4(key4) //#HLS
      } 

      }, 5000)

    
    // document.getElementById("mySidebar")!.style.width = "250px";
    // document.getElementById("main")!.style.marginLeft = "250px";
    //this.changeCam(this.camList[0].ip)
   
  }
  
  changeTiles()
  {
    if(this.tilescount==4)
    {
      if(5<=this.camlength)
      {
        new StopWebSocket5()
      }
      if(6<=this.camlength)
      {
        new StopWebSocket6()
      }
      if(7<=this.camlength)
      {
        new StopWebSocket7()
      }
      if(8<=this.camlength)
      {
        new StopWebSocket8()
      }
      if(9<=this.camlength)
      {
        new StopWebSocket9()
      }
      if(10<=this.camlength)
      {
        new StopWebSocket10()
      }
      if(11<=this.camlength)
      {
        new StopWebSocket11()
      }
      if(12<=this.camlength)
      {
        new StopWebSocket12()
      }
      if(13<=this.camlength)
      {
        new StopWebSocket13()
      }
      if(14<=this.camlength)
      {
        new StopWebSocket14()
      }
      if(15<=this.camlength)
      {
        new StopWebSocket15()
      }
      if(16<=this.camlength)
      {
        new StopWebSocket16()
      }
      if(17<=this.camlength)
      {
        new StopWebSocket17()
      }
      if(18<=this.camlength)
      {
        new StopWebSocket18()
      }
      if(19<=this.camlength)
      {
        new StopWebSocket19()
      }
      if(20<=this.camlength)
      {
        new StopWebSocket20()
      }
    }
    if(this.tilescount==8)
    {
     
      setTimeout( ()=>{
      if(5<=this.camlength)
      {
        var key5=Object.values(this.camList[4])[0]
        new callhls5(key5) //#HLS
      }
       if(6<=this.camlength)
      {
        var key6=Object.values(this.camList[5])[0]
        new callhls6(key6) //#HLS
      } 
      if(7<=this.camlength)
      {
        var key7=Object.values(this.camList[6])[0]
        new callhls7(key7) //#HLS
      } 
      if(8<=this.camlength)
      {
        var key8=Object.values(this.camList[7])[0]
        new callhls8(key8) //#HLS
      } 
    }, 2000)
    setTimeout(()=>{
      if(9<=this.camlength)
      {
        new StopWebSocket9()
      }
      if(10<=this.camlength)
      {
        new StopWebSocket10()
      }
      if(11<=this.camlength)
      {
        new StopWebSocket11()
      }
      if(12<=this.camlength)
      {
        new StopWebSocket12()
      }
      if(13<=this.camlength)
      {
        new StopWebSocket13()
      }
      if(14<=this.camlength)
      {
        new StopWebSocket14()
      }
      if(15<=this.camlength)
      {
        new StopWebSocket15()
      }
      if(16<=this.camlength)
      {
        new StopWebSocket16()
      }
      if(17<=this.camlength)
      {
        new StopWebSocket17()
      }
      if(18<=this.camlength)
      {
        new StopWebSocket18()
      }
      if(19<=this.camlength)
      {
        new StopWebSocket19()
      }
      if(20<=this.camlength)
      {
        new StopWebSocket20()
      }
    },5000)

    }
    if(this.tilescount==12)
    {
      setTimeout(()=>{
        if(13<=this.camlength)
        {
          new StopWebSocket13()
        }
        if(14<=this.camlength)
        {
          new StopWebSocket14()
        }
        if(15<=this.camlength)
        {
          new StopWebSocket15()
        }
        if(16<=this.camlength)
        {
          new StopWebSocket16()
        }
        if(17<=this.camlength)
        {
          new StopWebSocket17()
        }
        if(18<=this.camlength)
        {
          new StopWebSocket18()
        }
        if(19<=this.camlength)
        {
          new StopWebSocket19()
        }
        if(20<=this.camlength)
        {
          new StopWebSocket20()
        }
      },5000)
     
      setTimeout( ()=>{
        if(5<=this.camlength)
        {
          var key5=Object.values(this.camList[4])[0]
          new callhls5(key5) //#HLS
        }
         if(6<=this.camlength)
        {
          var key6=Object.values(this.camList[5])[0]
          new callhls6(key6) //#HLS
        } 
        if(7<=this.camlength)
        {
          var key7=Object.values(this.camList[6])[0]
          new callhls7(key7) //#HLS
        } 
        if(8<=this.camlength)
        {
          var key8=Object.values(this.camList[7])[0]
          new callhls8(key8) //#HLS
        } 
    if(9<=this.camlength)
      {
        var key9=Object.values(this.camList[8])[0]
        new callhls9(key9) //#HLS
      } 
      if(10<=this.camlength)
      {
        var key10=Object.values(this.camList[9])[0]
        new callhls10(key10) //#HLS
      } 
      if(11<=this.camlength)
      {
        var key11=Object.values(this.camList[10])[0]
        new callhls11(key11) //#HLS
      } 
      if(12<=this.camlength)
      {
        var key12=Object.values(this.camList[11])[0]
        new callhls12(key12) //#HLS
      } 
    }, 2000)
    }
    if(this.tilescount==16)
    {
      setTimeout(()=>{
      if(17<=this.camlength)
    {
      new StopWebSocket17()
    }
    if(18<=this.camlength)
    {
      new StopWebSocket18()
    }
    if(19<=this.camlength)
    {
      new StopWebSocket19()
    }
    if(20<=this.camlength)
    {
      new StopWebSocket20()
    }
  },5000)
      setTimeout( ()=>{
        if(5<=this.camlength)
        {
          var key5=Object.values(this.camList[4])[0]
          new callhls5(key5) //#HLS
        }
         if(6<=this.camlength)
        {
          var key6=Object.values(this.camList[5])[0]
          new callhls6(key6) //#HLS
        } 
        if(7<=this.camlength)
        {
          var key7=Object.values(this.camList[6])[0]
          new callhls7(key7) //#HLS
        } 
        if(8<=this.camlength)
        {
          var key8=Object.values(this.camList[7])[0]
          new callhls8(key8) //#HLS
        } 
    if(9<=this.camlength)
      {
        var key9=Object.values(this.camList[8])[0]
        new callhls9(key9) //#HLS
      } 
      if(10<=this.camlength)
      {
        var key10=Object.values(this.camList[9])[0]
        new callhls10(key10) //#HLS
      } 
      if(11<=this.camlength)
      {
        var key11=Object.values(this.camList[10])[0]
        new callhls11(key11) //#HLS
      } 
      if(12<=this.camlength)
      {
        var key12=Object.values(this.camList[11])[0]
        new callhls12(key12) //#HLS
      } 
       if(13<=this.camlength)
      {
        var key13=Object.values(this.camList[12])[0]
        new callhls13(key13) //#HLS
      }
       if(14<=this.camlength)
      {
        var key14=Object.values(this.camList[13])[0]
        new callhls14(key14) //#HLS
      } 
      if(15<=this.camlength)
      {
        var key15=Object.values(this.camList[14])[0]
        new callhls15(key15) //#HLS
      }
       if(16<=this.camlength)
      {
        var key16=Object.values(this.camList[15])[0]
        new callhls16(key16) //#HLS
      }
    }, 2000)
    }
    if(this.tilescount==20)
    {
      setTimeout( ()=>{
      if(17<=this.camlength)
      {
        var key17=Object.values(this.camList[16])[0]
        new callhls17(key17) //#HLS
      }
      if(18<=this.camlength)
      {
        var key18=Object.values(this.camList[17])[0]
        new callhls18(key18) //#HLS
      }
      if(19<=this.camlength)
      {
        var key19=Object.values(this.camList[18])[0]
        new callhls19(key19) //#HLS
      }
      if(20<=this.camlength)
      {
        var key20=Object.values(this.camList[19])[0]
        new callhls20(key20) //#HLS
      }
    }, 5000)
    }
  }
  load(){
    
  }

  changeCam(camip:any,camname:any,cameraname:any){
    new callhls(camip) //#HLS
    // new init_api(); #Flashphoner
    var cameraip=camip
    // console.log('cam IP --> ',camip)
    // console.log('cam name --> ',camname)
    this.substring=camname;
    this.cameraname=cameraname;
    this.loginid=localStorage.getItem('loginid')
    // console.log('dashboard login id',this.loginid)
  }
  RefreshCam1(){
    new StopWebSocket1();
    var key1=Object.values(this.camList[0])[0]
    new callhls1(key1) //#HLS
  }
  RefreshCam2(){
    new StopWebSocket2();
    var key1=Object.values(this.camList[1])[0]
    new callhls2(key1) //#HLS
  }
  RefreshCam3(){
    new StopWebSocket3();
    var key1=Object.values(this.camList[2])[0]
    new callhls3(key1) //#HLS
  }
  RefreshCam4(){
    new StopWebSocket4();
    var key1=Object.values(this.camList[3])[0]
    new callhls4(key1) //#HLS
  }
  RefreshCam5(){
    new StopWebSocket5();
    var key1=Object.values(this.camList[4])[0]
    new callhls5(key1) //#HLS
  }
  RefreshCam6(){
    new StopWebSocket6();
    var key1=Object.values(this.camList[5])[0]
    new callhls6(key1) //#HLS
  }
  RefreshCam7(){
    new StopWebSocket7();
    var key1=Object.values(this.camList[6])[0]
    new callhls7(key1) //#HLS
  }
  RefreshCam8(){
    new StopWebSocket8();
    var key1=Object.values(this.camList[7])[0]
    new callhls8(key1) //#HLS
  }
  RefreshCam9(){
    new StopWebSocket9();
    var key1=Object.values(this.camList[8])[0]
    new callhls9(key1) //#HLS
  }
  RefreshCam10(){
    new StopWebSocket10();
    var key1=Object.values(this.camList[9])[0]
    new callhls10(key1) //#HLS
  }
  RefreshCam11(){
    new StopWebSocket11();
    var key1=Object.values(this.camList[10])[0]
    new callhls11(key1) //#HLS
  }
  RefreshCam12(){
    new StopWebSocket12();
    var key1=Object.values(this.camList[11])[0]
    new callhls12(key1) //#HLS
  }
  RefreshCam13(){
    new StopWebSocket13();
    var key1=Object.values(this.camList[12])[0]
    new callhls13(key1) //#HLS
  }
  RefreshCam14(){
    new StopWebSocket14();
    var key1=Object.values(this.camList[13])[0]
    new callhls14(key1) //#HLS
  }
  RefreshCam15(){
    new StopWebSocket15();
    var key1=Object.values(this.camList[14])[0]
    new callhls15(key1) //#HLS
  }
  RefreshCam16(){
    new StopWebSocket16();
    var key1=Object.values(this.camList[15])[0]
    new callhls16(key1) //#HLS
  }
  RefreshCam17(){
    new StopWebSocket17();
    var key1=Object.values(this.camList[16])[0]
    new callhls17(key1) //#HLS
  }
  RefreshCam18(){
    new StopWebSocket18();
    var key1=Object.values(this.camList[17])[0]
    new callhls18(key1) //#HLS
  }
  RefreshCam19(){
    new StopWebSocket19();
    var key1=Object.values(this.camList[18])[0]
    new callhls19(key1) //#HLS
  }
  RefreshCam20(){
    new StopWebSocket20();
    var key1=Object.values(this.camList[19])[0]
    new callhls20(key1) //#HLS
  }
  close()
  {
    // this.player.stop();
    new StopWebSocket(); //#Close Websocket
  }

  adduser(){
     let role = localStorage.getItem('user_role')
  
    this.route.navigate(['/container/adduser'])
  }
  
  logout(){

    this.loginid=localStorage.getItem('loginid');
    let param = {
      ID : this.loginid
    }
    this.apicall.postMethod('User/Logout',param).subscribe((res:any)=>{

    })
    if(1<=this.camlength)
    {
      new StopWebSocket1()
    }
    if(2<=this.camlength)
    {
      new StopWebSocket2()
    }
    if(3<=this.camlength)
    {
      new StopWebSocket3()
    }
    if(4<=this.camlength)
    {
      new StopWebSocket4()
    }
    if(5<=this.camlength)
    {
      new StopWebSocket5()
    }
    if(6<=this.camlength)
    {
      new StopWebSocket6()
    }
    if(7<=this.camlength)
    {
      new StopWebSocket7()
    }
    if(8<=this.camlength)
    {
      new StopWebSocket8()
    }
    if(9<=this.camlength)
    {
      new StopWebSocket9()
    }
    if(10<=this.camlength)
    {
      new StopWebSocket10()
    }
    if(11<=this.camlength)
    {
      new StopWebSocket11()
    }
    if(12<=this.camlength)
    {
      new StopWebSocket12()
    }
    if(13<=this.camlength)
    {
      new StopWebSocket13()
    }
    if(14<=this.camlength)
    {
      new StopWebSocket14()
    }
    if(15<=this.camlength)
    {
      new StopWebSocket15()
    }
    if(16<=this.camlength)
    {
      new StopWebSocket16()
    }
    if(17<=this.camlength)
    {
      new StopWebSocket17()
    }
    if(18<=this.camlength)
    {
      new StopWebSocket18()
    }
    if(19<=this.camlength)
    {
      new StopWebSocket19()
    }
    if(20<=this.camlength)
    {
      new StopWebSocket20()
    }
   

    setTimeout(()=>{
      
      localStorage.clear()
      
      this.apicall.swalSuccess('Successfully Logout')
      this.route.navigate(['/container/login'])
    },500)
    
  }
  camLink1()
  {

  }
  zoomin()
  {
   
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"ZoomIn",
      cameraName : this.cameraname,
      UserId:this.userid
    }
   
    // console.log('zoomparam -> ',zoomparam)
    // var param="https://nea.echoltech.com/auth/"+this.substring+"/cgi-bin/ptz.cgi?action=start&channel=1&code=ZoomTele&arg1=30&arg2=multiple&arg3=0";
    
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=ZoomTele&arg1=30&arg2=multiple&arg3=0";
    this.http.get(param).subscribe((res:any)=>{  
      
    });
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=ZoomTele&arg1=30&arg2=multiple&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  zoomout()
  {
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"ZoomOut",
      cameraName : this.cameraname,
      UserId:this.userid
    }
  
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=ZoomWide&arg1=0&arg2=multiple&arg3=0";

    this.http.get(param).subscribe((res:any)=>{
     
    })
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=ZoomWide&arg1=0&arg2=multiple&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  up()
  {
    let dateTime = new Date()
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"Up",
      cameraName : this.cameraname,
      UserId:this.userid
    }
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=Up&arg1=0&arg2="+this.value+"&arg3=0";
    // console.log("param",param);
    this.http.get(param).subscribe((res:any)=>{
      
    })
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=Up&arg1=0&arg2=1&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  left()
  {
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"Left",
      cameraName : this.cameraname,
      UserId:this.userid
    }
   // var param="https://nea.echoltech.com/auth/"+this.substring+"/cgi-bin/ptz.cgi?action=start&channel=1&code=Left&arg1=0&arg2=1&arg3=0";
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=Left&arg1=0&arg2="+this.value+"&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
      
    })
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=Left&arg1=0&arg2=1&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  right()
  {
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"Right",
      cameraName : this.cameraname,
      UserId:this.userid
    }
   // var param="https://nea.echoltech.com/auth/"+this.substring+"/cgi-bin/ptz.cgi?action=start&channel=1&code=Right&arg1=0&arg2=1&arg3=0";
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=Right&arg1=0&arg2="+this.value+"&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
      
    })
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=Right&arg1=0&arg2=1&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  down()
  {
    let zoomparam={
      LoginId:this.loginid,
      actionTime: '',
      actionMovement:"Down",
      cameraName : this.cameraname ,
      userid:this.userid,
    }
    //var param="https://nea.echoltech.com/auth/"+this.substring+"/cgi-bin/ptz.cgi?action=start&channel=1&code=Down&arg1=0&arg2=1&arg3=0";
    var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=start&channel="+this.substring+"&code=Down&arg1=0&arg2="+this.value+"&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
     
    })
    this.apicall.postMethod("User/UserCameraOperationalInfo",zoomparam).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      var param=this.urlconfig+"/cgi-bin/ptz.cgi?action=stop&channel="+this.substring+"&code=Down&arg1=0&arg2=1&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
    
    })
    },2000)
  }
  stop()
  {
    let zoomparam={
      userid:this.id,
      actionTime: '',
      actionMovement:"stop" 
    }
    var param=this.urlconfig+"/"+this.substring+"/cgi-bin/ptz.cgi?action=start&channel=1&code=AutoPanOff&arg1=0&arg2=0&arg3=0";
    this.http.get(param).subscribe((res:any)=>{
      this.apicall.postMethod("",zoomparam).subscribe((res:any)=>{

      })
    })
  }
getfeed()
{
  location.reload();
}
}
function httpOptions() {
  throw new Error('Function not implemented.');
}

