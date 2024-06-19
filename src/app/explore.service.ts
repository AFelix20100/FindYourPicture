// explore.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  private readonly url: string = 'https://picsum.photos/';
  private defaultWidth: number = 1920;
  private defaultHeight: number = 1080;

  constructor(private http: HttpClient) {}

  getUrl(): string {
    return this.url;
  }

  // getRandomImage(width: number = 1920, height: number = 1080, randomIndex: number): string {
  //   return `${this.url}${width}/${height}?random=${randomIndex}`;
  // }

  getRandomImage(width: number = 1920, height: number = 1080): Promise<any> {
    return fetch(`${this.url}${width}/${height}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur HTTP, status = ' + response.status);
        }
        console.log(response.headers.get("picsum-id"));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de l\'image', error);
        throw error;
      });
  }
  // getRandomImages(count: number): string[] {
  //   let images: string[] = [];
  //   for (let i = 0; i < count; i++) {
  //     const width = this.defaultWidth;
  //     const height = this.defaultHeight;
  //     let image = this.getRandomImage(width, height);
  //     images.push(image);
  //   }
  //   return images;
  // }

  setHeight(height: number): void {
    this.defaultHeight = height;
  }

  setWidth(width: number): void {
    this.defaultWidth = width;
  }

  getRandomTimestamp(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
