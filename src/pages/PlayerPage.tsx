import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Heart, Shuffle, Repeat, Repeat1, Volume2, ChevronDown, Share2, ListMusic, Sliders, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { formatDuration, TRACKS } from '../data/mock';

const LYRICS = [
  { time: 0, text: "In the silence of the night" },
  { time: 8, text: "I hear your voice calling out" },
  { time: 16, text: "Through the static and the noise" },
  { time: 24, text: "You're the signal I've been searching for" },
  { time: 32, text: "Neon lights flash overhead" },
  { time: 40, text: "Painting stories left unsaid" },
  { time: 48, text: "Every beat that fills this room" },
  { time: 56, text: "Brings me closer back to you" },
  { time: 64, text: "We're frequencies aligned" },
  { time: 72, text: "Resonating through time" },
  { time: 80, text: "In this digital divide" },
  { time: 88, text: "You're my analog lifeline" },
];

const EQ_PRESETS = ['Flat', 'Bass Boost', 'Treble', 'Vocal', 'Electronic', 'Rock', 'Jazz', 'Classical'];

export function PlayerPage() {
  const { currentTrack, isPlaying, togglePlay, setPage, progress, setProgress, favorites, toggleFavorite, shuffle, toggleShuffle, repeatMode, cycleRepeat, volume, setVolume, setCurrentTrack, setIsPlaying } = useStore();
  const [showLyrics, setShowLyrics] = useState(false);
  const [showEQ, setShowEQ] = useState(false);
  const [activeEQ, setActiveEQ] = useState('Flat');
  const [eqBands, setEqBands] = useState([50, 60, 70, 80, 65, 55, 45, 50]);

  const track = currentTrack || TRACKS[0];
  const isFav = favorites.includes(track.id);

  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack(TRACKS[0]);
      setIsPlaying(true);
    }
  }, [currentTrack, setCurrentTrack, setIsPlaying]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(Math.min(100, progress + 0.3));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress, setProgress]);

  const currentTime = Math.floor((progress / 100) * track.duration);
  const activeLyricIndex = LYRICS.findLastIndex(l => currentTime >= l.time);

  const handleEqChange = useCallback((index: number, value: number) => {
    setEqBands(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-surface overflow-y-auto"
    >
      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={track.cover} alt="" className="w-full h-full object-cover scale-150 blur-[80px] opacity-30" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative max-w-lg mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setPage('home')} className="p-2 rounded-full hover:bg-white/10 transition">
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <p className="text-xs text-white/40 uppercase tracking-wider">Playing From</p>
            <p className="text-sm font-medium text-white">{track.album}</p>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            <Share2 className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Album Art */}
        <motion.div
          className="flex-1 flex items-center justify-center mb-8"
          animate={isPlaying ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-full max-w-[320px] aspect-square">
            <motion.div
              className="w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ borderRadius: isPlaying ? '50%' : '24px' }}
            >
              <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
            </motion.div>
            {isPlaying && (
              <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
                <AudioVisualizer size="lg" color={track.color} type="circle" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Track Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-white truncate">{track.title}</h2>
            <p className="text-base text-white/50">{track.artist}</p>
          </div>
          <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleFavorite(track.id)}>
            <Heart className={`w-6 h-6 ${isFav ? 'fill-cent-400 text-cent-400' : 'text-white/40'}`} />
          </motion.button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div
            className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cent-400 to-cent-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/40 font-mono">{formatDuration(currentTime)}</span>
            <span className="text-xs text-white/40 font-mono">{formatDuration(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={toggleShuffle} className={`p-2 ${shuffle ? 'text-cent-400' : 'text-white/40'}`}>
            <Shuffle className="w-5 h-5" />
          </button>
          <button className="p-2 text-white/60 hover:text-white">
            <SkipBack className="w-6 h-6" />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            {isPlaying ? <Pause className="w-7 h-7 text-black" /> : <Play className="w-7 h-7 text-black ml-1" />}
          </motion.button>
          <button className="p-2 text-white/60 hover:text-white">
            <SkipForward className="w-6 h-6" />
          </button>
          <button onClick={cycleRepeat} className={`p-2 ${repeatMode !== 'off' ? 'text-cent-400' : 'text-white/40'}`}>
            {repeatMode === 'one' ? <Repeat1 className="w-5 h-5" /> : <Repeat className="w-5 h-5" />}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 mb-6">
          <Volume2 className="w-4 h-4 text-white/40" />
          <div
            className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}
          >
            <div className="h-full bg-white/50 rounded-full" style={{ width: `${volume}%` }} />
          </div>
          <span className="text-xs text-white/30 w-8">{volume}</span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-around py-4 glass rounded-2xl">
          <button onClick={() => setShowLyrics(!showLyrics)} className={`flex flex-col items-center gap-1 ${showLyrics ? 'text-cent-400' : 'text-white/40'}`}>
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px]">Lyrics</span>
          </button>
          <button onClick={() => setShowEQ(!showEQ)} className={`flex flex-col items-center gap-1 ${showEQ ? 'text-cent-400' : 'text-white/40'}`}>
            <Sliders className="w-5 h-5" />
            <span className="text-[10px]">Equalizer</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/40">
            <ListMusic className="w-5 h-5" />
            <span className="text-[10px]">Queue</span>
          </button>
        </div>

        {/* Lyrics Panel */}
        <AnimatePresence>
          {showLyrics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 glass rounded-2xl p-6 overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Lyrics</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {LYRICS.map((line, i) => (
                  <motion.p
                    key={i}
                    className={`text-lg font-medium transition-all duration-500 ${
                      i === activeLyricIndex ? 'text-white text-xl scale-105' : i < activeLyricIndex ? 'text-white/30' : 'text-white/20'
                    }`}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Equalizer Panel */}
        <AnimatePresence>
          {showEQ && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 glass rounded-2xl p-6 overflow-hidden"
            >
              <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Equalizer</h3>
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {EQ_PRESETS.map(p => (
                  <button
                    key={p}
                    onClick={() => setActiveEQ(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      activeEQ === p ? 'bg-cent-500 text-white' : 'bg-white/5 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {['60', '150', '400', '1k', '2.4k', '6k', '10k', '15k'].map((freq, i) => (
                  <div key={freq} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full h-24 flex items-end justify-center">
                      <motion.div
                        className="w-2 rounded-full bg-gradient-to-t from-cent-600 to-cent-400 cursor-pointer"
                        style={{ height: `${eqBands[i]}%` }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDrag={(_e, info) => handleEqChange(i, Math.max(10, Math.min(100, eqBands[i] - info.delta.y)))}
                      />
                    </div>
                    <span className="text-[9px] text-white/30">{freq}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
