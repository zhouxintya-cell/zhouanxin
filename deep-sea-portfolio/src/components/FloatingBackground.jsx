import { useEffect, useMemo, useState } from 'react'

const FloatingBackground = ({ darkMode }) => {
  const [scrollY, setScrollY] = useState(0)

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, index) => ({
        id: index,
        size: Math.random() * 36 + 14,
        left: Math.random() * 100,
        baseTop: Math.random() * 900 - 120,
        duration: Math.random() * 12 + 14,
        delay: Math.random() * 14,
        depth: Math.random() * 0.6 + 0.25,
        type: Math.random() > 0.55 ? 'glow' : 'bubble',
      })),
    []
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, index) => ({
        id: index,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 4,
      })),
    []
  )

  const starfish = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        id: index,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.3 + 0.6,
      })),
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 transition-colors duration-[2000ms] ease-out ${
          darkMode
            ? 'bg-gradient-to-b from-[#020514] via-[#02142A] to-[#01050B]'
            : 'bg-gradient-to-b from-[#c2f3ff] via-[#0b3d91] to-[#031b3f]'
        }`}
      />
      <div className="absolute inset-0 ocean-overlay" />
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`particle ${
              particle.type === 'bubble'
                ? 'bubble animate-bubble-rise'
                : 'glow-orb animate-float-medium'
            }`}
            style={{
              left: `${particle.left}%`,
              width: particle.size,
              height: particle.size,
              top: particle.baseTop + scrollY * particle.depth * 0.06,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.type === 'bubble' ? 0.55 : 0.4 + particle.depth * 0.5,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        <div
          className={`floating-jelly ${darkMode ? 'jelly-night' : 'jelly-day'} jelly-one animate-jelly-pulse`}
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        />
        <div
          className={`floating-jelly ${darkMode ? 'jelly-night' : 'jelly-day'} jelly-two animate-jelly-pulse`}
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        />
        <div
          className={`floating-jelly ${darkMode ? 'jelly-night' : 'jelly-day'} jelly-three animate-jelly-pulse`}
          style={{ transform: `translateY(${scrollY * 0.06}px)` }}
        />
      </div>
      <div
        className={`absolute -inset-x-20 top-[-12%] h-[48vh] ${
          darkMode ? 'waves waves-night' : 'waves'
        }`}
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      {darkMode && (
        <>
          <div className="starfield">
            {stars.map((star) => (
              <span
                key={star.id}
                className="animate-star-twinkle"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: star.size,
                  height: star.size,
                  animationDuration: `${star.duration}s`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>
          <div className="starfish-lounge">
            {starfish.map((fish) => (
              <div
                key={fish.id}
                className="starfish"
                style={{ animationDelay: `${fish.delay}s`, opacity: fish.opacity }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FloatingBackground
