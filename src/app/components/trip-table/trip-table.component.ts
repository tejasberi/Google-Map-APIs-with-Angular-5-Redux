import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.scss']
})
export class TripTableComponent implements OnInit {

 @Input() tableData: any;

  constructor() { }

  ngOnInit() {
  }

}
