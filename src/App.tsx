import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Countdown from 'react-countdown'
import {
  CalendarDays,
  ChevronRight,
  ChevronsUp,
  Clock,
  Gift,
  Heart,
  MapPin,
  Music,
  Navigation,
  PartyPopper,
  Phone,
  Sparkles,
  User,
  Users,
} from 'lucide-react'
import './App.css'
import proposalImage from './assets/f_1.png'
import headerLogo from './assets/logo-transparent.png'
import ganeshjiImg from './assets/ganeshji.png'

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
  {
    category: 'Women',
    Icon: Sparkles,
    gradient: 'linear-gradient(148deg, #fce8f0 0%, #edd8f5 100%)',
    border: 'rgba(200, 120, 160, 0.26)',
    iconBg: 'rgba(255,255,255,0.72)',
    iconColor: '#b03868',
    text: 'Saree, lehenga, elegant engagement gown, pastel anarkali, sharara, or draped saree-gown in soft festive tones.',
  },
  {
    category: 'Men',
    Icon: User,
    gradient: 'linear-gradient(148deg, #ddeeff 0%, #d8eee8 100%)',
    border: 'rgba(90, 140, 190, 0.26)',
    iconBg: 'rgba(255,255,255,0.72)',
    iconColor: '#3a6ea8',
    text: 'Kurta set, bandhagala, Jodhpuri, Indo-western, or a blazer-kurta combination in coordinated shades.',
  },
  {
    category: 'Couples & Families',
    Icon: Heart,
    gradient: 'linear-gradient(148deg, #fdf3dc 0%, #fde2cc 100%)',
    border: 'rgba(183, 141, 74, 0.28)',
    iconBg: 'rgba(255,255,255,0.72)',
    iconColor: '#b07020',
    text: 'Coordinate your outfits for beautiful and timeless photographs that capture every joyful moment.',
  },
  {
    category: 'Friends & Guests',
    Icon: Users,
    gradient: 'linear-gradient(148deg, #e8e0fa 0%, #d8f0e8 100%)',
    border: 'rgba(130, 100, 180, 0.26)',
    iconBg: 'rgba(255,255,255,0.72)',
    iconColor: '#6040a8',
    text: 'Festive traditional or smart ethnic fusion attire in soft, elegant colors for a chic celebration look.',
  },
]

const dressPalette = [
  { name: 'Powder Blue', color: '#bfd6f2' },
  { name: 'Blush Pink', color: '#f6d2dc' },
  { name: 'Lilac Mist', color: '#ddd3f5' },
  { name: 'Sage Pastel', color: '#cfe2d4' },
  { name: 'Peach Cream', color: '#f7dfcd' },
  { name: 'Ivory Pearl', color: '#f8f3e9' },
  { name: 'Rose Quartz', color: '#f4c2c8' },
  { name: 'Mint Whisper', color: '#c2eadc' },
  { name: 'Lemon Chiffon', color: '#fdf2be' },
  { name: 'Mauve Petal', color: '#eac4d8' },
  { name: 'Dusty Coral', color: '#f7c4b4' },
  { name: 'Champagne Gold', color: '#f5e2b8' },
]

