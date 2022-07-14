import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-snapshot',
  templateUrl: './snapshot.component.html',
  styleUrls: ['./snapshot.component.css']
})
export class SnapshotComponent implements OnInit {
  camera_ip:any
  camList :any;
  hour:any
  min:any
  sec:any

  constructor(private apicall:ApiserviceService) { }

  ngOnInit(): void {
    // this.apicall.getMethod('User/CameraConfig').subscribe((res:any)=>{
    //   console.log('all cam -> ',res)
    //   this.camList = res.data
    // })
  }
  getSnapshot(){
    let param={
      min:this.min
    }
    this.apicall.postMethod('',param).subscribe((res:any)=>
    {
      
    })
  }
  
}
