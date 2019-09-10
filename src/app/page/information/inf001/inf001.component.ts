import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inf001',
  templateUrl: './inf001.component.html',
  styleUrls: ['./inf001.component.css']
})
export class Inf001Component implements OnInit {
  imagePath:string
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
    this.imagePath = location.origin + location.pathname + './../../../../assets//img//TPAC.jpg';
  }

}
