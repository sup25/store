import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/constants/navbar";
import Footer from "@/constants/footer";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext";
import { generateMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export { generateMetadata };

const atf = localFont({
  src: [
    {
      path: "../public/fonts/AlternateGothic.ttf",
      weight: "bold",
    },
  ],
  weight: "bold",
  variable: "--font-atf",
});

const MollieGlaston = localFont({
  src: [
    {
      path: "../public/fonts/Mollie-Glaston.ttf",
      weight: "bold",
    },
  ],
  weight: "bold",
  variable: "--font-MG",
});

export default function RootLayout({ children }) {
  return (
    <html
      className={`${atf.variable} ${MollieGlaston.variable}`}
      lang="en"
      style={{ height: "100%" }}
    >
      <body
        className={inter.className}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ToastContainer />
        <AuthProvider>
          <CartProvider>
            <div className="w-full mb-10 ">
              <Navbar />
            </div>
            <div style={{ flex: 1 }}>{children}</div>
            <div className="w-full md:mt-24 mt-20">
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
