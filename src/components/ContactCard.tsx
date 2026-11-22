"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download, Mail, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { contactInfo as c, VCARD_PATH } from "@/lib/contact";

type Row = {
  id: string;
  label: string;
  hint: string;
  value: string;
  href: string;
  copy: string;
  icon: React.ReactNode;
  external?: boolean;
};

const rows: Row[] = [
  { id: "phone", label: "Phone", hint: "Call", value: c.phone.display, href: `tel:${c.phone.e164}`, copy: c.phone.e164, icon: <Phone className="size-5" /> },
  { id: "whatsapp", label: "WhatsApp", hint: "Message", value: c.whatsapp.display, href: `https://wa.me/${c.whatsapp.e164.replace("+", "")}`, copy: c.whatsapp.e164, icon: <SiWhatsapp className="size-5" />, external: true },
  { id: "email", label: "Email", hint: "Write", value: c.email, href: `mailto:${c.email}`, copy: c.email, icon: <Mail className="size-5" /> },
  { id: "instagram", label: "Instagram", hint: "Open", value: c.instagram.handle, href: c.instagram.url, copy: c.instagram.handle, icon: <SiInstagram className="size-5" />, external: true },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-khaki)]";

const delay = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is unavailable on insecure origins; nothing to do.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={`grid size-12 shrink-0 place-items-center rounded-full text-[var(--c-muted)] transition-colors active:bg-white/15 hover:text-[var(--c-bone)] ${focusRing}`}
    >
      {copied ? <Check className="size-[18px] text-[var(--c-sage)]" /> : <Copy className="size-[18px]" />}
      <span aria-live="polite" className="sr-only">{copied ? `${label} copied` : ""}</span>
    </button>
  );
};

const ContactCard = () => {
  return (
    <main
      className="contact-theme relative min-h-dvh w-full overflow-x-clip bg-[var(--c-ink)] text-[var(--c-bone)]"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      {/* Late-afternoon light, taken from the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_20%_0%,rgb(194_164_114/0.16),transparent_70%),radial-gradient(60%_35%_at_100%_100%,rgb(143_165_130/0.10),transparent_70%)]"
      />

      {/* Phone-width column; side by side only on landscape phones */}
      <div className="relative mx-auto w-full max-w-[26rem] ls:grid ls:max-w-4xl ls:grid-cols-[auto_minmax(0,1fr)] ls:items-start ls:gap-x-10">
        {/* Portrait */}
        <div className="ls:sticky ls:top-0 ls:self-start">
          <Link
            href="/"
            className={`mb-4 inline-flex min-h-11 items-center gap-2 rounded pr-3 text-sm text-[var(--c-muted)] transition-colors hover:text-[var(--c-bone)] ${focusRing}`}
          >
            <ArrowLeft className="size-4" /> Portfolio
          </Link>

          {/* Width is capped by viewport height too, so the name and Save button stay near the top on short phones */}
          <div className="relative mx-auto w-[min(100%,calc(38dvh*0.8),18rem)] ls:mx-0 ls:w-[calc((100dvh-6rem)*0.8)] ls:max-w-[16rem]">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-t-[999px] rounded-b-[1.5rem] border border-[var(--c-khaki)]/50"
            />
            <div className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-[var(--c-moss)]">
              <Image
                src="/profile.webp"
                alt="Animesh Ansh Yadav smiling, wearing sunglasses and a khaki shirt, with trees and a pond behind him"
                fill
                priority
                sizes="(max-width: 540px) 70vw, 288px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 ls:mt-0 ls:pt-2">
          <h1
            style={delay(0.5)}
            className="rise text-center font-[family-name:var(--font-display)] text-[clamp(2.25rem,11vw,3.25rem)] font-medium leading-[0.98] tracking-[-0.02em] ls:text-left ls:text-[clamp(1.75rem,9vh,2.75rem)]"
          >
            Animesh Ansh
            <br />
            Yadav
          </h1>
          <p
            style={delay(0.6)}
            className="rise mx-auto mt-3 max-w-xs text-center text-base text-[var(--c-muted)] ls:mx-0 ls:mt-2 ls:text-left"
          >
            Web and app developer
          </p>

          <a
            style={delay(0.7)}
            href={VCARD_PATH}
            download="Animesh-Ansh-Yadav.vcf"
            className={`rise group mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[var(--c-khaki)] px-6 text-base font-semibold text-[var(--c-ink)] transition-[transform,background-color] duration-200 active:scale-[0.98] active:bg-[var(--c-bone)] hover:bg-[var(--c-bone)] ls:mt-4 ls:min-h-12 ${focusRing}`}
          >
            <Download className="size-5" />
            Save to contacts
          </a>
          <p className="mt-2 text-center text-sm text-[var(--c-muted)] ls:text-left">
            Includes my photo. Works on iPhone and Android.
          </p>

          <ul className="mt-7 border-t border-[var(--c-line)] ls:mt-5">
            {rows.map((row, i) => (
              <li
                key={row.id}
                style={delay(0.8 + i * 0.07)}
                className="rise flex items-center border-b border-[var(--c-line)]"
              >
                <a
                  href={row.href}
                  {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`flex min-h-[4.5rem] min-w-0 flex-1 items-center gap-2.5 min-[360px]:gap-4 rounded-xl py-3 pr-2 transition-colors active:bg-white/10 hover:bg-white/[0.03] ls:min-h-16 ls:py-2 ${focusRing}`}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--c-line)] text-[var(--c-khaki)]">
                    {row.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-[var(--c-muted)]">
                      {row.label} <span aria-hidden>·</span> {row.hint}
                    </span>
                    <span className="block [overflow-wrap:anywhere] text-[clamp(0.8rem,4vw,1.0625rem)] font-medium leading-snug">{row.value}</span>
                  </span>
                </a>
                <CopyButton text={row.copy} label={row.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ContactCard;
