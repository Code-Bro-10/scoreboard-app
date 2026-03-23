import { useState, useEffect } from 'react';
import { LiveMatchCard } from './LiveMatchCard';
import api from '../../api/axios';
import { Loader } from '../ui/Loader';
import toast from 'react-hot-toast';

export const LiveMatchGrid = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await api.get('/matches');
        setMatches(data);
      } catch (error) {
        toast.error('Failed to load matches');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) return <Loader text="Loading live matches..." />;

  if (matches.length === 0) {
    return <div className="text-gray-400 text-center py-10">No matches found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {matches.map((match: any) => (
        <LiveMatchCard key={match._id} match={match} />
      ))}
    </div>
  );
};
