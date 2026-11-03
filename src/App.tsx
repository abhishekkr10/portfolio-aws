import {MotionLayer,MotionToggle} from './MotionLayer'
import { projects } from "./data/projects"

import { ProjectDetail } from "./ProjectDetail"

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"

const technologies = [
  "ESP32-S3",

  "C++17",

  "ONNX RUNTIME",

  "RUST",

  "ATECC508A",

  "PYTORCH",

  "FASTAPI",

  "POSTGRESQL",
]

const commandHints = [
  "help",
  "boot",
  "whoami",
  "projects",
  "skills",
  "aeronode",
  "causalbench",
  "jocky",
  "safetrack",
  "links",
  "clear",
]

const terminalResponses: Record<string, string[]> = {
  help: [
    "Available commands:",

    "boot · whoami · projects · skills · aeronode",

    "causalbench · jocky · safetrack · proof <project> · links · clear",
  ],

  boot: [
    "[UART-01] ROM bootloader attached",

    "[ OK ] Identity module ........... Abhishek K. Singh",

    "[ OK ] Embedded systems .......... ready",

    "[ OK ] Edge inference ............ ready",

    "[ OK ] Curiosity daemon .......... persistent",

    "System ready. Type help to explore.",
  ],

  whoami: [
    "Abhishek Kumar Singh",

    "ECE · IoT specialization · MMMUT Gorakhpur",

    "Building intelligent systems where hardware meets software.",
  ],

  projects: [
    "01  AeroNode   / adaptive Edge-AI runtime",
    "02  JOCKY      / defensive forensics platform",
    "03  SafeTrack  / tamper-evident IoT prototype",
    "04  CausalBench / controller experiment laboratory",
  ],

  skills: [
    "firmware   C · C++17 · ESP32-S3",
    "inference  PyTorch · ONNX Runtime",
    "systems    Rust · CMake · ZeroMQ",
    "backend    FastAPI · PostgreSQL · SQLite",
  ],

  aeronode: [
    "RECORDED EXPERIMENT OUTPUT · AERONODE",

    "Stage 1  entropy 1.8097  → Continue",

    "Stage 2  entropy 1.1999  → Continue",

    "Stage 3  entropy 0.8247  → Exit",

    "Stage 4  —               → Skipped",

    "adaptive latency: 2.1052 ms",
  ],

  causalbench: [
    "CAUSALBENCH 2.0 / LOCAL LAB",
    "Sensor → Fault → Compare → Minimize → Regress",
    "Actuation: simulated · Tests: 93 Python tests",
    "Evidence: reproducibility ZIP package",
  ],

  jocky: [
    "JOCKY / LOCAL PLATFORM · PUBLIC PREVIEW",
    "Collect → Normalize → Correlate → Sign",
    "Public preview uses synthetic evidence only.",
    "Status: working locally · not production",
  ],

  safetrack: [
    "SIMULATED HARDWARE OUTPUT · SAFETRACK",
    "MPU6050: motion threshold crossed",
    "ATECC508A: event signature verified",
    "gateway: packet accepted · sequence 0x01AF",
  ],

  "fun-fact": [
    "Kanpur → Gorakhpur",
    "The shortest path between an idea and proof usually passes through a serial console.",
  ],
}

