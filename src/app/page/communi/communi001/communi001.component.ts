import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-communi001',
  templateUrl: './communi001.component.html',
  styleUrls: ['./communi001.component.css']
})
export class Communi001Component implements OnInit {

  constructor() { }

  breadcrumb: any = [
    {
      label: "หมวดสื่อสาร",
      link: "/home/communi",
    },
    {
      label: "ขอใช้วิทยุมือถือ",
      link: "#",
    },
   
  ];
  ngOnInit() {
  }
  ShowModae(){
    $('#myModal').modal('show')
  }
  HideModal(){
    $('#myModal').modal('hide')
  }

}
