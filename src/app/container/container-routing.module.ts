import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AdduserComponent } from './adduser/adduser.component'
import { AuthGuard } from '../auth.guard';
import { CameraconfigComponent } from './cameraconfig/cameraconfig.component';
import { LogreportComponent } from './logreport/logreport.component';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { SnaponeComponent } from './snapone/snapone.component';
import { SnaptwoComponent } from './snaptwo/snaptwo.component';
import { CkkComponent } from './public-traffic-view/ckk/ckk.component';
import { MccComponent } from './public-traffic-view/mcc/mcc.component';
import { DashboardviewonlyComponent } from './dashboardviewonly/dashboardviewonly.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
      canActivate: [AuthGuard]
  },
  {
    path: 'adduser',
    component: AdduserComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'cameraconfig',
    component: CameraconfigComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logreport',
    component: LogreportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'snapshot',
    component: SnapshotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboardviewonly',
    component: DashboardviewonlyComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'public-traffic-view/cck',
  //   component: CkkComponent
    
  // },
  // {
  //   path: 'public-traffic-view/mcc',
  //   component: MccComponent
    
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
