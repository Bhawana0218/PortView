import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, PieChart, BarChart3, Activity, Wallet, Target, Plus, Zap, ChevronRight, ChevronDown, CheckCircle, AlertCircle, ExternalLink, Eye, EyeOff, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, Globe, Users, Shield, Clock } from 'lucide-react';

const Portfolio = () => {
  const [showPortfolioValue, setShowPortfolioValue] = useState(true);
  const [timeRange, setTimeRange] = useState('1D');
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // Mock portfolio data
  const portfolioData = {
    totalValue: 15310.50,
    totalChange: 932.50,
    totalChangePercent: 6.5,
    dailyChange: 127.30,
    dailyChangePercent: 0.84,
    monthlyChange: 847.20,
    monthlyChangePercent: 5.8,
    yearlyChange: 2156.80,
    yearlyChangePercent: 16.3,
    investments: [
      {
        id: 1,
        name: 'Apple Inc.',
        symbol: 'AAPL',
        type: 'Stock',
        quantity: 10,
        purchasePrice: 150.25,
        currentPrice: 175.80,
        totalValue: 1758.00,
        profitLoss: 255.50,
        profitLossPercent: 17.0,
        allocation: 11.5,
        sector: 'Technology'
      },
      {
        id: 2,
        name: 'Vanguard S&P 500',
        symbol: 'VOO',
        type: 'ETF',
        quantity: 25,
        purchasePrice: 350.50,
        currentPrice: 375.20,
        totalValue: 9380.00,
        profitLoss: 617.50,
        profitLossPercent: 7.0,
        allocation: 61.3,
        sector: 'Index Fund'
      },
      {
        id: 3,
        name: 'Tesla Inc.',
        symbol: 'TSLA',
        type: 'Stock',
        quantity: 5,
        purchasePrice: 220.00,
        currentPrice: 210.50,
        totalValue: 1052.50,
        profitLoss: -47.50,
        profitLossPercent: -8.6,
        allocation: 6.9,
        sector: 'Automotive'
      },
      {
        id: 4,
        name: 'Fidelity Balanced Fund',
        symbol: 'FBALX',
        type: 'Mutual Fund',
        quantity: 100,
        purchasePrice: 28.50,
        currentPrice: 31.20,
        totalValue: 3120.00,
        profitLoss: 270.00,
        profitLossPercent: 9.5,
        allocation: 20.3,
        sector: 'Balanced'
      }
    ],
    sectors: [
      { name: 'Technology', value: 18.4, color: 'bg-blue-500' },
      { name: 'Index Fund', value: 61.3, color: 'bg-green-500' },
      { name: 'Automotive', value: 6.9, color: 'bg-purple-500' },
      { name: 'Balanced', value: 13.4, color: 'bg-orange-500' }
    ],
    performance: [
      { date: '2024-01', value: 12000 },
      { date: '2024-02', value: 12500 },
      { date: '2024-03', value: 13200 },
      { date: '2024-04', value: 14100 },
      { date: '2024-05', value: 14800 },
      { date: '2024-06', value: 15310 }
    ]
  };

  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'All'];

  const getProfitLossColor = (value) => value >= 0 ? 'text-green-400' : 'text-red-400';
  const getProfitLossIcon = (value) => value >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Background with subtle animation */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-purple-900/10 to-slate-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="my-10">
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio Overview
          </h1>
          <p className="text-gray-400">Real-time portfolio tracking and analytics</p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-blue-400">
                <Wallet className="w-8 h-8" />
              </div>
              <button 
                onClick={() => setShowPortfolioValue(!showPortfolioValue)}
                className="text-gray-400 hover:text-white"
              >
                {showPortfolioValue ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="text-2xl font-bold">
              {showPortfolioValue ? `₹${portfolioData.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">Total Portfolio Value</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-green-400`}>
                {React.createElement(getProfitLossIcon(portfolioData.totalChange), { className: "w-8 h-8" })}
              </div>
            </div>
            <div className={`text-2xl font-bold ${getProfitLossColor(portfolioData.totalChange)}`}>
              {showPortfolioValue ? `₹${portfolioData.totalChange.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">Total P/L</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-purple-400">
                <PieChart className="w-8 h-8" />
              </div>
            </div>
            <div className={`text-2xl font-bold ${getProfitLossColor(portfolioData.totalChangePercent)}`}>
              {showPortfolioValue ? `${portfolioData.totalChangePercent.toFixed(2)}%` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">Total P/L %</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-orange-400">
                <Activity className="w-8 h-8" />
              </div>
            </div>
            <div className="text-2xl font-bold">{portfolioData.investments.length}</div>
            <div className="text-gray-400 text-sm">Total Investments</div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                timeRange === range
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Portfolio Performance</h3>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">+6.5% (6 months)</span>
            </div>
          </div>
          <div className="h-64 rounded-xl overflow-hidden flex items-center justify-center">
  <img
    src="https://pikwizard.com/pw/medium/8c9ede8275fb01a23be8f81bc47f03bc.jpg"
    alt="Portfolio Performance"
    className="w-full h-full object-cover"
  />
</div>

        </div>

        {/* Allocation and Performance Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Allocation Chart */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Asset Allocation</h3>
            <div className="space-y-4">
              {portfolioData.sectors.map((sector, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                    <span className="font-medium">{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{sector.value}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-48 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <p className="text-gray-400">Allocation visualization</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <div className="text-gray-400 text-sm">Daily Change</div>
                  <div className="font-semibold">Today</div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getProfitLossColor(portfolioData.dailyChange)}`}>
                    {showPortfolioValue ? `₹${portfolioData.dailyChange.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
                  </div>
                  <div className={`text-sm ${getProfitLossColor(portfolioData.dailyChangePercent)}`}>
                    {showPortfolioValue ? `${portfolioData.dailyChangePercent.toFixed(2)}%` : '••••••'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <div className="text-gray-400 text-sm">Monthly Change</div>
                  <div className="font-semibold">Last 30 days</div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getProfitLossColor(portfolioData.monthlyChange)}`}>
                    {showPortfolioValue ? `₹${portfolioData.monthlyChange.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
                  </div>
                  <div className={`text-sm ${getProfitLossColor(portfolioData.monthlyChangePercent)}`}>
                    {showPortfolioValue ? `${portfolioData.monthlyChangePercent.toFixed(2)}%` : '••••••'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <div className="text-gray-400 text-sm">Yearly Change</div>
                  <div className="font-semibold">Last 12 months</div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${getProfitLossColor(portfolioData.yearlyChange)}`}>
                    {showPortfolioValue ? `₹${portfolioData.yearlyChange.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
                  </div>
                  <div className={`text-sm ${getProfitLossColor(portfolioData.yearlyChangePercent)}`}>
                    {showPortfolioValue ? `${portfolioData.yearlyChangePercent.toFixed(2)}%` : '••••••'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investments Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold">Your Investments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Investment</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Quantity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Current Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Total Value</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">P/L</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.investments.map((investment) => (
                  <tr 
                    key={investment.id} 
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedInvestment(selectedInvestment === investment.id ? null : investment.id)}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold">{investment.name}</div>
                        <div className="text-gray-400 text-sm">{investment.symbol}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm capitalize">
                        {investment.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">{investment.quantity}</td>
                    <td className="py-4 px-6">₹{investment.currentPrice.toFixed(2)}</td>
                    <td className="py-4 px-6 font-semibold">₹{investment.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td className={`py-4 px-6 font-semibold ${getProfitLossColor(investment.profitLoss)}`}>
                      ₹{investment.profitLoss.toFixed(2)} ({investment.profitLossPercent.toFixed(2)}%)
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${investment.allocation}%` }}
                          ></div>
                        </div>
                        <span>{investment.allocation}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Market Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">S&P 500</span>
                <span className="text-green-400">+0.84%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">NASDAQ</span>
                <span className="text-green-400">+1.23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">DOW JONES</span>
                <span className="text-red-400">-0.12%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Top Performers</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">NVDA</span>
                <span className="text-green-400">+3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MSFT</span>
                <span className="text-green-400">+1.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TSLA</span>
                <span className="text-red-400">-2.1%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Volatility</span>
                <span className="text-yellow-400">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Level</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Diversification</span>
                <span className="text-green-400">Good</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
