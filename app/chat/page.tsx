"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"

/* ===== Types ===== */
type Message = { role: "user" | "assistant"; content: string }

/* ===== Quick actions ===== */
const ACTIONS: Record<string, { label: string; prompt: string }> = {
  appointments: { label: "مواعيد العمل", prompt: "إيه مواعيد العمل عندكم؟" },
  prices: { label: "الفحوصات والأسعار", prompt: "عايز أعرف الفحوصات والأسعار" },
  address: { label: "العنوان", prompt: "فين عنوان المركز بالظبط؟" },
  contact: { label: "رقم التواصل", prompt: "إزاي أتواصل معاكم؟" },
  booking: { label: "حجز موعد", prompt: "عايز أحجز موعد" },
  doctor: { label: "تعريف بالأطباء", prompt: "مين الأطباء عندكم؟" },
  echo: { label: "سعر الإيكو", prompt: "سعر الإيكو كام؟" },
  holter: { label: "فحص الهولتر", prompt: "إيه هو فحص الهولتر وسعره كام؟" },
}

const DEFAULT_CHIPS = ["contact", "prices", "appointments", "address"]

const WELCOME_CARDS: [string, string, string][] = [
  ["prices", "الفحوصات والأسعار", "كل الفحوصات بأسعارها واضحة"],
  ["appointments", "مواعيد العمل", "إمتى المركز مفتوح"],
  ["address", "العنوان", "فين تلاقونا بالظبط"],
  ["booking", "حجز موعد", "احجز فحصك في دقايق"],
]

/* ===== SVG icons ===== */
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%" }}>
    <path d="M12 21s-7-4.35-9.5-8.5C.8 9.4 2.5 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 5.7 4.4 4 7.5C19 16.65 12 21 12 21z" />
  </svg>
)

const SparkleIcon = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
)

