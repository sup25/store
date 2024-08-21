import { Inter, Poppins, Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/constants/navbar";
import Footer from "@/constants/footer";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/cartContext";
import { generateMetadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      className={`${atf.variable} ${MollieGlaston.variable} ${poppins.variable} ${raleway.variable}`}
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
            <div className="w-full md:mb-16 mb-14 ">
              <Navbar />
            </div>
            <div style={{ flex: 1 }}>{children}</div>
            <div className="w-full md:mt-16 mt-14">
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
