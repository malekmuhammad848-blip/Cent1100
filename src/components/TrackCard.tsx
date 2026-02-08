import { motion } from 'framer-motion';
import { Play, Pause, Heart, MoreHorizontal } from 'lucide-react';
import { useStore, type Track } from '../store/useStore';
import { formatDuration, formatNumber } from '../data/mock';

export function TrackCard({ track, index, variant = 'default' }: { track: Track; index: number; variant?: 'default' | 'list' | 'compact' }) {
  const { currentTrack, setCurrentTrack, isPlaying, togglePlay, favorites, toggleFavorite } = useStore();
  const isActive = currentTrack?.id === track.id;
  const isFav = favorites.includes(track.id);

  const handlePlay = () => {
    if (isActive) {
      togglePlay();
    } else {
      setCurrentTrack(track);
      useStore.getState().setIsPlaying(true);
    }
  };

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`flex items-center gap-4 p-3 rounded-xl group cursor-pointer transition-all ${
          isActive ? 'bg-cent-500/10 border border-cent-500/20' : 'hover:bg-white/5'
        }`}
        onClick={handlePlay}
      >
        <span className="text-sm text-white/30 w-6 text-right font-mono">{index + 1}</span>
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img src={track.cover} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            {isActive && isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isActive ? 'text-cent-400' : 'text-white'}`}>{track.title}</p>
          <p className="text-xs text-white/40 truncate">{track.artist}</p>
        </div>
        <span className="text-xs text-white/30 hidden sm:block">{formatNumber(track.plays)}</span>
        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(track.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className={`w-4 h-4 ${isFav ? 'fill-cent-400 text-cent-400' : 'text-white/30'}`} />
        </button>
        <span className="text-xs text-white/30 font-mono">{formatDuration(track.duration)}</span>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4 text-white/30" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={handlePlay}
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-lg shadow-black/20">
        <img src={track.cover} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-cent-500 shadow-lg shadow-cent-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          {isActive && isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
        </motion.button>
        {isActive && isPlaying && (
          <div className="absolute top-3 left-3">
            <div className="flex items-end gap-0.5 h-4">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-cent-400 rounded-full"
                  animate={{ height: ['30%', '100%', '30%'] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <p className={`text-sm font-semibold truncate ${isActive ? 'text-cent-400' : 'text-white'}`}>{track.title}</p>
      <p className="text-xs text-white/40 truncate mt-0.5">{track.artist}</p>
    </motion.div>
  );
}
