import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogIn, Eye, EyeOff, Shield } from "lucide-react";

const LoginScreen = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [focusedField, setFocusedField] = useState("");
    const API_BASE_URL = 'http://localhost:3000';

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.username.trim() || !formData.password.trim()) {
            alert('Please enter both username and password');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Login success: store token/user data and navigate
                console.log('Login successful:', data);
                // You can store the token in localStorage here
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                // Navigate to dashboard or home page
                navigate('/dashboard'); // Change this to your desired route
            } else {
                // Show error message
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please try again.');
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegisterClick = () => {
        navigate('/registerScreen');
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    ></div>
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-6xl mx-auto flex items-center justify-between lg:flex-row flex-col gap-8">
                    
                    {/* Left Side - Welcome Info */}
                    <div className="lg:flex flex-col justify-center w-full lg:w-1/2 lg:pr-12" style={{animation: 'slideInLeft 1s ease-out'}}>
                        <div className="text-white space-y-6">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                <Shield className="w-5 h-5 mr-2 text-cyan-300" />
                                <span className="text-sm font-medium">Secure Healthcare Access</span>
                            </div>
                            
                            <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                                Patient checkup management system
                                <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                                    Base Hospital - Avissawella
                                </span>
                            </h1>
                            
                            {/* <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
                                Access your professional healthcare dashboard with enhanced security 
                                and seamless patient management tools.
                            </p>
                            
                            <div className="space-y-4">
                                {[
                                    "Secure authentication system",
                                    "Real-time patient data access", 
                                    "Collaborative healthcare tools"
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                                        <span className="text-white/90">{feature}</span>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-1/2 max-w-md mx-auto" style={{animation: 'slideInRight 1s ease-out'}}>
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 lg:p-8">
                            <div className="text-center mb-6 lg:mb-8" style={{animation: 'fadeInUp 1s ease-out 0.2s both'}}>
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
                                    <LogIn className="w-8 h-8 text-white" />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Welcome Back</h2>
                                <p className="text-white/70">Sign in to your healthcare account</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4 lg:space-y-6">
                                {/* Username Field */}
                                <div style={{animation: 'fadeInUp 1s ease-out 0.3s both'}}>
                                    <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
                                    <div className="relative">
                                        <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                            focusedField === 'username' ? 'text-cyan-400' : 'text-white/50'
                                        }`} />
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => handleInputChange('username', e.target.value)}
                                            onFocus={() => setFocusedField('username')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full pl-12 pr-4 py-3 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div style={{animation: 'fadeInUp 1s ease-out 0.4s both'}}>
                                    <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                            focusedField === 'password' ? 'text-cyan-400' : 'text-white/50'
                                        }`} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            onFocus={() => setFocusedField('password')}
                                            onBlur={() => setFocusedField('')}
                                            className="w-full pl-12 pr-12 py-3 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-cyan-400 transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password Link */}
                                <div className="text-right" style={{animation: 'fadeInUp 1s ease-out 0.5s both'}}>
                                    <button 
                                        type="button"
                                        onClick={() => console.log('Navigate to forgot password')}
                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200 hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Login Button */}
                                <div style={{animation: 'fadeInUp 1s ease-out 0.6s both'}}>
                                    <button
                                        type="submit"
                                        className="w-full py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            <LogIn className="w-5 h-5 mr-2" />
                                            Sign In
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </div>

                                {/* Register Link */}
                                <div className="text-center" style={{animation: 'fadeInUp 1s ease-out 0.7s both'}}>
                                    <p className="text-white/70">
                                        Don't have an account?{" "}
                                        <button 
                                            type="button"
                                            onClick={handleRegisterClick}
                                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline bg-transparent border-none cursor-pointer"
                                        >
                                            Create Account
                                        </button>
                                    </p>
                                </div>

                                {/* Security Notice */}
                                <div className="text-center mt-6" style={{animation: 'fadeInUp 1s ease-out 0.8s both'}}>
                                    <div className="inline-flex items-center px-3 py-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
                                        <Shield className="w-4 h-4 mr-2 text-green-400" />
                                        <span className="text-xs text-green-300">Secured with end-to-end encryption</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;