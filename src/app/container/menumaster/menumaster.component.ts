import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-menumaster',
  templateUrl: './menumaster.component.html',
  styleUrls: ['./menumaster.component.css']
})
export class MenumasterComponent implements OnInit {
  showUser = false
id:any
subrole:any
role:any
camList:any
substring:any
camip:any

  constructor(private apicall:ApiserviceService,private route:Router) { }

  ngOnInit(): void {
    let userid = localStorage.getItem('userid')
    this.apicall.postMethod('User/GetUserLoginID',{id:userid}).subscribe((res:any)=>{
      console.log('get id -> ',res)
      this.id = res.data
    })

//****************

this.role = localStorage.getItem('role')

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
  this.apicall.getMethod('User/CameraConfig').subscribe((res:any)=>{
    console.log('all cam -> ',res)
    this.camList = res.data
  })
}else{
  this.showUser = false
    this.apicall.postMethod('User/CameraConfigByRole',param).subscribe((res:any)=>{
      console.log('cam by role -> ',res)
      this.camList = res.data
      console.log('camList -> ',this.camList)
      
    })
}
   
    
    

    
    

   
  
    document.getElementById("mySidebar")!.style.width = "250px";
    document.getElementById("main")!.style.marginLeft = "250px";
//***************
  }
  logout(){
    this.apicall.postMethod('User/Logout',{userid:this.id,password:null}).subscribe((res:any)=>{

    })
    setTimeout(()=>{
      localStorage.clear()
      this.apicall.swalSuccess('Successfully Logout')
      this.route.navigate(['/container/login'])
    },500)
    
  }

}
