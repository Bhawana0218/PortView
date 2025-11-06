import React, { useEffect, useState } from 'react';
import { supabase } from '/src/lib/supabaseClient';
import Check from '/src/assets/Check.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const handleSignUp = async () => {
        if (!name || !email || !password) {
            setError('Please enter your name, email and password.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password: password,
                options: {
                    data: {
                        name: name
                    }, emailRedirectTo: window.location.origin
                } });
            if (error) {
                // Handle specific Supabase errors
                if (error.message.includes('User already registered')) {
                    setError('An account with this email already exists. Please login instead.');
                } else {
                    setError(error.message);
                }
            } else if (data.user) {
                if (data.user.identities?.length > 0) {
                    // User signed up successfully
                    setMessage(`Thanks for signing up! A confirmation email has been sent to ${email}. Please check your inbox and spam folder to verify your email address.`);
                    setName('');
                    setEmail('');
                    setPassword('');
                } else {
                    // Email not sent
                    setError('Registration successful but we couldn\'t send the confirmation email. Please contact support.');
                }}     
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } 
        setLoading(false);
    };
    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setError('');
        setMessage('');
        setLoading(true); 
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });
            if (error) {
                // Handle specific login errors
                if (error.message.includes('Invalid login credentials')) {
                    setError('Invalid email or password. Please try again.');
                } else if (error.message.includes('Email not confirmed')) {
                    setError(`Your email hasn't been confirmed yet. Please check your inbox for the confirmation email sent to ${email}.`);
                    // Resend confirmation email option
                    const { error: resendError } = await supabase.auth.resend({
                        type: 'signup',
                        email: email.trim()
                    }); 
                    if (!resendError) {
                        setMessage(`A new confirmation email has been sent to ${email}.`);
                    }
                } else {
                    setError(error.message);
                }
            } else if (data.user) {
                setUser(data.user);
                setEmail('');
                setPassword('');
                // Fetch user metadata for name
                const { data: userData } = await supabase.auth.getUser();
                if (userData.user?.user_metadata?.name) {
                    setName(userData.user.user_metadata.name);
                }
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
        setLoading(false);
    };
    const handleLogout = async () => {
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            
            if (error) {
                setError(error.message);
            } else {
                setUser(null);
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError('An unexpected error occurred during logout.');
        } 
        setLoading(false);
    };
    const handleResendConfirmation = async () => {
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email.trim()
            });
            if (error) {
                setError(error.message);
            } else {
                setMessage(`A confirmation email has been resent to ${email}. Please check your inbox and spam folder.`);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
        setLoading(false);
    };
    useEffect(() => {
        const init = async () => {
            // Get current session
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            // If user exists, get their name from metadata
            if (session?.user) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user?.user_metadata?.name) {
                    setName(user.user_metadata.name);
                }
            }
        };  
        init();
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            // Get user metadata when session changes
            if (currentUser) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user?.user_metadata?.name) {
                    setName(user.user_metadata.name);
                }
            }
        });
        return () => subscription.unsubscribe();
    }, []);
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 w-full h-full object-cover mt-6 opacity-90">
                <img 
                    src='https://wallpapers.com/images/hd/cool-blue-background-q94xk71hwohxammf.jpg'
                    className='w-full h-full object-cover' style={{filter: 'brightness(0.5) saturate(1.1)'}} />
                <div className="absolute inset-0 bg-transparent opacity-20"></div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>
            {!user ? (
                <div className="relative w-full max-w-md">
                    <div className="bg-black/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-800/30 overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src="https://images.examples.com/wp-content/uploads/2017/11/01-11.jpg" 
                                alt='' className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-linear-to-r from-purple-900/70 to-pink-900/70"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-3xl font-bold text-white text-center">
                                    {isLogin ? 'Welcome Back!' : 'JOIN US TODAY'}
                                </h2>
                            </div>
                        </div>
                        {/* form */}
                        <div className="p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-900/50 border border-red-700/50 rounded-lg text-red-200 text-sm">
                                    {error}
                                </div>
                            )}                        
                            {message && (
                                <div className="mb-6 p-4 bg-green-900/50 border border-green-700/50 rounded-lg text-green-200 text-sm">
                                    {message}
                                </div>
                            )}                       
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                isLogin ? handleLogin() : handleSignUp();
                            }} className="space-y-6 -mt-4">
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                        <input 
                                            type="text"  
                                            placeholder="Your full name" 
                                            value={name}  
                                            required={!isLogin}
                                            onChange={e => setName(e.target.value)} 
                                            className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                                        />
                                    </div>
                                )}                       
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <input 
                                      type="email"   placeholder="Your email address"  required
                                      value={email} onChange={e => setEmail(e.target.value)}
                                      className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"/>
                                </div>                         
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <input 
                                        type="password"   placeholder="Password"  value={password} onChange={e => setPassword(e.target.value)}  required
                                        className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200" />
                                </div>
                                <button 
                                    type="submit" disabled={loading || (!email || !password)}
                                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed">
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            Processing...
                                        </span>
                                    ) : isLogin ? 'Login' : 'Create Account'}
                                </button>
                            </form>
                            {isLogin && error?.includes('Email not confirmed') && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <button 
                                        onClick={handleResendConfirmation} disabled={loading}
                                        className="w-full text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 underline" >
                                        {loading ? 'Sending...' : 'Resend confirmation email'}
                                    </button>
                                </div>
                            )}
                            <div className="mt-6 text-center">
                                <button 
                                    onClick={() => {  setIsLogin(!isLogin) , setError(''), setMessage('');  }}
                                    className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* bottom part */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">Terms of Service</a> and{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <div className="bg-linear-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-12 border border-purple-800/30 max-w-md mx-auto">
                        <img src={Check} alt='Success' className='w-20 h-20 rounded-full inline-block mb-6'/>
                        <h2 className="text-2xl font-bold mb-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Welcome, {name || user.email?.split('@')[0]}!
                        </h2>
                        <p className="text-gray-300 mb-8">You've successfully {isLogin ? 'logged in' : 'signed up'} to FITGUIDE</p>
                        <div>
                            <button 
                                className='text-lg font-medium px-6 py-2 rounded-lg border border-purple-500 text-white hover:bg-purple-700 transition-all duration-200 w-full'
                                onClick={handleLogout}  disabled={loading} >
                                {loading ? 'Please wait...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;