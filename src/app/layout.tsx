import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TogetherWeCare — Small Actions. Stronger Communities.",
    template: "%s | TogetherWeCare",
  },
  description:
    "TogetherWeCare connects people with local community service events, volunteering opportunities and social development initiatives.",
  keywords: [
    "community service",
    "volunteering",
    "social development",
    "charity",
    "clean up",
    "tree plantation",
    "blood donation",
    "education",
    "TogetherWeCare",
  ],
  authors: [{ name: "TogetherWeCare Team" }],
  creator: "TogetherWeCare",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TogetherWeCare",
    title: "TogetherWeCare — Small Actions. Stronger Communities.",
    description:
      "TogetherWeCare connects people with local community service events, volunteering opportunities and social development initiatives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TogetherWeCare — Small Actions. Stronger Communities.",
    description:
      "TogetherWeCare connects people with local community service events, volunteering opportunities and social development initiatives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
