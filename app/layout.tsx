import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/blocks/navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/blocks/footer";

export const metadata: Metadata = {
  title: "Stripe + Next.js Tutorial",
  description: "Learn how to integrate Stripe with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}