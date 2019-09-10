import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from 'src/app/components/modal/modal-confirm/modalConfirm.component';
import { ModalSuccessComponent } from 'src/app/components/modal/modal-success/modalSuccess.component';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { AjaxService } from 'src/app/_service/ajax.service';
import { CommonService } from 'src/app/_service/common.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { Router } from '@angular/router';


let URL = {
  GET_ALL: 'appointment/get_all',
  SAVE: 'appointment/save'
}
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public imagePath1: string;
  public imagePath2: string;
  public imagePath3: string;
  public imagePath4: string;
  public imagePath5: string;
  public imagePath6: string;
  @ViewChild('confirmModal') modalConfirm: ModalConfirmComponent;
  @ViewChild('successModal') modalSuccess: ModalSuccessComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;

  constructor(
    private ajax: AjaxService,
    private commonService: CommonService,
    private router: Router
  ) { }
  breadcrumb: any = [
    {
      label: "Apppointment",
      link: "",
    },
    {
      label: "Apppointment",
      link: "#",
    }
  ];
  appointmentList: any[] = [];
  appointmentId: number;

  ngOnInit() {
    this.getAppointmentList();
    this.imagePath1 = location.origin + location.pathname + '/assets/img/user1.jpg';
    this.imagePath2 = location.origin + location.pathname + '/assets/img/user2.jpg';
    this.imagePath3 = location.origin + location.pathname + '/assets/img/user3.jpg';
    this.imagePath4 = location.origin + location.pathname + '/assets/img/user4.jpg';
    this.imagePath5 = location.origin + location.pathname + '/assets/img/user5.jpg';
    this.imagePath6 = location.origin + location.pathname + '/assets/img/usernumber.jpeg';
  }
 
  // ================ Action =====================

  onDelete(id: number) {
    this.appointmentId = id;
    this.modalConfirm.openModal();
  }

  onClickEdit(id: number) {
    this.router.navigate(['/appointment/appointmentdetail'], {
      queryParams: {
        id: id
      }
    })
  }
  // edit(data){
  //   this.router.navigate(['/appointment/appointmentdetail'], {
  //     queryParams: {
  //       id: data.appointmentId
  //     }
  //   });
  // }


  // ==================== call back-end =====================
  getAppointmentList() {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_ALL, {}).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.appointmentList = res.data;
      } else {
        this.modalError.openModal(res.message);
      }
      this.commonService.unLoading();
    })
  }

  // onClickConfirm() {
  //   this.commonService.loading();
  //   let data = {
  //     roleId: this.appointmentId
  //   }
  //   this.ajax.doPost(URL.DELETE, data).subscribe((res: ResponseData<any>) => {
  //     if (MessageService.MSG.SUCCESS == res.status) {
  //       this.modalSuccess.openModal()
  //       this.getRoleList();
  //     } else {
  //       this.modalError.openModal(res.message);
  //     }
  //     this.commonService.unLoading();
  //   })
  // }

}