const actionIcons: Record<string, React.ReactNode> = {
  appointments: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  prices: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  address: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  contact: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  booking: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  doctor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  echo: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  holter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chips, setChips] = useState(DEFAULT_CHIPS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { theme, setTheme } = useTheme()

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, loading, scrollToBottom])

  const sendMessage = useCallback(async (text: string) => {
    const t = text.trim()
    if (!t || loading) return

    const userMsg: Message = { role: "user", content: t }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
    setLoading(true)

    try {
      const allMessages = [...messages, userMsg]
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages }),
      })
      if (!res.ok) throw new Error("failed")
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.message }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "حدث خطأ. حاول مرة تانية أو تواصل معنا على واتساب." }])
    } finally {
      setLoading(false)
    }

    const keyword = t.toLowerCase()
    if (keyword.includes("سعر") || keyword.includes("فلوس") || keyword.includes("كام") || keyword.includes("أسعار"))
      setChips(["booking", "appointments", "address", "doctor"])
    else if (keyword.includes("موعد") || keyword.includes("وقت") || keyword.includes("ساعات"))
      setChips(["booking", "address", "contact", "prices"])
    else if (keyword.includes("عنوان") || keyword.includes("فين") || keyword.includes("مكان"))
      setChips(["appointments", "contact", "booking", "prices"])
    else if (keyword.includes("إيكو") || keyword.includes("ايكو"))
      setChips(["holter", "booking", "doctor", "prices"])
    else if (keyword.includes("هولتر"))
      setChips(["echo", "booking", "doctor", "prices"])
    else
      setChips(DEFAULT_CHIPS)
  }, [messages, loading])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleInput = () => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = Math.min(160, textareaRef.current.scrollHeight) + "px"
  }

  const newChat = () => {
    setMessages([])
    setChips(DEFAULT_CHIPS)
  }

  const isStarted = messages.length > 0

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--rs-bg-0)" }}>

      {/* ===== TOPBAR ===== */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 28px", borderBottom: "1px solid var(--rs-hairline)",
        backdropFilter: "blur(8px)", background: "oklch(0.13 0.01 25 / 0.7)",
        flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{
            width: 36, height: 36, display: "grid", placeItems: "center",
            borderRadius: "50%", border: "1px solid var(--rs-hairline)",
            color: "var(--rs-fg-1)", textDecoration: "none",
          }} aria-label="رجوع">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
          <div style={{
            width: 38, height: 38, borderRadius: 12, position: "relative",
            background: "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 22), oklch(0.42 0.20 22) 70%)",
            display: "grid", placeItems: "center",
            boxShadow: "0 0 18px oklch(0.6 0.22 22 / 0.4), inset 0 0 0 1px oklch(1 0 0 / 0.1)",
          }}>
            <span style={{ width: 18, height: 18, color: "white", display: "grid", placeItems: "center" }}>
              <HeartIcon />
            </span>
            <span style={{
              position: "absolute", bottom: -2, left: -2,
              width: 12, height: 12, borderRadius: "50%",
              background: "var(--rs-success)", border: "2px solid var(--rs-bg-0)",
            }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 15, fontWeight: 700 }}>المساعد الذكي</span>
            <span style={{ fontSize: 12, color: "var(--rs-success)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rs-success)", boxShadow: "0 0 8px var(--rs-success)", display: "inline-block" }} />
              متاح الآن
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={newChat} style={{
            width: 38, height: 38, display: "grid", placeItems: "center",
            borderRadius: "50%", border: "1px solid var(--rs-hairline)",
            color: "var(--rs-fg-1)", background: "none", cursor: "pointer",
          }} aria-label="محادثة جديدة">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} style={{
            width: 38, height: 38, display: "grid", placeItems: "center",
            borderRadius: "50%", border: "1px solid var(--rs-hairline)",
            color: "var(--rs-fg-1)", background: "none", cursor: "pointer",
          }} aria-label="تبديل الوضع">
            {theme === "light" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* ===== DISCLAIMER ===== */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        padding: "10px 24px", background: "oklch(0.30 0.10 22 / 0.18)",
        borderBottom: "1px solid oklch(0.5 0.18 22 / 0.18)",
        color: "oklch(0.85 0.08 22)", fontSize: 13, flexShrink: 0,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14, flexShrink: 0, color: "oklch(0.78 0.18 22)" }}>
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>مخصص للاستفسارات السريعة فقط — مش بديل عن الكشف الطبي</span>
      </div>

      {/* ===== MESSAGES AREA ===== */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 24px 16px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>

          {/* Welcome state */}
          {!isStarted && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 0 12px" }}>
              <div style={{
                width: 84, height: 84, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 22), oklch(0.42 0.20 22) 70%)",
                display: "grid", placeItems: "center",
                boxShadow: "0 0 50px oklch(0.6 0.22 22 / 0.45), inset 0 0 0 1px oklch(1 0 0 / 0.1)",
                marginBottom: 22, animation: "orbPulse 2.4s ease-in-out infinite",
              }}>
                <SparkleIcon size={36} />
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
                إزاي أقدر أساعدك؟
              </h1>
              <p style={{ color: "var(--rs-fg-2)", fontSize: 15, maxWidth: 460, lineHeight: 1.6 }}>
                مساعد ذكي للرد على استفساراتك السريعة عن المركز — مواعيد، أسعار، عنوان، وحجوزات.
              </p>

              {/* Suggestion cards */}
              <div className="rs-welcome-cards" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, width: "100%", maxWidth: 600, marginTop: 32 }}>
                {WELCOME_CARDS.map(([key, title, sub]) => (
                  <button key={key} onClick={() => sendMessage(ACTIONS[key].prompt)} style={{
                    background: "oklch(0.18 0.013 25)", border: "1px solid var(--rs-hairline)",
                    borderRadius: 14, padding: "16px 18px", textAlign: "right", cursor: "pointer",
                    display: "flex", alignItems: "flex-start", gap: 12,
                    color: "inherit", fontFamily: "inherit",
                  }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
                      flexShrink: 0, background: "var(--rs-accent-bg)", color: "oklch(0.78 0.18 22)",
                      border: "1px solid oklch(0.5 0.18 22 / 0.2)",
                    }}>
                      {actionIcons[key]}
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3, color: "var(--rs-fg-0)" }}>{title}</div>
                      <div style={{ fontSize: 12, color: "var(--rs-fg-2)", lineHeight: 1.4 }}>{sub}</div>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: "flex", gap: 10, alignItems: "flex-end",
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}>
              {msg.role === "assistant" ? (
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 22), oklch(0.42 0.20 22) 70%)",
                  boxShadow: "0 0 12px oklch(0.6 0.22 22 / 0.3)",
                  display: "grid", placeItems: "center", color: "white",
                }}>
                  <SparkleIcon size={14} />
                </div>
              ) : (
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: "oklch(0.22 0.012 25)", border: "1px solid var(--rs-hairline)",
                  display: "grid", placeItems: "center", color: "var(--rs-fg-1)",
                  fontSize: 12, fontWeight: 600,
                }}>أنت</div>
              )}
              <div style={{
                maxWidth: "78%", padding: "12px 16px", borderRadius: 18,
                fontSize: 15, lineHeight: 1.65, wordWrap: "break-word",
                background: msg.role === "assistant"
                  ? "oklch(0.18 0.013 25)"
                  : "linear-gradient(135deg, oklch(0.55 0.20 22), oklch(0.45 0.18 22))",
                border: msg.role === "assistant" ? "1px solid var(--rs-hairline)" : "none",
                color: msg.role === "user" ? "white" : "var(--rs-fg-0)",
                borderBottomRightRadius: msg.role === "assistant" ? 4 : 18,
                borderBottomLeftRadius: msg.role === "user" ? 4 : 18,
                whiteSpace: "pre-wrap",
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexDirection: "row" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "radial-gradient(circle at 35% 30%, oklch(0.72 0.22 22), oklch(0.42 0.20 22) 70%)",
                display: "grid", placeItems: "center", color: "white",
              }}>
                <SparkleIcon size={14} />
              </div>
              <div style={{
                padding: "12px 16px", borderRadius: 18, borderBottomRightRadius: 4,
                background: "oklch(0.18 0.013 25)", border: "1px solid var(--rs-hairline)",
              }}>
                <div className="rs-typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* ===== INPUT AREA ===== */}
      <div style={{
        flexShrink: 0, padding: "12px 24px 20px",
        background: "linear-gradient(180deg, transparent, var(--rs-bg-0) 30%)",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Quick chips */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", overflowX: "auto", paddingBottom: 4 }}>
            {chips.map((key, i) => {
              const a = ACTIONS[key]
              if (!a) return null
              const isSuggested = isStarted && i < 3
              return (
                <button key={key} onClick={() => sendMessage(a.prompt)} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 999, cursor: "pointer",
                  background: isSuggested ? "var(--rs-accent-bg)" : "oklch(0.18 0.013 25)",
                  border: isSuggested ? "1px solid oklch(0.5 0.18 22 / 0.3)" : "1px solid var(--rs-hairline)",
                  color: isSuggested ? "oklch(0.85 0.10 22)" : "var(--rs-fg-1)",
                  fontSize: 13, fontWeight: 500, whiteSpace: "nowrap",
                  fontFamily: "inherit",
                }}>
                  {actionIcons[key]}
                  <span>{a.label}</span>
                  {isSuggested && (
                    <span style={{
                      fontSize: 10, background: "oklch(0.5 0.18 22 / 0.3)",
                      color: "oklch(0.85 0.10 22)", padding: "1px 6px",
                      borderRadius: 999, marginInlineStart: 4,
                    }}>مقترح</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} style={{
            display: "flex", alignItems: "flex-end", gap: 10,
            background: "oklch(0.18 0.013 25)", border: "1px solid var(--rs-hairline)",
            borderRadius: 24, padding: "8px 8px 8px 16px",
          }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              placeholder="اسأل عن المواعيد، الأسعار، أو العنوان…"
              rows={1}
              autoComplete="off"
              style={{
                flex: 1, background: "transparent", border: 0, outline: 0,
                color: "var(--rs-fg-0)", fontFamily: "inherit", fontSize: 15,
                lineHeight: 1.5, resize: "none", padding: "10px 4px",
                maxHeight: 160, minHeight: 24,
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              style={{
                width: 42, height: 42, borderRadius: "50%",
                background: input.trim() && !loading ? "var(--rs-accent)" : "oklch(0.25 0.04 22)",
                color: input.trim() && !loading ? "white" : "var(--rs-fg-3)",
                display: "grid", placeItems: "center", flexShrink: 0,
                border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                boxShadow: input.trim() && !loading ? "0 4px 12px oklch(0.5 0.20 22 / 0.4)" : "none",
                transition: "background 0.2s",
              }}
              aria-label="إرسال"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, transform: "scaleX(-1)" }}>
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          <div style={{ textAlign: "center", color: "var(--rs-fg-3)", fontSize: 11, marginTop: 8 }}>
            يمكن الردود تكون غير دقيقة — للتأكد، تواصل معنا مباشرة على واتساب
          </div>
        </div>
      </div>
    </div>
  )
}
