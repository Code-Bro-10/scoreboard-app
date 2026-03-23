export const Sidebar = () => {
  return (
    <aside className="hidden lg:block w-80 shrink-0 p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-red animate-pulse"></span>
          Trending Matches
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>T20 World Cup</span>
                <span className="text-neon-red text-xs font-medium px-2 py-0.5 rounded-full bg-neon-red/10 border border-neon-red/20">LIVE</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">IND</span>
                  <span>156/3</span>
                </div>
                <span className="text-xs text-gray-500">vs</span>
                <div className="flex items-center gap-2">
                  <span>Yet to bat</span>
                  <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-[10px] text-black">AUS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-200">Points Table</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 border-b border-white/10">
            <tr>
              <th className="pb-2 font-medium">Team</th>
              <th className="pb-2 font-medium text-center">M</th>
              <th className="pb-2 font-medium text-center">W</th>
              <th className="pb-2 font-medium text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="text-gray-300">
              <td className="py-3 font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[9px]">IND</span>
                IND
              </td>
              <td className="py-3 text-center">5</td>
              <td className="py-3 text-center">5</td>
              <td className="py-3 text-right font-bold text-white">10</td>
            </tr>
            <tr className="text-gray-300">
              <td className="py-3 font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-[9px]">SA</span>
                SA
              </td>
              <td className="py-3 text-center">5</td>
              <td className="py-3 text-center">4</td>
              <td className="py-3 text-right font-bold text-white">8</td>
            </tr>
            <tr className="text-gray-300">
              <td className="py-3 font-medium flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-[9px] text-black">AUS</span>
                AUS
              </td>
              <td className="py-3 text-center">5</td>
              <td className="py-3 text-center">3</td>
              <td className="py-3 text-right font-bold text-white">6</td>
            </tr>
          </tbody>
        </table>
        <button className="w-full mt-4 text-xs text-neon-green hover:text-white transition-colors">View Full Table →</button>
      </div>
    </aside>
  );
};
