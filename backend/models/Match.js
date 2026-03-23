const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  status: { type: String, enum: ['live', 'upcoming', 'completed'], default: 'upcoming' },
  statusText: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  team1: {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    color: { type: String, default: 'bg-blue-600' }
  },
  team2: {
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    color: { type: String, default: 'bg-red-600' }
  },
  score1: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 }
  },
  score2: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 }
  },
  currentInnings: { type: Number, default: 1 },
  battingTeamId: { type: String }, // 'team1' or 'team2'
  crr: { type: Number, default: 0 },
  req: { type: Number },
  target: { type: Number },
  
  // Embedded data for details view
  battingHighlights: [{
    playerName: String,
    status: String,
    runs: Number,
    balls: Number,
    fours: Number,
    sixes: Number,
    strikeRate: Number
  }],
  bowlingHighlights: [{
    playerName: String,
    overs: Number,
    maidens: Number,
    runs: Number,
    wickets: Number,
    economy: Number
  }],
  commentary: [{
    over: String,
    type: { type: String }, // 'W', '4', '6', '1', etc.
    text: String,
    runs: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
