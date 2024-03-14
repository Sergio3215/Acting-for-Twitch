import { Inter } from "next/font/google";
import '../public/global.css'
import '../public/stage.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "dilo con mimica para Twitch",
  description: "Juego en Twitch para todo el mundo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
