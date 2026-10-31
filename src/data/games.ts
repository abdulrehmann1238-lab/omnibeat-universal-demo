import { GameSession } from '../types';

export const MOCK_GAMES: GameSession[] = [
  {
    id: 'game-01',
    title: 'Friday Music Bingo',
    type: 'Music Bingo - Live Event',
    sessionId: 'FB-2026-014',
    playersCount: 42,
    status: 'active',
    theme: 'Pop & Modern Classics',
    currentRound: 3,
    totalRounds: 5
  },
  {
    id: 'game-02',
    title: 'Saturday Retro Night',
    type: 'Music Bingo - 80s & 90s',
    sessionId: 'SR-2026-008',
    playersCount: 67,
    status: 'active',
    theme: '80s Synthpop & Retro Hits',
    currentRound: 2,
    totalRounds: 4
  },
  {
    id: 'game-03',
    title: 'Corporate Music Challenge',
    type: 'Team Music Trivia',
    sessionId: 'CM-2026-003',
    playersCount: 28,
    status: 'scheduled',
    scheduledTime: 'Tomorrow at 8:00 PM',
    theme: 'All-Decades Shuffle',
    currentRound: 0,
    totalRounds: 6
  }
];

