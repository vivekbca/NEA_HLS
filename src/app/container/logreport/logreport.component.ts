import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { stringify } from '@angular/compiler/src/util';
//import { forEach } from 'core-js/core/array';

@Component({
  selector: 'app-logreport',
  templateUrl: './logreport.component.html',
  styleUrls: ['./logreport.component.css']
})
export class LogreportComponent implements OnInit {
log_report:any
userList:any;
userid:any;
startDate:any
endDate:any
username:any
finalReport:any
iterate:any
iterate2:any
iterate3:any

@ViewChild('htmlData') htmlData!:ElementRef;
  constructor(private apicall:ApiserviceService) { }

  ngOnInit(): void {
    this.username = ''
    this.iterate = 0
    this.iterate2 = 0
    this.iterate3 = 0
    this.apicall.getMethod('User/UserId').subscribe((res:any)=>{
      // console.log('user list -> ',res)
      this.userList = res.data
      // console.log('userList -> ',this.userList)
    }) 
  }
  ExportTOExcel() {  
    let element = document.getElementById('htmlData')!; 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    /* save to file */
    XLSX.writeFile(wb,'report_'+new Date().getTime()+'.xlsx');
   
  } 
  public openPDF():void {
    let DATA = document.getElementById('htmlData')!;
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jspdf('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('Report.pdf');
    });   
   
  }
  OnChange()
  {
    let param = {
      userid : this.userid,
      fromDate : this.startDate,
      toDate : this.endDate
    }
    //let dsh = 'User/UserLogReport?userid='+this.userid;
    this.apicall.postMethod('User/UserLogReport',param).subscribe((resp:any)=>{
      // console.log('log -> ',resp)
       if(resp.message=="failed"){
        this.apicall.swalError('No Data Found')
        return;
       }
     
    this.log_report=resp.data;
    //this.finalReport=resp.data
    this.username = resp.data[0].UserId

      // console.log('log length -> ',this.log_report.length)
     
      for(let i=1;i<this.log_report.length;i++){
        if(this.log_report[this.iterate].LoginDate == this.log_report[i].LoginDate){
          this.log_report[i].LoginDate = ' '
        }else{
          this.iterate = i
        }

        if(this.log_report[this.iterate2].LoginTime == this.log_report[i].LoginTime){
          this.log_report[i].LoginTime = ' '
        }else{
          this.iterate2 = i
        }

        if(this.log_report[this.iterate3].LogoutTime == this.log_report[i].LogoutTime){
          this.log_report[i].LogoutTime = ' '
        }else{
          this.iterate3 = i
        }
      }
      

      // console.log('final report -> ',this.log_report)
})
  }

}
