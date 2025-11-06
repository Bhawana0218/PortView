import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Activity, DollarSign, Target, Zap, ChevronRight, ChevronDown, Eye, EyeOff, Sparkles, Calendar, Filter, Download, Share2, AlertTriangle, CheckCircle, Clock, Globe, Users, Shield, LineChart } from 'lucide-react';

const Analytics = () => {
  const [showValues, setShowValues] = useState(true);
  const [timeRange, setTimeRange] = useState('1M');
  const [selectedMetric, setSelectedMetric] = useState('performance');
  const [selectedChart, setSelectedChart] = useState('portfolio');

  // Mock analytics data
  const analyticsData = {
    performance: {
      totalReturn: 16.3,
      volatility: 12.5,
      sharpeRatio: 1.3,
      maxDrawdown: -8.2,
      alpha: 0.8,
      beta: 1.1
    },
    allocation: [
      { name: 'Technology', value: 18.4, color: 'bg-blue-500' },
      { name: 'Index Fund', value: 61.3, color: 'bg-green-500' },
      { name: 'Automotive', value: 6.9, color: 'bg-purple-500' },
      { name: 'Balanced', value: 13.4, color: 'bg-orange-500' }
    ],
    performanceData: [
      { date: 'Jan', portfolio: 12000, benchmark: 11800 },
      { date: 'Feb', portfolio: 12500, benchmark: 12200 },
      { date: 'Mar', portfolio: 13200, benchmark: 12800 },
      { date: 'Apr', portfolio: 14100, benchmark: 13500 },
      { date: 'May', portfolio: 14800, benchmark: 14200 },
      { date: 'Jun', portfolio: 15310, benchmark: 14800 }
    ],
    riskMetrics: [
      { metric: 'Volatility', value: 12.5, unit: '%', status: 'low' },
      { metric: 'Max Drawdown', value: 8.2, unit: '%', status: 'medium' },
      { metric: 'Sharpe Ratio', value: 1.3, unit: '', status: 'high' },
      { metric: 'Beta', value: 1.1, unit: '', status: 'medium' }
    ],
    sectorPerformance: [
      { sector: 'Technology', return: 22.5, allocation: 18.4 },
      { sector: 'Index Fund', return: 14.2, allocation: 61.3 },
      { sector: 'Automotive', return: -5.8, allocation: 6.9 },
      { sector: 'Balanced', return: 11.7, allocation: 13.4 }
    ]
  };

  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'All'];
  const metrics = ['performance', 'allocation', 'risk', 'sectors'];

  const getRiskColor = (status) => {
    switch(status) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskIcon = (status) => {
    switch(status) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Background with subtle animation */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-purple-900/10 to-slate-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="my-10">
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400">Advanced portfolio analytics and insights</p>
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

        {/* Analytics Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {metrics.map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                selectedMetric === metric
                  ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>

        {/* Performance Metrics Cards */}
        {selectedMetric === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-400">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <button 
                  onClick={() => setShowValues(!showValues)}
                  className="text-gray-400 hover:text-white"
                >
                  {showValues ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {showValues ? `${analyticsData.performance.totalReturn}%` : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Total Return</div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-orange-400">
                  <Activity className="w-8 h-8" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {showValues ? `${analyticsData.performance.volatility}%` : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Volatility</div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-purple-400">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {showValues ? analyticsData.performance.sharpeRatio.toFixed(2) : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Sharpe Ratio</div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-red-400">
                  <TrendingDown className="w-8 h-8" />
                </div>
              </div>
              <div className="text-2xl font-bold text-red-400">
                {showValues ? `${analyticsData.performance.maxDrawdown}%` : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Max Drawdown</div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-green-400">
                  <Target className="w-8 h-8" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {showValues ? analyticsData.performance.alpha.toFixed(2) : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Alpha</div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-yellow-400">
                  <Globe className="w-8 h-8" />
                </div>
              </div>
              <div className="text-2xl font-bold">
                {showValues ? analyticsData.performance.beta.toFixed(2) : '••••••'}
              </div>
              <div className="text-gray-400 text-sm">Beta</div>
            </div>
          </div>
        )}

        {/* Allocation Chart */}
        {selectedMetric === 'allocation' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Asset Allocation</h3>
              <div className="space-y-4 mb-6">
                {analyticsData.allocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-64 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                  <p className="text-gray-400">Allocation visualization</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Sector Performance</h3>
              <div className="space-y-4">
                {analyticsData.sectorPerformance.map((sector, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{sector.sector}</span>
                      <span className={`font-semibold ${sector.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.return >= 0 ? '+' : ''}{sector.return}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Allocation: {sector.allocation}%</span>
                      <span>P/L: {sector.return >= 0 ? '+' : ''}{sector.return}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Risk Metrics */}
        {selectedMetric === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Risk Metrics</h3>
              <div className="space-y-4">
                {analyticsData.riskMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getRiskColor(metric.status).replace('text-', 'bg-').replace('400', '500/20')}`}>
                        {getRiskIcon(metric.status)}
                      </div>
                      <span className="font-medium">{metric.metric}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${getRiskColor(metric.status)}`}>
                        {metric.value}{metric.unit}
                      </div>
                      <div className={`text-sm capitalize ${getRiskColor(metric.status)}`}>
                        {metric.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Risk Analysis</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h4 className="font-semibold mb-2">Portfolio Risk Level</h4>
                  <p className="text-gray-400 text-sm mb-3">Your portfolio has a medium risk level based on current allocation and market conditions.</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-linear-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded-xl">
                  <h4 className="font-semibold mb-2">Diversification Score</h4>
                  <p className="text-gray-400 text-sm mb-3">Your portfolio is well-diversified across sectors and asset classes.</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-green-400 font-semibold">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sector Performance */}
        {selectedMetric === 'sectors' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Sector Performance vs Allocation</h3>
              <div className="space-y-4">
                {analyticsData.sectorPerformance.map((sector, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{sector.sector}</span>
                      <span className={`font-semibold ${sector.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.return >= 0 ? '+' : ''}{sector.return}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className={`h-2 rounded-full ${sector.return >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${sector.allocation}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Allocation: {sector.allocation}%</span>
                      <span>Performance: {sector.return >= 0 ? '+' : ''}{sector.return}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Top Performers</h3>
              <div className="space-y-4">
                {analyticsData.sectorPerformance
                  .sort((a, b) => b.return - a.return)
                  .slice(0, 3)
                  .map((sector, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'} flex items-center justify-center text-white font-bold`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{sector.sector}</span>
                      </div>
                      <div className={`font-semibold ${sector.return >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {sector.return >= 0 ? '+' : ''}{sector.return}%
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Chart */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Portfolio Performance</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
  className="h-80 rounded-xl flex items-center justify-center bg-cover bg-center relative overflow-hidden"
  style={{
    backgroundImage:
      "url('https://pikwizard.com/pw/medium/6c3dc4ebb747036b306df88724febba8.jpg')",
  }}
></div>
          {/* <div className="h-80 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 mx-auto text-blue-400 mb-4" />
              <p className="text-gray-400">Performance chart visualization</p>
              <p className="text-sm text-gray-500">Portfolio vs Benchmark comparison</p>
            </div>
          </div> */}
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Positive Insights</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Portfolio outperformed benchmark by 3.2%
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Low volatility compared to sector average
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Strong diversification across sectors
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold">Areas to Watch</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Automotive sector underperforming
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Consider rebalancing
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                Monitor market volatility
              </li>
            </ul>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Recommendations</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Rebalance portfolio to 60/40 split
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Consider adding emerging markets
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Set up alerts for sector changes
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6">Analytics Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Analytics
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Set Alerts
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Target className="w-5 h-5" />
              Optimize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
