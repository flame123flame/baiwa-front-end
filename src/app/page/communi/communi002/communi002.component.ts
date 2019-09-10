import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-communi002',
  templateUrl: './communi002.component.html',
  styleUrls: ['./communi002.component.css']
})
export class Communi002Component implements OnInit {

  constructor() { }


  breadcrumb: any = [
    {
      label: "หมวดสื่อสาร",
      link: "/home/communi",
    },
    {
      label: "ขอยกเลิกการใช้วิทยุมือถือ",
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
