import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Wi-Fi QR",
  description: "Calendar with Wi-Fi QR Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}