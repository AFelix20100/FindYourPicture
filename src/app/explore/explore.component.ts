import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  title = 'FindYourPicture';
  ngOnInit() {
    AOS.init();
  }
}
