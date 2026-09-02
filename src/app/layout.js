import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Jobbannonser",
    template: "%s | Jobbannonser",
  },
  description: "Hitta ditt nästa jobb bland våra lediga tjänster.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {/* Decorative blurred blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-3xl" />
        </div>

        <Header />
        {children}
      </body>
    </html>
  );
}
