import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmComponent } from 'src/app/components/modal/modal-confirm/modalConfirm.component';
import { ModalSuccessComponent } from 'src/app/components/modal/modal-success/modalSuccess.component';
import { ModalErrorComponent } from 'src/app/components/modal/modal-error/modalError.component';
import { AjaxService } from 'src/app/_service/ajax.service';
import { CommonService } from 'src/app/_service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { MessageService } from 'src/app/_service/message.service';
import { ValidateService } from 'src/app/_service/validate.service';
import { Observable } from 'rxjs';
import { Utils } from 'src/app/common/helper';
let URL = {
  GET_BY_ID: 'appointment/get_by_id',
  SAVE: 'appointment/save',
  LIST: "users/listAll",
  EDIT:"appointment/edit"
}
@Component({
  selector: 'app-appointmentdetail',
  templateUrl: './appointmentdetail.component.html',
  styleUrls: ['./appointmentdetail.component.css']
})


export class AppointmentdetailComponent implements OnInit {
  listCheck: any[] = [];
  @ViewChild('saveModal') modalSave: ModalConfirmComponent;
  @ViewChild('successModal') modalSuccess: ModalSuccessComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;

  formGroup: FormGroup;
  dataEdit: any;
  id: any;
  buttomedit: boolean = true;
  constructor(
    private ajax: AjaxService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validate: ValidateService,
    private formBuilder: FormBuilder
  ) {
    this.setFormGroup();
  }
  userList: any[] = [];
  ngOnInit() {
    this.getList();
    this.formGroup.get('appointmentId').patchValue(this.route.snapshot.queryParams['id']);
    if (this.formGroup.get('appointmentId').value != null && this.formGroup.get('appointmentId').value != '') {
      this.getAppointmentById(this.route.snapshot.queryParams['id']);
    }

   
  }
  checkboxUser(item: any, event) {
    console.log(item.userName);
    if (event.target.checked) {
      this.listCheck.push(item.userName);
    }
    else if (!event.target.checked) {

      const index = this.listCheck.indexOf(item.userName);
      this.listCheck.splice(index, 1);
    }
    console.log("this.listCheck", this.listCheck);
    this.formGroup.setControl('listUser', this.formBuilder.array(this.listCheck));
  }



  getList() {
    this.commonService.loading();
    this.ajax.doPost(URL.LIST, {}).subscribe((res: ResponseData<any>) => {
      console.log("this.dataList : ", res.data);
      this.userList = res.data;
      console.log("this.dataList : ", this.userList);

      this.commonService.unLoading();
    });
  }

  setDatatoFormEdit() {
    this.formGroup.patchValue({
      appointmentId: this.dataEdit.appointmentId,
      title: this.dataEdit.title,
      description: this.dataEdit.description,
      // appointment: this.dataEdit.appointment,
      status: this.dataEdit.status,
      timeStart : this.dataEdit.timeStart,
      timeEnd : this.dataEdit.timeEnd,
      date : this.dataEdit.date,
      listUser : this.dataEdit.listUser,
    })
  }
  setFormGroup() {
    this.formGroup = this.fb.group({
      appointmentId: [""],
      title: ["", Validators.required],
      description: ["", Validators.required],
      // appointment: ["", Validators.required],
      status: ["", Validators.required],
      timeStart: ["", Validators.required],
      timeEnd: ["", Validators.required],
      date: ["", Validators.required],
      listUser: ["", Validators.required],
    })
  }

  getAppointmentById(id : String) {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_BY_ID, {"appointmentId":id}).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.formGroup.patchValue({
          appointmentId: res.data.appointmentId,
          title: res.data.title,
          description: res.data.description,
          // appointment: res.data.appointment,
          status: res.data.status,
          timeStart: res.data.timeStart,
          timeEnd: res.data.timeEnd,
          date: res.data.date,
        })
      } else {
        this.modalError.openModal(res.message);
      }
      this.commonService.unLoading();
    })
  }

  onOpenModalSave() {
    let validateData = [
      { format: "text", header: "Name", value: this.formGroup.get("title").value },
      { format: "text", header: "Description", value: this.formGroup.get("description").value },
      // { format: "text", header: "Appointment", value: this.formGroup.get("appointment").value },
      { format: "text", header: "Status", value: this.formGroup.get("status").value },
      { format: "text", header: "Time Start", value: this.formGroup.get("timeStart").value },
      { format: "text", header: "Time End", value: this.formGroup.get("timeEnd").value },
      { format: "text", header: "Date", value: this.formGroup.get("date").value },
    ];
    if (this.validate.checking(validateData)) {
      if (this.formGroup.invalid) {
        this.modalError.openModal("กรุณากรอกข้อมูลให้ครบ");
      } else {
        this.modalSave.openModal();
      }
    }
  }

  setDate(control, e) {
    this.formGroup.get(control).patchValue(e);
    console.log(e);
  }


  onClickSave() {
    this.saveAppointment().subscribe(() => {
      this.router.navigate(['/appointment/appointment']);
    });
  }
  saveAppointment(): Observable<any> {
    return new Observable<any>(obs => {
      this.commonService.loading();
      this.ajax.doPost(URL.SAVE, this.formGroup.value).subscribe((res: ResponseData<any>) => {
        if (MessageService.MSG.SUCCESS == res.status) {
          obs.next(res.data);
          this.modalSuccess.openModal();
        } else {
          obs.error(res.message);
          this.modalError.openModal(res.message);
        }
        this.commonService.unLoading();
      })
    });
  }

  edit() {
    this.commonService.loading();
    this.ajax.doPost(URL.EDIT, this.formGroup.value).subscribe((res: ResponseData<any>) => {
      console.log(res.data);
      if (MessageService.MSG.SUCCESS == res.status) {
        this.router.navigate(['user/user']);
      } else {
        console.log(res.message);
      }
      this.commonService.unLoading();
    });
  }

}
