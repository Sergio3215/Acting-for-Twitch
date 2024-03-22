import { Inter } from "next/font/google";
import '../public/global.css'
import '../public/stage.module.css'
import '../public/timer.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atuate está...",
  description: "Juego de actuacion en Twitch para todos",
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
