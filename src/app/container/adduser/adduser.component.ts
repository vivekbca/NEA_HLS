import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiserviceService } from 'src/app/services/apiservice.service'



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  
edit_nameFirst:any
edit_nameLast:any
edit_address:any
edit_phone:any
edit_role:any;
edit_traffic:any;
edit_cemetery:any;
edit_userid:any
edit_ptzcontrol:any
//edit_username:any
edit_password:any

userid1:any
del_userid:any
admin_id:any
  phone:any
  nameFirst:any
  nameLast:any
  address:any
  username:any
  email:any
  passw:any
  role:any
  traffic:any
  cemetery:any
  subRole = false
  subRoleValue1:any
  subRoleValue2:any
  userList:any = []
  checked:any;
  checked2:any;
  userid:any
  flag_adduser = true
  flag_deluser = false
  flag_edituser = false
  flag_admin = false
  pwd1:any
  pwd2:any
  admin_email:any
  idforedit:any;
  eventDel:any
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  mobnumPattern = "^((\\+65-?)|0)?[0-9]{8}$"; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  ptzcontrol:any
  password:any
  
  
  constructor(public route:Router,public apicall:ApiserviceService,private SpinnerService: NgxSpinnerService) { }
  ngOnInit(): void {  
    this.apicall.getMethod('User/UserId').subscribe((res:any)=>{
      // console.log('user list -> ',res)
      this.userList = res.data
      // console.log('userList -> ',this.userList)
    }) 
    this.admin_email=localStorage.getItem('userid')

  }

  config = {
    displayKey: 'userid',
    search: true,
    limitTo: 3,
    height: '200px'
  };

  edit_userChange(){

  }

  createUser(){
    if(this.phone!=null && this.phone!="")
    {
      if(this.phone.length!=8)
      {
        this.apicall.swalError('Mobile Number Should be 8 digit !')
        return;
      }
      else{
        this.phone=this.phone
      }
    }
    if(this.nameFirst == undefined || this.nameFirst.length == 0 || this.nameFirst == null ||
      this.username == undefined || this.username.length == 0 || this.username == null ||
      this.role == undefined || this.role.length == 0 || this.role == null){
      this.apicall.swalError('Empty field !')
      return;
    }
    // if(this.role.length > 0){
    //   if(this.traffic == null && this.cemetery == null){
    //     this.apicall.swalError('Empty checkbox !')
    //   }
    // }

    // if(this.traffic == true){
      this.subRoleValue1 = 'traffic'
    // }
    // if(this.cemetery == true){
      this.subRoleValue2 = 'cemetery'
    // }
    // if(this.traffic == null && this.traffic==undefined){
    //   this.subRoleValue1 = null;
    // }
    // if(this.cemetery == null && this.cemetery==undefined){
    //   this.subRoleValue2 = null;
    // }
    if( this.password == undefined || this.password == null)
    {
      this.apicall.swalError("Password is Required")
      return;
    }
    if(this.nameLast==undefined || this.nameLast==null)
    {
      this.apicall.swalError("Last Name Required")
      return;
    }
    if(this.ptzcontrol==null && this.ptzcontrol==undefined)
    {
      this.apicall.swalError("Select PTZ-CONTROL")
      return;
    }
    if(this.address==null || this.address==undefined || this.address.length == 0)
    {
      this.address='null';
    }
    if(this.phone==null || this.phone==undefined || this.phone.length == 0 || this.phone=="")
    {
      this.phone='';
    }
    


      if(this.nameFirst.length>0 && this.username.length>0 && this.role.length>0){
      let param = {
        firstname : this.nameFirst,
        lastname : this.nameLast,
        address : this.address,
        mobile : this.phone,
        userid : this.username,
        role : this.role,
        traffic : this.subRoleValue1,
        cemetery : this.subRoleValue2,
        permission:this.ptzcontrol,
        password:this.password
      }
      console.log(param)
      this.SpinnerService.show();
      this.apicall.postMethod('User/Create',param).subscribe((res:any)=>{
        // console.log('user create -> ',res)
         this.SpinnerService.hide();
         if(res.message=="duplicate"){
          this.apicall.swalError('Duplicate User Id');
         }
        if(res.message=="success")
        {
          this.apicall.swalSuccess('Added Successfully');
          // this.route.navigate(['/container/dashboard'])
         }
        
      })
    }
  }

  userChange(){
    console.log('user role -> ',this.role)
    if(this.role == 'CCK'){
      this.subRole = true
    }else{
      this.subRole = false
    }
  }

  addUser(){
    this.flag_adduser = true
    this.flag_deluser = false
    this.flag_edituser = false
    this.flag_admin = false
  }

  deleteUser(){
    this.flag_adduser = false
    this.flag_deluser = true
    this.flag_edituser = false
    this.flag_admin = false
    // this.apicall.getMethod('User/UserId').subscribe((res:any)=>{
    //   console.log('user list -> ',res)
    //   this.userList = res.data
    // })
  }

  editUser(){
    this.flag_adduser = false
    this.flag_deluser = false
    this.flag_edituser = true
    this.flag_admin = false
    // this.apicall.getMethod('User/UserId').subscribe((res:any)=>{
    //   console.log('user list -> ',res)
    //   this.userList = res.data
    // })
  }
checkEvent_Edit()
  {

    //this.SpinnerService.show()
    // console.log(this.edit_userid);
    this.userid = this.edit_userid
    var id='User/UserInfo?id='+this.edit_userid;
    // this.idforedit = this.edit_userid
    this.apicall.getMethod(id).subscribe((res:any)=>{
      // console.log("User edit data",res)
    this.SpinnerService.hide();
    if(res.message=="restrict")
    {
      this.apicall.swalError('Admin User Can not be Edited.');
      setTimeout(()=>{
location.reload();
      },1000
      )
      //location.reload();
    }
     if(res.message=="success")
     {
       this.idforedit=res.data.userid;
        this.edit_nameFirst = res.data.firstname;
        this.edit_nameLast = res.data.lastname;
        if(res.data.mobile=='null')
        {
          this.edit_phone='';
        }
        else{
          this.edit_phone=res.data.mobile;
        }
        if(res.data.address=='null')
        {
          this.edit_address='';
        }
        else{
          this.edit_address=res.data.address;
        }
        this.edit_role=res.data.role;
        this.edit_password = res.data.password;
        this.edit_ptzcontrol = res.data.permission;
        // if(this.edit_role=="CCK")
        // {
        //   this.subRole=true;
        //   if(res.data.cemetery=='cemetery')
        //   {
        //     this.edit_cemetery=true;
        //   }else{
        //     this.edit_cemetery=false;
        //   }

        //   if(res.data.traffic=='traffic')
        //   {
        //     this.edit_traffic=true;
        //   }
        //   else{
        //     this.edit_traffic=false;
        //   }
        // }else{
        //   this.subRole=false;
        // }

     }
      
   })
  }
  editAdmin(){
    this.flag_adduser = false
    this.flag_deluser = false
    this.flag_edituser = false
    this.flag_admin = true
  }

  del_User(){
    if(this.del_userid == undefined || this.del_userid.length == 0 || this.del_userid == null)
      {
      
      this.apicall.swalError('Select User ID!')
    }else{
      // console.log('del user -> ',this.del_userid)
    let param = {
      id : this.del_userid
    }
    this.SpinnerService.show();
    this.apicall.postMethod('User/Delete',param).subscribe((res:any)=>{
     this.SpinnerService.hide();
     if(res.message=="restrict"){
      this.apicall.swalError('Admin User Can not be deleted.');
     }
      if(res.message=="success")
      {
     this.apicall.swalSuccess('Deleted Successfully');
     location.reload();
      }
      
    })
    }
     
    this.apicall.getMethod('User/UserId').subscribe((res:any)=>{
      // console.log('user list -> ',res)
      this.userList = res.data
      // console.log('userList -> ',this.userList)
    }) 
  }
  edit_Admin(){
    
    if(this.pwd1 == null || this.pwd1 == undefined || this.pwd2 == null || this.pwd2 == undefined || this.admin_email == null || this.admin_email == undefined){
      this.apicall.swalError('Empty field !')
    }else if(this.pwd1 != this.pwd2){
      this.apicall.swalError('Password mismatch !')
    }
    else{
      let param={
        role:'admin',
        password:this.pwd1,
        email:this.admin_email
      }
      console.log(param)
      this.SpinnerService.show();
      this.apicall.postMethod('User/UpdateAdmin',param).subscribe((res:any)=>{
       this.SpinnerService.hide();
        // console.log('Update_Admin response -> ',res)
        if(res.message=="success")
        {
          this.apicall.swalSuccess('Password updated successfully')
          location.reload();
        }
        
      })
      
    }
  }
  edit_User(){
    if(this.userid == undefined || this.userid.length == 0 || this.userid == null)
    {
     this.apicall.swalError('Select User ID!')
     return;
  }
  if(this.edit_nameFirst == undefined || this.edit_nameFirst.length == 0 || this.edit_nameFirst == null)
  {
  this.apicall.swalError( "Firstname Can't be null !")
  return;
}
if(this.edit_ptzcontrol== undefined || this.edit_ptzcontrol.length == 0 || this.edit_ptzcontrol==null)
{
  this.apicall.swalError( "PTZ Control Can't be null !")
  return;
}
if(this.edit_role== undefined || this.edit_role.length == 0 || this.edit_role == null)
{
  this.apicall.swalError( "User Category Can't be null !")
  return;
}
// if(this.role.length > 0){
//   if(this.traffic == null && this.cemetery == null){
//     this.apicall.swalError('Empty checkbox !')
//   }
// }
// if(this.edit_address == undefined || this.edit_address.length == 0 || this.edit_address == null)
//   {
//   this.apicall.swalError( "Address Can't be null !")
// }
// if(this.edit_phone == undefined || this.edit_phone.length == 0 || this.edit_phone == null)
//   {
//   this.apicall.swalError( "Phone Can't be null !")
// }
  
    // if(this.edit_traffic == true){
      this.subRoleValue1 = 'traffic'
    // }
    // if(this.edit_cemetery == true){
      this.subRoleValue2 = 'cemetery'
    // }
    // if(this.edit_traffic == null && this.edit_traffic==undefined){
    //   this.subRoleValue1 = "null";
    // }
    // if(this.edit_cemetery == null && this.edit_cemetery==undefined){
    //   this.subRoleValue2 = "null";
    // }
    let param = {
      id:this.edit_userid,
      firstname : this.edit_nameFirst,
      lastname : this.edit_nameLast,
      address : this.edit_address,
      mobile : this.edit_phone,
      role : this.edit_role,
      traffic : this.subRoleValue1,
      cemetery : this.subRoleValue2,
      userid : this.idforedit,
      password: this.edit_password,
      permission: this.edit_ptzcontrol
    }
    this.SpinnerService.show()
    this.apicall.postMethod('User/Update',param).subscribe((res:any)=>{
      this.SpinnerService.hide();
      // console.log('update response -> ',res)
      if(res.message=="success")
      {
    this.apicall.swalSuccess('Updated Successfully');
    // location.reload();
      }
  })
}

  checkEvent_del(event:any){

  }
}
