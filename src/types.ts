// src/types.ts

export interface Video {
    title: string;
    duration: string;
    intro: string;
    description: string;
    videoUrl: string;
  }
  
  export interface VideoDetails {
    totalDuration: string;
    accessPeriod: string;
    videos: Video[];
  }
  
  export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    instructor: string;
    isFeatured: boolean;
    isFree: boolean;
    image: string;
    videoDetails?: VideoDetails; // Optional because not all courses have video details
  }
  