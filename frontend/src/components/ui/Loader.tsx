import { Loader2 } from 'lucide-react';

export const Loader = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="w-8 h-8 text-neon-green animate-spin mb-4" />
      <p className="text-gray-400 font-medium">{text}</p>
    </div>
  );
};
