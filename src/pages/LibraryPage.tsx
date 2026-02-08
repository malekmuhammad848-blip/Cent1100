import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Download, ListMusic, Plus, Music, PlayCircle } from 'lucide-react';
import { TRACKS, PLAYLISTS } from '../data/mock';
import { TrackCard } from '../components/TrackCard';
import { useStore } from '../store/useStore';

type Tab = 'playlists' | 'favorites' | 'history' | 'downloads';

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('playlists');
  const { favorites, setSelectedPlaylist, setPage } = useStore();

  const favTracks = TRACKS.filter(t => favorites.includes(t.id));

  const TABS: { id: Tab; label: string; icon: typeof Heart }[] = [
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'downloads', label: 'Downloads', icon: Download },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Your Library</h1>
        <p className="text-white/40">Your music, organized</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-cent-500 text-white' : 'bg-white/5 text-white/50 hover:text-white/80'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'playlists' && (
          <div className="space-y-6">
            {/* Create Playlist */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              className="w-full flex items-center gap-4 p-4 rounded-2xl glass hover:bg-white/8 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cent-400 to-cent-600 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Create New Playlist</p>
                <p className="text-xs text-white/40">Start a new collection</p>
              </div>
            </motion.button>

            {/* Liked Songs */}
            <div
              className="flex items-center gap-4 p-4 rounded-2xl glass cursor-pointer hover:bg-white/8 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Liked Songs</p>
                <p className="text-xs text-white/40">{favTracks.length} songs</p>
              </div>
              <PlayCircle className="w-8 h-8 text-cent-400" />
            </div>

            {/* Playlists Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {PLAYLISTS.map((pl, i) => (
                <motion.div
                  key={pl.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer group"
                  onClick={() => { setSelectedPlaylist(pl); setPage('playlist'); }}
                >
                  <div className={`aspect-square rounded-2xl overflow-hidden mb-3 bg-gradient-to-br ${pl.gradient} p-4 flex flex-col justify-end shadow-lg relative`}>
                    <img src={pl.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    <motion.div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="relative text-base font-bold text-white">{pl.name}</p>
                    <p className="relative text-xs text-white/60">{pl.trackCount} tracks</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div>
            {favTracks.length > 0 ? (
              <div className="space-y-1">
                {favTracks.map((track, i) => (
                  <TrackCard key={track.id} track={track} index={i} variant="list" />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 mb-2">No favorites yet</p>
                <p className="text-white/20 text-sm">Tap the heart icon on any track to save it here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-1">
            {TRACKS.slice(0, 8).map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} variant="list" />
            ))}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="text-center py-20">
            <Download className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 mb-2">No downloads yet</p>
            <p className="text-white/20 text-sm">Download tracks for offline listening</p>
            <button className="mt-4 px-6 py-2.5 rounded-full bg-cent-500 text-white text-sm font-semibold">
              Browse Music
            </button>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <section className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Your Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Plays', value: '12,847', icon: Music },
            { label: 'Listening Time', value: '342h', icon: Clock },
            { label: 'Liked Songs', value: String(favTracks.length), icon: Heart },
            { label: 'Playlists', value: String(PLAYLISTS.length), icon: ListMusic },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-6 h-6 text-cent-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listening Activity */}
      <section className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">Top Genres</h3>
        <div className="space-y-3">
          {[
            { name: 'Electronic', pct: 42 },
            { name: 'Ambient', pct: 28 },
            { name: 'Synthwave', pct: 18 },
            { name: 'Lo-fi', pct: 12 },
          ].map(g => (
            <div key={g.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">{g.name}</span>
                <span className="text-white/40">{g.pct}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${g.pct}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cent-400 to-cent-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
