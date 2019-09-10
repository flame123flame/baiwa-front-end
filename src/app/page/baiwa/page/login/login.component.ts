import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AjaxService } from 'src/app/_service/ajax.service';
import { ResponseData } from 'src/app/common/models/response-data.model';
import { CommonService } from 'src/app/_service/common.service';
import { User } from 'src/app/_model/User';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public imagePath: string;
  public username: string = '';
  public password: string = '';
  public modalRef: BsModalRef;
  public user: User = new User;
  constructor(private router: Router
    , private modalService: BsModalService
    , private ajax: AjaxService
    , private commonService: CommonService) {

  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.imagePath = location.origin + location.pathname + '/assets/img/Logo_AOT.png';
  }

  login(template) {
    this.commonService.loading();
    let param = { username: this.username, password: this.password };
    this.ajax.doPostLogin("token/generate-token", param).subscribe((response: User) => {
      this.commonService.unLoading();
      if (response) {
        // this.user.fullName = response.fullName;
        // this.user.token = response.token;
        // this.user.organizeCode = response.organizeCode;
        // this.user.organizeDesc = response.organizeDesc;
        // this.user.authorities = response.authorities;
        // this.user.username = response.username;
        // User
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        // localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']);
      } else {
        localStorage.removeItem('currentUser');
        this.modalRef = this.modalService.show(template);
        this.modalRef.content.onClose.subscribe(result => {
          console.log('results', result);
        });

      }

    });


    // if(this.username =='admin' && this.password == 'password' ){
    //   this.router.navigate(['/home']);
    // }else{
    //   this.modalRef = this.modalService.show(template);
    //   this.modalRef.content.onClose.subscribe(result => {
    //       console.log('results', result);
    //   });
    // }

  }

}
