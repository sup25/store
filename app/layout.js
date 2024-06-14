import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/constants/navbar";
import Footer from "@/constants/footer";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store",
  description: "A market place",
};

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

export default function RootLayout({ children }) {
  return (
    <html className={`${atf.variable}`} lang="en" style={{ height: "100%" }}>
      <body
        className={inter.className}
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <ToastContainer />
        <AuthProvider>
          <div className="w-full mb-10 ">
            <Navbar />
          </div>
          <div style={{ flex: 1 }}>{children}</div>
          <div className="w-full md:mt-24 mt-20">
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
