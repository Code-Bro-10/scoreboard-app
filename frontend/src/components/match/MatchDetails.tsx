import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import { ScorecardTab } from './ScorecardTab';
import { CommentaryTab } from './CommentaryTab';
import { StatsTab } from './StatsTab';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../ui/Loader';
import api from '../../api/axios';
import toast from 'react-hot-toast';

type TabType = 'scorecard' | 'commentary' | 'stats';

export const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('scorecard');
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const { data } = await api.get(`/matches/${id}`);
        setMatch(data);
      } catch (err) {
        toast.error('Failed to load match details');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchMatch();
  }, [id, navigate]);

  if (loading) return <Loader text="Loading match data..." />;
  if (!match) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Matches
      </button>

      <div className="glass-card rounded-2xl overflow-hidden relative border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/20 to-green-900/40 opacity-50"></div>
        
        <div className="p-6 md:p-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl ${match.team1.color}`}>
              {match.team1.shortName}
            </div>
            <h3 className="mt-4 text-xl font-bold">{match.team1.name}</h3>
            {match.score1 ? (
              <p className="text-3xl font-black mt-2 tracking-tighter text-white">
                {match.score1.runs}<span className="text-xl text-gray-400 font-medium">/{match.score1.wickets}</span>
                <span className="block text-sm text-gray-400 font-normal text-center mt-1">({match.score1.overs} ov)</span>
              </p>
            ) : <p className="text-sm text-gray-500 mt-2 font-medium">Yet to bat</p>}
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest text-white backdrop-blur-md">
              VS
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
              <MapPin className="w-4 h-4" /> Eden Gardens
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" /> 07:30 PM Local
            </div>
            <div className="mt-4 px-6 py-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm font-bold text-center">
              {match.statusText}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl ${match.team2.color}`}>
              {match.team2.shortName}
            </div>
            <h3 className="mt-4 text-xl font-bold">{match.team2.name}</h3>
            {match.score2 ? (
              <p className="text-3xl font-black mt-2 tracking-tighter text-white">
                {match.score2.runs}<span className="text-xl text-gray-400 font-medium">/{match.score2.wickets}</span>
                <span className="block text-sm text-gray-400 font-normal text-center mt-1">({match.score2.overs} ov)</span>
              </p>
            ) : <p className="text-sm text-gray-500 mt-2 font-medium">Yet to bat</p>}
          </div>

        </div>
      </div>

      <div className="flex border-b border-white/10">
        {[
          { id: 'scorecard', label: 'Scorecard' },
          { id: 'commentary', label: 'Summary & Commentary' },
          { id: 'stats', label: 'Match Stats' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`px-6 py-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green"
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'scorecard' && <ScorecardTab key="scorecard" match={match} />}
          {activeTab === 'commentary' && <CommentaryTab key="commentary" match={match} />}
          {activeTab === 'stats' && <StatsTab key="stats" match={match} />}
        </AnimatePresence>
      </div>

    </motion.div>
  );
};
