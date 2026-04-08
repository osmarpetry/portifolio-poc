import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

const root = process.cwd();

const specs = [
  {
    outDir: path.join(
      root,
      "src/assets/images/screenshots/companies/zup/zup-placeholder",
    ),
    title: "CONFIDENTIAL FLEET TELEMETRY",
    owner: "DELIVERED THROUGH ZUP",
    body: "Editorial cover inspired by a commercial-truck telemetry engagement. Client-facing identity is intentionally obscured for portfolio use.",
    accentA: "#0d7df2",
    accentB: "#14d4c5",
    background: "#08111d",
    ghost: "R I O",
    chips: ["D3 VISUALS", "TRUCK OPS", "REAL-TIME DATA"],
    motif: "truck",
  },
  {
    outDir: path.join(
      root,
      "src/assets/images/screenshots/companies/envolve-labs/envolve-labs-placeholder",
    ),
    title: "CONFIDENTIAL LOGISTICS CLIENT",
    owner: "DELIVERED THROUGH ENVOLVE LABS",
    body: "Editorial cover inspired by a refrigerated logistics and web/mobile monitoring engagement. The public client reference is intentionally softened.",
    accentA: "#ef4444",
    accentB: "#f59e0b",
    background: "#160b0b",
    ghost: "munique tk",
    chips: ["WEB + MOBILE", "COLD CHAIN", "FLEET MONITORING"],
    motif: "snow",
  },
];

function buildMotif(spec) {
  if (spec.motif === "truck") {
    return `
      <div class="truck">
        <div class="truck-cab"></div>
        <div class="truck-body"></div>
        <div class="wheel w1"></div>
        <div class="wheel w2"></div>
      </div>
      <svg class="chart" viewBox="0 0 500 160" aria-hidden="true">
        <polyline points="0,120 80,100 150,108 210,70 270,86 340,44 410,66 500,22" />
        <polyline class="faint" points="0,140 90,134 160,112 220,126 280,82 350,98 420,70 500,84" />
      </svg>
    `;
  }

  return `
    <div class="snowflake s1"></div>
    <div class="snowflake s2"></div>
    <div class="snowflake s3"></div>
    <div class="crate-grid"></div>
  `;
}

