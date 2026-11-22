import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import ContactCard from "@/components/ContactCard";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"] });
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-ui" });

// viewportFit "cover" lets the page use the notch area; the component pads with safe-area insets.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0e130f",
};

export const metadata: Metadata = {
  title: "Contact | Animesh Ansh Yadav",
  description:
    "Get in touch with Animesh Ansh Yadav — call, WhatsApp, email or Instagram, and save the contact card to your phone.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Animesh Ansh Yadav",
    description: "Call, WhatsApp, email or Instagram — and save my contact card to your phone.",
    url: "/contact",
    type: "profile",
    images: ["/profile.webp"],
  },
};

export default function ContactPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <ContactCard />
    </div>
  );
}
