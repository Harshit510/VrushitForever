import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Countdown from 'react-countdown'
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Gift,
  Heart,
  MapPin,
  Music,
  Navigation,
  PartyPopper,
  Phone,
  Sparkles,
} from 'lucide-react'
import './App.css'
import proposalImage from './assets/img_1.png'

const mapLink =
  'https://www.google.com/maps/search/?api=1&query=Janki%20Resort%20NH%2048%20near%20Kharera%20River%20Vaghaldhara%20Gujarat%20396375'

const invitedBy = [
  'Late Shri Shantilal Chunilal Rana & Late Smt. Nirahen Shantilal Rana',
  'Bhikhubhai Shantilal Rana & Anitaben Bhikhubhai Rana',
  'Parth Rajendra Rana & Mansi Parth Rana',
]

const ceremonyDetails = [
  {
    icon: CalendarDays,
    label: 'Date',
    title: 'Friday, 24 July 2026',
    note: 'A warm engagement evening where our love story becomes ever after.',
  },
  {
    icon: Clock,
    label: 'Time',
    title: '5:00 PM onwards',
    note: 'Arrive a little early for greetings before the couple entry begins.',
  },
  {
    icon: MapPin,
    label: 'Venue',
    title: 'Janki Resort',
    note: 'NH 48, near Kharera River, Vaghaldhara, Gujarat 396375.',
  },
  {
    icon: Phone,
    label: 'Contact',
    title: '+91 97258 43015',
    note: 'Bhikhubhai Rana will help with arrival and ceremony guidance.',
  },
]

const timelineEvents = [
  {
    icon: Sparkles,
    time: '5:00 PM',
    title: 'Couple Entry',
    text: 'Harshit and Dr. Vrushika make their entry as the evening opens with family cheers.',
  },
  {
    icon: PartyPopper,
    time: 'After entry',
    title: 'Games & Activities',
    text: 'Fun games for the main couple, cousins, families, and all guests keep everyone involved.',
  },
  {
    icon: Gift,
    time: 'With friends',
    title: 'Friend ni Game',
    text: 'A dedicated friends game brings playful moments, inside jokes, and loud celebration energy.',
  },
  {
    icon: Music,
    time: 'All evening',
    title: 'Activities & Dances',
    text: 'Activities continue along with dance performances, music, blessings, dinner, and memories.',
  },
]

// Countdown renderer
const CountdownRenderer = ({ days, hours, minutes, seconds }: any) => (
  <div className="countdown-grid">
    <div className="countdown-item">
      <motion.div
        key={days}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        className="countdown-value"
      >
        {String(days).padStart(2, '0')}
      </motion.div>
      <span>Days</span>
    </div>
    <div className="countdown-item">
      <motion.div
        key={hours}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        className="countdown-value"
      >
        {String(hours).padStart(2, '0')}
      </motion.div>
      <span>Hours</span>
    </div>
    <div className="countdown-item">
      <motion.div
        key={minutes}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        className="countdown-value"
      >
        {String(minutes).padStart(2, '0')}
      </motion.div>
      <span>Minutes</span>
    </div>
    <div className="countdown-item">
      <motion.div
        key={seconds}
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        className="countdown-value"
      >
        {String(seconds).padStart(2, '0')}
      </motion.div>
      <span>Seconds</span>
    </div>
  </div>
)

function FloatingHearts() {
  const [hearts, setHearts] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, Date.now()])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {hearts.map((id) => (
        <motion.div
          key={id}
          className="floating-heart"
          initial={{ y: 0, opacity: 1, x: Math.random() * 100 - 50 }}
          animate={{ y: -400, opacity: 0 }}
          transition={{ duration: 4 }}
          onAnimationComplete={() => setHearts((prev) => prev.filter((h) => h !== id))}
        >
          ❤️
        </motion.div>
      ))}
    </>
  )
}

