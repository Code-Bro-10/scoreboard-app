import { motion } from 'framer-motion';
import type { Match } from '../../data/mockData';

interface CommentaryTabProps {
  match: Match;
}

export const CommentaryTab = ({ match }: CommentaryTabProps) => {
  const events = [
    { over: '16.0', type: 'W', text: 'Starc to Yadav, OUT! Clean bowled. The middle stump is uprooted. Exceptional yorker at 145km/h.', run: null },
    { over: '15.5', type: '4', text: 'Starc to Yadav, FOUR! Clever, very clever. Shuffles across and scoops it over fine leg.', run: 4 },
    { over: '15.4', type: '1', text: 'Starc to Kohli, 1 run, driven down to long-off.', run: 1 },
    { over: '15.3', type: '6', text: 'Starc to Kohli, SIX! Majestic! Stand and deliver, lofted straight back over the bowler\'s head.', run: 6 },
    { over: '15.2', type: '0', text: 'Starc to Kohli, no run, short and hostile, Kohli ducks under it.', run: 0 },
    { over: '15.1', type: '2', text: 'Starc to Kohli, 2 runs, clipped neatly through mid-wicket, good running.', run: 2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <div className="text-sm text-gray-400 mb-2 px-2">
        Live commentary for {match.team1.name} vs {match.team2.name}
      </div>
      {events.map((evt, i) => (
        <div key={i} className="glass-card rounded-lg p-4 border border-white/5 flex gap-4">
          <div className="flex-shrink-0 flex flex-col items-center gap-1 w-12">
            <span className="font-bold text-gray-300">{evt.over}</span>
            {evt.type === 'W' && (
              <span className="w-8 h-8 rounded-full bg-neon-red/20 text-neon-red border border-neon-red/40 flex items-center justify-center font-bold text-sm">
                W
              </span>
            )}
            {evt.type === '4' && (
              <span className="w-8 h-8 rounded-full bg-neon-green/20 text-neon-green border border-neon-green/40 flex items-center justify-center font-bold text-sm">
                4
              </span>
            )}
            {evt.type === '6' && (
              <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-sm">
                6
              </span>
            )}
            {(evt.type !== 'W' && evt.type !== '4' && evt.type !== '6') && (
              <span className="w-8 h-8 rounded-full bg-white/5 text-gray-300 border border-white/10 flex items-center justify-center font-medium text-sm">
                {evt.run}
              </span>
            )}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${evt.type === 'W' ? 'text-neon-red md:text-base font-medium' : 'text-gray-300'}`}>
              {evt.text}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