type IconName = "arrow" | "github" | "mail" | "menu" | "close" | "external" | "chevron"

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),

    github: (
      <>
        <path
          d="M15 22v-3.9c.04-1-.35-1.96-1.1-2.65 3.6-.4 7.38-1.77 7.38-8A6.25 6.25 0 0 0 19.61 3c.16-.4.7-2.04-.16-4.13 0 0-1.36-.44-4.45 1.67a15.4 15.4 0 0 0-8 0C3.91-1.57 2.55-1.13 2.55-1.13 1.69.96 2.23 2.6 2.39 3A6.25 6.25 0 0 0 .72 7.45c0 6.22 3.78 7.59 7.38 8A3.72 3.72 0 0 0 7 18.1V22"
          transform="translate(1 1) scale(.92)"
        />
        <path d="M7 19c-3 .92-3-1.5-4.2-2" />
      </>
    ),

    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),

    menu: (
      <>
        <path d="M4 8h16M4 16h16" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),

    external: (
      <>
        <path d="M14 4h6v6M20 4l-9 9" />
        <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
      </>
    ),

    chevron: (
      <>
        <path d="m8 10 4 4 4-4" />
      </>
    ),
  }

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function SectionLabel({
  number,
  children,
}: {
  number: string
  children: ReactNode
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      {children}
    </div>
  )
}

