// explore.component.ts
import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
import { CommonModule } from '@angular/common';

import * as AOS from 'aos';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  images: string[] = [];
  imageCount: number = 12;

  constructor(private exploreService: ExploreService) {}

  ngOnInit(): void {
    // this.loadImages();
    this.exploreService.getRandomImage(1920,1080);
    AOS.init();
  }

  // loadImages(): void {
  //   this.images = this.exploreService.getRandomImages(this.imageCount);
  // }

  // onReloadImages(): void {
  //   // Force le navigateur à recharger l'image en ajoutant un timestamp aléatoire
  //   this.images = this.exploreService.getRandomImages(this.imageCount).map(url => `${url}?${this.exploreService.getRandomTimestamp()}`);
  // }
}
