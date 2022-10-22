import { Component,Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-institution-box',
  templateUrl: './institution-box.component.html',
  styleUrls: ['./institution-box.component.scss']
})
export class InstitutionBoxComponent implements OnInit {
  @Input() institution: any;

  constructor() { }

  ngOnInit(): void {
  }

}
