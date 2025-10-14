import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Star,
  Target,
  Zap,
  Activity,
  DollarSign,
  Percent,
  Users
} from 'lucide-react';

type BadgeTier = 'legend' | 'master' | 'expert' | 'pro' | 'rising';
type TimeFilter = 'all-time' | '30d' | '7d' | '24h';
type CategoryFilter = 'overall' | 'profit' | 'winrate' | 'volume';

interface LeaderboardEntry {
  rank: number;
  address: string;
  nickname: string;
  totalBets: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  profit: number;
  profitChange: number;
  favoriteLeague: string;
  lastActive: string;
  badge: BadgeTier;
}

const Rankings: React.FC = () => {
  const { t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all-time');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('overall');
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);

  // Mock leaderboard data
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      address: '0x1A2B3C...5D6E',
      nickname: 'CryptoKing',
      totalBets: 1247,
      totalWagered: 125789.50,
      totalWon: 178934.22,
      winRate: 68.5,
      profit: 53144.72,
      profitChange: +12.5,
      favoriteLeague: 'Premier League',
      lastActive: '2 hours ago',
      badge: 'legend'
    },
    {
      rank: 2,
      address: '0x2B3C4D...6E7F',
      nickname: 'SportsBeast',
      totalBets: 932,
      totalWagered: 98432.10,
      totalWon: 134567.89,
      winRate: 72.1,
      profit: 36135.79,
      profitChange: +8.3,
      favoriteLeague: 'NBA',
      lastActive: '1 hour ago',
      badge: 'master'
    },
    {
      rank: 3,
      address: '0x3C4D5E...7F8G',
      nickname: 'BetMaster',
      totalBets: 1089,
      totalWagered: 87654.30,
      totalWon: 119876.45,
      winRate: 65.8,
      profit: 32222.15,
      profitChange: -2.1,
      favoriteLeague: 'La Liga',
      lastActive: '30 minutes ago',
      badge: 'expert'
    },
    {
      rank: 4,
      address: '0x4D5E6F...8G9H',
      nickname: 'DefiGambler',
      totalBets: 756,
      totalWagered: 65432.80,
      totalWon: 89123.45,
      winRate: 61.2,
      profit: 23690.65,
      profitChange: +5.7,
      favoriteLeague: 'Champions League',
      lastActive: '45 minutes ago',
      badge: 'pro'
    },
    {
      rank: 5,
      address: '0x5E6F7G...9H0I',
      nickname: 'Web3Wizard',
      totalBets: 643,
      totalWagered: 54321.60,
      totalWon: 72456.33,
      winRate: 69.4,
      profit: 18134.73,
      profitChange: +15.2,
      favoriteLeague: 'NFL',
      lastActive: '1 hour ago',
      badge: 'expert'
    },
    {
      rank: 6,
      address: '0x6F7G8H...0I1J',
      nickname: 'CryptoSports',
      totalBets: 534,
      totalWagered: 43210.90,
      totalWon: 58765.44,
      winRate: 58.9,
      profit: 15554.54,
      profitChange: -3.8,
      favoriteLeague: 'Premier League',
      lastActive: '3 hours ago',
      badge: 'pro'
    },
    {
      rank: 7,
      address: '0x7G8H9I...1J2K',
      nickname: 'BlockchainBet',
      totalBets: 421,
      totalWagered: 32109.70,
      totalWon: 43876.22,
      winRate: 63.7,
      profit: 11766.52,
      profitChange: +7.9,
      favoriteLeague: 'NBA',
      lastActive: '2 hours ago',
      badge: 'rising'
    },
    {
      rank: 8,
      address: '0x8H9I0J...2K3L',
      nickname: 'SmartBetter',
      totalBets: 387,
      totalWagered: 28765.40,
      totalWon: 37654.31,
      winRate: 66.1,
      profit: 8888.91,
      profitChange: +4.2,
      favoriteLeague: 'La Liga',
      lastActive: '4 hours ago',
      badge: 'rising'
    },
    {
      rank: 9,
      address: '0x9I0J1K...3L4M',
      nickname: 'DeFiSports',
      totalBets: 312,
      totalWagered: 21987.60,
      totalWon: 29876.44,
      winRate: 59.3,
      profit: 7888.84,
      profitChange: -1.5,
      favoriteLeague: 'Champions League',
      lastActive: '6 hours ago',
      badge: 'rising'
    },
    {
      rank: 10,
      address: '0x0J1K2L...4M5N',
      nickname: 'MetaBetter',
      totalBets: 287,
      totalWagered: 19876.30,
      totalWon: 26543.77,
      winRate: 62.4,
      profit: 6667.47,
      profitChange: +9.1,
      favoriteLeague: 'NFL',
      lastActive: '8 hours ago',
      badge: 'rising'
    }
  ];

  const getBadgeInfo = (badge: BadgeTier) => {
    switch (badge) {
      case 'legend':
        return { color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: Crown, label: 'Legend' };
      case 'master':
        return { color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: Trophy, label: 'Master' };
      case 'expert':
        return { color: 'bg-gradient-to-r from-blue-500 to-cyan-500', icon: Medal, label: 'Expert' };
      case 'pro':
        return { color: 'bg-gradient-to-r from-green-500 to-emerald-500', icon: Star, label: 'Pro' };
      case 'rising':
        return { color: 'bg-gradient-to-r from-gray-500 to-gray-600', icon: Activity, label: 'Rising' };
      default:
        return { color: 'bg-gradient-to-r from-gray-500 to-gray-600', icon: Activity, label: 'Rising' };
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-white" />;
      case 2:
        return <Medal className="h-6 w-6 text-white" />;
      case 3:
        return <Trophy className="h-6 w-6 text-white" />;
      default:
        return <span className="text-lg font-bold text-purple-400">#{rank}</span>;
    }
  };

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return 'rank-badge gold';
    if (rank === 2) return 'rank-badge silver'; 
    if (rank === 3) return 'rank-badge bronze';
    return 'rank-badge';
  };

  // Filter and sort data based on selections
  useEffect(() => {
    let filtered = [...mockLeaderboard];
    
    // Apply time filter (simulated data changes)
    if (timeFilter !== 'all-time') {
      // Simulate data changes for different time periods
      filtered = filtered.map((player, index) => ({
        ...player,
        // Simulate different profits for different time periods
        profit: timeFilter === '24h' ? player.profit * 0.05 :
               timeFilter === '7d' ? player.profit * 0.2 :
               timeFilter === '30d' ? player.profit * 0.6 : player.profit,
        totalWagered: timeFilter === '24h' ? player.totalWagered * 0.03 :
                     timeFilter === '7d' ? player.totalWagered * 0.15 :
                     timeFilter === '30d' ? player.totalWagered * 0.4 : player.totalWagered,
        totalBets: timeFilter === '24h' ? Math.max(1, Math.floor(player.totalBets * 0.02)) :
                  timeFilter === '7d' ? Math.max(1, Math.floor(player.totalBets * 0.1)) :
                  timeFilter === '30d' ? Math.max(1, Math.floor(player.totalBets * 0.3)) : player.totalBets
      }));
    }
    
    // Apply category sorting
    switch (categoryFilter) {
      case 'profit':
        filtered.sort((a, b) => b.profit - a.profit);
        break;
      case 'winrate':
        filtered.sort((a, b) => b.winRate - a.winRate);
        break;
      case 'volume':
        filtered.sort((a, b) => b.totalWagered - a.totalWagered);
        break;
      default: // overall
        filtered.sort((a, b) => a.rank - b.rank);
        break;
    }
    
    // Update ranks after sorting
    filtered = filtered.map((player, index) => ({
      ...player,
      rank: index + 1
    }));
    
    setFilteredData(filtered);
  }, [timeFilter, categoryFilter]);

  const timeFilters: Array<{ id: TimeFilter; label: string }> = [
    { id: 'all-time', label: 'All Time' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '24h', label: 'Last 24 Hours' }
  ];

  const categoryFilters: Array<{ id: CategoryFilter; label: string }> = [
    { id: 'overall', label: 'Overall Ranking' },
    { id: 'profit', label: 'Highest Profit' },
    { id: 'winrate', label: 'Best Win Rate' },
    { id: 'volume', label: 'Highest Volume' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-400" />
          Leaderboard Rankings
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-4">
          Top performers in the DeFi betting ecosystem. Compete for glory and exclusive rewards.
        </p>
        
        {/* Active Filter Indicator */}
        {(timeFilter !== 'all-time' || categoryFilter !== 'overall') && (
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-lg px-4 py-2 text-sm text-purple-300">
            <Activity className="h-4 w-4" />
            Filtered by: 
            <span className="font-semibold">
              {timeFilters.find(f => f.id === timeFilter)?.label}
            </span>
            {categoryFilter !== 'overall' && (
              <>
                <span className="text-gray-500">•</span>
                <span className="font-semibold">
                  {categoryFilters.find(f => f.id === categoryFilter)?.label}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-sm text-gray-400 mb-3">Time Period:</div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                  timeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {filter.label}
                {timeFilter === filter.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-400 mb-3">Sort By:</div>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCategoryFilter(filter.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                  categoryFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {filter.label}
                {categoryFilter === filter.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {filteredData.slice(0, 3).map((player, index) => {
          const badgeInfo = getBadgeInfo(player.badge);
          return (
            <div key={player.address} className={`cyber-card ${player.rank <= 3 ? 'border-purple-500/50' : ''}`}>
              <div className="text-center">
                <div className="relative mb-4">
                  <div className={getRankBadgeClass(player.rank)}>
                    {getRankIcon(player.rank)}
                  </div>
                  {player.rank === 1 && (
                    <div className="absolute -top-2 -right-2">
                      <Crown className="h-6 w-6 text-yellow-400" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{player.nickname}</h3>
                <p className="text-gray-400 text-sm font-mono mb-4">{player.address}</p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeInfo.color} text-white mb-4`}>
                  <badgeInfo.icon className="h-3 w-3 mr-1" />
                  {badgeInfo.label}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Profit:</span>
                    <span className="font-mono text-green-400">+${player.profit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="font-mono text-cyan-400">{player.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Bets:</span>
                    <span className="font-mono text-white">{player.totalBets}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-6 w-6 text-purple-400" />
            Complete Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {filteredData.map((player) => {
              const badgeInfo = getBadgeInfo(player.badge);
              return (
                <div key={player.address} className={`leaderboard-item ${player.rank <= 3 ? 'top-3' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Player Info */}
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={getRankBadgeClass(player.rank)}>
                        {player.rank <= 3 ? getRankIcon(player.rank) : player.rank}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold">{player.nickname}</h3>
                          <div className={`inline-flex items-center px-2 py-1 rounded text-xs ${badgeInfo.color} text-white w-fit`}>
                            <badgeInfo.icon className="h-3 w-3 mr-1" />
                            {badgeInfo.label}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm font-mono mb-1">{player.address}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                          <span>Favorite: {player.favoriteLeague}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Active: {player.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-left md:text-center">
                        <div className="text-xs text-gray-400 mb-1">Profit</div>
                        <div className="font-mono text-green-400 text-sm flex items-center md:justify-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          <span className="truncate">{player.profit.toLocaleString()}</span>
                        </div>
                        <div className={`text-xs flex items-center md:justify-center ${player.profitChange > 0 ? 'text-green-400' : player.profitChange < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                          {player.profitChange > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : 
                           player.profitChange < 0 ? <TrendingDown className="h-3 w-3 mr-1" /> : 
                           <Minus className="h-3 w-3 mr-1" />}
                          {Math.abs(player.profitChange)}%
                        </div>
                      </div>
                      
                      <div className="text-left md:text-center">
                        <div className="text-xs text-gray-400 mb-1">Win Rate</div>
                        <div className="font-mono text-cyan-400 text-sm flex items-center md:justify-center">
                          <Percent className="h-3 w-3 mr-1" />
                          {player.winRate}%
                        </div>
                      </div>
                      
                      <div className="text-left md:text-center">
                        <div className="text-xs text-gray-400 mb-1">Volume</div>
                        <div className="font-mono text-purple-400 text-sm truncate">${player.totalWagered.toLocaleString()}</div>
                      </div>
                      
                      <div className="text-left md:text-center">
                        <div className="text-xs text-gray-400 mb-1">Bets</div>
                        <div className="font-mono text-white text-sm">{player.totalBets}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="stat-card">
          <div className="stat-value gradient-text text-3xl md:text-5xl">{filteredData.length.toLocaleString()}</div>
          <div className="stat-label text-xs md:text-sm">Active Players</div>
          <Users className="h-6 w-6 md:h-8 md:w-8 text-purple-400 mt-3 md:mt-4 mx-auto" />
        </div>
        
        <div className="stat-card">
          <div className="stat-value gradient-text text-2xl md:text-5xl">
            ${filteredData.reduce((sum, p) => sum + p.totalWagered, 0).toLocaleString('en-US', {maximumFractionDigits: 0})}
          </div>
          <div className="stat-label text-xs md:text-sm">Total Volume ({timeFilters.find(f => f.id === timeFilter)?.label})</div>
          <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-green-400 mt-3 md:mt-4 mx-auto" />
        </div>
        
        <div className="stat-card">
          <div className="stat-value gradient-text text-3xl md:text-5xl">
            {filteredData.reduce((sum, p) => sum + p.totalBets, 0).toLocaleString()}
          </div>
          <div className="stat-label text-xs md:text-sm">Total Bets ({timeFilters.find(f => f.id === timeFilter)?.label})</div>
          <Target className="h-6 w-6 md:h-8 md:w-8 text-blue-400 mt-3 md:mt-4 mx-auto" />
        </div>
        
        <div className="stat-card">
          <div className="stat-value gradient-text text-3xl md:text-5xl">
            {filteredData.length > 0 ? (filteredData.reduce((sum, p) => sum + p.winRate, 0) / filteredData.length).toFixed(1) : 0}%
          </div>
          <div className="stat-label text-xs md:text-sm">Avg Win Rate</div>
          <Activity className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 mt-3 md:mt-4 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Rankings;