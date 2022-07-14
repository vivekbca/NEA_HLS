import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-masterheader',
  templateUrl: './masterheader.component.html',
  styleUrls: ['./masterheader.component.css']
})
export class MasterheaderComponent implements OnInit {

role:any;
showUser=false;
userid:any
loginid:any;
  constructor(private apicall:ApiserviceService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    
    if(this.role == 'admin'){
      this.showUser = true
      
    }else{
      this.showUser = false
       
    }
  }
  logout()
  {
    this.loginid=localStorage.getItem('loginid');
    let param = {
      ID : this.loginid
    }
    this.apicall.postMethod('User/Logout',param).subscribe((res:any)=>{

    })
  }
}
