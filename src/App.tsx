import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import CartDrawer from "./components/CartDrawer";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import CustomPackage from "./pages/CustomPackage";
import UploadDocuments from "./pages/UploadDocuments";
import Reports from "./pages/Reports";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUpload from "./pages/AdminUpload";
import AdminRoute from "./components/AdminRoute";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetOtp from "./pages/ResetOtp";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <CartDrawer />
          <main className="flex-grow">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-otp" element={<ResetOtp />} />
              <Route path="/new-password" element={<NewPassword />} />
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/custom-package" element={<CustomPackage />} />
              <Route path="/upload" element={<UploadDocuments />} />
              <Route
                path="/admin/upload-report"
                element={
                  <AdminRoute>
                    <AdminUpload />
                  </AdminRoute>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <FloatingButtons />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
