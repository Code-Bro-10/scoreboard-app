import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';

interface MatchProps {
  match: any;
}

export const LiveMatchCard = ({ match }: MatchProps) => {
  const navigate = useNavigate();
  const { user, updateFavorites } = useAuth();
  
  const isBatting = (teamId: string) => match.battingTeamId === teamId;
  const isFavorite = user?.favorites?.includes(match._id) || false;

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent navigation to match details
    if (!user) return toast.error('Please login to favorite matches');
    try {
      const { data } = await api.post('/matches/favorite', { matchId: match._id });
      updateFavorites(data.favorites);
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/match/${match._id}`)}
      className={cn(
        "glass-card rounded-xl p-5 cursor-pointer relative overflow-hidden group transition-all duration-300",
        match.isFeatured ? "border-glow-green" : "border-white/10 hover:border-white/30"
      )}
    >
      {match.isFeatured && (
        <div className="absolute -inset-10 bg-neon-green/5 blur-2xl pointer-events-none rounded-full" />
      )}

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">
            T20 World Cup
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleFavorite} 
            className={cn("p-1.5 rounded-full transition-colors", isFavorite ? "bg-yellow-500/20 text-yellow-500" : "bg-white/5 text-gray-400 hover:text-white")}
          >
            <Star className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          
          {match.status === 'live' && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neon-red/10 border border-neon-red/20">
              <span className="w-2 h-2 rounded-full bg-neon-red animate-ping absolute opacity-75"></span>
              <span className="w-2 h-2 rounded-full bg-neon-red relative"></span>
              <span className="text-neon-red text-xs font-bold tracking-widest uppercase">Live</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg", match.team1.color)}>
              {match.team1.shortName}
            </div>
            <span className={cn("font-semibold text-lg", isBatting('team1') ? "text-white" : "text-gray-400")}>
              {match.team1.name}
            </span>
          </div>
          <div className="text-right">
            {match.score1 ? (
              <>
                <div className={cn("font-bold text-xl", isBatting('team1') ? "text-white" : "text-gray-300")}>
                  {match.score1.runs}/{match.score1.wickets}
                </div>
                <div className="text-xs text-gray-400">{match.score1.overs} ov</div>
              </>
            ) : (
              <span className="text-sm text-gray-500 font-medium">Yet to bat</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg", match.team2.color)}>
              {match.team2.shortName}
            </div>
            <span className={cn("font-semibold text-lg", isBatting('team2') ? "text-white" : "text-gray-400")}>
              {match.team2.name}
            </span>
          </div>
          <div className="text-right">
            {match.score2 ? (
              <>
                <div className={cn("font-bold text-xl", isBatting('team2') ? "text-white" : "text-gray-300")}>
                  {match.score2.runs}/{match.score2.wickets}
                </div>
                <div className="text-xs text-gray-400">{match.score2.overs} ov</div>
              </>
            ) : (
              <span className="text-sm text-gray-500 font-medium">Yet to bat</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-end relative z-10">
        <div>
          <p className="text-sm font-medium text-neon-green">{match.statusText}</p>
          {match.crr && (
            <p className="text-xs text-gray-400 mt-1">
              CRR: <span className="text-white font-medium">{match.crr}</span>
              {match.req && (
                <span className="ml-2">
                  REQ: <span className="text-white font-medium">{match.req}</span>
                </span>
              )}
            </p>
          )}
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5 text-neon-green" />
        </div>
      </div>
    </motion.div>
  );
};
