import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'CodeSpark';
  username = 'pangpang';
  searchBox: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}
}
