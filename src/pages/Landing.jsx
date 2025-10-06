import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Shield,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle,
  ArrowRight,
  Bell,
  Globe,
  Award,
  FileText,
  Activity,
  Smartphone,
  BarChart3,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";

/* ---------------- Floating Element ---------------- */
const FloatingElement = ({ children, delay = 0 }) => (
  <div
    className="animate-float"
    style={{
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite ${delay}s`,
    }}
  >
    {children}
  </div>
);

/* ---------------- Glass Card ---------------- */
const GlassCard = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl ${className}`}
  >
    {children}
  </div>
);

/* ---------------- Stat Card ---------------- */
const StatCard = ({ number, label, icon: Icon }) => (
  <GlassCard className="p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
    <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-blue-400" />
    <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{number}</div>
    <div className="text-gray-200 text-xs sm:text-sm">{label}</div>
  </GlassCard>
);

/* ---------------- Feature Card ---------------- */
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className="group cursor-pointer h-full">
    <div
      className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl h-full flex flex-col`}
    >
      <div className="bg-white/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-white/30 transition-all duration-300">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{title}</h3>
      <p className="text-sm sm:text-base text-white/90 leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 sm:mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
        <span className="text-xs sm:text-sm font-medium">Learn More</span>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </div>
);

/* ---------------- Section ---------------- */
const Section = ({ title, description, image, reverse, gradient, features }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById(
      `section-${title.replace(/\s+/g, "-").toLowerCase()}`
    );
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  return (
    <section
      id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={`py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br ${gradient} overflow-hidden`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
        {/* Text Side */}
        <div
          className={`w-full lg:w-1/2 ${reverse ? "lg:order-2" : ""} transform transition-all duration-1000 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : reverse
              ? "translate-x-12 opacity-0"
              : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            🛡️ Biosecurity First
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {description}
          </p>
          {features && (
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base">
              Get Started
            </button>
            <button className="flex items-center justify-center text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base">
              <span>Watch Demo</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Image Side */}
        <div
          className={`w-full lg:w-1/2 ${reverse ? "lg:order-1" : ""} transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl sm:rounded-2xl opacity-20 blur-xl"></div>
            <img
              src={image}
              alt={title}
              className="relative w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Parallax Section ---------------- */
const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Animated background dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
          Protecting Livestock Health
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-16 px-4">
          Empowering farmers with digital tools to prevent disease outbreaks and ensure sustainable livestock production
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
          <StatCard number="15K+" label="Farmers Protected" icon={Users} />
          <StatCard number="40%" label="Disease Reduction" icon={Shield} />
          <StatCard number="35%" label="Productivity Gain" icon={TrendingUp} />
          <StatCard number="12+" label="States Covered" icon={Globe} />
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={AlertTriangle}
            title="Risk Assessment"
            description="Customized biosecurity risk evaluation tools based on your farm's location and livestock type."
            gradient="from-red-600 to-orange-600"
          />
          <FeatureCard
            icon={BookOpen}
            title="Interactive Training"
            description="Multilingual training modules on best practices for pig and poultry biosecurity management."
            gradient="from-blue-600 to-cyan-600"
          />
          <FeatureCard
            icon={Bell}
            title="Real-Time Alerts"
            description="Instant notifications about disease outbreaks, regulatory updates, and biosecurity threats."
            gradient="from-purple-600 to-pink-600"
          />
        </div>
      </div>
    </section>
  );
};

/* ---------------- Testimonials ---------------- */
const TestimonialCard = ({ quote, author, role, rating }) => (
  <GlassCard className="p-6 sm:p-8 h-full flex flex-col">
    <div className="flex mb-3 sm:mb-4">
      {[...Array(rating)].map((_, i) => (
        <CheckCircle key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 fill-current" />
      ))}
    </div>
    <blockquote className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
      "{quote}"
    </blockquote>
    <div className="flex items-center mt-auto">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
        {author.charAt(0)}
      </div>
      <div className="ml-3 sm:ml-4">
        <div className="font-semibold text-gray-900 text-sm sm:text-base">{author}</div>
        <div className="text-gray-600 text-xs sm:text-sm">{role}</div>
      </div>
    </div>
  </GlassCard>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12 sm:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center mb-3 sm:mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mr-2 sm:mr-3" />
            <span className="text-xl sm:text-2xl font-bold">BioSecure Pro</span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
            Digital biosecurity management for safer, healthier livestock farming.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Platform</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Risk Assessment</li>
            <li className="hover:text-white cursor-pointer transition-colors">Training Hub</li>
            <li className="hover:text-white cursor-pointer transition-colors">Compliance</li>
            <li className="hover:text-white cursor-pointer transition-colors">Alerts</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Guidelines</li>
            <li className="hover:text-white cursor-pointer transition-colors">Case Studies</li>
            <li className="hover:text-white cursor-pointer transition-colors">Research</li>
            <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Community</li>
            <li className="hover:text-white cursor-pointer transition-colors">Partners</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
          &copy; 2025 BioSecure Pro. Protecting livestock, empowering farmers.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------------- Landing Page ---------------- */
const LandingPage = () => {
  const [currentLang, setCurrentLang] = useState("en");

  const scrollToContent = () => {
    document.getElementById("content").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.5}>
              <div
                className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            </FloatingElement>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <GlassCard className="inline-block p-2">
              <select
                onChange={(e) => setCurrentLang(e.target.value)}
                value={currentLang}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer text-sm sm:text-base px-2"
              >
                <option value="en" className="bg-gray-800">English</option>
                <option value="hi" className="bg-gray-800">हिन्दी</option>
                <option value="ta" className="bg-gray-800">தமிழ்</option>
                <option value="te" className="bg-gray-800">తెలుగు</option>
              </select>
            </GlassCard>
          </div>

          <div className="mb-4 sm:mb-6">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-blue-400 mx-auto animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Biosecurity Portal for{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Pig & Poultry Farmers
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Prevent disease outbreaks with AI-powered risk assessment, real-time alerts, compliance tracking, and expert training—all in one mobile-first platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              Start Free Assessment
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline-block" />
            </button>
            <button className="group border-2 border-white/30 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>

          <button
            onClick={scrollToContent}
            className="animate-bounce text-white/70 hover:text-white"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <div id="content">
        <Section
          title="The Biosecurity Challenge"
          description="Disease outbreaks like Avian Influenza and African Swine Fever threaten food security, cause massive economic losses, and destroy rural livelihoods. Small farmers lack access to practical biosecurity information and tools."
          image="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop"
          gradient="from-white to-red-50"
          features={[
            "Avian Influenza and ASF outbreaks causing severe losses",
            "Limited access to biosecurity training and resources",
            "Complex regulatory compliance requirements",
            "No real-time disease monitoring or alerts"
          ]}
        />

        <Section
          title="Our Comprehensive Solution"
          description="A mobile-first digital platform that puts biosecurity management in your hands. Get customized risk assessments, expert training, compliance tracking, and instant disease alerts—all tailored for pig and poultry farms."
          image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop"
          reverse
          gradient="from-blue-50 to-indigo-50"
          features={[
            "AI-powered risk assessment based on local conditions",
            "Interactive multilingual training modules",
            "Automated compliance tracking and reporting",
            "Real-time disease outbreak alerts and notifications"
          ]}
        />

        <ParallaxSection />

        {/* Key Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Everything You Need for Farm Biosecurity
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Comprehensive tools designed specifically for pig and poultry farmers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <FeatureCard
                icon={ClipboardCheck}
                title="Risk Assessment Tools"
                description="Evaluate biosecurity risks specific to your farm location, livestock type, and local disease patterns."
                gradient="from-red-500 to-pink-500"
              />
              <FeatureCard
                icon={BookOpen}
                title="Training & Guidelines"
                description="Access expert-created training modules in multiple languages covering all biosecurity best practices."
                gradient="from-blue-500 to-cyan-500"
              />
              <FeatureCard
                icon={FileText}
                title="Compliance Tracking"
                description="Track regulatory requirements and work toward disease-free compartment recognition with ease."
                gradient="from-green-500 to-teal-500"
              />
              <FeatureCard
                icon={Bell}
                title="Real-Time Alerts"
                description="Get instant notifications about disease outbreaks, biosecurity breaches, and regulatory updates."
                gradient="from-orange-500 to-yellow-500"
              />
              <FeatureCard
                icon={BarChart3}
                title="Monitoring Dashboard"
                description="Visualize your farm's biosecurity status, compliance level, and areas needing attention."
                gradient="from-purple-500 to-indigo-500"
              />
              <FeatureCard
                icon={Smartphone}
                title="Mobile-First Design"
                description="Access all features on your smartphone, even in remote areas with limited connectivity."
                gradient="from-pink-500 to-rose-500"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-white to-gray-50">
          <div className="container mx-auto text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Trusted by Farmers Across India
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Real stories from farmers protecting their livestock with our platform
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 container mx-auto">
            <TestimonialCard
              quote="The risk assessment tool helped me identify vulnerabilities I never knew existed. No disease outbreaks in 18 months!"
              author="Ramesh Patil"
              role="Poultry Farmer, Maharashtra"
              rating={5}
            />
            <TestimonialCard
              quote="Real-time alerts saved my pig farm from an ASF outbreak nearby. I took preventive action immediately."
              author="Lakshmi Reddy"
              role="Pig Farmer, Andhra Pradesh"
              rating={5}
            />
            <TestimonialCard
              quote="The multilingual training in Telugu made it so easy to train my workers on proper biosecurity protocols."
              author="Suresh Kumar"
              role="Small-scale Farmer, Telangana"
              rating={5}
            />
          </div>
        </section>

        <Section
          title="Measurable Impact"
          description="Farmers using our platform have achieved significant reductions in disease outbreaks, improved regulatory compliance, and increased farm productivity through better biosecurity practices."
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
          gradient="from-green-50 to-emerald-50"
          features={[
            "40% reduction in disease-related livestock losses",
            "65% improvement in biosecurity compliance scores",
            "Real-time data supporting policy and surveillance",
            "Stronger collaboration across the livestock ecosystem"
          ]}
        />

        <Section
          title="Join the Biosecurity Revolution"
          description="Protect your livestock, secure your livelihood, and contribute to national food security. Start your free biosecurity assessment today and join thousands of farmers building resilient, disease-free farms."
          image="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
          reverse
          gradient="from-blue-50 to-purple-50"
        />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;