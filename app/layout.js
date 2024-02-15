import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/constants/navbar";
import Footer from "@/constants/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store",
  description: "A market place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full md:mb-24 mb-20">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
