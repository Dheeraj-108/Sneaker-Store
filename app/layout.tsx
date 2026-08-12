import { Archivo_Black, Inter, IBM_Plex_Mono } from "next/font/google";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const archivoBlack = Archivo_Black({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-display",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const plexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${archivoBlack.variable} ${inter.variable} ${plexMono.variable}`}
        >
            <body>
                <CartProvider>
                    <Header />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
