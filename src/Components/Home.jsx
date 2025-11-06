import React, { useState, useEffect, useRef } from 'react';
import {PieChart, Star, ArrowRight, Play, ChevronRight, TrendingUp, TrendingDown, CheckCircle, Sparkles,  Wallet,  ShieldCheck, ZapIcon, Rocket, Target as TargetIcon, Brain, GlobeIcon, Users as UsersIcon, DollarSign as DollarSignIcon, TrendingUp as TrendingUpIcon, BarChart3 as BarChart3Icon, Activity as ActivityIcon, Shield as ShieldIcon, Award as AwardIcon, Clock as ClockIcon, LineChart as LineChartIcon, CheckCircle as CheckCircleIcon, Sparkles as SparklesIcon, TrendingDown as TrendingDownIcon } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <TrendingUpIcon className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Monitor your investments in real-time with live market data and instant updates.",
      gradient: "from-blue-500 to-cyan-500",
      pulse: true
    },
    {
      icon: <DollarSignIcon className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Detailed performance metrics and ROI analysis to optimize your portfolio.",
      gradient: "from-green-500 to-emerald-500",
      pulse: false
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Asset Allocation",
      description: "Visual breakdown of your portfolio allocation across different asset classes.",
      gradient: "from-purple-500 to-pink-500",
      pulse: true
    },
    {
      icon: <BarChart3Icon className="w-8 h-8" />,
      title: "Risk Management",
      description: "Advanced risk assessment tools to protect and grow your investments.",
      gradient: "from-orange-500 to-red-500",
      pulse: false
    },
    {
      icon: <ShieldIcon className="w-8 h-8" />,
      title: "Security First",
      description: "Bank-level security with 256-bit encryption and multi-factor authentication.",
      gradient: "from-gray-500 to-slate-500",
      pulse: true
    },
    {
      icon: <ActivityIcon className="w-8 h-8" />,
      title: "Market Insights",
      description: "AI-powered market analysis and predictive insights for better decisions.",
      gradient: "from-indigo-500 to-blue-500",
      pulse: false
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", icon: <UsersIcon className="w-5 h-5" />, change: "+12%" },
    { number: "₹2.5B+", label: "Assets Tracked", icon: <DollarSignIcon className="w-5 h-5" />, change: "+8.3%" },
    { number: "99.9%", label: "Uptime", icon: <ShieldCheck className="w-5 h-5" />, change: "+0.1%" },
    { number: "24/7", label: "Support", icon: <ClockIcon className="w-5 h-5" />, change: "24/7" }
  ];

  const portfolioTypes = [
    { name: "Conservative", value: 65, change: "+2.3%", color: "bg-green-500", growth: 12 },
    { name: "Balanced", value: 45, change: "+4.7%", color: "bg-blue-500", growth: 18 },
    { name: "Aggressive", value: 32, change: "+8.1%", color: "bg-purple-500", growth: 25 },
    { name: "Growth", value: 28, change: "+6.2%", color: "bg-orange-500", growth: 22 }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Investor",
      content: "This platform has completely transformed how I manage my investments. The analytics are incredible and the real-time tracking is a game-changer.",
      rating: 5,
      avatar: "https://www.bing.com/th/id/OIP.R5CdIXpy5KJ7Sh6-WE0JrQHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
      verified: true
    },
    {
      name: "Michael Chen",
      role: "Day Trader",
      content: "The speed and accuracy of the data are unmatched. I've seen a 30% improvement in my trading performance since using this platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      verified: true
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      content: "My clients love the transparency and detailed reporting. It's made my job so much easier and more effective.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      verified: true
    }
  ];

  const recentActivity = [
    { action: "Portfolio Update", time: "2 min ago", change: "+₹12479.32", type: "positive", icon: <TrendingUpIcon className="w-4 h-4" /> },
    { action: "Market Alert", time: "5 min ago", change: "AAPL down 3.2%", type: "negative", icon: <TrendingDownIcon className="w-4 h-4" /> },
    { action: "Dividend Received", time: "1 hour ago", change: "+₹890.50", type: "positive", icon: <DollarSignIcon className="w-4 h-4" /> },
    { action: "New Investment", time: "3 hours ago", change: "Added ₹50000 to Tech", type: "neutral", icon: <Wallet className="w-4 h-4" /> }
  ];

  const marketData = [
    { symbol: "SPY", price: "452.38", change: "+0.85%", positive: true, volume: "2.1B" },
    { symbol: "QQQ", price: "387.21", change: "+1.23%", positive: true, volume: "1.8B" },
    { symbol: "DIA", price: "345.67", change: "-0.12%", positive: false, volume: "0.9B" },
    { symbol: "IWM", price: "198.45", change: "+0.45%", positive: true, volume: "1.2B" },
    { symbol: "TLT", price: "89.12", change: "-0.67%", positive: false, volume: "0.6B" },
    { symbol: "GLD", price: "189.34", change: "+0.23%", positive: true, volume: "0.4B" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-black text-white overflow-hidden relative">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
  
        <div 
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: mousePosition.x * 0.01,
            bottom: mousePosition.y * 0.01,
            transition: isScrolling ? 'none' : 'all 0.3s ease'
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
            transition: isScrolling ? 'none' : 'all 0.3s ease'
          }}
        ></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Background Image with Blur */}
      <div 
        className=" inset-0 bg-cover bg-center opacity-5 fixed"
        style={{
        //   backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2328&q=80')`
        backgroundImage: `url("https://i.pinimg.com/originals/56/ee/f3/56eef36c0572b4320dd5c579b3286051.jpg")`
        }}
      ></div>
      
      {/* Hero Section */}
      <div className="relative z-20 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-8 flex justify-center">
            <div className="bg-linear-to-r from-blue-400 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 animate-pulse">
              
              <span className="text-sm font-medium">Trusted by 10,000+ investors worldwide</span>
          
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight">
              PortView
            </h1>
            <div className="flex justify-center mb-4">
              <div className="bg-linear-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live Market Data</span>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            The most advanced portfolio tracker with real-time analytics, risk management, and AI-powered insights to maximize your returns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-2xl hover:shadow-blue-500/25">
              Start Free Trial 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 flex items-center gap-2 hover:shadow-lg">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
              Watch Demo
            </button>
          </div>
          
        </div>
      </div>

      {/* Stats Section with Animations */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-3 text-blue-400 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base mb-2">{stat.label}</div>
              <div className="text-xs text-green-400 font-semibold">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section with Enhanced Interactivity */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Enterprise-Grade Features
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">Everything you need to manage your investments like a pro</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${feature.gradient} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500 ${feature.pulse ? 'animate-pulse' : ''}`}></div>
                <div className={`text-blue-400 mb-4 relative z-10 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 relative z-10 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Portfolio Section */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className=" bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8  transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUpIcon className="w-6 h-6 text-green-400" />
                  Portfolio Performance
                </h3>
                <div className="space-y-4">
                  {portfolioTypes.map((portfolio, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${portfolio.color} group-hover:scale-125 transition-transform`}></div>
                        <span className="font-medium group-hover:text-blue-300 transition-colors">{portfolio.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold group-hover:text-blue-300 transition-colors">₹{portfolio.value}K</div>
                        <div className={`text-sm ${portfolio.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {portfolio.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ActivityIcon className="w-6 h-6 text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activity.type === 'positive' ? 'bg-green-500/20 text-green-400' : activity.type === 'negative' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {activity.icon}
                        </div>
                        <div>
                          <div className="font-medium group-hover:text-blue-300 transition-colors">{activity.action}</div>
                          <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${activity.type === 'positive' ? 'text-green-400' : activity.type === 'negative' ? 'text-red-400' : 'text-gray-400'}`}>
                        {activity.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Enhanced Design */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Trusted by Professionals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  {testimonial.verified && (
                    <div className="ml-2 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-gray-300 mb-6 italic group-hover:text-white transition-colors">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors" />
                  <div>
                    <div className="font-semibold group-hover:text-blue-300 transition-colors">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block mb-6">
              <div className="bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full p-4 animate-bounce">
                <Rocket className="w-12 h-12 mx-auto text-blue-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Ready to Transform Your Investment Strategy?
            </h2>
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professional investors who trust our platform to manage their wealth and achieve their financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 hover:shadow-lg">
              <Brain className="w-5 h-5" />
              AI Analysis
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2 group">
              <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center gap-2 group">
              <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 group">
              <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA with Interactive Elements */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pb-32">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-linear-to-r hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300">
          <div className="flex justify-center mb-6">
            <GlobeIcon className="w-16 h-16 text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Global Investment Intelligence
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access real-time data from 150+ markets worldwide with our advanced tracking technology and AI-powered insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { icon: <TargetIcon className="w-8 h-8" />, title: "Smart Alerts", desc: "Get notified instantly" },
              { icon: <LineChartIcon className="w-8 h-8" />, title: "Advanced Analytics", desc: "Deep market insights" },
              { icon: <ZapIcon className="w-8 h-8" />, title: "Lightning Fast", desc: "Real-time updates" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="font-semibold group-hover:text-blue-300 transition-colors">{item.title}</div>
                <div className="text-sm text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
          <button className="group bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 mx-auto">
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

