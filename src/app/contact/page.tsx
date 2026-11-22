import type { Metadata } from "next";
import ContactCard from "@/components/ContactCard";

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
  },
};

export default function ContactPage() {
  return <ContactCard />;
}