const dressThemes = [
  { name: 'Traditional Elegance', gradient: 'linear-gradient(148deg, #7c113a, #b03060)', sub: 'Saree · Lehenga · Kurta' },
  { name: 'Indo-Western Grace', gradient: 'linear-gradient(148deg, #231942, #4a3888)', sub: 'Fusion · Contemporary' },
  { name: 'Pastel Royal', gradient: 'linear-gradient(148deg, #7a5218, #b88030)', sub: 'Soft · Regal · Dreamy' },
  { name: 'Festive Chic', gradient: 'linear-gradient(148deg, #5a0e6e, #9838a8)', sub: 'Bold · Vibrant · Glam' },
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
  const [activeDetailCard, setActiveDetailCard] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeFamily, setActiveFamily] = useState<'both' | 'harshit' | 'vrushika'>('both')
  const detailsGridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 320)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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

  const handleDetailScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const grid = e.currentTarget
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.glass-card'))
    if (!cards.length) return
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2
    let closestIdx = 0
    let closestDist = Infinity
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(cardCenter - gridCenter)
      if (dist < closestDist) { closestDist = dist; closestIdx = idx }
    })
    if (closestIdx !== activeDetailCard) setActiveDetailCard(closestIdx)
  }

  const scrollToDetailCard = (idx: number) => {
    setActiveDetailCard(idx)
    const grid = detailsGridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.glass-card'))
    const target = cards[idx]
    if (!target) return
    const targetLeft = target.offsetLeft - (grid.clientWidth - target.offsetWidth) / 2
    grid.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' })
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
    <>
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
            className="ganesh-blessing"
            initial={{ opacity: 0, scale: 0.88, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, type: 'spring', stiffness: 120, damping: 18 }}
          >
            <div className="ganesh-halo" />
            <img src={ganeshjiImg} alt="Ganesh Ji" className="ganesh-img" />
            <p className="ganesh-mantra">ॐ गणेशाय नमः</p>
          </motion.div>

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
            <motion.div
              className="couple-name-wrap"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 110, damping: 18 }}
            >
              <span className="name-rule" aria-hidden="true" />
              <h1 className="couple-name">Harshit Rana</h1>
              <span className="name-rule" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="ring-divider"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="ring-ornament" aria-hidden="true">✦</span>
              <div className="ring-icon-wrap">
                <div className="ring-outer-halo" />
                <span className="ring-emoji">💍</span>
              </div>
              <span className="ring-ornament" aria-hidden="true">✦</span>
            </motion.div>

            <motion.div
              className="couple-name-wrap"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 110, damping: 18 }}
            >
              <span className="name-rule" aria-hidden="true" />
              <h1 className="couple-name couple-name-bride">Dr. Vrushika Rana</h1>
              <span className="name-rule" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.p
            className="tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            <span className="tagline-ornament" aria-hidden="true">✦</span>
            Forever Begins
            <span className="tagline-ornament" aria-hidden="true">✦</span>
          </motion.p>

          <motion.div
            className="date-badge"
            initial={{ y: 20, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.05, type: 'spring', stiffness: 120, damping: 16 }}
          >
            <CalendarDays size={15} strokeWidth={2.2} />
            <span>24 July 2026</span>
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

        <div className="detail-card-selector" role="tablist" aria-label="Ceremony detail cards">
          {ceremonyDetails.map((detail, idx) => {
            const Icon = detail.icon
            const isActive = idx === activeDetailCard
            return (
              <motion.button
                key={detail.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`detail-chip detail-chip-${idx + 1}${isActive ? ' active' : ''}`}
                onClick={() => scrollToDetailCard(idx)}
                animate={isActive ? { scale: 1 } : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              >
                <Icon size={12} />
                <span>{detail.label}</span>
              </motion.button>
            )
          })}
        </div>

        <div
          className="glass-cards-grid"
          ref={detailsGridRef}
          onScroll={handleDetailScroll}
        >
          {ceremonyDetails.map((detail, index) => {
            const Icon = detail.icon
            const hasContacts = Array.isArray((detail as any).contacts)
            const hasHighlights = Array.isArray((detail as any).highlights)
            return (
              <motion.div
                key={detail.label}
                className={`glass-card glass-card-${index + 1} ${hasContacts ? 'contact-glass-card' : ''} ${index === activeDetailCard ? 'detail-active' : ''}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 40px 60px rgba(201, 154, 61, 0.3)' }}
              >
                <div className="card-accent-strip" aria-hidden="true" />
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

        <div className="detail-progress" aria-label="Card progress indicator">
          {ceremonyDetails.map((detail, idx) => (
            <button
              key={detail.label}
              type="button"
              className={`detail-dot${idx === activeDetailCard ? ' active' : ''}`}
              onClick={() => scrollToDetailCard(idx)}
              aria-label={`View ${detail.label} card`}
            />
          ))}
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
            <div className="attire-grid">
              {dressSuggestions.map((item, idx) => (
                <motion.div
                  key={item.category}
                  className="attire-card"
                  style={{ '--attire-gradient': item.gradient, '--attire-border': item.border } as React.CSSProperties}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="attire-card-header">
                    <div
                      className="attire-icon-ring"
                      style={{ background: item.iconBg }}
                    >
                      <div className="attire-icon-inner">
                        <item.Icon size={28} color={item.iconColor} />
                      </div>
                    </div>
                    <span className="attire-category">{item.category}</span>
                  </div>
                  <p className="attire-body">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="dress-card" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Color Palette</h3>
            <div className="palette-swatches">
              {dressPalette.map((shade) => (
                <motion.div
                  key={shade.name}
                  className="palette-swatch"
                  whileHover={{ y: -3, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <div
                    className="swatch-block"
                    style={{ background: shade.color }}
                    aria-hidden="true"
                  />
                  <span className="swatch-name">{shade.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="dress-card" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}>
            <h3>Theme</h3>
            <div className="theme-tile-grid">
              {dressThemes.map((theme) => (
                <motion.div
                  key={theme.name}
                  className="theme-tile"
                  style={{ '--tile-gradient': theme.gradient } as React.CSSProperties}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <span className="theme-tile-name">{theme.name}</span>
                  <span className="theme-tile-sub">{theme.sub}</span>
                </motion.div>
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
          <div className="section-ornament" aria-hidden="true">
            <span className="ornament-line" />
            <span className="ornament-diamond">◆</span>
            <span className="ornament-line" />
          </div>
          <p>Two families, one beautiful celebration</p>
        </div>

        {/* Family tab selector */}
        <div className="family-tab-bar" role="tablist" aria-label="Select family">
          {([
                      { key: 'harshit',  label: 'Harshit',     cardIndex: 2 },
            { key: 'both',    label: 'Together ♥',   cardIndex: 0 },
            { key: 'vrushika',label: 'Vrushika',     cardIndex: 1 },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeFamily === tab.key}
              className={`family-tab family-tab-${tab.key}${activeFamily === tab.key ? ' family-tab-active' : ''}`}
              onClick={() => setActiveFamily(tab.key)}
            >
              {activeFamily === tab.key && (
                <motion.span
                  className="family-tab-pill"
                  layoutId="family-tab-pill"
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  aria-hidden="true"
                />
              )}
              <span className="family-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFamily}
            className={`family-sides-grid${activeFamily !== 'both' ? ' family-single' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            {invitedBySides
              .filter((_, i) =>
                activeFamily === 'both' ? true :
                activeFamily === 'vrushika' ? i === 0 : i === 1
              )
              .map((group, index) => {
                const cardIndex = activeFamily === 'both' ? index :
                                  activeFamily === 'vrushika' ? 0 : 1
                return (
                  <motion.div
                    key={group.side}
                    className={`family-side-card family-card-${cardIndex + 1}`}
                    initial={{ x: cardIndex === 0 ? -40 : 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 110, damping: 18 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="family-card-watermark" aria-hidden="true">❤</div>
                    <div className="family-card-top-bar" aria-hidden="true" />

                    <div className="family-side-head">
                      <span className="family-side-badge">{group.side}</span>
                      <div className="family-name-row">
                        <span className="family-name-ornament" aria-hidden="true">✦</span>
                        <p className="family-name-title">{group.note}</p>
                        <span className="family-name-ornament" aria-hidden="true">✦</span>
                      </div>
                      <div className="family-head-rule" aria-hidden="true" />
                    </div>

                    <div className="family-list">
                      {group.families.map((host, i) => (
                        <motion.div
                          key={host}
                          className="family-line"
                          initial={{ opacity: 0, x: cardIndex === 0 ? -16 : 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + 0.15, type: 'spring', stiffness: 120, damping: 20 }}
                        >
                          <span className="family-bullet" aria-hidden="true">◆</span>
                          <p>{host}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
          </motion.div>
        </AnimatePresence>
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

    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          className="scroll-top-fab"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="fab-ring fab-ring-outer" aria-hidden="true" />
          <span className="fab-ring fab-ring-inner" aria-hidden="true" />
          <span className="fab-icon">
            <ChevronsUp size={16} strokeWidth={2.5} color="#fff" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
    </>
  )
}

export default App
