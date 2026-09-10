import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { getConfig } from "@/lib/storyblok";

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

export default async function RootLayout({ children }) {
  // Global header/footer come from the `config` story in Storyblok
  const config = await getConfig();
  const globalBloks = [
    ...(config?.content?.body || []),
    ...(config?.content?.header || []),
    ...(config?.content?.footer || []),
  ];

  const headerBlok = globalBloks.find((blok) => blok.component === "header");
  const footerBlok = globalBloks.find((blok) => blok.component === "footer");

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

        {headerBlok && <StoryblokServerComponent blok={headerBlok} />}

        {children}

        {footerBlok && <StoryblokServerComponent blok={footerBlok} />}
      </body>
    </html>
  );
}
