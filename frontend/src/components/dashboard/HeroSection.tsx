import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: "url('/cricket_stadium_bg.png')" }}
      />
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] via-transparent to-transparent opacity-90" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/20 border border-neon-green/30 text-neon-green text-sm font-bold mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            LIVE ACTION
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 drop-shadow-2xl">
            Experience Cricket <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Like Never Before</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl drop-shadow-md">
            Real-time updates, immersive commentary, and advanced analytics straight from the pitch.
          </p>
        </motion.div>
      </div>

      {/* Decorative Neon Accents */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50 blur-sm"></div>
      <div className="absolute top-0 left-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </div>
  );
};
