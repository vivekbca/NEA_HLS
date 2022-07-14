import { Component, OnInit } from '@angular/core';
import { Subscription,interval } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-snaptwo',
  templateUrl: './snaptwo.component.html',
  styleUrls: ['./snaptwo.component.css']
})
export class SnaptwoComponent implements OnInit {

  camname:any
  camList:any
  id:any;

  lat = 1.4138;
  lng = 103.8097;
  mySubscription: Subscription | undefined  

  constructor(private apicall:ApiserviceService) { }

  ngOnInit(): void {
    this.mySubscription= interval(1*60*1000).subscribe((x =>{
      window.location.reload();
  }));
    let param = {
      //ip : this.test,
      role : 'CCK',
      subrole : null
    }

    this.id='User/Snapshot?location=Singapore';
    this.apicall.getMethod(this.id).subscribe((res:any)=>{
      console.log('camlist-> ',res)
      this.camList=res.data;
    })
  }
  doStuff()
  {
    console.log("HI")
  
  }

}
