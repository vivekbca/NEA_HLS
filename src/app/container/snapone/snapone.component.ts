import { Component, OnInit } from '@angular/core';
import { Subscription ,interval} from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-snapone',
  templateUrl: './snapone.component.html',
  styleUrls: ['./snapone.component.css']
})
export class SnaponeComponent implements OnInit {
  camname:any
  camList:any
  id:any
  camlist:any
  mySubscription: Subscription | undefined  
  lat = 1.3798;
  lng = 103.6890;

  constructor(private apicall:ApiserviceService) { }

  ngOnInit(): void {
      this.mySubscription= interval(1*60*1000).subscribe((x =>{
        location.reload();
      // this.doStuff();
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
  doStuff(){
   
  }

}
