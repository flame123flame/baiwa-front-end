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
  GET_ALL: 'news/get_all',
  SAVE: 'news/save'
}

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
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
      label: "News",
      link: "#",
    }
  ];
  newsList: any[] = [];
  newstId: number;
  ngOnInit() {
    this.getNewsList();
  }

  onDelete(id: number) {
    this.newstId = id;
    this.modalConfirm.openModal();
  }

  onClickEdit(id: number) {
    this.router.navigate(['/appointment/newsdetail'], {
      queryParams: {
        id: id
      }
    })
  }


  // ==================== call back-end =====================
  getNewsList() {
    this.commonService.loading();
    this.ajax.doPost(URL.GET_ALL, {}).subscribe((res: ResponseData<any>) => {
      if (MessageService.MSG.SUCCESS == res.status) {
        this.newsList = res.data;
      } else {
        this.modalError.openModal(res.message);
      }
      this.commonService.unLoading();
    })
  }
}
