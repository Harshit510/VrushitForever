import { useState } from 'react'
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Diamond,
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

const experienceSteps = [
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

function App() {
  const [activeDetail, setActiveDetail] = useState(0)
  const [activeStep, setActiveStep] = useState(1)

  const CurrentIcon = ceremonyDetails[activeDetail].icon
  const StepIcon = experienceSteps[activeStep].icon

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Engagement home">
          <Diamond size={22} />
          Harshit & Vrushika
        </a>
        <div className="nav-links">
          <a href="#details">Details</a>
          <a href="#experience">Experience</a>
          <a href="#venue">Venue</a>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Ring ceremony invitation</span>
          </div>
          <h1>Where our love story becomes ever after.</h1>
          <p className="couple-names">
            Harshit Rana <span>&</span> Dr. Vrushika Rana
          </p>
          <p className="hero-text">
            Join us for the engagement ceremony of Harshit Rana and Dr. Vrushika
            Rana, a joyful evening of couple entry, games, activities, dances,
            dinner, and blessings.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#details">
              View Ceremony Details <ChevronRight size={18} />
            </a>
            <a className="secondary-action" href={mapLink} target="_blank" rel="noreferrer">
              <Navigation size={18} /> Open Venue Map
            </a>
          </div>
          <div className="hero-meta" aria-label="Ceremony highlights">
            <div>
              <CalendarDays size={19} />
              <span>July 24, 2026</span>
            </div>
            <div>
              <Clock size={19} />
              <span>5:00 PM onwards</span>
            </div>
            <div>
              <MapPin size={19} />
              <span>Janki Resort</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-date-card">
            <span>July</span>
            <strong>24</strong>
            <span>2026</span>
          </div>
          <div className="proposal-scene">
            <div className="frame-corner corner-one" />
            <div className="frame-corner corner-two" />
            <div className="frame-corner corner-three" />
            <div className="frame-corner corner-four" />
            <img className="proposal-image" src={proposalImage} alt="" />
          </div>
          <div className="hashtag-pill">#VRUSHITFOREVER</div>
        </div>
      </section>

      <section className="details-section" id="details">
        <div className="section-heading centered">
          <p className="section-kicker">Tap a detail</p>
          <h2>Engagement ceremony details from the invitation.</h2>
        </div>

        <div className="interactive-panel">
          <div className="detail-tabs" role="tablist" aria-label="Ceremony details">
            {ceremonyDetails.map((detail, index) => {
              const Icon = detail.icon
              return (
                <button
                  className={activeDetail === index ? 'detail-tab active' : 'detail-tab'}
                  key={detail.label}
                  onClick={() => setActiveDetail(index)}
                  type="button"
                  aria-selected={activeDetail === index}
                >
                  <Icon size={20} />
                  <span>{detail.label}</span>
                </button>
              )
            })}
          </div>

          <div className="detail-reveal">
            <div className="reveal-icon">
              <CurrentIcon size={34} />
            </div>
            <p>{ceremonyDetails[activeDetail].label}</p>
            <h3>{ceremonyDetails[activeDetail].title}</h3>
            <span>{ceremonyDetails[activeDetail].note}</span>
          </div>
        </div>
      </section>

      <section className="story-band">
        <div className="section-heading">
          <p className="section-kicker">The vibe</p>
          <h2>#VRUSHITFOREVER, invited with love by the Rana family.</h2>
        </div>
        <div className="blessing-list">
          {invitedBy.map((host) => (
            <div className="blessing-item" key={host}>
              <Heart size={20} />
              {host}
            </div>
          ))}
        </div>
      </section>

      <section className="program-section" id="experience">
        <div className="section-heading centered">
          <p className="section-kicker">Program schedule</p>
          <h2>Click each moment to preview the ceremony flow.</h2>
        </div>

        <div className="experience-board">
          <div className="moment-list">
            {experienceSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <button
                  className={activeStep === index ? 'moment-card active' : 'moment-card'}
                  key={step.title}
                  onClick={() => setActiveStep(index)}
                  type="button"
                >
                  <Icon size={22} />
                  <span>{step.time}</span>
                  <strong>{step.title}</strong>
                </button>
              )
            })}
          </div>

          <div className="moment-preview">
            <div className="preview-orbit">
              <StepIcon size={42} />
            </div>
            <span>{experienceSteps[activeStep].time}</span>
            <h3>{experienceSteps[activeStep].title}</h3>
            <p>{experienceSteps[activeStep].text}</p>
          </div>
        </div>
      </section>

      <section className="cake-section">
        <div className="cake-art" aria-hidden="true">
          <div className="cake-top">
            <Heart size={22} />
          </div>
          <div className="cake-tier tier-one" />
          <div className="cake-tier tier-two" />
          <div className="cake-tier tier-three" />
        </div>
        <div>
          <p className="section-kicker">Dinner and wishes</p>
          <h2>Stay for dances, dinner, music, and the little moments after the games.</h2>
          <p>
            The evening is designed to feel elegant, playful, and personal, with
            activities for the couple, cousins, friends, family, and every guest.
          </p>
        </div>
      </section>

      <section className="venue-section" id="venue">
        <div className="venue-card">
          <div>
            <p className="section-kicker">Venue</p>
            <h2>Janki Resort, Vaghaldhara.</h2>
            <p>
              NH 48, near Kharera River, Vaghaldhara, Gujarat 396375. For help,
              contact Bhikhubhai Rana at +91 97258 43015.
            </p>
          </div>
          <a className="primary-action" href={mapLink} target="_blank" rel="noreferrer">
            <Navigation size={18} /> Open Google Maps
          </a>
        </div>
        <div className="footer-note">
          <Diamond size={20} />
          #VRUSHITFOREVER
        </div>
      </section>
    </main>
  )
}

export default App
