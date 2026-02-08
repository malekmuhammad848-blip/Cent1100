import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  genre: string;
  plays: number;
  liked: boolean;
  color: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  genre: string;
  verified: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  trackCount: number;
  description: string;
  gradient: string;
}

type Page = 'home' | 'explore' | 'library' | 'search' | 'recognize' | 'player' | 'about' | 'admin' | 'playlist' | 'artist' | 'album';

interface AppState {
  currentPage: Page;
  setPage: (page: Page) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  queue: Track[];
  setQueue: (tracks: Track[]) => void;
  volume: number;
  setVolume: (vol: number) => void;
  progress: number;
  setProgress: (p: number) => void;
  isRecognizing: boolean;
  setIsRecognizing: (r: boolean) => void;
  recognizedTrack: Track | null;
  setRecognizedTrack: (t: Track | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showMiniPlayer: boolean;
  setShowMiniPlayer: (s: boolean) => void;
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: (p: Playlist | null) => void;
  selectedArtist: Artist | null;
  setSelectedArtist: (a: Artist | null) => void;
  shuffle: boolean;
  toggleShuffle: () => void;
  repeatMode: 'off' | 'all' | 'one';
  cycleRepeat: () => void;
  equalizerPreset: string;
  setEqualizerPreset: (p: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'home',
  setPage: (page) => set({ currentPage: page }),
  currentTrack: null,
  setCurrentTrack: (track) => set({ currentTrack: track, showMiniPlayer: !!track }),
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  queue: [],
  setQueue: (tracks) => set({ queue: tracks }),
  volume: 80,
  setVolume: (vol) => set({ volume: vol }),
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  isRecognizing: false,
  setIsRecognizing: (r) => set({ isRecognizing: r }),
  recognizedTrack: null,
  setRecognizedTrack: (t) => set({ recognizedTrack: t }),
  favorites: [],
  toggleFavorite: (id) => set((s) => ({
    favorites: s.favorites.includes(id) ? s.favorites.filter(f => f !== id) : [...s.favorites, id]
  })),
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  showMiniPlayer: false,
  setShowMiniPlayer: (s) => set({ showMiniPlayer: s }),
  selectedPlaylist: null,
  setSelectedPlaylist: (p) => set({ selectedPlaylist: p }),
  selectedArtist: null,
  setSelectedArtist: (a) => set({ selectedArtist: a }),
  shuffle: false,
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  repeatMode: 'off',
  cycleRepeat: () => set((s) => ({
    repeatMode: s.repeatMode === 'off' ? 'all' : s.repeatMode === 'all' ? 'one' : 'off'
  })),
  equalizerPreset: 'flat',
  setEqualizerPreset: (p) => set({ equalizerPreset: p }),
  theme: 'dark',
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
}));
