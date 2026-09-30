"use client";

import { usePathname } from "next/navigation";
import { MessageSquareText, Phone } from "lucide-react";
import { useLeadModal } from "@/components/forms/LeadModalProvider";
import { SocialIcon } from "@/components/ui/Icon";

/** Fixed bottom bar on mobile: Call | WhatsApp | Enquire */
export function MobileActionBar({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const { openLeadModal } = useLeadModal();
  const pathname = usePathname();
  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.7rem] font-medium";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-raised/95 pb-[env(safe-area-inset-bottom)] shadow-lift backdrop-blur-xl lg:hidden">
      <div className="flex">
        <a href={`tel:${phone}`} className={`${item} text-fg`}>
          <Phone className="size-5 text-accent-text" />
          Call
        </a>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'm interested in a Prabhav project.")}`}
          target="_blank"
          rel="noreferrer"
          className={`${item} border-x border-line text-fg`}
        >
          <SocialIcon name="whatsapp" className="size-5 text-[#25d366]" />
          WhatsApp
        </a>
        <button type="button" onClick={() => openLeadModal({ source: `mobile-bar:${pathname}` })} className={`${item} bg-primary text-primary-fg`}>
          <MessageSquareText className="size-5" />
          Enquire
        </button>
      </div>
    </div>
  );
}
