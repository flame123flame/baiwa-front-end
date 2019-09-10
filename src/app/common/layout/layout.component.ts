import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_service/common.service';
import { UserService } from 'src/app/_service/user.service.';
import { User } from 'src/app/_model/User';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  alertSuccess: boolean = false;
  alertDanger: boolean = false;
  user: User = new User;
  constructor(
    private router: Router,
    private common: CommonService,
    // private userSV: UserService,
  ) {
    // common.loading();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.common.unLoading();
    // }, 2000);
  }


  ngOnInit() {
    // console.log("UserService: ", this.userSV.currentUserValue);
    // this.user.fullName = this.userSV.currentUserValue.fullName;
    // this.user.token = this.userSV.currentUserValue.token;
    // this.user.organizeCode = this.userSV.currentUserValue.organizeCode;
    // this.user.organizeDesc = this.userSV.currentUserValue.organizeDesc;
    // this.user.authorities = this.userSV.currentUserValue.authorities;
    // this.user.username = this.userSV.currentUserValue.username;

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(".dataTables_scrollHeadInner").css({ "width": "100%" });
        $(".table ").css({ "width": "100%" });
      });
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  otherClick() {
    $(document).ready(function () {
      $('#sidebar').addClass('active');
      $(".dataTables_scrollHeadInner").css({ "width": "100%" });
      $(".table ").css({ "width": "100%" });
    });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  toTop() {

  }

  


}
