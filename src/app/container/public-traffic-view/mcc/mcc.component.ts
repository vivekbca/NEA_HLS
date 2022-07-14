import { Component, OnInit } from '@angular/core';
import { Subscription,interval } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import demodata from 'src/assets/snapshot/snapshot.json';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mcc',
  templateUrl: './mcc.component.html',
  styleUrls: ['./mcc.component.css']
})
export class MccComponent implements OnInit {
  camname:any
  camList:any
  id:any;

  lat = 1.4138;
  lng = 103.8097;
  googleMapType = 'satellite';
  mySubscription: Subscription | undefined  
  FullMapUrl: any;
  Players: any = demodata;
  
  constructor(private apicall:ApiserviceService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.mySubscription= interval(1*60*1000).subscribe((x =>{
      window.location.reload();
  }));
    // let param = {
    //   //ip : this.test,
    //   role : 'CCK',
    //   subrole : null
    // }

    // this.id='User/Snapshot?location=Singapore';
    // this.apicall.getMethod(this.id).subscribe((res:any)=>{
    //   console.log('camlist-> ',res)
    //   this.camList=res.data;
    // })
     //  GOOGLE MAP INTEGRATION
     var url = "https://maps.google.com/maps?q=" + this.lat + "," + this.lng + "&z=16&output=embed";
     this.FullMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  

}
