"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"

const MAPS_URL = "https://www.google.com/maps/place/%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D9%84%D8%A9+%D9%84%D9%84%D8%A7%D8%B4%D8%B9%D8%A9%E2%80%AD/@30.0298901,31.2324764,20z/data=!4m6!3m5!1s0x14584756accf3fd1:0xb4b505f7ae0166ef!8m2!3d30.029936!4d31.232703!16s%2Fg%2F11b5pj4tb6?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"

const doctorsData = [
  {
    avatar: "س",
    name: "د. سيد الشبراوي",
    title: "أستاذ أمراض القلب — معهد القلب القومي",
    services: [
      { service: "إيكو للكبار", price: "400" },
      { service: "إيكو أطفال وحديثي الولادة والأجنّة", price: "500" },
      { service: "هولتر 24 ساعة", price: "450" },
      { service: "هولتر 48 ساعة", price: "800" },
      { service: "كشف", price: "600" },
    ],
  },
  {
    avatar: "أ",
    name: "د. أكرم",
    title: "دوبلر وأشعة موجات صوتية",
    services: [
      { service: "دوبلر ملوّن على الشرايين والأوردة", price: "400" },
      { service: "سونار على البطن والحوض", price: "400" },
      { service: "دوبلر على الخصيتين", price: "400" },
    ],
  },
]

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div style={{ position: "relative", zIndex: 1 }}>

      {/* ===== TOP BAR ===== */}
      <header className="rs-topbar">
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 700 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 22), oklch(0.42 0.20 22) 70%)",
            display: "grid", placeItems: "center",
            boxShadow: "0 0 24px oklch(0.6 0.22 22 / 0.4), inset 0 0 0 1px oklch(1 0 0 / 0.1)",
          }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: "white" }}>
              <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.4 4 7.5C19 16.65 12 21 12 21z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>مركز رسالة للقلب</span>
            <span style={{ fontSize: 11, color: "var(--rs-fg-2)", fontWeight: 400, letterSpacing: "0.05em" }}>RESALA HEART CENTER</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="rs-nav-links" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="#services" style={{ padding: "8px 14px", borderRadius: 999, fontSize: 14, color: "var(--rs-fg-1)", transition: "color 0.2s" }}>الفحوصات</a>
          <a href="#contact" style={{ padding: "8px 14px", borderRadius: 999, fontSize: 14, color: "var(--rs-fg-1)", transition: "color 0.2s" }}>اتصل بنا</a>
          <Link href="/chat" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: "var(--rs-accent)", color: "white", border: "none",
            boxShadow: "0 6px 20px oklch(0.55 0.20 22 / 0.35)",
          }}>
            <span>اسأل بالـ AI</span>
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Link>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              width: 36, height: 36, display: "grid", placeItems: "center",
              borderRadius: "50%", border: "1px solid var(--rs-hairline)", cursor: "pointer",
              background: "none", color: "var(--rs-fg-1)",
            }}
            aria-label="تبديل الوضع"
          >
            {theme === "light" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className="rs-hero">

        {/* Art */}
        <div className="rs-hero-art" style={{ position: "relative", aspectRatio: "1/1", maxWidth: 560, width: "100%", margin: "0 auto", display: "grid", placeItems: "center" }}>
          {/* Glow */}
          <div style={{
            position: "absolute", inset: "10%", borderRadius: "50%",
            background: "radial-gradient(circle, oklch(0.55 0.22 22 / 0.5), transparent 65%)",
            filter: "blur(40px)", animation: "heartGlow 3s ease-in-out infinite",
          }} />
          {/* Rings */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--rs-hairline)" }} />
          <div style={{ position: "absolute", inset: "8%", borderRadius: "50%", border: "1px solid oklch(1 0 0 / 0.04)" }} />
          <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", border: "1px solid oklch(0.5 0.18 22 / 0.18)" }} />
          {/* Heart SVG */}
          <svg style={{ position: "relative", zIndex: 2, width: "65%", height: "65%", filter: "drop-shadow(0 0 30px oklch(0.6 0.22 22 / 0.5))", animation: "heartbeat 1.4s ease-in-out infinite" }} viewBox="0 0 200 200" fill="none">
            <defs>
              <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.22 22)" />
                <stop offset="55%" stopColor="oklch(0.55 0.22 22)" />
                <stop offset="100%" stopColor="oklch(0.32 0.16 22)" />
              </linearGradient>
              <radialGradient id="heartShine" cx="0.35" cy="0.3" r="0.5">
                <stop offset="0%" stopColor="oklch(0.95 0.10 30)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <path d="M100 175 C 30 130, 15 80, 40 50 C 60 26, 90 35, 100 60 C 110 35, 140 26, 160 50 C 185 80, 170 130, 100 175 Z" fill="url(#heartGrad)" stroke="oklch(0.85 0.10 30)" strokeWidth={0.5} />
            <path d="M100 175 C 30 130, 15 80, 40 50 C 60 26, 90 35, 100 60 C 110 35, 140 26, 160 50 C 185 80, 170 130, 100 175 Z" fill="url(#heartShine)" />
            <path d="M20 110 L 60 110 L 75 80 L 90 140 L 105 95 L 120 115 L 180 115" stroke="oklch(0.95 0.05 30)" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
          </svg>

          {/* Orbit stats */}
          <div className="rs-orbit-s1" style={{
            background: "var(--rs-bg-1)", border: "1px solid var(--rs-hairline)",
            borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(10px)", zIndex: 3,
            boxShadow: "0 1px 0 oklch(1 0 0 / 0.04) inset, 0 8px 24px oklch(0 0 0 / 0.4)",
            minWidth: 140, animation: "floatStat 5s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 11, color: "var(--rs-fg-2)", marginBottom: 4 }}>جاهز للفحص</div>
            <div style={{ fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rs-success)", boxShadow: "0 0 8px var(--rs-success)", display: "inline-block" }} />
              فوري
            </div>
          </div>
          <div className="rs-orbit-s2" style={{
            background: "var(--rs-bg-1)", border: "1px solid var(--rs-hairline)",
            borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(10px)", zIndex: 3,
            boxShadow: "0 1px 0 oklch(1 0 0 / 0.04) inset, 0 8px 24px oklch(0 0 0 / 0.4)",
            minWidth: 140,
          }}>
            <div style={{ fontSize: 11, color: "var(--rs-fg-2)", marginBottom: 4 }}>أرخص سعر</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>من 400 ج.م</div>
          </div>
        </div>

        {/* Copy */}
        <div className="rs-hero-copy">
          <span className="rs-eyebrow">
            <span className="dot" />
            استلام الأشعة فوري · بأرخص سعر
          </span>
          <h1 style={{
            fontSize: "clamp(32px, 7vw, 88px)", fontWeight: 800,
            lineHeight: 1.05, letterSpacing: "-0.025em", margin: "22px 0 18px",
            background: "linear-gradient(180deg, var(--rs-fg-0) 30%, oklch(0.7 0.05 30) 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          }}>
            قلبك في{" "}
            <span style={{
              background: "linear-gradient(180deg, oklch(0.72 0.22 22), oklch(0.55 0.20 22))",
              WebkitBackgroundClip: "text", backgroundClip: "text",
            }}>
              إيدين أمينة
            </span>
          </h1>
          <p className="rs-lede" style={{
            fontSize: 17, color: "var(--rs-fg-1)", maxWidth: 520,
            marginInlineStart: "auto", marginBottom: 36, lineHeight: 1.7,
          }}>
            مركز رسالة للقلب — تشخيص دقيق وفحوصات قلب وأشعة بأسعار في متناول الجميع، بإشراف نخبة من أساتذة معهد القلب القومي.
          </p>

          {/* CTAs */}
          <div className="rs-hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="https://wa.me/+201127779055" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 26px", fontSize: 15, fontWeight: 600, borderRadius: 999,
              background: "var(--rs-success)", color: "white", border: "none",
              textDecoration: "none",
            }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-1 1.1-.4.2-.7 0-1.3-.5-2.5-1.5c-.9-.8-1.5-1.8-1.7-2.1s0-.4.1-.6c.1-.1.3-.3.4-.5s.2-.3.3-.5 0-.4 0-.5-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S4.7 7.5 4.7 8.9s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.4 2.9 1.2 2.9.8 3.4.8s1.7-.7 1.9-1.4.2-1.2.2-1.4-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
              </svg>
              <span>تواصل واتساب</span>
            </a>
            <a href="tel:+201127779055" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 26px", fontSize: 15, fontWeight: 600, borderRadius: 999,
              background: "oklch(1 0 0 / 0.03)", color: "var(--rs-fg-0)",
              border: "1px solid var(--rs-hairline)", textDecoration: "none",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>اتصل بنا</span>
            </a>
          </div>

          {/* Trust strip */}
          <div className="rs-trust-strip" style={{ display: "flex", gap: 28, marginTop: 44, justifyContent: "flex-end", color: "var(--rs-fg-2)", fontSize: 13, flexWrap: "wrap" }}>
            {["أساتذة معهد القلب القومي", "نتائج بنفس اليوم", "أسعار تنافسية"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14, color: "var(--rs-accent)" }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="services" className="rs-pricing-section" style={{ padding: "100px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 48, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            الفحوصات والأسعار<br />
            <span style={{ color: "var(--rs-fg-2)", fontWeight: 400 }}>— شفافية كاملة، بدون مفاجآت</span>
          </h2>
          <p style={{ color: "var(--rs-fg-2)", fontSize: 16, maxWidth: 380, lineHeight: 1.6 }}>
            كل خدماتنا بأسعار ثابتة ومُعلنة. اختار الفحص اللي محتاجه، ولو محتاج مساعدة كلمنا أو اسأل المساعد الذكي.
          </p>
        </div>

        <div className="rs-doctors-grid">
          {doctorsData.map((doctor) => (
            <article key={doctor.name} style={{
              background: "linear-gradient(180deg, oklch(0.18 0.013 25), oklch(0.15 0.011 25))",
              border: "1px solid var(--rs-hairline)", borderRadius: 20,
              overflow: "hidden", position: "relative",
              transition: "border-color 0.3s, transform 0.3s",
            }}>
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: 0, right: 0, width: 240, height: 240,
                background: "radial-gradient(circle at 100% 0%, oklch(0.5 0.20 22 / 0.18), transparent 60%)",
                pointerEvents: "none",
              }} />
              {/* Doctor head */}
              <div style={{ padding: "28px 28px 22px", display: "flex", alignItems: "center", gap: 18, borderBottom: "1px solid var(--rs-hairline)", position: "relative" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, oklch(0.30 0.08 22), oklch(0.20 0.04 22))",
                  border: "1px solid var(--rs-hairline-strong)", display: "grid", placeItems: "center",
                  color: "oklch(0.85 0.12 22)", fontWeight: 700, fontSize: 22, flexShrink: 0,
                }}>
                  {doctor.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{doctor.name}</div>
                  <div style={{ fontSize: 13, color: "var(--rs-fg-2)", lineHeight: 1.5 }}>{doctor.title}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--rs-success)", marginTop: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rs-success)", display: "inline-block" }} />
                    متاح اليوم
                  </div>
                </div>
              </div>
              {/* Services */}
              <div style={{ padding: "12px 8px" }}>
                {doctor.services.map((s, idx) => (
                  <div key={idx} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 20px", borderRadius: 10, gap: 16,
                    borderTop: idx > 0 ? "1px dashed oklch(1 0 0 / 0.05)" : undefined,
                  }}>
                    <span style={{ fontSize: 15, color: "var(--rs-fg-0)", fontWeight: 500, flex: 1 }}>{s.service}</span>
                    <span style={{
                      display: "inline-flex", alignItems: "baseline", gap: 4,
                      color: "var(--rs-fg-1)", fontWeight: 600, fontSize: 15,
                      background: "oklch(1 0 0 / 0.04)", padding: "6px 12px",
                      borderRadius: 999, border: "1px solid var(--rs-hairline)",
                    }}>
                      {s.price}
                      <span style={{ fontSize: 11, color: "var(--rs-fg-2)", fontWeight: 400 }}>ج.م</span>
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== CONTACT BAND ===== */}
      <section id="contact" className="rs-contact-band" style={{ padding: "80px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div className="rs-contact-grid rs-contact-card" style={{
          background: "radial-gradient(800px 400px at 90% -10%, oklch(0.40 0.18 22 / 0.18), transparent 60%), linear-gradient(180deg, oklch(0.20 0.014 25), oklch(0.16 0.012 25))",
          border: "1px solid oklch(0.4 0.14 22 / 0.20)", borderRadius: 28,
          padding: 56, position: "relative", overflow: "hidden",
        }}>
          <div>
            <span className="rs-eyebrow"><span className="dot" /> تواصل معنا</span>
            <h3 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "16px 0 14px" }}>
              احجز فحصك<br />أو اسأل في أي وقت
            </h3>
            <p style={{ color: "var(--rs-fg-2)", fontSize: 15, marginBottom: 28, maxWidth: 420 }}>
              فريقنا متاح للرد على استفساراتك ومساعدتك في تحديد الفحص المناسب.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://wa.me/+201127779055" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", fontSize: 15, fontWeight: 600, borderRadius: 999,
                background: "var(--rs-success)", color: "white", textDecoration: "none",
              }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-1 1.1-.4.2-.7 0-1.3-.5-2.5-1.5c-.9-.8-1.5-1.8-1.7-2.1s0-.4.1-.6c.1-.1.3-.3.4-.5s.2-.3.3-.5 0-.4 0-.5-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4S4.7 7.5 4.7 8.9s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.4 2.9 1.2 2.9.8 3.4.8s1.7-.7 1.9-1.4.2-1.2.2-1.4-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
                </svg>
                واتساب
              </a>
              <Link href="/chat" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 22px", fontSize: 15, fontWeight: 600, borderRadius: 999,
                background: "oklch(1 0 0 / 0.03)", color: "var(--rs-fg-0)",
                border: "1px solid var(--rs-hairline)", textDecoration: "none",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                اسأل بالـ AI
              </Link>
            </div>
          </div>

          {/* Info grid */}
          <div className="rs-info-grid">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                label: "مواعيد العمل",
                value: "12 ظهراً — 12 منتصف الليل\nيومياً",
                full: false,
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                label: "الهاتف",
                value: "+201127779055",
                full: false,
                dir: "ltr",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                label: "العنوان",
                value: "أمام مستشفى الباطنة والقصر العيني الفرنساوي\nفوق صيدلية الشمس، الدور الثالث",
                full: true,
                href: MAPS_URL,
              },
            ].map((tile, i) => (
              <div key={i} style={{
                background: "oklch(0.13 0.01 25 / 0.6)",
                border: "1px solid var(--rs-hairline)", borderRadius: 14,
                padding: 18, backdropFilter: "blur(6px)",
                gridColumn: tile.full ? "1 / -1" : undefined,
              }}>
                <div style={{ fontSize: 11, color: "var(--rs-fg-2)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  {tile.icon} {tile.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.5, direction: tile.dir === "ltr" ? "ltr" : undefined, textAlign: tile.dir === "ltr" ? "right" : undefined }}>
                  {tile.href ? (
                    <a href={tile.href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                      {tile.value.split("\n").map((l, j) => <span key={j}>{l}{j < tile.value.split("\n").length - 1 && <br />}</span>)}
                    </a>
                  ) : (
                    tile.value.split("\n").map((l, j) => <span key={j}>{l}{j < tile.value.split("\n").length - 1 && <br />}</span>)
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        borderTop: "1px solid var(--rs-hairline)", padding: "36px 60px", marginTop: 40,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "var(--rs-fg-2)", fontSize: 13, flexWrap: "wrap", gap: 16,
      }}>
        <div>© 2026 مركز رسالة للقلب — جميع الحقوق محفوظة</div>
        <div>تصميم وتطوير بعناية</div>
      </footer>

      {/* ===== FLOATING AI FAB ===== */}
      <Link href="/chat" className="rs-ai-fab" style={{
        position: "fixed", bottom: 28, left: 28, zIndex: 40,
        background: "linear-gradient(135deg, oklch(0.55 0.20 22), oklch(0.40 0.18 22))",
        color: "white", padding: "14px 20px 14px 18px", borderRadius: 999,
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 12px 30px oklch(0.4 0.18 22 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.08) inset",
        fontWeight: 600, fontSize: 14, textDecoration: "none",
        transition: "transform 0.2s",
      }}
        aria-label="افتح المساعد الذكي"
      >
        <span style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "oklch(1 0 0 / 0.18)", display: "grid", placeItems: "center",
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
          </svg>
        </span>
        <span>اسأل المساعد الذكي</span>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "white", boxShadow: "0 0 10px white",
          animation: "rsPulse 1.5s ease-in-out infinite",
        }} />
      </Link>

    </div>
  )
}