function App() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main>
      <nav className="luxury-nav" aria-label="Main navigation">
        <motion.a className="nav-brand" href="#home" aria-label="Engagement home">
          <span className="logo-mark" aria-hidden="true">
            <span className="logo-monogram">
              <span className="logo-letter">H</span>
              <span className="logo-amp">&amp;</span>
              <span className="logo-letter">V</span>
            </span>
          </span>
        </motion.a>
        <div className="nav-links">
          <a href="#details">Details</a>
          <a href="#experience">Experience</a>
          <a href="#venue">Venue</a>
        </div>
        <p className="nav-hashtag">#VrushitForever</p>
      </nav>

      <section className="hero-fullscreen" id="home">
        <div className="hero-background">
          <div className="animated-bg">
            <div className="bg-glow glow-1" />
            <div className="bg-glow glow-2" />
            <div className="bg-glow glow-3" />
            <div className="noise-texture" />
          </div>

          <FloatingHearts />
        </div>

        <div className="hero-content">
          <motion.div
            className="couple-name-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.h1
              className="couple-name"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Harshit Rana
            </motion.h1>

            <motion.div
              className="ring-divider"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💍
            </motion.div>

            <motion.h1
              className="couple-name"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Dr. Vrushika Rana
            </motion.h1>
          </motion.div>

          <motion.p
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Forever Begins
          </motion.p>

          <motion.div
            className="date-badge"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            24 July 2026
          </motion.div>

          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.04}>
            <motion.div
              className="proposal-container"
              style={{
                x: mousePosition.x * 0.3,
                y: mousePosition.y * 0.3,
              }}
            >
              <div className="image-frame">
                <img src={proposalImage} alt="Harshit & Vrushika" />
                <div className="frame-glow" />
                <div className="sparkle sparkle-1" />
                <div className="sparkle sparkle-2" />
                <div className="sparkle sparkle-3" />
              </div>
            </motion.div>
          </Tilt>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to Explore</span>
            <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </div>

        <div className="couple-initials-watermark">H ❤ V</div>
      </section>


      <motion.section className="countdown-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="countdown-container">
          <h2>Countdown to Forever</h2>
          <Countdown date={new Date('2026-07-24T17:00:00').getTime()} renderer={CountdownRenderer} />
        </div>
      </motion.section>

      <motion.section className="details-section" id="details" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Ceremony Details</h2>
          <p>Every moment, perfectly planned</p>
        </div>

        <div className="glass-cards-grid">
          {ceremonyDetails.map((detail, index) => {
            const Icon = detail.icon
            return (
              <motion.div
                key={detail.label}
                className="glass-card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 40px 60px rgba(201, 154, 61, 0.3)' }}
              >
                <div className="card-icon">
                  <Icon size={32} />
                </div>
                <h3>{detail.label}</h3>
                <p className="card-title">{detail.title}</p>
                <span className="card-note">{detail.note}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      <motion.section className="family-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Invited With Love</h2>
          <p>By the Rana family</p>
        </div>

        <div className="family-cards">
          {invitedBy.map((host, index) => (
            <motion.div
              key={host}
              className="family-card"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
            >
              <Heart size={24} />
              <p>{host}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="timeline-section" id="experience" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Experience Timeline</h2>
          <p>A journey of moments</p>
        </div>

        <div className="timeline-grid">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={event.title}
                className={`timeline-card ${activeEvent === index ? 'active' : ''}`}
                onClick={() => setActiveEvent(index)}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="timeline-icon">
                  <Icon size={28} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-time">{event.time}</span>
                  <h3>{event.title}</h3>
                  <p>{event.text}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      <motion.section className="venue-section" id="venue" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Venue</h2>
          <p>Janki Resort, Vaghaldhara</p>
        </div>

        <motion.div className="venue-card" whileHover={{ scale: 1.02 }}>
          <div className="venue-info">
            <div>
              <h3>Janki Resort</h3>
              <p>NH 48, near Kharera River</p>
              <p>Vaghaldhara, Gujarat 396375</p>
              <div className="venue-contact">
                <Phone size={18} />
                <span>+91 97258 43015 (Bhikhubhai Rana)</span>
              </div>
            </div>
            <motion.a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Navigation size={18} />
              Open Map
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="closing-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <motion.div className="closing-content" initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
          <p className="closing-quote">"Every love story is beautiful, but ours is our favourite."</p>
          <h2>Harshit ❤ Vrushika</h2>
          <p className="closing-text">See You Soon</p>
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            ✨
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  )
}

export default App
