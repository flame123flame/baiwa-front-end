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

let URL = {
  GET_BY_ID: 'news/get_by_id',
  SAVE: 'news/save',
  LIST: "users/listAll",
  EDIT:"news/edit"
}

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {
  listCheck: any[] = [];
  @ViewChild('saveModal') modalSave: ModalConfirmComponent;
  @ViewChild('successModal') modalSuccess: ModalSuccessComponent;
  @ViewChild('errorModal') modalError: ModalErrorComponent;

  formGroup: FormGroup;
  public imagePath;
  public message: string;
  imgURL: any;
  submit = true;
  
  fileName: String;
  file: any;
  pathImage: string;
  isInital: boolean;
  imageSrc:any;
  cmsId: string;
  submitted = false;  
  sizeImage: number;
  showSize: string;
  minDate: Date;
  maxDate_start: Date;
  maxDate: Date;
  typeCms:string;

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
  breadcrumb: any = [
    {
      label: "Apppointment",
      link: "",
    },
    {
      label: "News",
      link: "#",
    }
  ];
  id: any;
  userList: any[] = [];
  ngOnInit() {
    this.getList();

    this.formGroup.get('newsId').patchValue(this.route.snapshot.queryParams['id']);
    if (this.formGroup.get('newsId').value != null && this.formGroup.get('newsId').value != '') {
      this.getNewstById(this.route.snapshot.queryParams['id']);
     
    }

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
  setFormGroup() {
    this.formGroup = this.fb.group({
      newsId: [""],
      title: ["", Validators.required],
      description: ["", Validators.required], 
      startdate: ["", Validators.required],
      enddate: ["", Validators.required],
    
    })
  }

  getNewstById(id : String) {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_BY_ID, {"newsId":id}).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.formGroup.patchValue({
          newsId: res.data.newsId,
          title: res.data.title,
          description: res.data.description,
          startdate: res.data.startdate,
          enddate: res.data.enddate,       
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
      { format: "text", header: "StartDate", value: this.formGroup.get("startdate").value },
      { format: "text", header: "EndDate", value: this.formGroup.get("enddate").value },
    
    ];
    // console.log('55555this',this.formGroup.value);
    
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
      this.router.navigate(['/appointment/news']);
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


