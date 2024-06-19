// explore.component.ts
import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
import { CommonModule } from '@angular/common';
import { Image } from '../image.model';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import * as AOS from 'aos';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  images: Image[] = [];
  imageCount: number = 12;
  defaultWidth: number = 1920;
  defaultHeight: number = 1080;
  loading: boolean = false;
  selectedOption: string = ''; // Initialiser la propriété ici
  
  constructor(private exploreService: ExploreService) {}

  ngOnInit(): void {
    this.loadImages();
    AOS.init();
  }

  async loadImages(): Promise<void> {
    this.loading = true;
    try {
      this.images = await this.exploreService.getRandomImages(this.imageCount, this.defaultWidth, this.defaultHeight);
    } catch (error) {
      console.error('Erreur lors du chargement des images', error);
    } finally {
      this.loading = false;
    }
  }

  onReloadImages(): void {
    // Vous pouvez maintenant accéder à this.selectedOption pour connaître l'option sélectionnée
    console.log('Option sélectionnée:', this.selectedOption);
    this.loadImages();
  }

  // onReloadImages(): void {
  //   // Force le navigateur à recharger l'image en ajoutant un timestamp aléatoire
  //   this.images = this.exploreService.getRandomImages(this.imageCount).map(url => `${url}?${this.exploreService.getRandomTimestamp()}`);
  // }
}
