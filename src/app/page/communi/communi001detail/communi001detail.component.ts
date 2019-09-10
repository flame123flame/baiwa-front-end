import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-communi001detail',
  templateUrl: './communi001detail.component.html',
  styleUrls: ['./communi001detail.component.css']
})
export class Communi001detailComponent implements OnInit {

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
