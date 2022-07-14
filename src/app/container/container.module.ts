import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { ContainerRoutingModule } from './container-routing.module';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdduserComponent } from './adduser/adduser.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CameraconfigComponent } from './cameraconfig/cameraconfig.component';
import { LogreportComponent } from './logreport/logreport.component';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { MenumasterComponent } from './menumaster/menumaster.component';
import { SnaponeComponent } from './snapone/snapone.component';
import { SnaptwoComponent } from './snaptwo/snaptwo.component';
import { CkkComponent } from './public-traffic-view/ckk/ckk.component';
import { MccComponent } from './public-traffic-view/mcc/mcc.component';
import { AgmCoreModule } from '@agm/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MasterheaderComponent } from './masterheader/masterheader.component';
import { DashboardviewonlyComponent } from './dashboardviewonly/dashboardviewonly.component';
//import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [LoginComponent, HeaderComponent, DashboardComponent, AdduserComponent, CameraconfigComponent, LogreportComponent, SnapshotComponent, MenumasterComponent, SnaponeComponent, SnaptwoComponent, CkkComponent, MccComponent, MasterheaderComponent, DashboardviewonlyComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgxSpinnerModule ,
    NgxSliderModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBFhplo6qJppdJ7wyJpnoZfzYGk2LbKqdY',
    //   libraries: ['places']
    // })
  ],
  providers: [ApiserviceService,DashboardComponent],
})
export class ContainerModule { }
