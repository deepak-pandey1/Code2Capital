import "./globals.css";
import LoginModalProvider from "@/components/common/LoginModalProvider";

export const metadata = {
  title: "Code2Capital",
  description: "Trading Journal & Analytics Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-primary text-white min-h-screen">
        <LoginModalProvider>
          {children}
        </LoginModalProvider>
      </body>
    </html>
  );
}