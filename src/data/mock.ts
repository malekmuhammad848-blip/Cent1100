import type { Track, Artist, Playlist } from '../store/useStore';

export const TRACKS: Track[] = [
  { id: '1', title: 'Midnight Pulse', artist: 'AURORA', album: 'Neon Dreams', duration: 234, cover: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop', genre: 'Electronic', plays: 2847562, liked: false, color: '#7a5af8' },
  { id: '2', title: 'Crystal Waves', artist: 'Zephyr', album: 'Ocean Floor', duration: 198, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop', genre: 'Ambient', plays: 1923847, liked: true, color: '#3b82f6' },
  { id: '3', title: 'Velvet Thunder', artist: 'NOVA', album: 'Storm Rising', duration: 267, cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop', genre: 'Rock', plays: 4521903, liked: false, color: '#ef4444' },
  { id: '4', title: 'Solar Flare', artist: 'Cosmos', album: 'Stellar', duration: 312, cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop', genre: 'Progressive', plays: 892341, liked: false, color: '#f59e0b' },
  { id: '5', title: 'Deep Blue', artist: 'Oceanica', album: 'Abyssal', duration: 245, cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', genre: 'Chillwave', plays: 3241567, liked: true, color: '#06b6d4' },
  { id: '6', title: 'Neon Lights', artist: 'Synthwave', album: 'Retro Future', duration: 189, cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', genre: 'Synthwave', plays: 5672341, liked: false, color: '#ec4899' },
  { id: '7', title: 'Gravity Falls', artist: 'Eclipse', album: 'Dark Matter', duration: 278, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', genre: 'Downtempo', plays: 1456782, liked: false, color: '#8b5cf6' },
  { id: '8', title: 'Electric Dreams', artist: 'Phantom', album: 'Digital Soul', duration: 223, cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', genre: 'Electronic', plays: 7823456, liked: true, color: '#10b981' },
  { id: '9', title: 'Starfall', artist: 'Luna', album: 'Celestial', duration: 256, cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop', genre: 'Dream Pop', plays: 2134567, liked: false, color: '#6366f1' },
  { id: '10', title: 'Horizon', artist: 'Atlas', album: 'Wanderer', duration: 301, cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop', genre: 'Post-Rock', plays: 987654, liked: false, color: '#f97316' },
  { id: '11', title: 'Vapor Trail', artist: 'Mirage', album: 'Haze', duration: 215, cover: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop', genre: 'Lo-fi', plays: 4567890, liked: true, color: '#a855f7' },
  { id: '12', title: 'Binary Sunset', artist: 'Cipher', album: 'Code', duration: 342, cover: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=300&h=300&fit=crop', genre: 'IDM', plays: 678901, liked: false, color: '#14b8a6' },
];

export const ARTISTS: Artist[] = [
  { id: 'a1', name: 'AURORA', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', followers: 12400000, genre: 'Electronic', verified: true },
  { id: 'a2', name: 'Zephyr', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', followers: 8700000, genre: 'Ambient', verified: true },
  { id: 'a3', name: 'NOVA', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', followers: 23100000, genre: 'Rock', verified: true },
  { id: 'a4', name: 'Cosmos', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', followers: 5600000, genre: 'Progressive', verified: true },
  { id: 'a5', name: 'Oceanica', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', followers: 15800000, genre: 'Chillwave', verified: true },
  { id: 'a6', name: 'Synthwave', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', followers: 31200000, genre: 'Synthwave', verified: true },
  { id: 'a7', name: 'Eclipse', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop', followers: 9400000, genre: 'Downtempo', verified: true },
  { id: 'a8', name: 'Phantom', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop', followers: 45600000, genre: 'Electronic', verified: true },
];

export const PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Daily Mix', cover: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop', trackCount: 50, description: 'Your personalized daily mix powered by AI', gradient: 'from-violet-600 to-indigo-900' },
  { id: 'p2', name: 'Chill Vibes', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop', trackCount: 32, description: 'Relax and unwind with smooth beats', gradient: 'from-cyan-600 to-blue-900' },
  { id: 'p3', name: 'Energy Boost', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop', trackCount: 45, description: 'High energy tracks to fuel your day', gradient: 'from-orange-600 to-red-900' },
  { id: 'p4', name: 'Late Night', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop', trackCount: 28, description: 'Perfect soundtrack for late hours', gradient: 'from-purple-600 to-pink-900' },
  { id: 'p5', name: 'Focus Flow', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop', trackCount: 40, description: 'Concentration-enhancing instrumentals', gradient: 'from-emerald-600 to-teal-900' },
  { id: 'p6', name: 'Mood Radar', cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=300&h=300&fit=crop', trackCount: 35, description: 'AI-curated based on your mood', gradient: 'from-fuchsia-600 to-violet-900' },
];

export const GENRES = [
  { name: 'Electronic', color: '#7a5af8', icon: '⚡' },
  { name: 'Hip Hop', color: '#ef4444', icon: '🎤' },
  { name: 'Pop', color: '#ec4899', icon: '🎵' },
  { name: 'Rock', color: '#f59e0b', icon: '🎸' },
  { name: 'R&B', color: '#8b5cf6', icon: '💜' },
  { name: 'Jazz', color: '#06b6d4', icon: '🎷' },
  { name: 'Classical', color: '#10b981', icon: '🎻' },
  { name: 'Lo-fi', color: '#a855f7', icon: '🌙' },
  { name: 'Ambient', color: '#3b82f6', icon: '🌊' },
  { name: 'Latin', color: '#f97316', icon: '💃' },
];

export const MOODS = [
  { name: 'Happy', emoji: '😊', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'Sad', emoji: '😢', gradient: 'from-blue-400 to-indigo-600' },
  { name: 'Energetic', emoji: '⚡', gradient: 'from-red-400 to-pink-600' },
  { name: 'Calm', emoji: '🧘', gradient: 'from-green-400 to-teal-600' },
  { name: 'Romantic', emoji: '💕', gradient: 'from-pink-400 to-rose-600' },
  { name: 'Focus', emoji: '🎯', gradient: 'from-violet-400 to-purple-600' },
];

export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const formatNumber = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};
