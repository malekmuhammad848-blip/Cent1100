import { motion } from 'framer-motion';
import { Play, TrendingUp, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TRACKS, PLAYLISTS, ARTISTS, MOODS, formatNumber } from '../data/mock';
import { TrackCard } from '../components/TrackCard';

function HeroSection() {
  const { setCurrentTrack, setIsPlaying } = useStore();
  const featured = TRACKS[5];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative rounded-3xl overflow-hidden mb-8"
    >
      <div className="absolute inset-0">
        <img src={featured.cover} alt="" className="w-full h-full object-cover scale-110 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div className="relative p-8 md:p-12 lg:p-16 min-h-[300px] md:min-h-[400px] flex flex-col justify-end">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-cent-500/20 border border-cent-500/30 text-cent-400 text-xs font-semibold">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Featured
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs">{featured.genre}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{featured.title}</h1>
          <p className="text-lg text-white/60 mb-6">{featured.artist} · {featured.album}</p>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentTrack(featured); setIsPlaying(true); }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cent-400 to-cent-600 text-white font-semibold shadow-lg shadow-cent-500/30"
            >
              <Play className="w-5 h-5" /> Play Now
            </motion.button>
            <span className="text-sm text-white/40">{formatNumber(featured.plays)} plays</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function MoodSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-cent-400" /> Mood Playlists
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {MOODS.map((mood, i) => (
          <motion.button
            key={mood.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${mood.gradient} flex flex-col items-center gap-2 shadow-lg`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-semibold text-white">{mood.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function PlaylistSection() {
  const { setPage, setSelectedPlaylist } = useStore();
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Made For You</h2>
        <button className="text-sm text-cent-400 flex items-center gap-1 hover:underline">See All <ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {PLAYLISTS.map((pl, i) => (
          <motion.div
            key={pl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="cursor-pointer group"
            onClick={() => { setSelectedPlaylist(pl); setPage('playlist'); }}
          >
            <div className={`relative aspect-square rounded-2xl overflow-hidden mb-3 bg-gradient-to-br ${pl.gradient} p-4 flex flex-col justify-end shadow-lg`}>
              <img src={pl.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity mix-blend-overlay" />
              <p className="relative text-lg font-bold text-white leading-tight">{pl.name}</p>
              <p className="relative text-xs text-white/60 mt-1">{pl.trackCount} tracks</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TrendingSection() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cent-400" /> Trending Now
        </h2>
        <button className="text-sm text-cent-400 flex items-center gap-1 hover:underline">See All <ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {TRACKS.slice(0, 6).map((track, i) => (
          <TrackCard key={track.id} track={track} index={i} />
        ))}
      </div>
    </section>
  );
}

function RecentlyPlayed() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-cent-400" /> Recently Played
        </h2>
      </div>
      <div className="space-y-1">
        {TRACKS.slice(6, 12).map((track, i) => (
          <TrackCard key={track.id} track={track} index={i} variant="list" />
        ))}
      </div>
    </section>
  );
}

function TopArtists() {
  const { setSelectedArtist, setPage } = useStore();
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">Popular Artists</h2>
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
        {ARTISTS.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex-shrink-0 cursor-pointer text-center group"
            onClick={() => { setSelectedArtist(artist); setPage('artist'); }}
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-cent-400 transition-all shadow-lg">
              <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-semibold text-white">{artist.name}</p>
            <p className="text-xs text-white/40">{formatNumber(artist.followers)} followers</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="space-y-2">
      <HeroSection />
      <MoodSection />
      <PlaylistSection />
      <TrendingSection />
      <TopArtists />
      <RecentlyPlayed />
    </div>
  );
}
