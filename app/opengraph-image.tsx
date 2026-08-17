import { ImageResponse } from "next/og";
import { milestones } from "@/lib/milestones";
import { site } from "@/lib/site";

/**
 * The card that renders when the link is pasted into LinkedIn, WhatsApp, Slack
 * or an email client — for a link shared with recruiters this is the first
 * impression, so it carries the name, the role and the journey's spectrum.
 *
 * Prerendered at build time. Deliberately uses the runtime's default font
 * rather than fetching a webfont, so a network hiccup can never fail a deploy.
 */

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07060c",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* atmospheric bloom, echoing the site's canvas */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(69,200,240,0.20) 0%, rgba(251,111,141,0.10) 45%, rgba(7,6,12,0) 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 6,
              color: "#625e73",
              textTransform: "uppercase",
            }}
          >
            Portfolio&nbsp;&nbsp;·&nbsp;&nbsp;2018 → 2026
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 92,
              letterSpacing: -3,
              color: "#eceae4",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 40,
              letterSpacing: -1,
              color: "#fb8f4a",
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* the five milestone hues, cold to warm */}
          <div style={{ display: "flex", gap: 8 }}>
            {milestones.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  flex: 1,
                  height: 5,
                  background: m.hue,
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 21,
              letterSpacing: 3,
              color: "#9d99ac",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>
              Intellect&nbsp;&nbsp;·&nbsp;&nbsp;Meta Labs&nbsp;&nbsp;·&nbsp;&nbsp;MAVIP&nbsp;&nbsp;·&nbsp;&nbsp;IMT
              Ghaziabad&nbsp;&nbsp;·&nbsp;&nbsp;VJTI
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
