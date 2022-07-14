import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiserviceService } from 'src/app/services/apiservice.service'

enum CheckBoxType { TRAFFIC, CEMETERY, NONE }

@Component({
  selector: 'app-cameraconfig',
  templateUrl: './cameraconfig.component.html',
  styleUrls: ['./cameraconfig.component.css']
})
export class CameraconfigComponent implements OnInit {
  role:any
  subrole_flag = false
  camera_ip:any
  camList:any
  subrole:any
  test = ''
  check_box_type = CheckBoxType
  currentlyChecked:any
  camera_name:any
  camname:any
  cam_name:any
  flag_addCamera=true;
  flag_deleteCamera=false;
  flag_editCamera=false;
  edit_cameraid:any;
  camListfordel:any;
  channelNumber:any;
  CameraName:any;
  CameraIp:any;
  editRole:any;
  CameraID:any;

  constructor(public apicall:ApiserviceService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.apicall.getMethod('User/CameraConfigforedit').subscribe((res:any)=>{
      console.log('all cam -> ',res)
      this.camListfordel = res.data
    })
  }

  addCamera()
  {
    this.flag_addCamera = true
    this.flag_deleteCamera = false
    this.flag_editCamera = false
  }
  deleteCamera(){ 
    this.flag_addCamera = false
    this.flag_deleteCamera = true
    this.flag_editCamera = false
  }
  editCamera(){
    this.flag_addCamera = false
    this.flag_deleteCamera = false
    this.flag_editCamera = true
  }
  selectCheckBox(targetType: CheckBoxType) {
    // console.log('checkbox -> ',targetType)
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }
    this.currentlyChecked = targetType;
  }
  changeUser(){
    if(this.role == 'CCK'){
      this.subrole_flag = true
    }else{
      this.subrole_flag = false
    }
  }
  getCam(){
    this.camList = []
    // console.log('role -> ',this.role)
    if(this.role == undefined || this.role == null){
      this.apicall.swalError('Select User Role')
      return;
    }
    
    let param = {
      //ip : this.test,
      role : this.role
    }

    this.apicall.postMethod('User/CameraConfigByRole',param).subscribe((res:any)=>{
      // console.log('cam by role -> ',res)
      this.camList = res.data
    })
  }

  addCam(){
    // console.log('sub role -> ',this.currentlyChecked)
    // if(this.currentlyChecked == 0){
      this.subrole = 'traffic'
    //}
    // else if(this.currentlyChecked == 1){
      this.subrole = 'cemetery'
   // }
    // else{
    //   this.subrole = null
    // }
    if(this.role == undefined || this.role == null){
      this.apicall.swalError('Select User Role')
      return;
    }
    if(this.camera_name==undefined || this.camera_name == null)
    {
      this.apicall.swalError('Channel Number Required')
      return;
    }
    if(this.cam_name==undefined || this.cam_name == null)
    {
      this.apicall.swalError('Camera Name Required')
      return;
    }
    if(this.camera_ip==undefined || this.camera_ip == null)
    {
      this.apicall.swalError('Camera IP Required')
      return;
    }
    let param = {
      ip : this.camera_ip,
      role : this.role,
      subrole : this.subrole,
      name : this.camera_name,
      cameraname:this.cam_name
    } 

    this.apicall.postMethod('User/AdminCameraConfig',param).subscribe((res:any)=>{
      // console.log('cam add -> ',res)
      if(res.message=="success")
      {
        this.apicall.swalSuccess("Camera Added Succesful.")
        location.reload();
      }
    })

  }

  EditCam()
  {
      this.subrole = 'traffic'
      this.subrole = 'cemetery'

    if(this.editRole == undefined || this.editRole == null || this.editRole==""){
      this.apicall.swalError('Select User Role')
      return;
    }
    if(this.channelNumber==undefined || this.channelNumber == null || this.channelNumber=="")
    {
      this.apicall.swalError('Channel Number Required')
      return;
    }
    if(this.CameraName==undefined || this.CameraName == null || this.CameraName=="")
    {
      this.apicall.swalError('Camera Name Required')
      return;
    }
    if(this.CameraIp==undefined || this.CameraIp == null || this.CameraIp=="")
    {
      this.apicall.swalError('Camera IP Required')
      return;
    }
    let param = {
      id:this.CameraID,
      ip : this.CameraIp,
      role : this.editRole,
      subrole : this.subrole,
      name : this.channelNumber,
      cameraname:this.CameraName
    } 
    this.SpinnerService.show()
    this.apicall.postMethod('User/UpdateCamera',param).subscribe((res:any)=>{
      this.SpinnerService.hide();
      if(res.message=="success")
      {
      this.apicall.swalSuccess('Updated Successfully');
      location.reload();
      }
  })
  }
  removeCam(){
    if(this.role == undefined || this.role == null){
      this.apicall.swalError('Select User Role')
      return;
    }
   if(this.camname==undefined || this.camname==null)
    {
      this.apicall.swalError('Select Camera Name')
      return;
    }
      this.subrole = 'traffic'
        
    let param = {
      cameraname : this.camname,

    }
    
this.apicall.postMethod('/User/RemoveAdminCameraConfig',param).subscribe((res:any)=>
{
// if(res.message=="success")
// {
  this.apicall.swalSuccess("Camera removed Successfull");
  location.reload();
// }
// else{
//   this.apicall.swalError("Error");
// }
})
 }
 checkEvent_Edit()
 {
  //  console.log("Camera ID",this.edit_cameraid)
   this.SpinnerService.show()
   var id='User/CameraInfo?id='+this.edit_cameraid;
   this.apicall.getMethod(id).subscribe((res:any)=>{
   this.SpinnerService.hide();
    if(res.message=="success")
    {
      // console.log(res)
      this.CameraID=res.data.ID;
      this.CameraIp=res.data.cameraIP;
      this.CameraName=res.data.cameraname;
      this.channelNumber=res.data.name;
      this.editRole=res.data.role
    }
     
  })
 }

  }
