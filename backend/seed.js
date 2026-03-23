require('dotenv').config();
const supabase = require('./supabaseClient');

const seedMatches = [
  {
    status: 'live',
    statusText: 'IND need 42 runs in 24 balls',
    isFeatured: true,
    team1: { name: 'India', shortName: 'IND', color: 'bg-blue-600' },
    team2: { name: 'Australia', shortName: 'AUS', color: 'bg-yellow-500' },
    score1: { runs: 156, wickets: 3, overs: 16.0 },
    score2: { runs: 197, wickets: 6, overs: 20.0 },
    currentInnings: 2,
    battingTeamId: 'team1',
    crr: 9.75,
    req: 10.5,
    target: 198,
    battingHighlights: [
      { playerName: 'V. Kohli', status: 'not out', runs: 82, balls: 53, fours: 6, sixes: 4, strikeRate: 154.71 },
      { playerName: 'R. Sharma', status: 'c Smith b Starc', runs: 15, balls: 14, fours: 2, sixes: 0, strikeRate: 107.14 },
      { playerName: 'S. Yadav', status: 'b Zampa', runs: 35, balls: 20, fours: 4, sixes: 2, strikeRate: 175.00 },
      { playerName: 'H. Pandya', status: 'not out', runs: 18, balls: 9, fours: 1, sixes: 1, strikeRate: 200.00 }
    ],
    bowlingHighlights: [
      { playerName: 'M. Starc', overs: 4, maidens: 0, runs: 32, wickets: 1, economy: 8.00 },
      { playerName: 'P. Cummins', overs: 4, maidens: 0, runs: 45, wickets: 0, economy: 11.25 },
      { playerName: 'A. Zampa', overs: 4, maidens: 0, runs: 24, wickets: 1, economy: 6.00 },
      { playerName: 'J. Hazlewood', overs: 4, maidens: 0, runs: 50, wickets: 0, economy: 12.50 }
    ],
    commentary: [
      { over: '16.0', type: 'W', text: 'Starc to Yadav, OUT! Clean bowled. The middle stump is uprooted.', runs: 0 },
      { over: '15.5', type: '4', text: 'Starc to Yadav, FOUR! Clever, very clever. Shuffles across and scoops it over fine leg.', runs: 4 },
      { over: '15.4', type: '1', text: 'Starc to Kohli, 1 run, driven down to long-off.', runs: 1 },
      { over: '15.3', type: '6', text: 'Starc to Kohli, SIX! Majestic! Stand and deliver.', runs: 6 }
    ]
  },
  {
    status: 'live',
    statusText: 'ENG elected to bat',
    team1: { name: 'England', shortName: 'ENG', color: 'bg-red-600' },
    team2: { name: 'South Africa', shortName: 'SA', color: 'bg-green-600' },
    score1: { runs: 45, wickets: 1, overs: 5.2 },
    currentInnings: 1,
    battingTeamId: 'team1',
    crr: 8.43,
    battingHighlights: [],
    bowlingHighlights: [],
    commentary: []
  },
  {
    status: 'live',
    statusText: 'NZ trail by 125 runs',
    team1: { name: 'New Zealand', shortName: 'NZ', color: 'bg-black' },
    team2: { name: 'Pakistan', shortName: 'PAK', color: 'bg-green-700' },
    score1: { runs: 285, wickets: 10, overs: 89.4 },
    score2: { runs: 410, wickets: 8, overs: 120.0 },
    currentInnings: 2,
    battingTeamId: 'team1',
    battingHighlights: [],
    bowlingHighlights: [],
    commentary: []
  }
];

const seedDatabase = async () => {
  try {
    const { error: deleteError } = await supabase.from('matches').delete().not('id', 'is', null);
    if (deleteError) throw deleteError;

    const matchesToInsert = seedMatches.map(match => ({ data: match }));
    
    const { error: insertError } = await supabase.from('matches').insert(matchesToInsert);
    if (insertError) throw insertError;

    console.log('Matches seeded successfully (Supabase)');
  } catch (err) {
    console.error('Seeding error message:', err.message);
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        console.error(`Field '${key}': ${err.errors[key].message}`);
      });
    }
  }
};

module.exports = seedDatabase;

if (require.main === module) {
  seedDatabase();
}
