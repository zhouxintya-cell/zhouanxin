import { useEffect, useId, useMemo, useRef, useState } from 'react'
import FloatingBackground from './components/FloatingBackground'
import MiniGame from './components/MiniGame'
import './App.css'

const ambientUrl =
  'https://cdn.pixabay.com/download/audio/2021/09/01/audio_4e2844cc89.mp3?filename=underwater-deep-sea-ambient-6727.mp3'

const ShellIcon = ({ className }) => {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="32" cy="32" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffbccd" />
          <stop offset="0.5" stopColor="#ff7b89" />
          <stop offset="1" stopColor="#6f2b4a" />
        </radialGradient>
      </defs>
      <path
        d="M12 28c2-12 12-20 20-20s18 8 20 20c1.6 9.6-4.2 18-20 28-15.8-10-21.6-18.4-20-28Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}

const SubmarineIcon = ({ className }) => (
  <svg viewBox="0 0 72 40" className={className} aria-hidden="true">
    <g fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 20c0-8 10-14 26-14s26 6 26 14-10 14-26 14S10 28 10 20Z" fill="rgba(62,230,255,0.28)" stroke="rgba(62,230,255,0.75)" />
      <path d="M30 6h12l4-6" stroke="rgba(194,243,255,0.8)" />
      <circle cx="24" cy="20" r="5" fill="rgba(255,255,255,0.45)" stroke="rgba(62,230,255,0.9)" />
      <circle cx="36" cy="20" r="5" fill="rgba(255,255,255,0.45)" stroke="rgba(62,230,255,0.9)" />
      <circle cx="48" cy="20" r="5" fill="rgba(255,255,255,0.45)" stroke="rgba(62,230,255,0.9)" />
      <path d="M58 16h6m-6 8h6" stroke="rgba(194,243,255,0.6)" />
    </g>
  </svg>
)

const CompassIcon = ({ className }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="28" fill="rgba(62,230,255,0.25)" stroke="rgba(62,230,255,0.7)" strokeWidth="2" />
    <path d="M32 8 40 32l-24 8z" fill="rgba(255,123,137,0.75)" />
    <circle cx="32" cy="32" r="4" fill="#031b3f" />
  </svg>
)

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [audioOn, setAudioOn] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [bottleOpen, setBottleOpen] = useState(false)
  const [messageSent, setMessageSent] = useState(false)
  const [senderName, setSenderName] = useState('sea friend')
  const audioRef = useRef(null)
  const messageTimerRef = useRef(null)
  const [crabHeight] = useState(() => Math.random() * 25 + 8)
  const [crabDelay] = useState(() => -Math.random() * 24)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(
    () => () => {
      audioRef.current?.pause()
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current)
      }
    },
    []
  )

  const aboutCards = useMemo(
    () => [
      {
        title: 'Dream Cartographer',
        body:
          'Mapping whispered ideas into shimmering interfaces. I listen, I sketch tides of emotion, then I sculpt them into luminous journeys.',
        icon: 'shell',
        accent: 'Story-first design rituals',
      },
      {
        title: 'Submerged Play',
        body:
          'I choreograph motion like sea grass—gentle, purposeful, delightfully unexpected. From micro interactions to choreographed scrolls, play is my oxygen.',
        icon: 'submarine',
        accent: 'Motion direction & creative coding',
      },
      {
        title: 'Compass of Care',
        body:
          'People first, pixels second. Inclusive design, calm onboarding, responsive touches, and a sprinkle of wonder for every device.',
        icon: 'compass',
        accent: 'Accessible experiences across every tide',
      },
    ],
    []
  )

  const projects = useMemo(
    () => [
      {
        id: 'tidal-bloom',
        title: 'Tidal Bloom',
        year: '2025',
        short: 'An interactive album drop that blossoms with every beat.',
        subtitle: 'Immersive audiovisual launch for a neo-soul collective.',
        description:
          'Built with WebGL corals that react to live sound analysis, Tidal Bloom invites visitors to “water” each track. Listeners reveal hidden verses by guiding currents through generative flora.',
        tags: ['WebGL', 'Creative Direction', 'Real-time Audio'],
        link: 'https://zhouanxin.com/tidal-bloom',
      },
      {
        id: 'luminous-letters',
        title: 'Luminous Letters',
        year: '2024',
        short: 'A storytelling microsite for a climate poetry series.',
        subtitle: 'Poems unfurl as bioluminescent scripts that respond to reader touch.',
        description:
          'Each stanza reacts to scroll depth, revealing gradients of optimism and grief. I paired editorial art direction with delicate typographic shaders to honor each poet’s cadence.',
        tags: ['Art Direction', 'Typographic Systems', 'Scroll Theatre'],
        link: 'https://zhouanxin.com/luminous-letters',
      },
      {
        id: 'tideline-lab',
        title: 'Tideline Lab',
        year: '2023',
        short: 'A research archive that feels like diving into a living notebook.',
        subtitle: 'Design research hub for speculative coastal technology.',
        description:
          'Researchers collect field notes beneath the waves. I designed an interface where every data point is a glowing relic, filterable via tactile currents. Built with React, Tailwind, and a custom canvas renderer.',
        tags: ['React', 'Data Narrative', 'Creative Research'],
        link: 'https://zhouanxin.com/tideline-lab',
      },
      {
        id: 'moonlit-market',
        title: 'Moonlit Market',
        year: '2022',
        short: 'An enchanted marketplace inspired by tide pools and indie artisans.',
        subtitle: 'Commerce reimagined with storytelling-driven product reveals.',
        description:
          'Visitors drift through curated stalls illuminated by moon phases. I wove in subtle game loops, turning browsing into a slow ritual of discovery with ambient storytelling.',
        tags: ['Shopify', 'Narrative UX', 'Ambient Sound'],
        link: 'https://zhouanxin.com/moonlit-market',
      },
    ],
    []
  )

  const renderIcon = (key) => {
    switch (key) {
      case 'shell':
        return <ShellIcon className="h-14 w-14 drop-shadow-[0_0_18px_rgba(255,123,137,0.45)]" />
      case 'submarine':
        return <SubmarineIcon className="h-16 w-16" />
      case 'compass':
        return <CompassIcon className="h-14 w-14" />
      default:
        return null
    }
  }

  const handleAudioToggle = () => {
    let audio = audioRef.current
    if (!audio) {
      audio = new Audio(ambientUrl)
      audio.loop = true
      audio.volume = 0.28
      audioRef.current = audio
    }

    if (audioOn) {
      audio.pause()
      setAudioOn(false)
    } else {
      audio
        .play()
        .then(() => setAudioOn(true))
        .catch(() => setAudioOn(false))
    }
  }

  const handleBottleToggle = () => {
    if (!bottleOpen) {
      setBottleOpen(true)
    }
  }

  const handleBottleKeyDown = (event) => {
    if (!bottleOpen && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      setBottleOpen(true)
    }
  }

  const handleContactSubmit = (event) => {
    event.preventDefault()
    setMessageSent(true)
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim() || 'sea friend'
    setSenderName(name)
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current)
    }
    messageTimerRef.current = window.setTimeout(() => {
      setMessageSent(false)
      setBottleOpen(false)
      messageTimerRef.current = null
    }, 5500)
    form.reset()
  }

  return (
    <div className="relative overflow-x-hidden">
      <FloatingBackground darkMode={darkMode} />
      <div
        className="pixel-crab animate-crab-walk"
        style={{ bottom: `${crabHeight}%`, animationDelay: `${crabDelay}s` }}
        aria-hidden="true"
      />
      <header className="fixed left-1/2 top-6 z-40 w-full max-w-5xl -translate-x-1/2 px-6">
        <div className="flex flex-col gap-4 rounded-[40px] border border-white/10 bg-[#031b3f]/40 px-5 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#010918]/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-xs uppercase tracking-[0.6em] text-sunlit-water/80">
              The Deep Sea Portfolio
            </span>
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                className={`toggle-pill ${darkMode ? 'active' : ''}`}
                aria-pressed={darkMode}
              >
                {darkMode ? 'Midnight tide' : 'Dawn tide'}
              </button>
              <button
                type="button"
                onClick={handleAudioToggle}
                className={`toggle-pill ${audioOn ? 'active' : ''}`}
                aria-pressed={audioOn}
              >
                {audioOn ? 'Hush sea' : 'Ocean hum'}
              </button>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-2 text-xs sm:justify-start">
            <a href="#intro" className="nav-button">
              Surface
            </a>
            <a href="#about" className="nav-button">
              Currents
            </a>
            <a href="#reef" className="nav-button">
              Reef
            </a>
            <a href="#playground" className="nav-button">
              Playground
            </a>
            <a href="#contact" className="nav-button">
              Bottle
            </a>
          </nav>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className={`toggle-pill ${darkMode ? 'active' : ''}`}
              aria-pressed={darkMode}
            >
              {darkMode ? 'Midnight tide' : 'Dawn tide'}
            </button>
            <button
              type="button"
              onClick={handleAudioToggle}
              className={`toggle-pill ${audioOn ? 'active' : ''}`}
              aria-pressed={audioOn}
            >
              {audioOn ? 'Hush sea' : 'Ocean hum'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col gap-44 pb-32 pt-28 text-sunlit-water">
        <section id="intro" className="relative flex min-h-screen items-center justify-center px-6 pt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/10 via-transparent to-transparent dark:from-white/5" />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
            <span className="tagline">A Creator From the Abyss</span>
            <h1 className="jelly-name">
              Zhou Anxin
              <span className="text-base font-mono uppercase tracking-[0.4em] text-sunlit-water/70">designs</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-sunlit-water/85 md:text-lg">
              I craft immersive experiences for brands, artists, and dreamers who crave wonder. Hover over the word{' '}
              <span className="ripple-word">alive</span> or the word <span className="ripple-word">tender</span> and feel how every detail ripples. Scroll down—let&apos;s dive deeper.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="text-xs font-mono uppercase tracking-[0.4em] text-sunlit-water/60">Scroll to dive</div>
              <div className="h-20 w-0.5 rounded-full bg-gradient-to-b from-transparent via-sunlit-water/60 to-transparent animate-float-slow" />
            </div>
          </div>
        </section>

        <section id="about" className="relative px-6">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sunlit-water/10 via-transparent to-transparent dark:from-sunlit-water/5" />
          <div className="mx-auto flex max-w-5xl flex-col gap-12">
            <div className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.5em] text-sunlit-water/65">Who swims behind the pixels</p>
              <h2 className="mt-4 text-4xl font-display text-sunlit-water md:text-5xl">About the explorer</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {aboutCards.map((card) => (
                <div key={card.title} className="bubble-card p-8 text-[#031b3f] dark:text-sunlit-water/85">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                      <div className="animate-float-medium">{renderIcon(card.icon)}</div>
                    </div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-[#031b3f]/60 dark:text-sunlit-water/60">
                      {card.accent}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display text-[#031b3f] dark:text-sunlit-water">{card.title}</h3>
                  <p className="mt-4 leading-relaxed text-[#031b3f]/85 dark:text-sunlit-water/80">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reef" className="relative px-6">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#031b3f]/20 to-[#031b3f]/40 dark:via-[#010918]/60" />
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.45em] text-sunlit-water/65">Interactive coral reef</p>
              <h2 className="text-4xl font-display md:text-5xl">Projects that glow under pressure</h2>
              <p className="max-w-3xl text-sunlit-water/80">
                Each coral is a story. Hover to wake it, click to dive into the tidepool of process notes, tools, and secret sketches.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="coral-node w-64 text-left text-[#031b3f] shadow-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-glow-cyan/70"
                >
                  <span>{project.year}</span>
                  <h3 className="mt-6 font-display text-2xl text-sunlit-water drop-shadow-[0_6px_18px_rgba(3,27,63,0.35)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-sunlit-water/85">{project.short}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="playground" className="relative px-6">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#010918]/50 to-[#01040a]/80" />
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 text-center">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.5em] text-sunlit-water/60">Mini game</p>
              <h2 className="text-4xl font-display md:text-5xl">Collect the glowing pearls</h2>
              <p className="text-sunlit-water/80 md:text-lg">
                Guide the tiny diver through the deep. Gather three pearls and a secret tidepool opens just for you.
              </p>
            </div>
            <MiniGame darkMode={darkMode} onUnlock={() => setSecretUnlocked(true)} unlocked={secretUnlocked} />
            {secretUnlocked && (
              <a
                href="https://zhouanxin.com/secret-tide"
                target="_blank"
                rel="noreferrer"
                className="secret-link"
              >
                Secret Project Tide <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </section>

        <section id="contact" className="relative px-6">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#01040a]/80 to-[#00030a]" />
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.45em] text-sunlit-water/60">Message in a bottle</p>
              <h2 className="text-4xl font-display md:text-5xl">Send a note through the current</h2>
              <p className="max-w-3xl text-sunlit-water/80">
                Tap the bottle to uncork it. Your message drifts gently to my studio on the shore.
              </p>
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={bottleOpen}
              onClick={handleBottleToggle}
              onKeyDown={handleBottleKeyDown}
              className={`message-bottle ${bottleOpen ? 'open' : ''}`}
            >
              {bottleOpen ? (
                <div className="bottle-form" onClick={(event) => event.stopPropagation()}>
                  {messageSent ? (
                    <div className="flex flex-col items-center gap-4 text-center text-[#031b3f] dark:text-sunlit-water/80">
                      <p className="font-display text-2xl">Message drifting, {senderName}!</p>
                      <p className="max-w-xs text-sm leading-relaxed">
                        I&apos;ll write back once the tide delivers your words. Watch the stars while you wait.
                      </p>
                      <button
                        type="button"
                        onClick={() => setBottleOpen(false)}
                        className="mt-4 rounded-full border border-sunlit-water/40 px-5 py-2 font-mono text-xs uppercase tracking-[0.3em] text-[#031b3f] transition hover:bg-sunlit-water/20 dark:text-sunlit-water"
                      >
                        Cork it gently
                      </button>
                    </div>
                  ) : (
                    <form className="flex flex-col gap-4 text-left" onSubmit={handleContactSubmit}>
                      <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#031b3f]/70 dark:text-sunlit-water/70">
                        Name
                        <input
                          type="text"
                          name="name"
                          placeholder="Your tide name"
                          className="rounded-xl border border-sunlit-water/30 bg-white/70 px-4 py-2 font-body text-base text-[#031b3f] placeholder:text-[#031b3f]/40 focus:border-glow-cyan focus:outline-none focus:ring-2 focus:ring-glow-cyan/40 dark:border-glow-cyan/30 dark:bg-[#020c1b]/60 dark:text-sunlit-water"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#031b3f]/70 dark:text-sunlit-water/70">
                        Email
                        <input
                          type="email"
                          name="email"
                          placeholder="Where the tide replies"
                          className="rounded-xl border border-sunlit-water/30 bg-white/70 px-4 py-2 font-body text-base text-[#031b3f] placeholder:text-[#031b3f]/40 focus:border-glow-cyan focus:outline-none focus:ring-2 focus:ring-glow-cyan/40 dark:border-glow-cyan/30 dark:bg-[#020c1b]/60 dark:text-sunlit-water"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#031b3f]/70 dark:text-sunlit-water/70">
                        Message
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Tell me about the adventure we&apos;ll build."
                          className="rounded-2xl border border-sunlit-water/30 bg-white/70 px-4 py-3 font-body text-base text-[#031b3f] placeholder:text-[#031b3f]/40 focus:border-glow-cyan focus:outline-none focus:ring-2 focus:ring-glow-cyan/40 dark:border-glow-cyan/30 dark:bg-[#020c1b]/60 dark:text-sunlit-water"
                          required
                        />
                      </label>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="submit"
                          className="secret-link justify-center text-xs tracking-[0.35em]"
                        >
                          Send ripple
                        </button>
                        <button
                          type="button"
                          onClick={() => setBottleOpen(false)}
                          className="text-xs font-mono uppercase tracking-[0.3em] text-[#031b3f]/60 transition hover:text-[#031b3f] dark:text-sunlit-water/70 dark:hover:text-sunlit-water"
                        >
                          Close bottle
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="bottle-form is-hidden text-center text-[#031b3f] dark:text-sunlit-water/80">
                  <p className="font-display text-2xl">Tap to uncork</p>
                  <p className="mt-4 text-sm">There&apos;s a letter waiting for your words.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#010918]/80 px-6 py-10 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-glow-cyan/40 bg-gradient-to-br from-[#061c3f]/90 via-[#031026]/95 to-[#010713]/95 p-10 text-left text-sunlit-water shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 text-sunlit-water/70 transition hover:text-sunlit-water"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project"
            >
              ×
            </button>
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-sunlit-water/70">{selectedProject.year} project</p>
            <h3 className="mt-4 text-4xl font-display">{selectedProject.title}</h3>
            <p className="mt-4 text-sunlit-water/80 md:text-lg">{selectedProject.subtitle}</p>
            <p className="mt-6 leading-relaxed text-sunlit-water/80">{selectedProject.description}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {selectedProject.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-glow-cyan/40 bg-glow-cyan/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-sunlit-water/85"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={selectedProject.link}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.4em] text-glow-cyan transition hover:text-sunlit-water"
            >
              Visit tidepool <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
