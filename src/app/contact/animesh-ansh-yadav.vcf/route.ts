import { buildVCard } from "@/lib/contact";

export function GET() {
  return new Response(buildVCard(), {
    headers: {
      // text/vcard makes iOS Safari show "Add Contact" and Android hand it to Contacts.
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="Animesh-Ansh-Yadav.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
