import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Activity } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, openCart } = useCart();

  // ✅ Only source of truth
  const { isLoggedIn, role, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Custom Package", path: "/custom-package" },

    // Patient
    ...(role === "USER" ? [{ name: "Reports", path: "/reports" }] : []),

    // Admin
    ...(role === "SUPERADMIN"
      ? [{ name: "Admin Panel", path: "/admin/upload-report" }]
      : []),

    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-[#0A7DCF]" />
            <div>
              <h1 className="text-2xl font-bold text-[#0A7DCF]">
                Mocmed Diagnostics
              </h1>
              <p className="text-xs text-[#0EB39C]">Your Wellness Partner</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-[#0A7DCF] font-semibold"
                    : "text-gray-700 hover:text-[#0A7DCF]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-[#0A7DCF] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            ) : (
             <button
  onClick={handleLogout}
  className="border-2 border-[#0A7DCF] text-[#0A7DCF] px-4 py-2 rounded-lg hover:bg-[#0A7DCF] hover:text-white transition duration-200 font-semibold"
>
  Logout
</button>

            )}

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
          </nav>

          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-[#0A7DCF]"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#0A7DCF]"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? "text-[#0A7DCF] font-semibold"
                      : "text-gray-700 hover:text-[#0A7DCF]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