function buildHtml(spec) {
  const chips = spec.chips
    .map((chip) => `<span class="chip">${chip}</span>`)
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <style>
        :root { --bg: ${spec.background}; --a: ${spec.accentA}; --b: ${spec.accentB}; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          background:
            radial-gradient(circle at top left, rgba(255,255,255,.06), transparent 30%),
            linear-gradient(135deg, var(--bg), #000 68%);
          color: #f6f3ee;
        }
        .cover {
          width: 1280px;
          height: 960px;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 18%, color-mix(in srgb, var(--a) 26%, transparent), transparent 22%),
            radial-gradient(circle at 78% 22%, color-mix(in srgb, var(--b) 18%, transparent), transparent 24%),
            linear-gradient(120deg, rgba(255,255,255,.04), transparent 25%),
            linear-gradient(180deg, rgba(255,255,255,.02), rgba(0,0,0,.22));
        }
        .grain, .scan { position: absolute; inset: 0; pointer-events: none; }
        .grain {
          opacity: .12;
          background-image: radial-gradient(circle, rgba(255,255,255,.3) 0.7px, transparent 0.8px);
          background-size: 9px 9px;
          mix-blend-mode: screen;
        }
        .scan {
          background: repeating-linear-gradient(180deg, rgba(255,255,255,.03) 0 1px, transparent 1px 4px);
          opacity: .18;
        }
        .ghost {
          position: absolute;
          inset: 36px 38px auto auto;
          font-size: 180px;
          font-weight: 900;
          line-height: .82;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.07);
          filter: blur(4px);
          transform: rotate(-8deg);
          user-select: none;
        }
        .ghost.secondary {
          inset: auto auto 40px 42px;
          font-size: 120px;
          opacity: .8;
          transform: rotate(0deg);
        }
        .content {
          position: absolute;
          inset: 52px;
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 36px;
        }
        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #d9d5cf;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--a), var(--b));
          box-shadow: 0 0 30px color-mix(in srgb, var(--a) 65%, transparent);
        }
        h1 {
          margin: 18px 0 16px;
          max-width: 780px;
          font-size: 88px;
          line-height: .92;
          letter-spacing: -.04em;
        }
        p {
          margin: 0;
          max-width: 720px;
          font-size: 28px;
          line-height: 1.32;
          color: #d3cdc4;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 26px;
        }
        .chip {
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.05);
          color: #f0ebe2;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 18px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .panel {
          position: relative;
          min-height: 100%;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 36px;
          background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
          overflow: hidden;
          box-shadow: 0 30px 100px rgba(0,0,0,.35);
        }
        .panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--a) 12%, transparent), transparent 45%),
            linear-gradient(180deg, transparent, rgba(0,0,0,.18));
        }
        .owner, .conf {
          position: absolute;
          z-index: 3;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.16);
          backdrop-filter: blur(8px);
        }
        .owner {
          top: 22px;
          right: 22px;
          background: rgba(6,8,14,.64);
        }
        .conf {
          top: 22px;
          left: 22px;
          background: color-mix(in srgb, var(--a) 24%, rgba(6,8,14,.6));
        }
        .art { position: absolute; inset: 0; }
        .art::after {
          content: "";
          position: absolute;
          inset: auto -50px -30px 40px;
          height: 260px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--a) 40%, transparent), color-mix(in srgb, var(--b) 40%, transparent));
          filter: blur(80px);
          opacity: .65;
        }
        .truck {
          position: absolute;
          right: 54px;
          bottom: 94px;
          width: 440px;
          height: 180px;
          opacity: .95;
        }
        .truck-body, .truck-cab {
          position: absolute;
          bottom: 34px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.08));
          border: 1px solid rgba(255,255,255,.18);
        }
        .truck-body { left: 86px; width: 258px; height: 92px; }
        .truck-cab {
          left: 0;
          width: 124px;
          height: 78px;
          border-bottom-right-radius: 8px;
        }
        .wheel {
          position: absolute;
          bottom: 0;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: #0f1720;
          border: 10px solid rgba(255,255,255,.34);
        }
        .w1 { left: 82px; }
        .w2 { right: 58px; }
        .chart {
          position: absolute;
          left: 42px;
          top: 106px;
          width: 500px;
          height: 160px;
        }
        .chart polyline {
          fill: none;
          stroke: color-mix(in srgb, var(--b) 85%, white);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 16px color-mix(in srgb, var(--b) 55%, transparent));
        }
        .chart .faint {
          stroke: color-mix(in srgb, var(--a) 60%, white);
          opacity: .4;
          stroke-width: 5;
        }
        .snowflake, .crate-grid {
          position: absolute;
          border: 1px solid rgba(255,255,255,.16);
        }
        .snowflake {
          width: 140px;
          height: 140px;
          border-radius: 32px;
          backdrop-filter: blur(2px);
          background: rgba(255,255,255,.05);
        }
        .s1 { right: 70px; top: 120px; transform: rotate(12deg); }
        .s2 { right: 210px; top: 250px; transform: rotate(-8deg); }
        .s3 { right: 120px; top: 420px; transform: rotate(18deg); }
        .snowflake::before,
        .snowflake::after {
          content: "";
          position: absolute;
          inset: 50%;
          width: 88px;
          height: 6px;
          margin-left: -44px;
          margin-top: -3px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.8), transparent);
        }
        .snowflake::after { transform: rotate(90deg); }
        .crate-grid {
          right: 54px;
          bottom: 84px;
          width: 420px;
          height: 240px;
          border-radius: 28px;
          background:
            linear-gradient(90deg, rgba(255,255,255,.09) 0 1px, transparent 1px 33%),
            linear-gradient(180deg, rgba(255,255,255,.09) 0 1px, transparent 1px 33%),
            linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
          backdrop-filter: blur(3px);
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }
        .note {
          font-size: 16px;
          line-height: 1.35;
          color: #bdb5aa;
          max-width: 420px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }
        .sig {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #f2ede6;
        }
      </style>
    </head>
    <body>
      <div class="cover">
        <div class="grain"></div>
        <div class="scan"></div>
        <div class="ghost">${spec.ghost}</div>
        <div class="ghost secondary">confidential</div>
        <div class="content">
          <div class="left">
            <div>
              <div class="eyebrow"><span class="dot"></span>Contract-owned work</div>
              <h1>${spec.title}</h1>
              <p>${spec.body}</p>
              <div class="chips">${chips}</div>
            </div>
            <div class="footer">
              <div class="note">CLIENT SURFACE OBSCURED ON PURPOSE. VISUAL REFERENCES ARE EDITORIAL, NOT PRODUCT SCREENSHOTS.</div>
              <div class="sig">${spec.owner}</div>
            </div>
          </div>
          <div class="panel">
            <div class="conf">Confidential client</div>
            <div class="owner">Portfolio-safe cover</div>
            <div class="art">${buildMotif(spec)}</div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 960 },
  deviceScaleFactor: 1,
});

for (const spec of specs) {
  await fs.mkdir(spec.outDir, { recursive: true });
  await page.setContent(buildHtml(spec), { waitUntil: "load" });
  await page.screenshot({ path: path.join(spec.outDir, "cover.png") });
}

await browser.close();
