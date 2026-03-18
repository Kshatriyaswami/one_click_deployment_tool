import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "One-Click Deployment",
  description: "Deploy your web project live in just a few clicks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 py-4">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
