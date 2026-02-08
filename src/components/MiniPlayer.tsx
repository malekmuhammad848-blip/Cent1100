import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Heart, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AudioVisualizer } from './AudioVisualizer';

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, showMiniPlayer, setShowMiniPlayer, setPage, progress, favorites, toggleFavorite } = useStore();

  if (!currentTrack || !showMiniPlayer) return null;

  const isFav = favorites.includes(currentTrack.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-16 lg:bottom-0 left-0 lg:left-[240px] right-0 z-40"
      >
        <div className="mx-2 mb-2 lg:mx-4 lg:mb-4 glass-strong rounded-2xl overflow-hidden cursor-pointer" onClick={() => setPage('player')}>
          {/* Progress bar */}
          <div className="h-1 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-cent-400 to-cent-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 p-3">
            {/* Album art */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <AudioVisualizer size="sm" color={currentTrack.color} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-white/50 truncate">{currentTrack.artist}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => toggleFavorite(currentTrack.id)} className="p-2">
                <Heart className={`w-4 h-4 ${isFav ? 'fill-cent-400 text-cent-400' : 'text-white/50'}`} />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-black" /> : <Play className="w-4 h-4 text-black ml-0.5" />}
              </button>
              <button className="p-2">
                <SkipForward className="w-4 h-4 text-white/50" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setShowMiniPlayer(false); }} className="p-2 lg:hidden">
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
