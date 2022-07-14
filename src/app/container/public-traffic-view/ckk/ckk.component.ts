import { Component, OnInit } from '@angular/core';
import { Subscription ,interval} from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import demodata from 'src/assets/snapshot/snapshot.json';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ckk',
  templateUrl: './ckk.component.html',
  styleUrls: ['./ckk.component.css']
})
export class CkkComponent implements OnInit {
  camname:any
  camList:any
  id:any
  camlist:any
  mySubscription: Subscription | undefined  
  lat = 1.3798;
  lng = 103.6890;
  FullMapUrl: any;

  Players: any = demodata;

  constructor(private apicall:ApiserviceService, private sanitizer: DomSanitizer,private http:HttpClient) { }

  ngOnInit(): void {
    this.mySubscription= interval(10*60*1000).subscribe((x =>{
      location.reload();
     
      
  }));

  // var param="https://nea.echoltech.com/auth/cgi-bin/snapshot.cgi?channel=4";
  // this.http.get(param).subscribe((res:any)=>{  
  //   console.log("SnapShot Response",res)
  // });

  this.apicall.getMethod('User/snap1').subscribe((res:any)=>{
    console.log('snap1 -> ',res)
  
  })
  //   let param = {
  //     //ip : this.test,
  //     role : 'CCK',
  //     subrole : null
  //   }
  //   this.id='User/Snapshot?location=Singapore';
  //   this.apicall.getMethod(this.id).subscribe((res:any)=>{
  //   console.log('camlist-> ',res)
  //   this.camList=res.data;
  // })

    // console.log('demodata -> ',this.Players.cck_cam1.last_update)
    //  GOOGLE MAP INTEGRATION
    var url = "https://maps.google.com/maps?q=" + this.lat + "," + this.lng + "&z=16&output=embed";
    this.FullMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
