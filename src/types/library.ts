export interface Library {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  floors: number;
  studySpaces: {
    available: number;
    total: number;
  };
  noiseLevel: 'quiet' | 'moderate' | 'collaborative';
  openHours: string;
  image: string;
  features: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  category: string;
  libraryId: string;
  libraryName: string;
  floor: number;
  section: string;
  shelfNumber: string;
  status: 'available' | 'borrowed' | 'reserved';
  dueDate?: string;
  hasDigitalVersion: boolean;
}

export interface Reservation {
  id: string;
  book: Book;
  reservedAt: string;
  expiresAt: string;
  status: 'active' | 'ready' | 'expired' | 'collected';
}

export interface ReadingListItem {
  id: string;
  book: Book;
  addedAt: string;
  progress: number;
  notes?: string;
}

export interface StudyBuddy {
  id: string;
  name: string;
  avatar: string;
  libraryId: string;
  libraryName: string;
  floor: number;
  status: 'studying' | 'available' | 'busy';
  subject?: string;
  until?: string;
}

export interface StudySpace {
  id: string;
  libraryId: string;
  floor: number;
  name: string;
  type: 'desk' | 'room' | 'pod' | 'lounge';
  capacity: number;
  available: boolean;
  noiseLevel: 'silent' | 'quiet' | 'moderate';
  features: string[];
}
