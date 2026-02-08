import { motion } from 'framer-motion';
import { GENRES, TRACKS, ARTISTS, formatNumber } from '../data/mock';
import { TrackCard } from '../components/TrackCard';
import { useStore } from '../store/useStore';
import { TrendingUp, Flame, Star } from 'lucide-react';

export function ExplorePage() {
  const { setSelectedArtist, setPage } = useStore();

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Explore</h1>
        <p className="text-white/40">Discover new sounds, genres, and artists</p>
      </motion.div>

      {/* Genres Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-cent-400" /> Browse Genres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {GENRES.map((genre, i) => (
            <motion.button
              key={genre.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative p-5 rounded-2xl overflow-hidden glass hover-lift text-left"
              style={{ borderColor: genre.color + '30' }}
            >
              <div className="absolute top-0 right-0 text-4xl opacity-30">{genre.icon}</div>
              <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at top right, ${genre.color}, transparent)` }} />
              <span className="text-3xl mb-2 block">{genre.icon}</span>
              <p className="text-sm font-semibold text-white relative">{genre.name}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cent-400" /> Top Charts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-cent-400 mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4" /> Top Tracks Global
            </h3>
            <div className="space-y-1">
              {TRACKS.slice(0, 5).map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} variant="list" />
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-cent-400 mb-4 flex items-center gap-2">
              <Star className="w-4 h-4" /> Rising Stars
            </h3>
            <div className="space-y-1">
              {TRACKS.slice(6, 11).map((track, i) => (
                <TrackCard key={track.id} track={track} index={i} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Releases Grid */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">New Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TRACKS.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Featured Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ARTISTS.slice(0, 4).map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 text-center cursor-pointer group"
              onClick={() => { setSelectedArtist(artist); setPage('artist'); }}
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-transparent group-hover:ring-cent-400 transition-all">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm font-semibold text-white">{artist.name}</p>
              <p className="text-xs text-white/40">{formatNumber(artist.followers)} followers</p>
              <p className="text-xs text-cent-400 mt-1">{artist.genre}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
