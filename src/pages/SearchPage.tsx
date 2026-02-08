import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { TRACKS, ARTISTS, GENRES, formatNumber } from '../data/mock';
import { TrackCard } from '../components/TrackCard';
import { useStore } from '../store/useStore';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tracks' | 'artists' | 'genres'>('all');
  const { setSelectedArtist, setPage } = useStore();

  const filteredTracks = TRACKS.filter(t =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.artist.toLowerCase().includes(query.toLowerCase()) ||
    t.genre.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = ARTISTS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.genre.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGenres = GENRES.filter(g =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = query.length > 0;

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-white mb-6">Search</h1>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-cent-400/50 focus:bg-white/8 transition-all text-lg"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10">
              <X className="w-5 h-5 text-white/30" />
            </button>
          )}
        </div>

        {/* Filters */}
        {hasResults && (
          <div className="flex gap-2 mt-4">
            {(['all', 'tracks', 'artists', 'genres'] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeFilter === f ? 'bg-cent-500 text-white' : 'bg-white/5 text-white/50 hover:text-white/80'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!hasResults ? (
          <motion.div key="trending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Trending Searches */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cent-400" /> Trending
              </h2>
              <div className="flex flex-wrap gap-2">
                {['Neon Lights', 'Midnight Pulse', 'AURORA', 'Synthwave', 'Chill Vibes', 'Deep Blue', 'Electric Dreams'].map(t => (
                  <button key={t} onClick={() => setQuery(t)} className="px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">
                    {t}
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Searches */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cent-400" /> Recent Searches
              </h2>
              <div className="space-y-2">
                {['Electronic', 'Ambient', 'Phantom'].map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-left transition-all">
                    <Clock className="w-4 h-4 text-white/20" />
                    <span className="text-sm text-white/60">{s}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Browse Genres */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Browse All</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {GENRES.map((genre, i) => (
                  <motion.button
                    key={genre.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setQuery(genre.name)}
                    className="relative h-24 rounded-2xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${genre.color}, ${genre.color}88)` }}
                  >
                    <span className="absolute top-4 left-4 text-sm font-bold text-white">{genre.name}</span>
                    <span className="absolute bottom-2 right-3 text-3xl opacity-50 rotate-12">{genre.icon}</span>
                  </motion.button>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Artists */}
            {(activeFilter === 'all' || activeFilter === 'artists') && filteredArtists.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Artists</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {filteredArtists.map((artist, i) => (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex-shrink-0 text-center cursor-pointer group"
                      onClick={() => { setSelectedArtist(artist); setPage('artist'); }}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-cent-400 transition-all">
                        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-white">{artist.name}</p>
                      <p className="text-xs text-white/40">{formatNumber(artist.followers)}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Genres */}
            {(activeFilter === 'all' || activeFilter === 'genres') && filteredGenres.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Genres</h3>
                <div className="flex gap-3 flex-wrap">
                  {filteredGenres.map(g => (
                    <span key={g.name} className="px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: g.color + '30', borderColor: g.color + '50', borderWidth: 1 }}>
                      {g.icon} {g.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Tracks */}
            {(activeFilter === 'all' || activeFilter === 'tracks') && filteredTracks.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-white mb-4">Tracks</h3>
                <div className="space-y-1">
                  {filteredTracks.map((track, i) => (
                    <TrackCard key={track.id} track={track} index={i} variant="list" />
                  ))}
                </div>
              </section>
            )}

            {filteredTracks.length === 0 && filteredArtists.length === 0 && filteredGenres.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-white/40">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
