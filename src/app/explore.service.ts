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

  constructor(private http: HttpClient) {}

  getUrl(): string {
    return this.url;
  }

  /**
   * Asynchronously retrieves a random image from Picsum Photos API based on the provided dimensions.
   * @param width The width of the image (default: 1920).
   * @param height The height of the image (default: 1080).
   * @returns Promise resolving to the Picsum ID of the retrieved image.
   */
  async getRandomImage(width: number = 1920, height: number = 1080): Promise<string> {
    try {
      let url = `${this.url}/${width}/${height}`;
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      const picsumId = response.headers.get("picsum-id");
      if (!picsumId) {
        throw new Error('picsum-id header is missing');
      }
      return picsumId;
    } catch (error) {
      console.error('Error while retrieving the image', error);
      throw error;
    }
  }

  /**
   * Asynchronously retrieves detailed information about an image from the Picsum Photos API.
   * @param id The ID of the image.
   * @param width The desired width of the image (default: 1920).
   * @param height The desired height of the image (default: 1080).
   * @param isGrayScale Whether the image should be in grayscale (default: false).
   * @param blurLevel The level of blur to apply to the image (default: 0).
   * @param selectedFormat The selected image format (default: "jpg").
   * @returns Promise resolving to an Image object containing image details.
   */
  async getImageInfo(id: string, width: number = 1920, height: number = 1080, isGrayScale: boolean = false, blurLevel: number = 0, selectedFormat: string = "jpg"): Promise<Image> {
    try {
      const response = await fetch(`${this.infoUrl}/${id}/info`);
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      let firstParam = true;
      const imageInfo = await response.json();
      let downloadUrl = `${this.url}/id/${id}/${width}/${height}`;

      if (isGrayScale) {
        downloadUrl += firstParam ? '?grayscale' : '&grayscale';
        firstParam = false;
      }

      if (blurLevel > 0) {
        downloadUrl += firstParam ? `?blur=${blurLevel}` : `&blur=${blurLevel}`;
        firstParam = false;
      }


      console.log(downloadUrl);
      return {
        id: imageInfo.id,
        author: imageInfo.author,
        url: imageInfo.url,
        download_url: downloadUrl
      };
    } catch (error) {
      console.error('Error retrieving image information', error);
      throw error;
    }
  }

  /**
   * Asynchronously retrieves a batch of random images from the Picsum Photos API.
   * @param count The number of random images to fetch.
   * @param width The desired width of each image (default: 1920).
   * @param height The desired height of each image (default: 1080).
   * @param isGrayScale Whether the images should be in grayscale (default: false).
   * @param blurLevel The level of blur to apply to each image (default: 0).
   * @param selectedFormat The selected image format (default: "jpg").
   * @returns Promise resolving to an array of Image objects containing details of each fetched image.
   */
  async getRandomImages(count: number, width: number = 1920, height: number = 1080, isGrayScale: boolean = false, blurLevel: number = 0, selectedFormat: string = "jpg"): Promise<Image[]> {
    let images: Image[] = [];
    for (let i = 0; i < count; i++) {
      try {
        const id = await this.getRandomImage();
        const imageInfo = await this.getImageInfo(id, width, height, isGrayScale, blurLevel, selectedFormat);
        images.push(imageInfo);
      } catch (error) {
        console.error(`Error while retrieving image ${i}`, error);
      }
    }
    return images;
  }

  /**
   * Generates a random timestamp between 0 and 999999.
   * @returns A random timestamp.
   */
  getRandomTimestamp(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
