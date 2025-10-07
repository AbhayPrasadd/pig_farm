import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Mail, Lock, Eye, EyeOff, Leaf, ArrowRight, Shield, Sparkles, Loader2 } from "lucide-react";

// The FloatingElement component remains largely the same, but the animation style is now in the CSS block.
const FloatingElement = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-float-subtle ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        // Re-applying specific animation properties for float-subtle for more control
        animation: `float-subtle 6s ease-in-out infinite ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const AuthPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // 1️⃣ Sign in with Firebase Auth (Delay remains for better UX)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // 2️⃣ Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User profile not found!");
        setIsLoading(false);
        return;
      }

      const userData = userDoc.data();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // 3️⃣ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <style jsx>{`
        /* Refined float animation for a more subtle, 3D drift */
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(1deg) scale(1.02); }
          66% { transform: translateY(-8px) rotate(-1deg) scale(0.98); }
        }
        @keyframes shimmer-fast {
          0% { background-position: -400% 0; }
          100% { background-position: 400% 0; }
        }
        /* Enhanced pulse glow for a more organic feel */
        @keyframes pulse-glow-premium {
          0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.6), 0 0 15px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.9), 0 0 40px rgba(34, 197, 94, 0.5); }
        }
        .animate-float-subtle {
          animation: float-subtle 8s ease-in-out infinite;
        }
        .shimmer-fast {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 400% 100%;
          animation: shimmer-fast 4s infinite; /* Faster shimmer for more dynamic look */
        }
        .pulse-glow-premium {
          animation: pulse-glow-premium 3s infinite;
        }
      `}</style>

      {/* 💚 Animated Background - Darker, richer tones for a premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-950 to-teal-900">
        
        {/* Subtle noise/texture overlay for depth */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/black-linen-dark.png')]"></div>
        
        {/* Overlay pattern refined for better integration */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating elements updated with an 'icy' glass-morphism style */}
        <FloatingElement delay={0} className="absolute top-10 left-10">
          <div className="w-40 h-40 bg-white/5 rounded-[40%] backdrop-blur-md shadow-2xl border border-white/10"></div>
        </FloatingElement>
        <FloatingElement delay={2.5} className="absolute top-1/2 right-16">
          <div className="w-32 h-32 bg-white/5 rounded-full backdrop-blur-md shadow-2xl border border-white/10 transform -rotate-30"></div>
        </FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-10 left-1/4">
          <div className="w-24 h-24 bg-white/5 rounded-2xl backdrop-blur-md shadow-2xl border border-white/10"></div>
        </FloatingElement>

        {/* Scattered particles - fewer, but with more impact/pulse */}
        {[...Array(8)].map((_, i) => (
          <FloatingElement key={i} delay={i * 1.5} className="absolute">
            <div 
              className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse-slow shadow-lg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          
          {/* Logo and Brand Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl mb-4 shadow-3xl pulse-glow-premium transition-all duration-500 hover:scale-105">
              <Leaf className="w-12 h-12 text-white transform rotate-3" />
            </div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight mb-1">
              Swarn<span className="text-green-400">Bhoomi</span>
            </h1>
            <p className="text-green-200/90 text-xl font-light italic">
              Cultivating the Future, Today.
            </p>
          </div>

          {/* Login Card - More Glass-Morphism & Depth */}
          <div className="backdrop-blur-3xl bg-white/5 border border-green-400/30 rounded-3xl shadow-3xl p-10 relative overflow-hidden transform transition-all duration-700 hover:shadow-green-500/30">
            
            {/* Card shimmer effect - Faster and more visible */}
            <div className="absolute inset-0 shimmer-fast opacity-20 pointer-events-none"></div>
            
            {/* Card content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Access Your Farm Dashboard
                </h2>
                <p className="text-white/60 font-medium">
                  Please enter your credentials to continue.
                </p>
              </div>

              {/* Error message - More prominent and focused */}
              {error && (
                <div className="mb-6 p-4 bg-red-800/40 border border-red-500/50 rounded-xl animate-shake transition-all duration-300">
                  <p className="text-red-300 text-base text-center font-medium flex items-center justify-center">
                    <Shield className="w-5 h-5 mr-3 flex-shrink-0" />
                    Authentication Failed: {error}
                  </p>
                </div>
              )}

              {/* Login Form */}
              <div className="space-y-6">
                
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Mail className="h-6 w-6 text-white/50 group-focus-within:text-green-400 transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-14 pr-4 py-4 bg-gray-900/40 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:border-green-400 transition-all duration-300 text-lg shadow-inner-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Lock className="h-6 w-6 text-white/50 group-focus-within:text-green-400 transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Secure Password"
                    className="w-full pl-14 pr-12 py-4 bg-gray-900/40 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-green-500/50 focus:border-green-400 transition-all duration-300 text-lg shadow-inner-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-green-400 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right pt-2">
                  <button
                    type="button"
                    className="text-green-300/80 hover:text-green-200 text-sm font-medium transition-colors hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button - Animated and High-Contrast */}
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white py-4 rounded-xl font-bold text-xl shadow-2xl shadow-green-600/50 transform hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-green-400/50"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-6 w-6 mr-3 text-white" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Sign In Now
                        <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                  
                  {/* Button shine effect refined for a premium, fast sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-center text-white/70 text-base">
                  New to SwarnBhoomi?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-green-300 hover:text-green-100 font-extrabold transition-colors duration-200 inline-flex items-center ml-1"
                  >
                    <Sparkles className="w-5 h-5 mr-1" />
                    Create Your Account
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Security Badge - More refined and less distracting */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-green-500/30 shadow-lg transition-all duration-300 hover:scale-105">
              <Shield className="w-5 h-5 text-green-400 mr-2 animate-bounce-slow" />
              <span className="text-white/90 text-sm font-medium">Secure Connection | Powered by Firebase</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Utility/Branding Footer (Optional addition for impressiveness) */}
      <footer className="absolute bottom-0 w-full text-center p-4">
        <p className="text-white/40 text-xs">
          © {new Date().getFullYear()} SwarnBhoomi. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthPage;