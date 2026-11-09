"use client";

import { useEffect, useState } from "react";
import { campaign, campaignState } from "@/lib/campaign";

// Se calcula en el navegador para que el estado sea el del día real, no el de la publicación.
export function CampaignStatus() {
  const [state, setState] = useState<ReturnType<typeof campaignState> | null>(null);
  useEffect(() => setState(campaignState()), []);

  const text =
    state === "live"
      ? `En curso hasta el ${campaign.endLabel}`
      : state === "ended"
        ? "Campaña terminada"
        : `Empieza el ${campaign.startLabel}`;

  return <p className={`campaign-pill campaign-${state ?? "upcoming"}`}>{text}</p>;
}
