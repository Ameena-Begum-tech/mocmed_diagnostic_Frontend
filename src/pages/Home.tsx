
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Star,
  Calendar,
  Phone,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Home as HomeIcon,
  Search,
  Droplet,           // ← Fixed: Added this import
} from 'lucide-react';

// ── Hero Content ──────────────────────────────────────────────────────────
const HERO_DESCRIPTION =
  "Experience healthcare excellence with our comprehensive diagnostic services. From routine checkups to specialized tests, we're committed to your health journey with precision, care, and convenience.";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1579684384363-3a4e48e3e0c0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1615486511484-92d172cc0d98?auto=format&fit=crop&q=80&w=1200",
];

// ── Packages, Features, Steps, Testimonials ───────────────────────────────
const PACKAGES = [
  {
    id: 1,
    name: "Complete Health Checkup",
    description: "Comprehensive screening covering blood, organ function & metabolic markers",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    tests: 85,
    popular: true,
    features: ["Fasting Required", "Home Collection", "Report in 24 hrs"],
  },
  {
    id: 2,
    name: "Diabetes Care Package",
    description: "HbA1c, glucose levels, kidney function assessment",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    tests: 42,
    popular: false,
    features: ["Fasting Required", "Home Collection", "Report in 12 hrs"],
  },
  {
    id: 3,
    name: "Heart Health Package",
    description: "Lipid profile, ECG, cardiac enzymes & inflammation markers",
    price: 1799,
    originalPrice: 2799,
    discount: 36,
    tests: 38,
    popular: true,
    features: ["Fasting Required", "Home Collection", "Report in 24 hrs"],
  },
  {
    id: 4,
    name: "Women Wellness Package",
    description: "Hormonal profile, thyroid, vitamin levels & reproductive markers",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    tests: 65,
    popular: false,
    features: ["No Fasting", "Home Collection", "Report in 24 hrs"],
  },
];

const FEATURES = [
  { icon: Award, title: "NABL Certified", desc: "Highest quality standards & accurate results", color: "#0A7DCF" },
  { icon: Clock, title: "Quick Reports", desc: "Results within 24 hours", color: "#0EB39C" },
  { icon: HomeIcon, title: "Home Collection", desc: "Safe & convenient doorstep service", color: "#0A7DCF" },
  { icon: Shield, title: "99.9% Accuracy", desc: "Advanced equipment & expert technicians", color: "#0EB39C" },
];

const STEPS = [
  { num: "01", title: "Choose Your Test", desc: "Browse our catalog or search for tests/packages", icon: Search, color: "#0A7DCF" },
  { num: "02", title: "Book Appointment", desc: "Select date/time for lab or home collection", icon: Calendar, color: "#0EB39C" },
  { num: "03", title: "Sample Collection", desc: "Certified professionals collect samples safely", icon: Droplet, color: "#0A7DCF" },
  { num: "04", title: "Get Your Report", desc: "Accurate reports delivered within 24 hours – online access", icon: FileText, color: "#0EB39C" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", text: "Excellent service! Home collection was very convenient and reports on time.", rating: 5 },
  { name: "Priya Sharma", text: "Very impressed with accuracy and quick turnaround time.", rating: 5 },
  { name: "Amit Patel", text: "Best diagnostic center — affordable packages and skilled staff.", rating: 5 },
  { name: "Sneha Reddy", text: "Outstanding experience from booking to report delivery.", rating: 5 },
  { name: "Vikram Singh", text: "Highly professional — perfect for senior citizens.", rating: 5 },
  { name: "Anjali Verma", text: "Trustworthy lab with friendly staff and clean facilities.", rating: 5 },
  { name: "Suresh Babu", text: "Very satisfied with the home sample collection process.", rating: 5 },
  { name: "Meena Rani", text: "Reports are detailed and explained well by the team.", rating: 5 },
  { name: "Rohit Sharma", text: "Best prices and accurate results every time!", rating: 5 },
  { name: "Kavita Joshi", text: "Highly recommend for all diagnostic needs.", rating: 5 },
];

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-16 lg:pt-20 pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#0A7DCF] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0EB39C] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0A7DCF] bg-opacity-10 rounded-full mb-4 lg:mb-6">
                <Award className="w-5 h-5 text-[#0A7DCF]" />
                <span className="text-sm font-semibold text-[#0A7DCF]">NABL Certified Lab</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                Your Wellness Partner for <span className="text-[#0A7DCF]">Accurate Diagnostics</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                {HERO_DESCRIPTION}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/packages#top"
                  className="bg-[#0A7DCF] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Calendar className="w-5 h-5 mr-2" /> Book Appointment
                </Link>
                <button
                  onClick={() => window.location.href = "tel:+919876543210"}
                  className="border-2 border-[#0A7DCF] text-[#0A7DCF] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call: +91 9876543210
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0A7DCF]">50K+</div>
                  <div className="text-xs md:text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0EB39C]">500+</div>
                  <div className="text-xs md:text-sm text-gray-600">Tests Available</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0A7DCF]">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right - Image + Badges */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  key={heroIndex}
                  src={HERO_IMAGES[heroIndex]}
                  alt="Diagnostic Lab"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover transition-opacity duration-1000 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1200";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Bottom-left badge */}
              <div className="absolute -bottom-3 -left-3 lg:-left-6 bg-white rounded-xl shadow-lg p-3 lg:p-4 max-w-[180px] lg:max-w-xs">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-teal-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-base lg:text-lg font-bold text-gray-900">99.9%</div>
                    <div className="text-xs lg:text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute -top-3 -right-3 lg:-right-6 bg-white rounded-xl shadow-lg p-3 lg:p-4 max-w-[180px] lg:max-w-xs">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-[#0A7DCF]" />
                  </div>
                  <div>
                    <div className="text-base lg:text-lg font-bold text-gray-900">24 Hours</div>
                    <div className="text-xs lg:text-sm text-gray-600">Report Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Health Packages ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">Popular Health Packages</h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose from our carefully curated diagnostic packages designed for comprehensive health monitoring and early detection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 min-h-[340px] flex flex-col ${
                  pkg.popular ? 'border-teal-200 bg-teal-50/20' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Popular
                    </span>
                  </div>
                )}

                <div className="p-6 lg:p-7 flex flex-col flex-grow">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {pkg.name}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-4 flex-grow">
                    {pkg.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl lg:text-3xl font-bold text-[#0A7DCF]">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs lg:text-sm text-gray-500 line-through ml-2">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm lg:text-base">{pkg.discount}% OFF</span>
                  </div>

                  <div className="text-xs lg:text-sm text-gray-600 mb-4 space-y-1">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/packages#top"
                    className="mt-auto block w-full bg-[#0EB39C] text-white py-3 rounded-lg font-medium text-center hover:bg-teal-700 transition text-sm lg:text-base"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">Your Trusted Healthcare Partner</h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Experience excellence in diagnostic services with our commitment to accuracy, convenience, and patient care
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get your diagnostic tests done in four simple steps with complete convenience and accuracy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="relative inline-block mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto relative z-10"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <step.icon className="w-9 h-9" style={{ color: step.color }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold z-20"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from patients who trust us with their health
            </p>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setTimeout(() => setIsPaused(false), 2500)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2500)}
          >
            <div className="flex animate-marquee gap-6 py-4">
              {TESTIMONIALS.concat(TESTIMONIALS).map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    {Array(t.rating)
                      .fill(0)
                      .map((_, star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current mx-0.5" />
                      ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 line-clamp-4">"{t.text}"</p>
                  <p className="text-right font-semibold text-gray-900">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
