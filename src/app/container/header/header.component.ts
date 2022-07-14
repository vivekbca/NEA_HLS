import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service'

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
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role:any  
  showUser = false

  constructor(private route:Router,private apicall:ApiserviceService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    
    if(this.role == 'admin'){
      this.showUser = true
      
    }else{
      this.showUser = false
       
    }
  }

  
adduser(){
  // let role = localStorage.getItem('user_role')
  // console.log('role -> ',role)
  // if(role == 'admin'){
  //   this.route.navigate(['/container/adduser'])
  // }else{
  //   this.apicall.swalError('Unauthorize Access !!')
  // }
  this.route.navigate(['/container/adduser'])
}

logout(){
  new StopWebSocket1()
  new StopWebSocket2()
  new StopWebSocket3()
  new StopWebSocket4()
  new StopWebSocket5()
  new StopWebSocket6()
  new StopWebSocket7()
  new StopWebSocket8()
  new StopWebSocket9()
  new StopWebSocket10()
  new StopWebSocket11()
  new StopWebSocket12()
  new StopWebSocket13()
  new StopWebSocket14()
  new StopWebSocket15()
  new StopWebSocket16()
  new StopWebSocket17()
  new StopWebSocket18()
  new StopWebSocket19()
  new StopWebSocket20()
  localStorage.clear()
  this.apicall.swalSuccess('Successfully Logout')
  this.route.navigate(['/container/login'])
}

}
