import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, TrendingUp, TrendingDown, Search, Filter, Calendar, DollarSign, PieChart, BarChart3, Activity, Wallet, Target, Zap, ChevronRight, ChevronDown, CheckCircle, AlertCircle, ExternalLink, Eye, EyeOff } from 'lucide-react';

const Dashboard = () => {
  const [investments, setInvestments] = useState([
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
      purchaseDate: '2024-01-15',
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
      purchaseDate: '2024-02-01',
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
      purchaseDate: '2024-03-10',
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
      purchaseDate: '2024-01-20',
      sector: 'Balanced'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showPortfolioValue, setShowPortfolioValue] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    type: 'Stock',
    quantity: '',
    purchasePrice: '',
    purchaseDate: '',
    sector: ''
  });

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.totalValue, 0);
  const totalProfitLoss = investments.reduce((sum, inv) => sum + inv.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100;

  const filteredInvestments = investments
    .filter(inv => 
      inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(inv => filterType === 'all' || inv.type === filterType)
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleAddInvestment = (e) => {
    e.preventDefault();
    const newInvestment = {
      id: Date.now(),
      ...formData,
      quantity: parseFloat(formData.quantity),
      purchasePrice: parseFloat(formData.purchasePrice),
      currentPrice: parseFloat(formData.purchasePrice),
      totalValue: parseFloat(formData.quantity) * parseFloat(formData.purchasePrice),
      profitLoss: 0,
      profitLossPercent: 0
    };
    setInvestments([...investments, newInvestment]);
    setFormData({
      name: '',
      symbol: '',
      type: 'Stock',
      quantity: '',
      purchasePrice: '',
      purchaseDate: '',
      sector: ''
    });
    setShowAddForm(false);
  };

  const handleEditInvestment = (e) => {
    e.preventDefault();
    setInvestments(investments.map(inv => 
      inv.id === editingInvestment.id 
        ? { ...editingInvestment, totalValue: editingInvestment.quantity * editingInvestment.currentPrice }
        : inv
    ));
    setEditingInvestment(null);
  };

  const handleDeleteInvestment = (id) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const getProfitLossColor = (value) => value >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Background with subtle animation */}
      <div className="fixed inset-0 bg-linear-to-br from-slate-900/20 via-purple-900/10 to-slate-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="my-10">
          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Investment Dashboard
          </h1>
          <p className="text-gray-400">Track and manage your investment portfolio</p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              {showPortfolioValue ? `₹${totalPortfolioValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">Total Value</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-green-400`}>
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
            <div className={`text-2xl font-bold ${getProfitLossColor(totalProfitLoss)}`}>
              {showPortfolioValue ? `₹${totalProfitLoss.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">Total P/L</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-purple-400">
                <PieChart className="w-8 h-8" />
              </div>
            </div>
            <div className={`text-2xl font-bold ${getProfitLossColor(totalProfitLossPercent)}`}>
              {showPortfolioValue ? `${totalProfitLossPercent.toFixed(2)}%` : '••••••'}
            </div>
            <div className="text-gray-400 text-sm">P/L %</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-orange-400">
                <Activity className="w-8 h-8" />
              </div>
            </div>
            <div className="text-2xl font-bold">{investments.length}</div>
            <div className="text-gray-400 text-sm">Total Investments</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search investments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="Stock">Stock</option>
              <option value="ETF">ETF</option>
              <option value="Mutual Fund">Mutual Fund</option>
              <option value="Bond">Bond</option>
            </select>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Investment
            </button>
          </div>
        </div>

        {/* Add Investment Form */}
        {showAddForm && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Investment</h3>
            <form onSubmit={handleAddInvestment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                type="text"
                placeholder="Investment Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Symbol"
                value={formData.symbol}
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Stock">Stock</option>
                <option value="ETF">ETF</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="Bond">Bond</option>
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                step="0.01"
              />
              <input
                type="number"
                placeholder="Purchase Price"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                step="0.01"
              />
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Sector"
                value={formData.sector}
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 lg:col-span-6"
              />
              <div className="flex gap-3 md:col-span-2 lg:col-span-6">
                <button
                  type="submit"
                  className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Add Investment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Investment Form */}
        {editingInvestment && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Edit Investment</h3>
            <form onSubmit={handleEditInvestment} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                type="text"
                value={editingInvestment.name}
                onChange={(e) => setEditingInvestment({...editingInvestment, name: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={editingInvestment.symbol}
                onChange={(e) => setEditingInvestment({...editingInvestment, symbol: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={editingInvestment.type}
                onChange={(e) => setEditingInvestment({...editingInvestment, type: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Stock">Stock</option>
                <option value="ETF">ETF</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="Bond">Bond</option>
              </select>
              <input
                type="number"
                value={editingInvestment.quantity}
                onChange={(e) => setEditingInvestment({...editingInvestment, quantity: parseFloat(e.target.value)})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                step="0.01"
              />
              <input
                type="number"
                value={editingInvestment.purchasePrice}
                onChange={(e) => setEditingInvestment({...editingInvestment, purchasePrice: parseFloat(e.target.value)})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                step="0.01"
              />
              <input
                type="date"
                value={editingInvestment.purchaseDate}
                onChange={(e) => setEditingInvestment({...editingInvestment, purchaseDate: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={editingInvestment.sector}
                onChange={(e) => setEditingInvestment({...editingInvestment, sector: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 lg:col-span-6"
              />
              <div className="flex gap-3 md:col-span-2 lg:col-span-6">
                <button
                  type="submit"
                  className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Update Investment
                </button>
                <button
                  type="button"
                  onClick={() => setEditingInvestment(null)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Investments Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Investment</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Quantity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Purchase Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Current Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Total Value</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">P/L</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">P/L %</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvestments.map((investment) => (
                  <tr key={investment.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
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
                    <td className="py-4 px-6">₹{investment.purchasePrice.toFixed(2)}</td>
                    <td className="py-4 px-6">₹{investment.currentPrice.toFixed(2)}</td>
                    <td className="py-4 px-6 font-semibold">₹{investment.totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td className={`py-4 px-6 font-semibold ${getProfitLossColor(investment.profitLoss)}`}>
                      ₹{investment.profitLoss.toFixed(2)}
                    </td>
                    <td className={`py-4 px-6 font-semibold ${getProfitLossColor(investment.profitLossPercent)}`}>
                      {investment.profitLossPercent.toFixed(2)}%
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingInvestment(investment)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInvestment(investment.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredInvestments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Wallet className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No investments found</h3>
                <p className="text-gray-500">Start by adding your first investment to track your portfolio</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Add Investment
              </button>
            </div>
          )}
        </div>

        {/* Portfolio Allocation */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Portfolio Allocation</h3>
            <div className="space-y-3">
              {['Technology', 'Index Fund', 'Automotive', 'Balanced'].map((sector, index) => {
                const sectorValue = investments
                  .filter(inv => inv.sector === sector)
                  .reduce((sum, inv) => sum + inv.totalValue, 0);
                const percentage = totalPortfolioValue > 0 ? (sectorValue / totalPortfolioValue) * 100 : 0;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                      <span>{sector}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{sectorValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                      <div className="text-sm text-gray-400">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Investment Types</h3>
            <div className="space-y-3">
              {['Stock', 'ETF', 'Mutual Fund', 'Bond'].map((type, index) => {
                const typeCount = investments.filter(inv => inv.type === type).length;
                const typeValue = investments
                  .filter(inv => inv.type === type)
                  .reduce((sum, inv) => sum + inv.totalValue, 0);
                const percentage = totalPortfolioValue > 0 ? (typeValue / totalPortfolioValue) * 100 : 0;
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : index === 2 ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
                      <span>{type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{typeCount} investments</div>
                      <div className="text-sm text-gray-400">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
