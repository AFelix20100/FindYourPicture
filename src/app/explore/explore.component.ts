// explore.component.ts
import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
import { CommonModule } from '@angular/common';
import { Image } from '../image.model';
import { MatRadioModule } from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import * as AOS from 'aos';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  standalone: true,
  imports: [MatCheckboxModule,
            FormsModule,
            CommonModule,
            MatRadioModule,
            MatFormFieldModule,
            MatInputModule,
            MatSliderModule,
            MatButtonToggleModule
          ],
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  images: Image[] = [];
  imageCount: number = 12;
  defaultWidth: number = 1920;
  defaultHeight: number = 1080;
  loading: boolean = false;
  selectedOption: string = '';
  isGrayScale: boolean = false;
  blurLevel: number = 0;
  selectedFormat: string = '.jpg';

  constructor(private exploreService: ExploreService) {}

  ngOnInit(): void {
    this.loadImages();
    AOS.init();
  }

  /**
   * Loads images asynchronously from the ExploreService.
   * Sets the loading state, retrieves random images based on specified parameters,
   * and handles errors while logging any encountered issues.
   * Finally, resets the loading state.
   */
  async loadImages(): Promise<void> {
    this.loading = true;
    try {
      console.log(this.blurLevel);
      this.images = await this.exploreService.getRandomImages(this.imageCount, this.defaultWidth, this.defaultHeight, this.isGrayScale, this.blurLevel);
    } catch (error) {
      console.error('Error loading images', error);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Updates the grayscale setting based on user input.
   * @param isGrayScale Whether to enable grayscale mode.
   */
  update(isGrayScale: boolean): void {
    this.isGrayScale = isGrayScale;
    console.log('Black & White:', this.isGrayScale);
  }

  /**
   * Formats a slider label based on its value.
   * If the value is 10 or more, returns the value divided by 10 and rounded.
   * Otherwise, returns the original value.
   * @param value The value to format.
   * @returns The formatted value.
   */
  formatLabel(value: number): number {
    if (value >= 10) {
      return Math.round(value / 10);
    }
    return value;
  }
}
