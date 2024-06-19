import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as AOS from 'aos';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  ngOnInit() {
    AOS.init();
  }
}
