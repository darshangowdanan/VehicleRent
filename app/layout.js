import "./globals.css";

export const metadata = {
  title: "RentWheels",
  description: "vehicle rental services",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-orange-100 to-gray-200">
        {children}
      </body>
    </html>
  );
}
