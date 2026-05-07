import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["arabic", "latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "مركز رسالة للقلب",
  description: "مركز رسالة للقلب والأوعية الدموية",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} ${tajawal.variable} antialiased`}
        style={{ fontFamily: "var(--font-tajawal), var(--font-noto-naskh-arabic), system-ui, sans-serif" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
