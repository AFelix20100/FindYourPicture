// explore.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {
  private readonly url: string = 'https://picsum.photos';
  private readonly infoUrl: string = 'https://picsum.photos/id';
  private defaultWidth: number = 1920;
  private defaultHeight: number = 1080;

  constructor(private http: HttpClient) {}

  getUrl(): string {
    return this.url;
  }

  getImage(width: number = 1920, height: number = 1080, id: number): string {
    return `${this.url}/id/${id}/${width}/${height}`;
  }

  async getRandomImage(width: number = 1920, height: number = 1080): Promise<string> {
    try {
      const response = await fetch(`${this.url}/${width}/${height}`);
      if (!response.ok) {
        throw new Error('Erreur HTTP, status = ' + response.status);
      }
      const picsumId = response.headers.get("picsum-id");
      if (!picsumId) {
        throw new Error('picsum-id header is missing');
      }
      return picsumId;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image', error);
      throw error;
    }
  }

  async getImageInfo(id: string, width: number = 1920, height: number = 1080): Promise<Image> {
    try {
      const response = await fetch(`${this.infoUrl}/${id}/info`);
      if (!response.ok) {
        throw new Error('Erreur HTTP, status = ' + response.status);
      }
      const imageInfo = await response.json();
      return {
        id: imageInfo.id,
        author: imageInfo.author,
        url: imageInfo.url,
        download_url: `${this.url}/id/${id}/${width}/${height}`
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'image', error);
      throw error;
    }
  }

  async getRandomImages(count: number, width: number = 1920, height: number = 1080): Promise<Image[]> {
    let images: Image[] = [];
    for (let i = 0; i < count; i++) {
      try {
        const id = await this.getRandomImage();
        const imageInfo = await this.getImageInfo(id, width, height);
        images.push(imageInfo);
      } catch (error) {
        console.error(`Erreur lors de la récupération de l'image ${i}`, error);
      }
    }
    return images;
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
