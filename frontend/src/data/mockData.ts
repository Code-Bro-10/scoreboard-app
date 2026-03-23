export interface Team {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export interface MatchScore {
  runs: number;
  wickets: number;
  overs: number;
}

export interface Match {
  id: string;
  status: 'live' | 'upcoming' | 'completed';
  statusText: string;
  team1: Team;
  team2: Team;
  score1?: MatchScore;
  score2?: MatchScore;
  currentInnings: 1 | 2;
  battingTeamId: string;
  crr?: number;
  req?: number;
  target?: number;
  isFeatured?: boolean;
}

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    status: 'live',
    statusText: 'IND need 42 runs in 24 balls',
    isFeatured: true,
    team1: { id: 't1', name: 'India', shortName: 'IND', color: 'bg-blue-600' },
    team2: { id: 't2', name: 'Australia', shortName: 'AUS', color: 'bg-yellow-500' },
    score1: { runs: 156, wickets: 3, overs: 16.0 },
    score2: { runs: 197, wickets: 6, overs: 20.0 },
    currentInnings: 2,
    battingTeamId: 't1',
    crr: 9.75,
    req: 10.5,
    target: 198
  },
  {
    id: 'm2',
    status: 'live',
    statusText: 'ENG elected to bat',
    team1: { id: 't3', name: 'England', shortName: 'ENG', color: 'bg-red-600' },
    team2: { id: 't4', name: 'South Africa', shortName: 'SA', color: 'bg-green-600' },
    score1: { runs: 45, wickets: 1, overs: 5.2 },
    currentInnings: 1,
    battingTeamId: 't3',
    crr: 8.43
  },
  {
    id: 'm3',
    status: 'live',
    statusText: 'NZ trail by 125 runs',
    team1: { id: 't5', name: 'New Zealand', shortName: 'NZ', color: 'bg-black' },
    team2: { id: 't6', name: 'Pakistan', shortName: 'PAK', color: 'bg-green-700' },
    score1: { runs: 285, wickets: 10, overs: 89.4 },
    score2: { runs: 410, wickets: 8, overs: 120.0 }, /* PAK 1st inn */
    currentInnings: 2,
    battingTeamId: 't5', /* NZ 2nd inn score would be actual current but let's simplify */
  }
];
