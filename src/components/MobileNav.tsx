import { motion } from 'framer-motion';
import { Home, Search, Compass, Library, Mic } from 'lucide-react';
import { useStore } from '../store/useStore';

const TABS = [
  { id: 'home' as const, icon: Home, label: 'Home' },
  { id: 'explore' as const, icon: Compass, label: 'Explore' },
  { id: 'recognize' as const, icon: Mic, label: 'Recognize' },
  { id: 'search' as const, icon: Search, label: 'Search' },
  { id: 'library' as const, icon: Library, label: 'Library' },
];

export function MobileNav() {
  const { currentPage, setPage, showMiniPlayer } = useStore();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong ${showMiniPlayer ? 'pb-0' : ''}`}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {TABS.map((tab) => {
          const isActive = currentPage === tab.id;
          const isCenter = tab.id === 'recognize';
          return (
            <button
              key={tab.id}
              onClick={() => setPage(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all ${
                isCenter ? '' : isActive ? 'text-cent-400' : 'text-white/40'
              }`}
            >
              {isCenter ? (
                <div className="w-12 h-12 -mt-6 rounded-full bg-gradient-to-br from-cent-400 to-cent-600 flex items-center justify-center shadow-lg shadow-cent-500/40">
                  <tab.icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <>
                  <tab.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileTab"
                      className="w-1 h-1 rounded-full bg-cent-400"
                    />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
