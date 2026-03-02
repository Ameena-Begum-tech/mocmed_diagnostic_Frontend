// Header.tsx
// Language: TypeScript (React)

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Activity, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { cartCount, openCart } = useCart();
  const { isLoggedIn, role, logoutUser, user } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Custom Package", path: "/custom-package" },
    ...(role === "USER" ? [{ name: "Reports", path: "/reports" }] : []),
    ...(role === "SUPERADMIN"
      ? [{ name: "Admin Panel", path: "/admin/upload-report" }]
      : []),
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-[#0A7DCF]" />
            <h1 className="text-xl font-bold text-[#0A7DCF]">
              Mocmed Diagnostics
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? "text-[#0A7DCF] font-semibold"
                    : "text-gray-700 hover:text-[#0A7DCF]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-[#0A7DCF]"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0EB39C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            {isLoggedIn ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0A7DCF] text-white flex items-center justify-center font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white border rounded-xl shadow-lg">

                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold">
                        {user?.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {/* My Profile */}
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      My Profile
                    </button>

                    {/* SUPERADMIN ONLY */}
                    {role === "SUPERADMIN" && (
                      <button
                        onClick={() => {
                          navigate("/patient-uploads");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Patient Uploads
                      </button>
                    )}

                    {/* Logout */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#0A7DCF] text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
