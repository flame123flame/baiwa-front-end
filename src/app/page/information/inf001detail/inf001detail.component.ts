import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inf001detail',
  templateUrl: './inf001detail.component.html',
  styleUrls: ['./inf001detail.component.css']
})
export class Inf001detailComponent implements OnInit {

  constructor() { }
  breadcrumb: any = [
    {
      label: "ข่าวสาร",
      link: "",
    },
    {
      label: "จัดการข่าว",
      link: "#",
    }
  ];
  ngOnInit() {
  }

}
