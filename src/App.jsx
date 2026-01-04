import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Collection,
  Product,
  Cart,
  Login,
  PlaceOrder,
  OrderDetail,
  Register,
  UserDashboard,
  NotFound,
  Policy,
  Privacy,
  Checkout,
  Stripe,
  ForgetPassword,
} from "./pages";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import SearchBar from "./components/layout/SearchBar.jsx";
import { Toaster } from "sonner";
import TopScroll from "./components/layout/TopScroll.jsx";
// import AdBanner from "./components/ad/AdBanner.jsx";
import useClickGuard from "./utilities/clickGuard.js";
// this is for preventing multiple clicks within short time

const App = () => {
  useClickGuard(250);
  const location = useLocation();
  const isUserRoute = location.pathname.startsWith("/user");

  return (
    <div className="flex flex-col min-h-screen pt-20 sm:pt-24">
      <Toaster
        position="top-center"
        richColors
        expand={true}
        closeButton
        duration={1500} // 1.5 seconds
      />

      <Navbar />

      {/* <AdBanner /> */}
      <TopScroll />

      {location.pathname === "/shop" && <SearchBar />}

      <main
        className={
          isUserRoute
            ? "flex-1 min-h-[60vh]"
            : "flex-1 min-h-[60vh] px-4 lg:px-[4vw]"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/place-order/:orderId" element={<PlaceOrder />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/user/*" element={<UserDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/stripe" element={<Stripe />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
