import { motion } from 'framer-motion';
import type { Match } from '../../data/mockData';

interface ScorecardTabProps {
  match: Match;
}

export const ScorecardTab = ({ match }: ScorecardTabProps) => {
  const battingData = [
    { name: 'V. Kohli', status: 'not out', r: 82, b: 53, fours: 6, sixes: 4, sr: 154.71, isHighlight: true },
    { name: 'R. Sharma', status: 'c Smith b Starc', r: 15, b: 14, fours: 2, sixes: 0, sr: 107.14 },
    { name: 'S. Yadav', status: 'b Zampa', r: 35, b: 20, fours: 4, sixes: 2, sr: 175.00 },
    { name: 'H. Pandya', status: 'not out', r: 18, b: 9, fours: 1, sixes: 1, sr: 200.00 },
  ];

  const bowlingData = [
    { name: 'M. Starc', o: 4, m: 0, r: 32, w: 1, econ: 8.00 },
    { name: 'P. Cummins', o: 4, m: 0, r: 45, w: 0, econ: 11.25 },
    { name: 'A. Zampa', o: 4, m: 0, r: 24, w: 1, econ: 6.00 },
    { name: 'J. Hazlewood', o: 4, m: 0, r: 50, w: 0, econ: 12.50 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Batting Table */}
      <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
        <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex justify-between items-center">
          <h4 className="font-bold text-lg">{match.team1.shortName} Innings</h4>
          <span className="font-mono">{match.score1?.runs}-{match.score1?.wickets} ({match.score1?.overs} ov)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">Batter</th>
                <th className="px-4 py-3 font-medium"></th>
                <th className="px-4 py-3 font-medium text-right">R</th>
                <th className="px-4 py-3 font-medium text-right">B</th>
                <th className="px-4 py-3 font-medium text-right">4s</th>
                <th className="px-4 py-3 font-medium text-right">6s</th>
                <th className="px-4 py-3 font-medium text-right">SR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {battingData.map((batter, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className={`px-4 py-3 font-medium ${batter.isHighlight ? 'text-neon-green' : 'text-gray-200'}`}>
                    {batter.name} {batter.status === 'not out' && '*'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{batter.status}</td>
                  <td className="px-4 py-3 text-right font-bold text-white">{batter.r}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{batter.b}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{batter.fours}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{batter.sixes}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{batter.sr.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bowling Table */}
      <div className="glass-card rounded-xl border border-white/5 overflow-hidden">
        <div className="bg-white/5 px-4 py-3 border-b border-white/10">
          <h4 className="font-bold text-lg">{match.team2.shortName} Bowling</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">Bowler</th>
                <th className="px-4 py-3 font-medium text-right">O</th>
                <th className="px-4 py-3 font-medium text-right">M</th>
                <th className="px-4 py-3 font-medium text-right">R</th>
                <th className="px-4 py-3 font-medium text-right">W</th>
                <th className="px-4 py-3 font-medium text-right">ECON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bowlingData.map((bowler, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-200">{bowler.name}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{bowler.o}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{bowler.m}</td>
                  <td className="px-4 py-3 text-right font-bold text-white">{bowler.r}</td>
                  <td className="px-4 py-3 text-right font-bold text-neon-red">{bowler.w}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{bowler.econ.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