function Button({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode
  href: string
  secondary?: boolean
}) {
  return (
    <a className={`button ${secondary ? "button--secondary" : ""}`} href={href}>
      {children}
      <Icon name="arrow" />
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  const links = [
    ["About", "#about"],
    ["Capabilities", "#capabilities"],
    ["Work", "#work"],
    ["UART-01", "#uart"],
    ["Contact", "#contact"],
  ]

  return (
    <header className="nav-shell">
      <a
        href="#top"
        className="brand"
        aria-label="AKS / Systems engineer — Abhishek Kumar Singh, home"
      >
        <span className="brand-mark">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          AKS<small>/ SYSTEMS ENGINEER</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
      <MotionToggle/><div className="nav-status">
        <span className="status-dot" />
        OPEN TO OPPORTUNITIES
      </div>
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function ChipVisual() {
  const visualRef = useRef<HTMLDivElement>(null)

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if(event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce') return
    const box = event.currentTarget.getBoundingClientRect()

    const x = (event.clientX - box.left) / box.width - 0.5

    const y = (event.clientY - box.top) / box.height - 0.5

    visualRef.current?.style.setProperty("--rx", `${-y * 5}deg`)

    visualRef.current?.style.setProperty("--ry", `${x * 7}deg`)
  }

  return (
    <div
      className="chip-visual"
      onPointerMove={onMove}
      onPointerLeave={() => {
        visualRef.current?.style.setProperty("--rx", "0deg")

        visualRef.current?.style.setProperty("--ry", "0deg")
      }}
    >
      <div className="chip-annotation annotation-a">
        <span>01</span>SENSE
      </div>
      <div className="chip-annotation annotation-b">
        <span>02</span>VERIFY
      </div>
      <div className="chip-annotation annotation-c">
        <span>03</span>DECIDE
      </div>
      <svg
        className="trace-board"
        viewBox="0 0 650 650"
        fill="none"
        aria-hidden="true"
      >
        <g className="trace-lines">
          <path d="M246 244H190V157H70" />
          <path d="M246 274H143V325H35" />
          <path d="M246 304H183V430H86V553H25" />
          <path d="M246 334H154V494H90" />
          <path d="M246 364H215V585H136" />
          <path d="M404 244h58V135h117V73h48" />
          <path d="M404 274h109v54h109" />
          <path d="M404 304h64v98h102v118h67" />
          <path d="M404 334h31v160h107v83h91" />
          <path d="M404 364h91v68h47" />
          <path d="M274 246v-78h-53V75h-93" />
          <path d="M304 246V118h58V35" />
          <path d="M334 246V98h100V34" />
          <path d="M364 246V179h120v-76" />
          <path d="M274 404v77h-61v128" />
          <path d="M304 404v124h54v82" />
          <path d="M334 404v77h90v128" />
          <path d="M364 404v112h119v92" />
        </g>
        <g className="trace-nodes">
          {[
            ["70", "157"],
            ["35", "325"],
            ["86", "553"],
            ["90", "494"],
            ["136", "585"],
            ["579", "73"],
            ["622", "328"],
            ["570", "520"],
            ["633", "577"],
            ["542", "432"],
            ["128", "75"],
            ["362", "35"],
            ["434", "34"],
            ["484", "103"],
            ["213", "609"],
            ["358", "610"],
            ["424", "609"],
            ["483", "608"],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" />
          ))}
        </g>
        <g className="data-pulses">
          <circle r="5">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              path="M246 274H143V325H35"
            />
          </circle>
          <circle r="5">
            <animateMotion
              dur="3.6s"
              repeatCount="indefinite"
              path="M404 304h64v98h102v118h67"
            />
          </circle>
          <circle r="4">
            <animateMotion
              dur="3.1s"
              repeatCount="indefinite"
              path="M304 246V118h58V35"
            />
          </circle>
        </g>
      </svg>
      <div className="chip-orbits" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="signal-beacons" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="chip-stage" ref={visualRef}>
        <div className="chip-pins pins-top">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="chip-pins pins-right">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="chip-pins pins-bottom">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="chip-pins pins-left">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <div className="chip">
          <div className="chip-logo">
            <span>◫</span>ESPRESSIF
          </div>
          <div className="chip-title">ESP32-S3</div>
          <span>N16R8 module</span>
          <div className="chip-sub">Wi-Fi + BLE 5 · DUAL CORE</div>
          <div className="chip-code">240 MHz</div>
          <div className="chip-led">
            <i />
            ACTIVE
          </div>
        </div>
      </div>
      <div className="pin-label pin-a">GPIO 04 / SDA</div>
      <div className="pin-label pin-b">GPIO 05 / SCL</div>
      <div className="pin-label pin-c">UART0 / TX</div>
      <div className="scanline" />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow reveal-1">
          <span>ABHISHEK KUMAR SINGH</span>
          <i /> ECE · IoT · MMMUT GORAKHPUR
        </div>
        <h1 aria-label="Signals in. Decisions out. Evidence kept.">
          <span className="headline-line reveal-2">
            <i>Signals in.</i>
          </span>
          <span className="headline-line reveal-3">
            <i>Decisions out.</i>
          </span>
          <span className="headline-line copper reveal-4">
            <i>Evidence kept.</i>
          </span>
        </h1>
        <p className="hero-deck reveal-5">
          Try typing help in the UART console. I build embedded firmware, Edge
          AI runtimes and the systems that make connected devices trustworthy.
        </p>
        <div className="hero-actions reveal-5">
          <Button href="#work">EXPLORE THE BUILDS</Button>
          <Button href="#uart" secondary>
            OPEN THE CONSOLE
          </Button>
        </div>
        <div className="hero-meta reveal-5">
          <span>
            <b>BASED</b>Gorakhpur, India
          </span>
          <span>
            <b>FOCUS</b>Embedded × Intelligence
          </span>
          <a href="#contact">
            <Icon name="mail" />
            Contact
          </a>
        </div>
      </div>
      <div className="hero-object">
        <ChipVisual />
      </div>
    </section>
  )
}

function Ticker() {
  const list = [...technologies, ...technologies]

  return (
    <div
      className="ticker"
      aria-label={`Technologies: ${technologies.join(", ")}`}
    >
      <div className="ticker-track">
        {list.map((tech, i) => (
          <span key={`${tech}-${i}`}>
            <i />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  const steps = [
    [
      "01",
      "Understand",
      "Map the physical signal, system boundary and failure modes.",
    ],
    [
      "02",
      "Build",
      "Join firmware, inference and infrastructure into one working path.",
    ],
    [
      "03",
      "Validate",
      "Measure behavior against real constraints—not assumptions.",
    ],
    ["04", "Refine", "Reduce ambiguity, latency and avoidable complexity."],
  ]

  return (
    <section className="section about" id="about">
      <SectionLabel number="01">ABOUT</SectionLabel>
      <div className="about-grid">
        <h2>
          Hardware you can trust, <em>software you can explain.</em>
        </h2>
        <div className="about-copy">
          <p className="lead">
            I’m an Electronics &amp; Communication Engineering student
            specializing in IoT at MMMUT Gorakhpur.
          </p>
          <p>
            I’m interested in the seam between physical systems and software:
            where a sensor becomes a signal, a model becomes a decision, and
            infrastructure keeps the result observable and secure.
          </p>
          <div className="location-line">
            <span>KANPUR</span>
            <i />
            <b>→</b>
            <i />
            <span>GORAKHPUR</span>
          </div>
        </div>
      </div>
      <div className="philosophy">
        {steps.map(([num, title, text]) => (
          <article key={num}>
            <div className="step-index">
              {num}
              <span />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

const capabilities = [
  {
    index: "A",
    title: "EMBEDDED SYSTEMS",
    desc: "Deterministic firmware and sensor interfaces designed around physical constraints.",
    tech: ["C", "C++17", "ESP32-S3", "I2C", "MPU6050", "ATECC508A"],
    project: "SAFETRACK",
  },

  {
    index: "B",
    title: "EDGE AI",
    desc: "Adaptive inference pipelines that decide how much computation a signal needs.",
    tech: ["PyTorch", "ONNX", "ONNX Runtime", "ZeroMQ"],
    project: "AERONODE",
  },

  {
    index: "C",
    title: "BACKEND",
    desc: "Observable services for receiving, verifying and retaining device telemetry.",
    tech: ["Python", "FastAPI", "PostgreSQL", "SQLite"],
    project: "SAFETRACK",
  },

  {
    index: "D",
    title: "SYSTEMS",
    desc: "Performance-aware tools and interfaces across low-level and application layers.",
    tech: ["Rust", "TypeScript", "React", "CMake", "Git"],
    project: "JOCKY",
  },
]

function Capabilities() {
  const [active, setActive] = useState(0)

  return (
    <section className="section capabilities" id="capabilities">
      <SectionLabel number="02">Skills</SectionLabel>
      <div className="section-intro">
        <h2>
          Across the <em>full signal path.</em>
        </h2>
        <p>
          Four disciplines, connected by one question: does the system hold up
          when it meets the physical world?
        </p>
      </div>
      <div className="capability-list">
        {capabilities.map((item, index) => (
          <article
            className={active === index ? "active" : ""}
            key={item.title}
            onMouseEnter={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <button aria-expanded={active === index}>
              <span className="cap-index">{item.index}</span>
              <h3>{item.title}</h3>
              <span className="cap-project">
                IMPLEMENTATION EVIDENCE / {item.project}
              </span>
              <span className="cap-toggle">+</span>
            </button>
            <div className="cap-detail">
              <p>{item.desc}</p>
              <div className="tech-tags">
                {item.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AeroGraphic() {
  return (
    <div className="aero-graphic"><span className="motion-label">RECORDED · ENTROPY EXIT REPLAY</span>
      <div className="aero-grid">
        {[1, 2, 3, 4].map((n) => (
          <i key={n} />
        ))}
      </div>
      <div className="aero-wave">
        <svg viewBox="0 0 600 150" preserveAspectRatio="none">
          <path d="M0 95C50 95 40 45 85 45s30 65 75 65 35-90 82-90 43 116 91 116 33-80 80-80 35 49 80 49 42-39 107-39" />
        </svg>
      </div>
      <div className="aero-stages">
        {["Stage 1", "Stage 2", "Stage 3", "Stage 4"].map((s, i) => (
          <div key={s} className={i === 2 ? "selected" : ""}>
            <span>0{i + 1}</span>
            {s}
            <b>{["1.8097", "1.1999", "0.8247", "skipped"][i]}</b>
          </div>
        ))}
      </div>
      <div className="aero-result">
        ADAPTIVE EXIT <strong>03</strong>
      </div>
    </div>
  )
}

function JockyGraphic() {
  const nodes = [
    ["SOURCE", 15, 24],
    ["COLLECT", 43, 15],
    ["NORMALIZE", 66, 32],
    ["CORRELATE", 42, 61],
    ["CHECKPOINT", 72, 75],
    ["EVIDENCE", 18, 78],
  ]

  return (
    <div className="jocky-graphic"><span className="motion-label">ILLUSTRATIVE · EVIDENCE HASH CHAIN</span>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M15 24 43 15 66 32 42 61 72 75M42 61 18 78M15 24 42 61M66 32 72 75" />
      </svg>
      {nodes.map(([name, x, y], i) => (
        <div
          className={`graph-node node-${i}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          key={name}
        >
          <i />
          {name}
          <small>0{i + 1}</small>
        </div>
      ))}
      <div className="jocky-stamp">
        HASH-LINKED
        <br />
        CHECKPOINTS
      </div>
    </div>
  )
}

function SafeGraphic() {
  return (
    <div className="safe-graphic"><span className="motion-label">ILLUSTRATIVE · SIGNED PACKET</span>
      <div className="safe-device">
        <span className="status-dot" />
        <small>DEVICE / 04</small>
        <b>ESP32—S3</b>
        <div className="mini-chip">
          MPU
          <br />
          6050
        </div>
        <div className="mini-chip secure">
          ATECC
          <br />
          508A
        </div>
      </div>
      <div className="safe-pipeline">
        {["DEVICE", "GATEWAY", "DASHBOARD"].map((step, i) => (
          <div key={step}>
            <i />
            <span>0{i + 1}</span>
            {step}
          </div>
        ))}
      </div>
      <div className="safe-event">
        <span>EVENT_01AF</span>
        <b>VERIFIED</b>
        <small>signature chain intact</small>
      </div>
    </div>
  )
}

function CausalGraphic() {
  const workflow = ["SENSOR", "FAULT", "COMPARE", "MINIMIZE", "REGRESS"]

  return (
    <div
      className="causal-graphic"
      aria-label="Fault-injection experiment comparing baseline and guarded controller paths"
    >
      <div className="causal-scope">
        <span>RECORDED · 1200 ms · 70 mm · sample age 600 ms</span>
        <svg
          viewBox="0 0 600 110"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="scope-grid"
            d="M0 28H600M0 56H600M0 84H600M100 0V110M200 0V110M300 0V110M400 0V110M500 0V110"
          />
          <path
            className="scope-trace"
            d="M0 69C35 69 35 49 70 49S105 68 140 68s35-18 70-18 34 17 68 17 18-46 47-46 24 70 53 70 27-42 58-42 34 18 68 18 38-17 96-17"
          />
        </svg>
        <i className="fault-line" />
        <b>FAULT INJECTED</b>
      </div>
      <div className="controller-paths">
        <div>
          <span>BASELINE</span>
          <i />
          <b>PULSE</b>
          <em>FAULT PATH</em>
        </div>
        <div className="guarded">
          <span>GUARDED</span>
          <i />
          <b>HOLD</b>
          <em>stale sample rejected</em>
        </div>
      </div>
      <div
        className="causal-workflow"
        aria-label="Sensor input, fault injection, controller comparison, failure minimization, regression testing"
      >
        {workflow.map((step, index) => (
          <span key={step}>
            <i />
            <b>0{index + 1}</b>
            {step}
          </span>
        ))}
      </div>
      <div className="divergence">
        <span>CONTROLLER DIVERGENCE</span>
        <b>DETECTED</b>
        <i />
      </div>
    </div>
  )
}

function Projects() {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    const open = (e: Event) => setSelected((e as CustomEvent<string>).detail)
    window.addEventListener("open-proof", open)
    return () => window.removeEventListener("open-proof", open)
  }, [])

  const graphics = [AeroGraphic, JockyGraphic, SafeGraphic, CausalGraphic]

  return (
    <section className="section projects" id="work">
      <SectionLabel number="03">Projects / Achievements</SectionLabel>
      <div className="work-heading">
        <h2>
          Four builds. <em>Real constraints.</em>
        </h2>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => {
          const Graphic = graphics[i]
          return (
            <article className={`project project-${p.slug}`} key={p.slug}>
              <div className="project-topline">
                <span>
                  0{i + 1} / {p.status}
                </span>
              </div>
              <Graphic />
              <div className="project-copy">
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div className="metrics">
                  {p.metrics.map((m) => (
                    <div key={m}>
                      <b>{m}</b>
                    </div>
                  ))}
                </div>
                <p>{p.limitation}</p>
                <div className="tech-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {p.repoUrl ? (
                  <a className="project-link" href={p.repoUrl}>
                    Source ↗
                  </a>
                ) : (
                  <p>Repository private, available on request</p>
                )}
                <button
                  className="project-link"
                  onClick={(e) => {
                    e.currentTarget.focus()
                    setSelected(p.slug)
                  }}
                >
                  Proof / Case study →
                </button>
                <details>
                  <summary>Key code</summary>
                  {p.repoUrl ? (
                    <a href={p.snippets[0].url}>{p.snippets[0].path}</a>
                  ) : (
                    <span>{p.snippets[0].path}</span>
                  )}
                  <pre>
                    <code>{p.snippets[0].code}</code>
                  </pre>
                  <CopyCode code={p.snippets[0].code} />
                </details>
              </div>
            </article>
          )
        })}
      </div>
      {selected && (
        <ProjectDetail slug={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function CopyCode({ code }: { code: string }) {
  const [label, setLabel] = useState("Copy code")
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setLabel("Copied")
        } catch {
          setLabel("Select code to copy")
        }
      }}
    >
      {label}
    </button>
  )
}

function Terminal() {
  const [history, setHistory] = useState<{
    command?: string
    lines: string[]
  }[]>([{ lines: terminalResponses.boot }])

  const [value, setValue] = useState("")

  const commands = useRef<string[]>([])

  const cursor = useRef(0)

  const outputRef = useRef<HTMLDivElement>(null)

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase()

    if (!command) return

    commands.current.push(command)
    cursor.current = commands.current.length

    if (command.startsWith("proof ")) {
      document.getElementById("work")?.scrollIntoView()
      const slug = command.slice(6)
      if (projects.some((p) => p.slug === slug))
        window.dispatchEvent(new CustomEvent("open-proof", { detail: slug }))
    }

    terminalResponses.links = [
      "GitHub: https://github.com/abhishekkr10",
      "Email: abhishekkrsingh2345@gmail.com",
      "LinkedIn: https://www.linkedin.com/in/abhishekkumarsingh100/",
    ]

    terminalResponses.projects = projects.map((p) => `${p.name}: ${p.summary}`)

    for (const p of projects)
      if (p.slug !== "aeronode")
        terminalResponses[p.slug] = [p.status, p.summary, ...p.metrics]

    if (command.startsWith("proof "))
      terminalResponses[command] = [projects.some(p=>p.slug===command.slice(6)) ? "Opening project proof." : "Unknown project. Try proof aeronode, proof jocky, proof safetrack or proof causalbench."]

    if (command === "clear") setHistory([])
    else
      setHistory((prev) => [
        ...prev,
        {
          command,
          lines: terminalResponses[command] || [
            `command not found: ${command}`,
            "Type help for available commands.",
          ],
        },
      ])

    setValue("")
  }

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [history])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(value)
  }

  return (
    <section className="section uart" id="uart">
      <SectionLabel number="04">CREATIVE FEATURE</SectionLabel>
      <div className="uart-intro">
        <h2>
          Boot my brain <em>over UART.</em>
        </h2>
        <p>
          A browsable serial interface to projects, tools and recorded
          experiments. No hardware required. Try typing help.
        </p>
      </div>
      <div className="command-row">
        <span>Try a command</span>
        <div>
          {commandHints.map((command) => (
            <button key={command} onClick={() => run(command)}>
              {command}
            </button>
          ))}
        </div>
      </div>
      <div className="terminal-shell">
        <div className="terminal-toolbar">
          <div>
            <span className="status-dot" />
            UART-01 / 115200 BAUD
          </div>
          <span>8–N–1</span>
          <span className="terminal-live">● DEMO</span>
        </div>
        <div className="terminal-body">
          <aside>
            <div className="terminal-board">
              <span>ESP32-S3</span>
              <i />
              <i />
              <b>USB</b>
              <small>BRIDGE</small>
            </div>
            <dl>
              <dt>PORT</dt>
              <dd>/dev/ttyUSB0</dd>
              <dt>STATUS</dt>
              <dd>DEMO</dd>
              <dt>UPTIME</dt>
              <dd>—</dd>
            </dl>
          </aside>
          <div className="terminal-console">
            <div
              className="terminal-output"
              role="log"
              tabIndex={0}
              aria-live="polite"
              ref={outputRef}
            >
              {history.map((entry, i) => (
                <div className="terminal-entry" key={i}>
                  {entry.command && (
                    <div className="terminal-command">
                      <span>aks@frontier:~$</span> {entry.command}
                    </div>
                  )}
                  {entry.lines.map((line, j) => (
                    <div
                      className={
                        line.includes("RECORDED") || line.includes("SIMULATED")
                          ? "output-label"
                          : ""
                      }
                      key={j}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <form onSubmit={submit} className="terminal-input">
              <label htmlFor="command">aks@frontier:~$</label>
              <input
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault()
                    cursor.current = Math.max(
                      0,
                      Math.min(
                        commands.current.length,
                        cursor.current + (e.key === "ArrowUp" ? -1 : 1),
                      ),
                    )
                    setValue(commands.current[cursor.current] || "")
                  }
                  if (e.key === "Tab") {
                    e.preventDefault()
                    const matches = commandHints.filter((c) =>
                      c.startsWith(value),
                    )
                    if (matches.length === 1) setValue(matches[0])
                  }
                }}
                placeholder="type help and press Enter"
                id="command"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal command"
              />
              <span className="terminal-cursor" />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-circuit" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <SectionLabel number="05">CONTACT</SectionLabel>
      <h2>
        Let’s build something
        <br />
        <em>that holds up.</em>
      </h2>
      <p>Open to embedded systems, Edge AI and IoT opportunities.</p>
      <div className="contact-actions">
        <a href="mailto:abhishekkrsingh2345@gmail.com">Email</a> ·{" "}
        <a href="https://github.com/abhishekkr10">GitHub</a> ·{" "}
        <a href="https://www.linkedin.com/in/abhishekkumarsingh100/">
          LinkedIn
        </a>{" "}
        · <a href="/Abhishek-Kumar-Singh-Resume.pdf">Résumé</a>
      </div>
      <div className="contact-note">
        <span className="status-dot" />
        <b>CONTACT CHANNELS</b>
        <span>Get in touch for internships and engineering opportunities.</span>
      </div>
      <footer>
        <div className="brand">
          <span className="brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>
            AKS<small>/ THE ENGINEERING FRONTIER</small>
          </span>
        </div>
        <span>Abhishek Kumar Singh · 2026</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  )
}

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      })
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return

    const targets = document.querySelectorAll<HTMLElement>(
      ".section-label, .about-grid, .philosophy article, .section-intro, .capability-list article, .work-heading, .project, .uart-intro, .terminal-shell, .contact > h2, .contact > p, .contact-note",
    )

    targets.forEach((target) => target.classList.add("scroll-reveal"))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <div className="progress" ref={progressRef} />
      <MotionLayer/><div className="ambient-grid" aria-hidden="true" />
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Capabilities />
        <Projects />
        <Terminal />
        <Contact />
      </main>
    </div>
  )
}
