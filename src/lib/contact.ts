import { VCARD_PHOTO_BASE64 } from "./vcard-photo";

export const contactInfo = {
  name: "Animesh Ansh Yadav",
  firstName: "Animesh Ansh",
  lastName: "Yadav",
  title: "Web and App Developer",
  phone: { display: "+91 86022 54165", e164: "+918602254165" },
  whatsapp: { display: "+91 76490 46900", e164: "+917649046900" },
  email: "animeshansh10@gmail.com",
  instagram: { handle: "@animesh.yadav10", url: "https://www.instagram.com/animesh.yadav10" },
} as const;

export const VCARD_PATH = "/contact/animesh-ansh-yadav.vcf";

/** Escape text values per RFC 6350 / RFC 2426. */
const esc = (v: string) =>
  v.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

/** Fold long lines at 75 chars; continuation lines start with one space (RFC 2425). */
const fold = (line: string) => {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += i === 0 ? 75 : 74) {
    parts.push(line.slice(i, i + (i === 0 ? 75 : 74)));
  }
  return parts.join("\r\n ");
};

/**
 * vCard 3.0 is the most widely compatible version (iOS Contacts,
 * Android Contacts, Google Contacts, Outlook). Lines end with CRLF.
 * `itemN.X-ABLabel` gives iOS/Google a custom label such as "WhatsApp".
 */
export const buildVCard = (): string => {
  const c = contactInfo;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(c.lastName)};${esc(c.firstName)};;;`,
    `FN:${esc(c.name)}`,
    `TITLE:${esc(c.title)}`,
    fold(`PHOTO;ENCODING=b;TYPE=JPEG:${VCARD_PHOTO_BASE64}`),
    `TEL;TYPE=CELL,VOICE,PREF:${c.phone.e164}`,
    `item1.TEL;TYPE=CELL:${c.whatsapp.e164}`,
    "item1.X-ABLabel:WhatsApp",
    `EMAIL;TYPE=INTERNET,PREF:${c.email}`,
    `item2.URL:${c.instagram.url}`,
    "item2.X-ABLabel:Instagram",
    `X-SOCIALPROFILE;TYPE=instagram:${c.instagram.url}`,
    "END:VCARD",
    "",
  ].join("\r\n");
};
