import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communi002detail',
  templateUrl: './communi002detail.component.html',
  styleUrls: ['./communi002detail.component.css']
})
export class Communi002detailComponent implements OnInit {

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

}
