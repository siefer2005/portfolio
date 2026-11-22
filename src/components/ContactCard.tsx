"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { contactInfo as c, VCARD_PATH } from "@/lib/contact";

type Row = {
  id: string;
  label: string;
  value: string;
  href: string;
  action: string;
  copy: string;
  icon: React.ReactNode;
  accent: string;
  external?: boolean;
};

const rows: Row[] = [
  {
    id: "phone",
    label: "Phone",
    value: c.phone.display,
    href: `tel:${c.phone.e164}`,
    action: "Call",
    copy: c.phone.e164,
    icon: <Phone className="w-5 h-5" />,
    accent: "from-blue-500/30 to-blue-500/5 text-blue-300",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: c.whatsapp.display,
    href: `https://wa.me/${c.whatsapp.e164.replace("+", "")}`,
    action: "Chat",
    copy: c.whatsapp.e164,
    icon: <SiWhatsapp className="w-5 h-5" />,
    accent: "from-emerald-500/30 to-emerald-500/5 text-emerald-300",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: c.email,
    href: `mailto:${c.email}`,
    action: "Write",
    copy: c.email,
    icon: <Mail className="w-5 h-5" />,
    accent: "from-purple-500/30 to-purple-500/5 text-purple-300",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: c.instagram.handle,
    href: c.instagram.url,
    action: "Follow",
    copy: c.instagram.handle,
    icon: <SiInstagram className="w-5 h-5" />,
    accent: "from-pink-500/30 to-pink-500/5 text-pink-300",
    external: true,
  },
];

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context); fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="w-10 h-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const ContactCard = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#121212] text-white overflow-hidden px-6 py-10 md:py-16">
      {/* Ambient glows, same palette as the home page Contact section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded"
        >
          <ArrowLeft className="w-4 h-4" /> Back to portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Profile card */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-10 text-center lg:sticky lg:top-10"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_55%)]" />

            <div className="relative mx-auto mb-6 w-28 h-28 rounded-full p-[2px] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
              <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-3xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AY</span>
              </div>
            </div>

            <h1 className="relative text-3xl md:text-4xl font-bold tracking-tight">{c.name}</h1>
            <p className="relative mt-2 text-neutral-400 font-light tracking-wide">{c.title}</p>

            <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </div>

            <a
              href={VCARD_PATH}
              download="Animesh-Ansh-Yadav.vcf"
              className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-black transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Download className="w-5 h-5" /> Save to Contacts
            </a>
            <p className="relative mt-3 text-xs text-neutral-500">
              Works on iPhone and Android &middot; .vcf contact card
            </p>
          </motion.section>

          {/* Details */}
          <section className="lg:col-span-3" aria-label="Contact details">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">connect</span>
              </h2>
              <p className="mt-2 text-neutral-400">Pick whichever channel suits you — I&apos;ll get back quickly.</p>
            </motion.div>

            <ul className="flex flex-col gap-4">
              {rows.map((row, i) => (
                <motion.li
                  key={row.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.1 }}
                  className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-colors duration-500"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${row.accent} border border-white/10 flex items-center justify-center`}>
                    {row.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{row.label}</p>
                    <p className="truncate text-base md:text-lg font-medium text-neutral-100">{row.value}</p>
                  </div>

                  <CopyButton text={row.copy} label={row.label} />

                  <a
                    href={row.href}
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={`${row.action} via ${row.label}`}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="hidden sm:inline">{row.action}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactCard;
