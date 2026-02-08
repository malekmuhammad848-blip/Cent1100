import { motion } from 'framer-motion';
import { Home, Search, Library, Mic, Info, Shield, Compass, Music } from 'lucide-react';
import { useStore } from '../store/useStore';

const NAV_ITEMS = [
  { id: 'home' as const, icon: Home, label: 'Home' },
  { id: 'explore' as const, icon: Compass, label: 'Explore' },
  { id: 'search' as const, icon: Search, label: 'Search' },
  { id: 'library' as const, icon: Library, label: 'Library' },
  { id: 'recognize' as const, icon: Mic, label: 'Recognize' },
  { id: 'admin' as const, icon: Shield, label: 'Admin' },
  { id: 'about' as const, icon: Info, label: 'About' },
];

export function Sidebar() {
  const { currentPage, setPage } = useStore();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col z-40"
    >
      <div className="flex-1 flex flex-col glass m-2 rounded-2xl overflow-hidden">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cent-400 to-cent-600 flex items-center justify-center shadow-lg shadow-cent-500/30">
            <Music className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-gradient">CENT</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-cent-400' : ''}`} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-cent-400 rounded-r-full"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Premium Card */}
        <div className="p-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cent-500/20 to-cent-700/20 border border-cent-500/20">
            <p className="text-sm font-semibold text-white mb-1">Upgrade to Premium</p>
            <p className="text-xs text-white/50 mb-3">Unlimited skips, offline mode, spatial audio</p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-cent-400 to-cent-600 text-white text-xs font-bold hover:opacity-90 transition-opacity">
              Get Premium
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
