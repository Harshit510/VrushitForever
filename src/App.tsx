import { useState, useEffect } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
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
import proposalImage from './assets/f_1.png'
import headerLogo from './assets/logo-transparent.png'

const mapLink =
  'https://www.google.com/maps/search/?api=1&query=Janki%20Resort%20NH%2048%20near%20Kharera%20River%20Vaghaldhara%20Gujarat%20396375'

const invitedBySides = [
  {
    side: "Vrushika's Side",
    note: 'Rana Family',
    families: [
      'Late Shri Bhanabhai Ichharam Rana & Late Smt. Pushpaben Bhanabhai Rana',
      'Mr. Rupeshkumar Bhanabhai Rana & Mrs. Manishaben Rupeshkumar Rana',
      'Dax Rupeshkumar Rana',
    ],
  },
  {
    side: "Harshit's Side",
    note: 'Rana Family',
    families: [
      'Late Shri Shantilal Chunilal Rana & Late Smt. Niruben Shantilal Rana',
      'Mr. Bhikhubhai Shantilal Rana & Mrs. Anitaben Bhikhubhai Rana',
      'Mr. Parth Rajendra Rana & Mrs. Mansi Parth Rana',
    ],
  },
]

const ceremonyDetails = [
  {
    icon: CalendarDays,
    label: 'Date',
    title: 'Friday, 24 July 2026',
    highlights: ['Engagement Ceremony Day', 'A promise of forever'],
    note: 'A warm engagement evening where our love story becomes ever after.',
  },
  {
    icon: Clock,
    label: 'Time',
    title: '5:00 PM onwards',
    highlights: ['Evening celebration', 'Arrive a little early'],
    note: 'Arrive a little early for greetings before the couple entry begins.',
  },
  {
    icon: MapPin,
    label: 'Venue',
    title: 'Janki Resort',
    highlights: ['NH 48, near Kharera River', 'Vaghaldhara, Gujarat 396375'],
    note: 'NH 48, near Kharera River, Vaghaldhara, Gujarat 396375.',
  },
  {
    icon: Phone,
    label: 'Contact',
    title: 'Contact Persons',
    highlights: ['For arrivals and coordination'],
    contacts: [
      { name: 'Parth Rana', phone: '+91 9106110395' },
      { name: 'Dax Rana', phone: '+91 6353139644' },
    ],
    note: 'For arrivals and ceremony coordination.',
  },
]

const timelineEvents = [
  {
    icon: Sparkles,
    time: '5:00 PM',
    title: 'Couple Entry',
    text: 'Harshit and Vrushika make their entry as the evening opens with family cheers.',
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
    title: 'Friends Fiesta',
    text: 'A dedicated friends game brings playful moments, inside jokes, and loud celebration energy.',
  },
  {
    icon: Music,
    time: 'All evening',
    title: 'Dance, Garba & Dinner',
    text: 'Celebrate the evening with lively dance, traditional garba, delicious dinner, heartfelt blessings, and unforgettable memories.',
  },
]

const dressSuggestions = [
  'Women: Saree, lehenga, elegant engagement gown, pastel anarkali, sharara, or draped saree-gown in soft festive tones for a graceful modern look.',
  'Men: Kurta set, bandhagala, Jodhpuri, Indo-western, or a blazer-kurta combination in coordinated shades for a polished celebration style.',
  'Couples & Families: Coordinate your outfits for beautiful and timeless photographs.',
  'Friends & Guests: Festive traditional or smart ethnic fusion attire in soft, elegant colors.',
]

const dressPalette = [
  { name: 'Powder Blue', color: '#bfd6f2' },
  { name: 'Blush Pink', color: '#f6d2dc' },
  { name: 'Lilac Mist', color: '#ddd3f5' },
  { name: 'Sage Pastel', color: '#cfe2d4' },
  { name: 'Peach Cream', color: '#f7dfcd' },
  { name: 'Ivory Pearl', color: '#f8f3e9' },
]

const dressThemes = ['Traditional Elegance', 'Indo-Western Grace', 'Pastel Royal', 'Festive Chic']

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

const cardVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 180 : -180,
    rotate: dir > 0 ? 10 : -10,
    opacity: 0,
    scale: 0.93,
  }),
  center: {
    x: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -180 : 180,
    rotate: dir > 0 ? -10 : 10,
    opacity: 0,
    scale: 0.93,
  }),
}

function App() {
  const [activeEvent, setActiveEvent] = useState(0)
  const [swipeDir, setSwipeDir] = useState(1)
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

  const timelineLength = timelineEvents.length

  const jumpToTimelineCard = (index: number) => {
    setActiveEvent(index)
  }

  const paginateTimeline = (direction: number) => {
    setSwipeDir(direction)
    setActiveEvent((current) => (current + direction + timelineLength) % timelineLength)
  }

  const handleTimelineDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetX = info.offset.x
    const velocityX = info.velocity.x
    const swipePower = Math.abs(offsetX) * 0.45 + Math.abs(velocityX)

    if (swipePower < 220) return

    if (offsetX < 0) {
      paginateTimeline(1)
      return
    }

    paginateTimeline(-1)
  }

  return (
    <main>
      <nav className="luxury-nav" aria-label="Main navigation">
        <motion.a className="nav-brand" href="#home" aria-label="Engagement home">
          <span className="logo-mark" aria-hidden="true">
            <img className="logo-image" src={headerLogo} alt="H and V logo" />
          </span>
        </motion.a>
        <div className="nav-links">
          <a href="#details">Details</a>
          <a href="#dress">Dress</a>
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
        </div>

        <div className="hero-content">
          <FloatingHearts />
          <motion.div
            className="hero-ceremony-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span>The Promise Of Forever</span>
            <p>Engagement Ceremony</p>
          </motion.div>

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
              <motion.div
                className="proposal-hashtag-badge"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                #VrushitForever
              </motion.div>
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
            className="mobile-quick-nav-shell"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="mobile-quick-nav-label">Quick Jump</p>
            <p className="mobile-quick-nav-message">One tap to explore every celebration moment</p>
            <div className="mobile-quick-nav" aria-label="Mobile quick navigation">
              <a href="#details">
                <CalendarDays size={12} />
                <span>Details</span>
              </a>
              <a href="#dress">
                <Sparkles size={12} />
                <span>Dress</span>
              </a>
              <a href="#experience">
                <PartyPopper size={12} />
                <span>Moments</span>
              </a>
              <a href="#venue">
                <MapPin size={12} />
                <span>Venue</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            
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
            const hasContacts = Array.isArray((detail as any).contacts)
            const hasHighlights = Array.isArray((detail as any).highlights)
            return (
              <motion.div
                key={detail.label}
                className={`glass-card ${hasContacts ? 'contact-glass-card' : ''}`}
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
                {hasHighlights && (
                  <div className="card-highlights">
                    {(detail as any).highlights.map((item: string) => (
                      <span key={item} className="card-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {hasContacts && (
                  <div className="card-contact-list">
                    {(detail as any).contacts.map((contact: { name: string; phone: string }) => (
                      <div key={contact.phone} className="card-contact-row">
                        <span className="card-contact-name">{contact.name}</span>
                        <span className="card-contact-phone">{contact.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
                <span className="card-note">{detail.note}</span>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      <motion.section className="dress-section" id="dress" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Dress Inspiration</h2>
          <p>Look coordinated, festive, and photo-ready</p>
        </div>

        <div className="dress-layout">
          <motion.div className="dress-card" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Suggested Attire</h3>
            <ul className="dress-list">
              {dressSuggestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="dress-card" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Color Palette</h3>
            <div className="palette-grid">
              {dressPalette.map((shade) => (
                <div className="palette-item" key={shade.name}>
                  <span className="palette-dot" style={{ backgroundColor: shade.color }} aria-hidden="true" />
                  <span>{shade.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="dress-card" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Theme</h3>
            <div className="theme-tags">
              {dressThemes.map((theme) => (
                <span key={theme} className="theme-tag">
                  {theme}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section className="timeline-section" id="experience" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Experience Timeline</h2>
          <p>A journey of moments</p>
        </div>

        <div className="timeline-steps" role="tablist" aria-label="Timeline events">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon
            const isActive = activeEvent === index
            const isPast = index < activeEvent
            return (
              <button
                key={event.title}
                type="button"
                role="tab"
                className={`timeline-step${isActive ? ' active' : ''}${isPast ? ' past' : ''}`}
                onClick={() => jumpToTimelineCard(index)}
                aria-selected={isActive}
              >
                <span className="step-node" aria-hidden="true">
                  <Icon size={16} />
                  <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="step-label">{event.title}</span>
              </button>
            )
          })}
        </div>

        <div className="timeline-stack" aria-live="polite">
          {timelineEvents.map((_, layerOffset) => {
            if (layerOffset === 0) return null
            const index = (activeEvent + layerOffset) % timelineLength
            const nextEvent = timelineEvents[index]
            return (
              <div
                key={`${nextEvent.title}-stack-${layerOffset}`}
                className="timeline-stack-layer"
                style={{
                  transform: `translate(${layerOffset * 10}px, ${layerOffset * 9}px) scale(${1 - layerOffset * 0.055})`,
                  opacity: Math.max(0.2, 0.78 - layerOffset * 0.18),
                  zIndex: timelineLength - layerOffset,
                }}
                aria-hidden="true"
              />
            )
          })}

          <div className="timeline-card-row">
            <button
              type="button"
              className="timeline-arrow timeline-arrow-left"
              onClick={() => paginateTimeline(-1)}
              aria-label="Show previous timeline card"
            >
              <ChevronRight size={18} />
            </button>

            <AnimatePresence mode="wait" custom={swipeDir}>
              {(() => {
                const event = timelineEvents[activeEvent]
                const Icon = event.icon
                return (
                  <motion.div
                    key={event.title}
                    custom={swipeDir}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="timeline-card timeline-card-swipe active"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.9}
                    dragTransition={{ bounceStiffness: 340, bounceDamping: 20 }}
                    onDragEnd={handleTimelineDragEnd}
                    transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.85 }}
                    whileHover={{ y: -8, rotate: -1.5 }}
                    whileDrag={{ scale: 1.04, rotate: 10, cursor: 'grabbing' }}
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
              })()}
            </AnimatePresence>

            <button
              type="button"
              className="timeline-arrow timeline-arrow-right"
              onClick={() => paginateTimeline(1)}
              aria-label="Show next timeline card"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section className="family-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Invited With Love</h2>
          <p>Two families, one beautiful celebration</p>
        </div>

        <div className="family-sides-grid">
          {invitedBySides.map((group, index) => (
            <motion.div
              key={group.side}
              className="family-side-card"
              initial={{ y: 22, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="family-side-head">
                <span>{group.side}</span>
                <p>{group.note}</p>
              </div>

              <div className="family-list">
                {group.families.map((host) => (
                  <div key={host} className="family-line">
                    <Heart size={16} />
                    <p>{host}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="venue-section" id="venue" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="section-header">
          <h2>Venue</h2>
        </div>

        <motion.div className="venue-card" whileHover={{ scale: 1.02 }}>
          <div className="venue-info">
            <div className="venue-main">
              <span className="venue-chip">Celebration Destination</span>
              <h3>Janki Resort</h3>
              <p>NH 48, near Kharera River</p>
              <p>Vaghaldhara, Gujarat 396375</p>
              <div className="venue-contact">
                <Phone size={18} />
                <div className="venue-contact-list">
                  <p>Contact Persons</p>
                  <span>Parth Rana: +91 9106110395</span>
                  <span>Dax Rana: +91 6353139644</span>
                </div>
              </div>
            </div>
            <div className="venue-side-panel">
              <p>How It Feels</p>
              <h4>Elegant, warm, and full of blessings</h4>
              <span>
                Arrive a little early, meet both families, and enjoy a joyful
                evening of rituals, games, dance, and dinner.
              </span>
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
        <div className="closing-bottom" aria-label="Copyright">
          <p className="closing-copyright">✦ © 2026 Harshit Rana. ✦</p>
        </div>
      </motion.section>

    </main>
  )
}

export default App
