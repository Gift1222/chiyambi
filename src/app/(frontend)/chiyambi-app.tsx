'use client'

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import Image from 'next/image'
import { usePathname as useNextPathname } from 'next/navigation'

const logo = '/chiyambi-logo.png'
const footerLogo = '/chiyambi-logo-footer.png'
const parentPhoto =
  'https://images.unsplash.com/photo-1738390102781-c58d4c9ad0f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1200'
const classroomPhoto =
  'https://images.unsplash.com/photo-1772683681368-54cf36bb889f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1400'
const learnerPhoto =
  'https://images.unsplash.com/photo-1615669221955-f6e6c0a30505?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1000'
const readingPhoto =
  'https://images.unsplash.com/photo-1693778201108-b0af10cbc93a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1200'
const childReadingPhoto =
  'https://images.unsplash.com/photo-1697906096884-79a572240c3d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1200'
const teacherThandiPhoto =
  'https://images.unsplash.com/photo-1698827623362-f10eadf55a18?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1000'
const readyLearnerPhoto =
  'https://images.unsplash.com/photo-1697906097214-3757ae079b4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=800'
const playPhoto =
  'https://images.unsplash.com/photo-1615669037662-1a9db44b5bbf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=1000'

const heroSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1400',
    alt: 'A group of children smiling and learning together',
    label: 'Learn together',
    title: 'Confidence grows through connection.',
    text: 'Warm activities help every child listen, speak, move and belong.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1536337005238-94b997371b40?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1400',
    alt: 'A young learner proudly holding his school work',
    label: 'Celebrate progress',
    title: 'Every small win deserves a moment.',
    text: 'Stars, badges and clear progress keep learning positive and encouraging.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1473649085228-583485e6e4d7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1400',
    alt: 'Children learning together in a classroom',
    label: 'Built for learning',
    title: 'Structured lessons, playful delivery.',
    text: 'Six stages guide children from first sounds to confident early reading.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=84&w=1400',
    alt: 'A teacher standing with a group of young learners',
    label: 'Supported by teachers',
    title: 'Real guidance when families need it.',
    text: 'Premium live classes connect children and parents with vetted educators.',
  },
]

type HomeLanguage = 'EN' | 'NY'

const chichewaCopy: Record<string, string> = {
  'Learning stages': 'Magawo ophunzirira',
  'About us': 'Za ife',
  'For parents': 'Kwa makolo',
  'For teachers': 'Kwa aphunzitsi',
  Pricing: 'Mitengo',
  Resources: 'Zothandizira',
  'Log in': 'Lowani',
  'Start free trial': 'Yambani kuyesa kwaulere',
  'Explore all portal pages': 'Onani masamba onse',
  'Skip to main content': 'Pitani ku zomwe zili patsamba',
  'A strong beginning for': 'Chiyambi cholimba cha',
  'every child.': 'mwana aliyense.',
  'Playful, structured early learning from 6 months to Standard 2—made for Malawian families, teachers and every screen.':
    'Maphunziro osangalatsa komanso okonzedwa bwino kuyambira miyezi 6 mpaka Standard 2—opangidwira mabanja, aphunzitsi ndi zipangizo zonse.',
  'Hello, little learner.': 'Moni, wophunzira wamng’ono.',
  'let’s learn together.': 'tiyeni tiphunzire limodzi.',
  'Start one month free': 'Yambani mwezi umodzi kwaulere',
  'See how it works': 'Onani momwe zimagwirira ntchito',
  'No ads. No pressure.': 'Palibe zotsatsa. Palibe kukakamiza.',
  'Just safe, joyful learning.': 'Maphunziro otetezeka ndi osangalatsa.',
  'Learn together': 'Phunzirani limodzi',
  'Confidence grows through connection.': 'Chidaliro chimakula tikalumikizana.',
  'Warm activities help every child listen, speak, move and belong.':
    'Zochita zabwino zimathandiza mwana aliyense kumvera, kulankhula, kuyenda ndi kukhala nawo.',
  'Celebrate progress': 'Kondwererani kupita patsogolo',
  'Every small win deserves a moment.': 'Kupambana kulikonse kuyenera kukondweretsedwa.',
  'Stars, badges and clear progress keep learning positive and encouraging.':
    'Nyenyezi, ma badge ndi kupita patsogolo zimapangitsa kuphunzira kukhala kosangalatsa.',
  'Built for learning': 'Yopangidwira kuphunzira',
  'Structured lessons, playful delivery.': 'Maphunziro okonzedwa, ophunzitsidwa mosangalatsa.',
  'Six stages guide children from first sounds to confident early reading.':
    'Magawo asanu ndi limodzi amatsogolera ana kuchokera ku mawu oyamba mpaka kuwerenga molimba mtima.',
  'Supported by teachers': 'Mothandizidwa ndi aphunzitsi',
  'Real guidance when families need it.': 'Malangizo enieni pamene mabanja akuwafuna.',
  'Premium live classes connect children and parents with vetted educators.':
    'Makalasi a Premium live amalumikiza ana ndi makolo ndi aphunzitsi ovomerezeka.',
  'Child-safe by design': 'Otetezeka kwa ana',
  'No ads or open child chat': 'Palibe zotsatsa kapena macheza otseguka',
  'Built for early learning': 'Opangidwira maphunziro oyambirira',
  'Six clear learning stages': 'Magawo asanu ndi limodzi omveka',
  'Low-data friendly': 'Sagwiritsa ntchito data yambiri',
  'Made for real connections': 'Amagwira pa intaneti yeniyeni',
  'Local, simple payments': 'Malipiro osavuta',
  'Mobile money and bank': 'Mobile money ndi banki',
  'One platform, many journeys': 'Pulatifomu imodzi, maulendo ambiri',
  'Made for the people who help children grow.': 'Yopangidwira anthu amene amathandiza ana kukula.',
  'Choose your path to see how Chiyambi supports you.':
    'Sankhani njira yanu kuti muone mmene Chiyambi imakuthandizirani.',
  'I’m a parent': 'Ndine kholo',
  'I’m a teacher': 'Ndine mphunzitsi',
  'I run a centre': 'Ndimayendetsa centre',
  'Explore your pathway': 'Onani njira yanu',
  'Grow their confidence, day by day.': 'Kulitsani chidaliro chawo tsiku ndi tsiku.',
  'A simple, safe way to support learning at home and see every small step forward.':
    'Njira yosavuta ndi yotetezeka yothandizira kuphunzira kunyumba ndi kuona kupita patsogolo.',
  'Learn, qualify and help children thrive.':
    'Phunzirani, pezani ziyeneretso ndi kuthandiza ana kukula.',
  'A stronger centre starts with a supported team.':
    'Centre yolimba imayamba ndi gulu lothandizidwa.',
  'Growing with your child': 'Kukula limodzi ndi mwana wanu',
  'A learning path for every beginning.': 'Njira yophunzirira pa chiyambi chilichonse.',
  'Six thoughtful stages, from first sounds to confident reading.':
    'Magawo asanu ndi limodzi, kuyambira mawu oyamba mpaka kuwerenga molimba mtima.',
  'What children grow into': 'Zomwe ana adzaphunzire',
  'Sample activity': 'Chitsanzo cha zochita',
  'Explore this stage': 'Onani gawo ili',
  'Simple from the start': 'Zosavuta kuyambira pachiyambi',
  'From sign-up to first smile in four steps.': 'Kuyambira kulembetsa mpaka kumwetulira koyamba.',
  'Create your account': 'Pangani account yanu',
  'Add your child': 'Onjezani mwana wanu',
  'Learn and play': 'Phunzirani ndi kusewera',
  'Start your free month': 'Yambani mwezi waulere',
  'Learning that feels like play': 'Maphunziro ngati masewera',
  'Little moments. Big discoveries.': 'Nthawi zazing’ono. Zinthu zazikulu.',
  'A rich mix keeps children curious while building real skills.':
    'Zochita zosiyanasiyana zimathandiza ana kufuna kudziwa ndi kumanga luso.',
  'Songs & rhythm': 'Nyimbo ndi kayimbidwe',
  'Sing, move and remember': 'Imbani, yendani ndi kukumbukira',
  'Short videos': 'Mavidiyo afupifupi',
  'Watch and wonder': 'Onerani ndi kudabwa',
  Stories: 'Nkhani',
  'Listen in two languages': 'Mverani m’zilankhulo ziwiri',
  'Games & quizzes': 'Masewera ndi mafunso',
  'Practice through play': 'Yeserani kudzera m’masewera',
  'Support for parents': 'Thandizo kwa makolo',
  'You’re never on the sidelines.': 'Nthawi zonse muli nawo limodzi.',
  'See progress clearly': 'Onani kupita patsogolo bwino',
  'Get helpful suggestions': 'Pezani malangizo othandiza',
  'Stay comfortably in control': 'Khalani ndi ulamuliro',
  'Discover the parent area': 'Onani malo a makolo',
  'A pathway for teachers': 'Njira ya aphunzitsi',
  'Learn it. Practise it. Be recognised.': 'Phunzirani. Yeserani. Zindikiridwani.',
  'Explore teacher training': 'Onani maphunziro a aphunzitsi',
  'Choose what fits your family': 'Sankhani zoyenera banja lanu',
  'Start free. Grow when you’re ready.': 'Yambani kwaulere. Pitirizani mukakonzeka.',
  'Every new family begins with one month free.': 'Banja lililonse limayamba ndi mwezi waulere.',
  'Ready to learn': 'Wakonzeka kuphunzira',
  'Live class': 'Kalasi ya live',
  'A real teacher. A safe space. A brighter moment.':
    'Mphunzitsi weniweni. Malo otetezeka. Nthawi yabwino.',
  'Easy parent booking': 'Makolo amasunga mosavuta',
  'Moderated by design': 'Imayang’aniridwa nthawi zonse',
  'See Premium': 'Onani Premium',
  'Child safety promise': 'Lonjezo la chitetezo cha mwana',
  'Their curiosity is precious. We protect it.':
    'Chidwi chawo n’chamtengo wapatali. Timachiteteza.',
  'Read our child safety promise': 'Werengani lonjezo lathu la chitetezo',
  'Made to meet you where you are': 'Yopangidwa kuti ikufikireni',
  'One learning world. Every screen.': 'Dziko limodzi lophunzirira. Chipangizo chilichonse.',
  'Today’s little adventure': 'Ulendo wa lero',
  'Ideas for growing together': 'Malingaliro okulira limodzi',
  'From our learning library.': 'Kuchokera mu library yathu.',
  'See all resources': 'Onani zothandizira zonse',
  'Questions, answered': 'Mafunso, ayankhidwa',
  'A few things families often ask.': 'Zinthu zina zimene mabanja amafunsa.',
  'Visit the help centre': 'Pitani ku help centre',
  'Notes from Chiyambi': 'Nkhani kuchokera ku Chiyambi',
  'Small ideas for big beginnings.': 'Malingaliro ang’ono a ziyambi zazikulu.',
  'Email address': 'Imelo',
  Subscribe: 'Lembetsani',
  'You’re on the list.': 'Mwalembetsedwa.',
  'One month free': 'Mwezi umodzi kwaulere',
  'Every big future starts with a small beginning.':
    'Tsogolo lalikulu lililonse limayamba ndi chiyambi chaching’ono.',
  'Give your child a joyful, confident start—wherever you are.':
    'Patsani mwana wanu chiyambi chosangalatsa ndi cholimba mtima—kulikonse kumene muli.',
  'Start learning free': 'Yambani kuphunzira kwaulere',
  Learning: 'Maphunziro',
  Families: 'Mabanja',
  Teachers: 'Aphunzitsi',
  'Help & legal': 'Thandizo ndi malamulo',
  'Contact us': 'Lumikizanani nafe',
  'English / Chichewa': 'Chingerezi / Chichewa',
  'Built for every beginning.': 'Yopangidwira chiyambi chilichonse.',
}

type IconName =
  | 'shield'
  | 'device'
  | 'signal'
  | 'wallet'
  | 'users'
  | 'book'
  | 'chart'
  | 'award'
  | 'play'
  | 'music'
  | 'story'
  | 'game'
  | 'check'
  | 'lock'
  | 'clock'
  | 'message'
  | 'calendar'
  | 'leaf'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'globe'
  | 'chevron'
  | 'mail'
  | 'phone'
  | 'pin'

function PortalImage({
  src,
  alt,
  className,
  loading,
}: {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
}) {
  return (
    <Image src={src} alt={alt} className={className} loading={loading} width={1200} height={800} />
  )
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  const paths: Record<IconName, ReactNode> = {
    shield: (
      <>
        <path d="M12 3 4 6v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-3Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    device: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="1" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    signal: (
      <>
        <path d="M5 16.5a10 10 0 0 1 14 0M8.5 19.5a5 5 0 0 1 7 0M2 13a15 15 0 0 1 20 0" />
        <circle cx="12" cy="22" r=".5" fill="currentColor" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" />
        <path d="M16 11h6v4h-6a2 2 0 1 1 0-4Z" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </>
    ),
    book: (
      <>
        <path d="M4 4h6a2 2 0 0 1 2 2v14a3 3 0 0 0-3-3H4V4ZM20 4h-6a2 2 0 0 0-2 2v14a3 3 0 0 1 3-3h5V4Z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="m8.5 12-2 9 5.5-3 5.5 3-2-9" />
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4V8Z" />
      </>
    ),
    music: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),
    story: (
      <>
        <path d="M3 5h7a2 2 0 0 1 2 2v13a3 3 0 0 0-3-3H3V5ZM21 5h-7a2 2 0 0 0-2 2v13a3 3 0 0 1 3-3h6V5Z" />
      </>
    ),
    game: (
      <>
        <path d="M8 8h8a5 5 0 0 1 4.8 6.5l-1.3 4A2 2 0 0 1 16 19l-2-2h-4l-2 2a2 2 0 0 1-3.5-.5l-1.3-4A5 5 0 0 1 8 8Z" />
        <path d="M8 11v4M6 13h4M16 12h.01M18 14h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="1" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 9 5 16c0 2 1 4 3 5 7-1 12-7 12-17Z" />
        <path d="M4 21c3-5 7-8 12-11" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m5 5 14 14M19 5 5 19" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    chevron: <path d="m7 9 5 5 5-5" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-1-1.2 3A16 16 0 0 1 5 9.2L8 8 7 3Z" />
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  }
  return <svg {...common}>{paths[name]}</svg>
}

const stages = [
  {
    name: 'Baby Class',
    age: '6–18 months',
    art: 'Aa',
    color: '#D6ECF4',
    outcomes: ['Listening and bonding', 'First sounds and words', 'Movement and sensory play'],
    activity: 'Sing “Moni, moni” together',
  },
  {
    name: 'Lower Nursery',
    age: '18 months–3 years',
    art: '1 2',
    color: '#FCE7B1',
    outcomes: ['Everyday vocabulary', 'Colours and simple shapes', 'Rhythm and coordination'],
    activity: 'Find the yellow maize game',
  },
  {
    name: 'Upper Nursery',
    age: '3–4 years',
    art: 'ABC',
    color: '#C9EBE9',
    outcomes: ['Letter sound awareness', 'Counting to 10', 'Story listening skills'],
    activity: 'Match the sound to the animal',
  },
  {
    name: 'Reception',
    age: '4–5 years',
    art: '10+',
    color: '#E8DDF5',
    outcomes: ['Early reading confidence', 'Number relationships', 'Creative expression'],
    activity: 'Build a word with picture cards',
  },
  {
    name: 'Standard 1',
    age: '5–7 years',
    art: 'a b c',
    color: '#DDEEDB',
    outcomes: [
      'Reading short sentences',
      'Addition and subtraction',
      'Independent learning habits',
    ],
    activity: 'Read a lakeside story',
  },
  {
    name: 'Standard 2',
    age: '7–8 years',
    art: '25',
    color: '#F7D8D3',
    outcomes: ['Fluent early reading', 'Problem-solving skills', 'English and Chichewa growth'],
    activity: 'Solve the market basket challenge',
  },
]

const stageSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-')

const audiences = {
  parent: {
    title: 'Grow their confidence, day by day.',
    text: 'A simple, safe way to support learning at home and see every small step forward.',
    benefits: [
      'Clear weekly progress',
      'Helpful home activities',
      'Screen-time and safety controls',
    ],
    icon: 'users' as IconName,
  },
  teacher: {
    title: 'Learn, qualify and help children thrive.',
    text: 'Follow a structured ECD training pathway, complete assessments and earn verifiable certificates.',
    benefits: [
      'Stage-by-stage training',
      'Practical teaching guidance',
      'Recognised certification pathway',
    ],
    icon: 'award' as IconName,
  },
  centre: {
    title: 'Bring consistent learning to your centre.',
    text: 'Equip your team with a shared learning structure built for Malawi’s early learning context.',
    benefits: ['Teacher development', 'Consistent stage pathways', 'Future centre reporting tools'],
    icon: 'book' as IconName,
  },
}

const faqs = [
  [
    'Who is Chiyambi for?',
    'Chiyambi supports children from six months to Standard 2, their parents and guardians, ECD learner-teachers, and live-class teachers.',
  ],
  [
    'What happens during the free trial?',
    'New families can explore the structured learning pathway for one month before choosing a package. No surprise advertising or child-facing upsells.',
  ],
  [
    'Will it work with limited data?',
    'Yes. The experience is designed to load text first, use lightweight media, and support selected offline lessons for subscribers.',
  ],
  [
    'Is my child’s information safe?',
    'Children use profiles inside an adult account. We use parent consent, vetted teachers, moderated live spaces, and no advertising trackers on child pages.',
  ],
  [
    'Can I pay with mobile money?',
    'Yes. The planned checkout supports mobile money and bank transfer in Malawian kwacha.',
  ],
  [
    'Is content available in Chichewa?',
    'English is available throughout, with Chichewa added section by section through greetings, stories, songs, vocabulary and audio.',
  ],
]

function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  to,
  type = 'button',
  className = '',
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'reward' | 'text'
  onClick?: () => void
  href?: string
  to?: string
  type?: 'button' | 'submit'
  className?: string
}) {
  const classes = `button button--${variant} ${className}`
  if (to) {
    return (
      <AppLink className={classes} to={to}>
        {children}
      </AppLink>
    )
  }
  return href ? (
    <a className={classes} href={href}>
      {children}
    </a>
  ) : (
    <button className={classes} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

function SectionTitle({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string
  title: string
  text?: string
  centered?: boolean
}) {
  return (
    <div className={`section-title ${centered ? 'section-title--centered' : ''}`}>
      <span className="eyebrow">
        <Icon name="leaf" size={17} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function SiteFooter({ language }: { language: HomeLanguage }) {
  const t = (text: string) => (language === 'NY' ? (chichewaCopy[text] ?? text) : text)

  return (
    <footer id="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <AppLink to="/" className="brand brand--light">
            <PortalImage src={footerLogo} alt="Chiyambi Learning Platform" />
            <span>
              <strong>Chiyambi</strong>
              <small>Learning Platform</small>
            </span>
          </AppLink>
          <p>Warm, safe and locally rooted early learning for every beginning.</p>
          <address className="footer-address">
            <span>
              <Icon name="pin" size={18} /> Chintheche, Nkhata Bay, Malawi
            </span>
            <a href="tel:+265991020491">
              <Icon name="phone" size={18} /> +265 991 020 491
            </a>
            <a href="mailto:info@fisdev.org">
              <Icon name="mail" size={18} /> info@fisdev.org
            </a>
          </address>
        </div>
        <div className="footer-links">
          <div>
            <h3>{t('Learning')}</h3>
            <AppLink to="/stages/baby-class">Baby Class</AppLink>
            <AppLink to="/stages">Nursery</AppLink>
            <AppLink to="/stages">Reception</AppLink>
            <AppLink to="/stages">Standard 1 & 2</AppLink>
          </div>
          <div>
            <h3>{t('Families')}</h3>
            <AppLink to="/for-parents">{t('For parents')}</AppLink>
            <AppLink to="/pricing">{t('Pricing')}</AppLink>
            <AppLink to="/how-it-works">How it works</AppLink>
            <AppLink to="/resources">Resources</AppLink>
          </div>
          <div>
            <h3>{t('Teachers')}</h3>
            <AppLink to="/teacher/training">Training pathway</AppLink>
            <AppLink to="/teacher/certificates">Certification</AppLink>
            <AppLink to="/for-teachers">Live teacher roles</AppLink>
          </div>
          <div>
            <h3>{t('Help & legal')}</h3>
            <AppLink to="/contact">{t('Contact us')}</AppLink>
            <AppLink to="/faq">Help centre</AppLink>
            <AppLink to="/privacy">Privacy</AppLink>
            <AppLink to="/child-safety">Child safety</AppLink>
          </div>
        </div>
      </div>
      <div className="container footer-payments">
        <strong>Pay via</strong>
        <div className="payment-brands" aria-label="Accepted payment providers">
          {[
            ['/payment-logos/airtel-money.png', 'Airtel Money'],
            ['/payment-logos/tnm-mpamba.png', 'TNM Mpamba'],
            ['/payment-logos/standard-bank.png', 'Standard Bank'],
            ['/payment-logos/national-bank.png', 'National Bank'],
            ['/payment-logos/nbs-bank.png', 'NBS Bank'],
          ].map(([image, name]) => (
            <span key={name}>
              <PortalImage src={image} alt="" />
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Chiyambi Learning Platform | {t('Built for every beginning.')}</span>
      </div>
    </footer>
  )
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [stage, setStage] = useState(0)
  const [audience, setAudience] = useState<keyof typeof audiences>('parent')
  const [faqOpen, setFaqOpen] = useState(0)
  const [language, setLanguage] = useState<HomeLanguage>(() =>
    typeof window !== 'undefined' && window.localStorage.getItem('chiyambi-language') === 'NY'
      ? 'NY'
      : 'EN',
  )
  const [modal, setModal] = useState<'trial' | 'login' | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)
  const activeAudience = audiences[audience]
  const t = (text: string) => (language === 'NY' ? (chichewaCopy[text] ?? text) : text)

  useEffect(() => {
    document.body.style.overflow = modal || menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [modal, menuOpen])

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(
      () => setHeroSlide((current) => (current + 1) % heroSlides.length),
      4800,
    )
    return () => window.clearInterval(timer)
  }, [heroPaused])

  useEffect(() => {
    document.documentElement.lang = language === 'NY' ? 'ny' : 'en'
    window.localStorage.setItem('chiyambi-language', language)
  }, [language])

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  const nav = [
    [t('About us'), '/about'],
    [t('Learning stages'), '/stages'],
    [t('For parents'), '/for-parents'],
    [t('For teachers'), '/for-teachers'],
    [t('Pricing'), '/pricing'],
    [t('Resources'), '/resources'],
    [t('Contact us'), '/contact'],
  ]

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {t('Skip to main content')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Chiyambi home">
            <PortalImage src={logo} alt="Chiyambi Learning Platform" />
            <span>
              <strong>Chiyambi</strong>
              <small>Learning Platform</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="language-button"
              onClick={() => setLanguage(language === 'EN' ? 'NY' : 'EN')}
              aria-label={language === 'EN' ? 'Sinthani kupita ku Chichewa' : 'Switch to English'}
              aria-pressed={language === 'NY'}
            >
              <Icon name="globe" size={19} />
              {language}
              <Icon name="chevron" size={15} />
            </button>
            <Button
              variant="secondary"
              onClick={() => setModal('login')}
              className="desktop-action"
            >
              {t('Log in')}
            </Button>
            <Button onClick={() => setModal('trial')} className="desktop-action">
              {t('Start free trial')}
            </Button>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__top">
            <a href="#top" className="brand" onClick={() => setMenuOpen(false)}>
              <PortalImage src={logo} alt="Chiyambi Learning Platform" />
              <span>
                <strong>Chiyambi</strong>
                <small>Learning Platform</small>
              </span>
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="mobile-menu__contacts">
            <span>Chintheche, Nkhata Bay, Malawi</span>
            <a href="tel:+265991020491">+265 991 020 491</a>
            <a href="mailto:info@fisdev.org">info@fisdev.org</a>
          </div>
        </div>
      )}

      <main id="main">
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>
                {t('A strong beginning for')} <em>{t('every child.')}</em>
              </h1>
              <p className="hero-lead">
                {t(
                  'Playful, structured early learning from 6 months to Standard 2—made for Malawian families, teachers and every screen.',
                )}
              </p>
              <p className="greeting">
                <span>Moni!</span> {t('Hello, little learner.')} Tiyeni tiphunzire—
                {t('let’s learn together.')}
              </p>
              <div className="hero-actions">
                <Button onClick={() => setModal('trial')}>{t('Start one month free')}</Button>
                <Button variant="secondary" to="/how-it-works">
                  {t('See how it works')} <Icon name="play" size={19} />
                </Button>
              </div>
              <div className="hero-note">
                <Icon name="shield" size={20} />
                <span>
                  <strong>{t('No ads. No pressure.')}</strong> {t('Just safe, joyful learning.')}
                </span>
              </div>
            </div>
            <div
              className="hero-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="Chiyambi learning stories"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
            >
              {heroSlides.map((slide, index) => (
                <figure
                  className={`hero-slide ${heroSlide === index ? 'active' : ''}`}
                  aria-hidden={heroSlide !== index}
                  key={slide.title}
                >
                  <PortalImage src={slide.image} alt={slide.alt} />
                  <figcaption>
                    <span>{t(slide.label)}</span>
                    <h2>{t(slide.title)}</h2>
                    <p>{t(slide.text)}</p>
                  </figcaption>
                </figure>
              ))}
              <div className="hero-carousel__controls">
                <button
                  onClick={() =>
                    setHeroSlide((heroSlide + heroSlides.length - 1) % heroSlides.length)
                  }
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <div>
                  {heroSlides.map((slide, index) => (
                    <button
                      className={heroSlide === index ? 'active' : ''}
                      onClick={() => setHeroSlide(index)}
                      aria-label={`Show slide ${index + 1}: ${slide.label}`}
                      aria-current={heroSlide === index}
                      key={slide.label}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)}
                  aria-label="Next slide"
                >
                  →
                </button>
                <button
                  className="hero-carousel__pause"
                  onClick={() => setHeroPaused(!heroPaused)}
                  aria-label={heroPaused ? 'Play carousel' : 'Pause carousel'}
                >
                  {heroPaused ? 'Play' : 'Pause'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Why families trust Chiyambi">
          <div className="container trust-grid">
            {[
              ['shield', 'Child-safe by design', 'No ads or open child chat'],
              ['book', 'Built for early learning', 'Six clear learning stages'],
              ['signal', 'Low-data friendly', 'Made for real connections'],
              ['wallet', 'Local, simple payments', 'Mobile money and bank'],
            ].map(([icon, title, text]) => (
              <div className="trust-item" key={title}>
                <span>
                  <Icon name={icon as IconName} />
                </span>
                <div>
                  <strong>{t(title)}</strong>
                  <small>{t(text)}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section audience-section">
          <div className="container">
            <SectionTitle
              eyebrow={t('One platform, many journeys')}
              title={t('Made for the people who help children grow.')}
              text={t('Choose your path to see how Chiyambi supports you.')}
              centered
            />
            <div className="tab-list audience-tabs" role="tablist" aria-label="Choose an audience">
              {(
                [
                  ['parent', 'I’m a parent'],
                  ['teacher', 'I’m a teacher'],
                  ['centre', 'I run a centre'],
                ] as const
              ).map(([key, label]) => (
                <button
                  role="tab"
                  aria-selected={audience === key}
                  className={audience === key ? 'active' : ''}
                  onClick={() => setAudience(key)}
                  key={key}
                >
                  {t(label)}
                </button>
              ))}
            </div>
            <div className="audience-panel">
              <div className="audience-icon">
                <Icon name={activeAudience.icon} size={46} />
              </div>
              <div className="audience-copy">
                <h3>{t(activeAudience.title)}</h3>
                <p>{t(activeAudience.text)}</p>
                <AppLink
                  to={
                    audience === 'teacher'
                      ? '/for-teachers'
                      : audience === 'parent'
                        ? '/for-parents'
                        : '/account/centre-sign-up'
                  }
                >
                  {t('Explore your pathway')}
                </AppLink>
              </div>
              <div className="benefit-list">
                {activeAudience.benefits.map((item) => (
                  <div key={item}>
                    <span>
                      <Icon name="check" size={17} />
                    </span>
                    {t(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section stage-section" id="stages">
          <div className="container">
            <div className="split-title">
              <SectionTitle
                eyebrow={t('Growing with your child')}
                title={t('A learning path for every beginning.')}
                text={t('Six thoughtful stages, from first sounds to confident reading.')}
              />
              <div className="stage-nav-buttons">
                <button onClick={() => setStage((stage + 5) % 6)} aria-label="Previous stage">
                  ←
                </button>
                <button onClick={() => setStage((stage + 1) % 6)} aria-label="Next stage">
                  →
                </button>
              </div>
            </div>
            <div className="stage-tabs" role="tablist" aria-label="Learning stages">
              {stages.map((item, i) => (
                <button
                  role="tab"
                  aria-selected={stage === i}
                  className={stage === i ? 'active' : ''}
                  onClick={() => setStage(i)}
                  key={item.name}
                >
                  <span>0{i + 1}</span>
                  {item.name}
                </button>
              ))}
            </div>
            <div className="stage-panel">
              <div className="stage-art" style={{ backgroundColor: stages[stage].color }}>
                <span className="stage-art__letters">{stages[stage].art}</span>
                <span className="stage-art__leaf stage-art__leaf--one" />
                <span className="stage-art__leaf stage-art__leaf--two" />
                <span className="stage-age">{stages[stage].age}</span>
              </div>
              <div className="stage-content">
                <span className="badge badge--standard">Stage 0{stage + 1}</span>
                <h3>{stages[stage].name}</h3>
                <p className="stage-intro">
                  A playful world of language, numbers, movement and discovery—paced for this
                  special age.
                </p>
                <h4>{t('What children grow into')}</h4>
                <ul>
                  {stages[stage].outcomes.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="sample-activity">
                  <Icon name="play" />
                  <span>
                    <small>{t('Sample activity')}</small>
                    <strong>{stages[stage].activity}</strong>
                  </span>
                </div>
                <Button variant="secondary" to={`/stages/${stageSlug(stages[stage].name)}`}>
                  {t('Explore this stage')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="section how-section" id="how">
          <div className="container">
            <SectionTitle
              eyebrow={t('Simple from the start')}
              title={t('From sign-up to first smile in four steps.')}
              centered
            />
            <div className="steps">
              {[
                [
                  'users',
                  'Create your account',
                  'Sign up with a phone number or email in just a few minutes.',
                ],
                [
                  'leaf',
                  'Add your child',
                  'Choose their age and we’ll suggest the best stage to begin.',
                ],
                [
                  'play',
                  'Learn and play',
                  'Follow short, joyful lessons with stories, songs and games.',
                ],
                [
                  'chart',
                  'Celebrate progress',
                  'See growing confidence, new skills, stars and next steps.',
                ],
              ].map(([icon, title, text], i) => (
                <article className="step" key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <div className="step-icon">
                    <Icon name={icon as IconName} size={30} />
                  </div>
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
            <div className="center-action">
              <Button onClick={() => setModal('trial')}>{t('Start your free month')}</Button>
            </div>
          </div>
        </section>

        <section className="section activities-section">
          <div className="container">
            <SectionTitle
              eyebrow={t('Learning that feels like play')}
              title={t('Little moments. Big discoveries.')}
              text={t('A rich mix keeps children curious while building real skills.')}
            />
            <div className="activity-grid">
              {[
                [
                  'music',
                  'Songs & rhythm',
                  'Sing, move and remember',
                  'activity--teal',
                  classroomPhoto,
                  '/learn/lesson',
                ],
                [
                  'play',
                  'Short videos',
                  'Watch and wonder',
                  'activity--blue',
                  playPhoto,
                  '/learn/lesson',
                ],
                [
                  'story',
                  'Stories',
                  'Listen in two languages',
                  'activity--gold',
                  childReadingPhoto,
                  '/resources/story-time',
                ],
                [
                  'game',
                  'Games & quizzes',
                  'Practice through play',
                  'activity--purple',
                  learnerPhoto,
                  '/learn/activity',
                ],
              ].map(([icon, title, text, cls, photo, path]) => (
                <AppLink
                  className={`activity-card ${cls}`}
                  to={path}
                  ariaLabel={`${title}: ${text}`}
                  key={title}
                >
                  <PortalImage src={photo} alt="" loading="lazy" />
                  <span className="activity-card__icon">
                    <Icon name={icon as IconName} size={34} />
                  </span>
                  <div className="activity-card__copy">
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </div>
                </AppLink>
              ))}
            </div>
          </div>
        </section>

        <section className="section parents-section" id="parents">
          <div className="container feature-grid">
            <div className="photo-composition">
              <PortalImage
                src={parentPhoto}
                alt="A Malawian mother spending time with her child"
                loading="lazy"
              />
              <div className="progress-card">
                <div>
                  <span>Weekly learning</span>
                  <strong>4 of 5 days</strong>
                </div>
                <div className="progress-track">
                  <span />
                </div>
                <small>
                  <Icon name="check" size={14} />
                  Great rhythm this week
                </small>
              </div>
              <p className="photo-credit">Photo by Richard Nyoni / Unsplash</p>
            </div>
            <div className="feature-copy">
              <SectionTitle
                eyebrow={t('Support for parents')}
                title={t('You’re never on the sidelines.')}
                text="Chiyambi turns learning progress into simple, useful guidance—so you know what’s growing and what to try next."
              />
              <div className="feature-list">
                {[
                  [
                    'chart',
                    'See progress clearly',
                    'View completed lessons, time spent and skills taking shape.',
                  ],
                  [
                    'leaf',
                    'Get helpful suggestions',
                    'Simple activities for learning together at home.',
                  ],
                  [
                    'clock',
                    'Stay comfortably in control',
                    'Set screen-time, language and accessibility preferences.',
                  ],
                ].map(([icon, title, text]) => (
                  <div key={title}>
                    <span>
                      <Icon name={icon as IconName} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" to="/for-parents">
                {t('Discover the parent area')}
              </Button>
            </div>
          </div>
        </section>

        <section className="section teacher-section" id="teachers">
          <div className="container teacher-grid">
            <div>
              <SectionTitle
                eyebrow={t('A pathway for teachers')}
                title={t('Learn it. Practise it. Be recognised.')}
                text="Build practical early-learning expertise one stage at a time, with a certificate to mark every milestone."
              />
              <Button variant="secondary" to="/for-teachers">
                {t('Explore teacher training')}
              </Button>
            </div>
            <div className="pathway">
              <div className="pathway-line" />
              {[
                ['01', 'Learn by stage', 'Complete guided training and activities.'],
                ['02', 'Show your skills', 'Take practical, focused assessments.'],
                ['03', 'Earn certificates', 'Receive a verifiable stage certificate.'],
                ['04', 'Unlock every class', 'Qualify across the full early-learning path.'],
              ].map(([num, title, text], i) => (
                <div className="path-step" key={num}>
                  <span className={i < 2 ? 'done' : ''}>
                    {i < 2 ? <Icon name="check" size={18} /> : num}
                  </span>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </div>
                  {i === 2 && <Icon name="award" size={30} />}
                </div>
              ))}
              <div className="teacher-note">
                <Icon name="message" />
                <span>
                  <strong>Want to teach live?</strong> Vetted teachers can apply for dedicated
                  Premium class roles.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing-section" id="pricing">
          <div className="container">
            <SectionTitle
              eyebrow={t('Choose what fits your family')}
              title={t('Start free. Grow when you’re ready.')}
              text={t('Every new family begins with one month free.')}
              centered
            />
            <div className="pricing-grid">
              <article className="price-card">
                <div className="price-card__head">
                  <span className="badge badge--standard">Standard</span>
                  <h3>Learn at your own rhythm.</h3>
                  <p>Everything your child needs for a structured, joyful learning routine.</p>
                </div>
                <ul>
                  {[
                    'Full stage learning pathway',
                    'Songs, stories, games and quizzes',
                    'Parent progress dashboard',
                    'Offline learning access',
                  ].map((item) => (
                    <li key={item}>
                      <Icon name="check" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" onClick={() => setModal('trial')}>
                  Start free with Standard
                </Button>
              </article>
              <article className="price-card price-card--premium">
                <div className="recommended">Most supported</div>
                <div className="price-card__head">
                  <span className="badge badge--premium">Premium</span>
                  <h3>Learn with a teacher, too.</h3>
                  <p>
                    Everything in Standard, plus live, moderated support from dedicated teachers.
                  </p>
                </div>
                <ul>
                  {[
                    'Everything in Standard',
                    'Book moderated live classes',
                    'Direct parent–teacher guidance',
                    'Personalised teacher assessment',
                  ].map((item) => (
                    <li key={item}>
                      <Icon name="check" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="reward" onClick={() => setModal('trial')}>
                  Start free with Premium
                </Button>
              </article>
            </div>
            <p className="pricing-note">
              <Icon name="wallet" size={20} /> Pay in Malawian kwacha with mobile money or bank
              transfer.
            </p>
          </div>
        </section>

        <section className="section live-section">
          <div className="container live-card">
            <div className="live-visual">
              <div className="video-person video-person--teacher">
                <PortalImage
                  src={teacherThandiPhoto}
                  alt="Teacher Thandi leading a classroom activity"
                />
                <strong>Teacher Thandi</strong>
              </div>
              <div className="video-person video-person--child">
                <PortalImage src={readyLearnerPhoto} alt="A smiling young learner holding a book" />
                <strong>{t('Ready to learn')}</strong>
              </div>
            </div>
            <div className="live-copy">
              <span className="badge badge--premium">Premium</span>
              <h2>{t('A real teacher. A safe space. A brighter moment.')}</h2>
              <p>
                Parents book the class. Vetted teachers lead it. Every session is moderated and
                designed for young learners.
              </p>
              <div>
                <span>
                  <Icon name="calendar" />
                </span>
                <strong>{t('Easy parent booking')}</strong>
                <span>
                  <Icon name="shield" />
                </span>
                <strong>{t('Moderated by design')}</strong>
              </div>
              <Button variant="reward" to="/pricing">
                {t('See Premium')}
              </Button>
            </div>
          </div>
        </section>

        <section className="section safety-section">
          <div className="container safety-grid">
            <div className="safety-seal">
              <Icon name="shield" size={54} />
              <span>Our promise</span>
            </div>
            <div>
              <SectionTitle
                eyebrow={t('Child safety promise')}
                title={t('Their curiosity is precious. We protect it.')}
                text="Trust isn’t an extra feature. It shapes every part of Chiyambi."
              />
              <div className="safety-points">
                {[
                  'No advertising on child screens',
                  'Adults own accounts; children use profiles',
                  'Parent consent before sharing',
                  'Vetted teachers and moderated classes',
                ].map((item) => (
                  <span key={item}>
                    <Icon name="check" size={17} />
                    {item}
                  </span>
                ))}
              </div>
              <AppLink to="/child-safety">{t('Read our child safety promise')}</AppLink>
            </div>
          </div>
        </section>

        <section className="section devices-section">
          <div className="container devices-grid">
            <div>
              <SectionTitle
                eyebrow={t('Made to meet you where you are')}
                title={t('One learning world. Every screen.')}
                text="Phone, tablet, laptop or TV—Chiyambi adapts beautifully, even when the connection doesn’t."
              />
              <div className="device-points">
                <span>
                  <Icon name="signal" />
                  Low-data mode
                </span>
                <span>
                  <Icon name="device" />
                  Works from 320px up
                </span>
                <span>
                  <Icon name="book" />
                  Offline lessons
                </span>
              </div>
            </div>
            <div className="device-art">
              <div className="laptop-frame">
                <div className="device-video">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Malawian children learning and playing together"
                  >
                    <source src="/media/malawi-learn-play.mp4" type="video/mp4" />
                  </video>
                  <span className="device-video__caption">
                    <b>Learn &amp; play</b>
                    <small>{t('Today’s little adventure')}</small>
                  </span>
                </div>
              </div>
              <div className="phone-frame">
                <div className="device-video">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={playPhoto}
                    aria-label="A child enjoying a playful learning activity"
                  >
                    <source
                      src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <span className="device-video__caption device-video__caption--phone">
                    <Icon name="play" size={25} />
                    <b>Moni!</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section resources-section" id="resources">
          <div className="container">
            <div className="split-title">
              <SectionTitle
                eyebrow={t('Ideas for growing together')}
                title={t('From our learning library.')}
              />
              <AppLink className="text-link" to="/resources">
                {t('See all resources')} <Icon name="arrow" size={18} />
              </AppLink>
            </div>
            <div className="resource-grid">
              {[
                [
                  '5 ways to make story time more magical',
                  'For parents',
                  '6 min read',
                  'resource-art--story',
                  readingPhoto,
                ],
                [
                  'Why rhythm helps young minds remember',
                  'Early learning',
                  '4 min read',
                  'resource-art--music',
                  classroomPhoto,
                ],
                [
                  'Helping children learn in two languages',
                  'Language',
                  '7 min read',
                  'resource-art--words',
                  childReadingPhoto,
                ],
              ].map(([title, category, time, cls, photo]) => (
                <article className="resource-card" key={title}>
                  <div className={`resource-art ${cls}`}>
                    <PortalImage src={photo} alt="" loading="lazy" />
                  </div>
                  <div>
                    <span>{category}</span>
                    <h3>{title}</h3>
                    <small>{time}</small>
                    <AppLink to="/resources/story-time" ariaLabel={`Read ${title}`}>
                      <Icon name="arrow" />
                    </AppLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container faq-grid">
            <div>
              <SectionTitle
                eyebrow={t('Questions, answered')}
                title={t('A few things families often ask.')}
                text="Can’t find what you need? Our support team will be happy to help."
              />
              <Button variant="secondary" to="/faq">
                {t('Visit the help centre')}
              </Button>
            </div>
            <div className="accordion">
              {faqs.map(([question, answer], i) => (
                <div className={`faq-item ${faqOpen === i ? 'open' : ''}`} key={question}>
                  <button
                    aria-expanded={faqOpen === i}
                    onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  >
                    <span>{question}</span>
                    <b>{faqOpen === i ? '−' : '+'}</b>
                  </button>
                  {faqOpen === i && (
                    <div>
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="container newsletter-card">
            <div>
              <span className="eyebrow eyebrow--light">
                <Icon name="mail" size={18} />
                {t('Notes from Chiyambi')}
              </span>
              <h2>{t('Small ideas for big beginnings.')}</h2>
              <p>
                Helpful learning tips, new stories and platform updates—sent with care, never
                clutter.
              </p>
            </div>
            {subscribed ? (
              <div className="subscribe-success">
                <Icon name="check" />
                <span>
                  <strong>{t('You’re on the list.')}</strong> Thank you for growing with us.
                </span>
              </div>
            ) : (
              <form onSubmit={subscribe}>
                <label htmlFor="email">{t('Email address')}</label>
                <div>
                  <input id="email" type="email" placeholder="you@example.com" required />
                  <button type="submit">{t('Subscribe')}</button>
                </div>
                <small>
                  By subscribing, you agree to receive learning updates. Unsubscribe any time.
                </small>
              </form>
            )}
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta__inner">
            <div className="cta-leaves cta-leaves--left">
              <span />
              <span />
              <span />
            </div>
            <div>
              <span className="badge badge--trial">{t('One month free')}</span>
              <h2>{t('Every big future starts with a small beginning.')}</h2>
              <p>{t('Give your child a joyful, confident start—wherever you are.')}</p>
              <Button variant="reward" onClick={() => setModal('trial')}>
                {t('Start learning free')}
              </Button>
            </div>
            <div className="cta-leaves cta-leaves--right">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter language={language} />

      <a className="portal-preview-link" href="/portal">
        <Icon name="device" size={19} />
        {t('Explore all portal pages')}
      </a>

      <div className="mobile-cta">
        <Button variant="secondary" onClick={() => setModal('login')}>
          {t('Log in')}
        </Button>
        <Button onClick={() => setModal('trial')}>{t('Start free trial')}</Button>
      </div>

      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setModal(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setModal(null)}
              aria-label="Close dialog"
            >
              <Icon name="close" />
            </button>
            <span className="modal-mark">
              <Icon name={modal === 'trial' ? 'leaf' : 'lock'} size={30} />
            </span>
            <h2 id="modal-title">
              {modal === 'trial' ? 'Who is beginning today?' : 'Welcome back.'}
            </h2>
            <p>
              {modal === 'trial'
                ? 'Choose a path. We’ll guide you through the right setup next.'
                : 'Front-end preview: choose a role to see the planned sign-in pathway.'}
            </p>
            <div className="role-options">
              {(modal === 'trial'
                ? [
                    ['users', 'Parent or guardian', 'Create a family account'],
                    ['award', 'Teacher', 'Start training or apply'],
                    ['book', 'School or centre', 'Register your organisation'],
                  ]
                : [
                    ['users', 'Family account', 'Parent or guardian login'],
                    ['award', 'Teacher account', 'Training and live classes'],
                    ['lock', 'Staff access', 'Platform management'],
                  ]
              ).map(([icon, title, text]) => (
                <button
                  key={title}
                  onClick={() => {
                    setModal(null)
                    navigate(
                      title.includes('Parent') || title.includes('Family')
                        ? modal === 'trial'
                          ? '/account/parent-sign-up'
                          : '/parent'
                        : title.includes('Teacher')
                          ? modal === 'trial'
                            ? '/account/teacher-sign-up'
                            : '/teacher'
                          : title.includes('School')
                            ? '/account/centre-sign-up'
                            : '/platform-admin',
                    )
                  }}
                >
                  <span>
                    <Icon name={icon as IconName} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </button>
              ))}
            </div>
            <small className="modal-note">
              <Icon name="shield" size={16} />
              This preview does not collect or store account information.
            </small>
          </div>
        </div>
      )}
    </div>
  )
}

type AreaKey = 'public' | 'auth' | 'child' | 'parent' | 'teacher' | 'school' | 'admin' | 'system'

type PageSpec = {
  id: string
  title: string
  purpose: string
  path: string
  area: AreaKey
}

const pageGroups: Record<AreaKey, { label: string; icon: IconName; pages: PageSpec[] }> = {
  public: {
    label: 'Public website',
    icon: 'globe',
    pages: [
      ['W1', 'Home', 'Main landing page', '/'],
      ['W2', 'About us', 'Mission, story and team', '/about'],
      ['W3', 'How it works', 'Steps for parents, children and teachers', '/how-it-works'],
      ['W4', 'Learning stages', 'Overview of the six stages', '/stages'],
      ['W5', 'Stage detail', 'Outcomes, course outline and packages', '/stages/baby-class'],
      ['W6', 'Pricing and packages', 'Package comparison and free trial', '/pricing'],
      ['W7', 'For parents', 'Benefits and parent-area preview', '/for-parents'],
      ['W8', 'For teachers', 'Training, certification and teacher roles', '/for-teachers'],
      ['W9', 'Resources and blog', 'Parenting and learning resources', '/resources'],
      ['W10', 'Blog article', 'A single practical learning article', '/resources/story-time'],
      ['W11', 'Contact', 'Contact form and details', '/contact'],
      ['W12', 'FAQ and help centre', 'Common questions and support', '/faq'],
      ['W13', 'Privacy policy', 'Data handling and parental consent', '/privacy'],
      ['W14', 'Terms of use', 'Platform service terms', '/terms'],
      ['W15', 'Child safety promise', 'Plain-language safety commitments', '/child-safety'],
      ['W16', 'Verify certificate', 'Public certificate lookup', '/verify-certificate'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'public' as const })),
  },
  auth: {
    label: 'Authentication',
    icon: 'lock',
    pages: [
      ['A1', 'Choose account type', 'Parent, teacher or school registration', '/account/choose'],
      ['A2', 'Parent sign-up', 'Create a parent or guardian account', '/account/parent-sign-up'],
      [
        'A3',
        'Teacher sign-up',
        'Register as a learner or live teacher',
        '/account/teacher-sign-up',
      ],
      [
        'A4',
        'School or centre sign-up',
        'Register a centre for approval',
        '/account/centre-sign-up',
      ],
      ['A5', 'Verify account', 'Enter a one-time verification code', '/account/verify'],
      ['A6', 'Log in', 'Sign in with email or phone', '/login'],
      ['A7', 'Forgot password', 'Request a reset link or code', '/forgot-password'],
      ['A8', 'Reset password', 'Set a secure new password', '/reset-password'],
      ['A9', 'Welcome and setup', 'Add a child and choose a starting stage', '/onboarding/setup'],
      ['A10', 'Choose package', 'Select a package and start the free trial', '/onboarding/package'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'auth' as const })),
  },
  child: {
    label: 'Child learning',
    icon: 'play',
    pages: [
      ['C1', 'Who is learning?', 'Avatar profile picker with optional PIN', '/learn/who'],
      ['C2', 'Child home', 'Learning map with a big Continue button', '/learn'],
      ['C3', 'Stage home', "Courses available in the child's stage", '/learn/stage'],
      ['C4', 'Course overview', 'Units and lessons in a course', '/learn/course'],
      ['C5', 'Lesson player', 'Video, story, song and narration', '/learn/lesson'],
      [
        'C6',
        'Game and activity player',
        'Interactive games and activity prompts',
        '/learn/activity',
      ],
      ['C7', 'Quizzes and flashcards', 'Check-ins and review cards', '/learn/quiz'],
      ['C8', 'Colouring studio', 'On-screen creative colouring', '/learn/colour'],
      ['C9', 'My rewards', 'Stars, badges and certificates', '/learn/rewards'],
      ['C10', 'My progress', 'Child-friendly progress view', '/learn/progress'],
      ['C11', 'Live class lobby', 'See and join booked sessions', '/learn/live'],
      ['C12', 'Live classroom', 'Moderated live learning session', '/learn/live/classroom'],
      ['C13', 'My settings', 'Sound, narration, font and size', '/learn/settings'],
      ['C14', 'Grown-up gate', 'Adult check for protected actions', '/learn/grown-up-gate'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'child' as const })),
  },
  parent: {
    label: 'Parent portal',
    icon: 'users',
    pages: [
      ['P1', 'Parent dashboard', 'Every child, alert and next step', '/parent'],
      ['P2', 'Child profiles', 'List and switch between children', '/parent/children'],
      ['P3', 'Add or edit child', 'Create or change a child profile', '/parent/children/edit'],
      ['P4', 'Child progress', 'Learning time, skills and rewards', '/parent/progress'],
      ['P5', 'Reports', 'Periodic learning reports', '/parent/reports'],
      ['P6', 'Report detail', 'One detailed learning report', '/parent/reports/latest'],
      ['P7', 'Suggested support', 'Recommended areas to work on', '/parent/support'],
      ['P8', 'Parent library', 'Guides organised by learning stage', '/parent/library'],
      ['P9', 'Guide detail', 'One practical parent guide', '/parent/library/reading'],
      ['P10', 'Parental controls', 'Screen-time and content restrictions', '/parent/controls'],
      ['P11', 'Book a live class', 'Calendar and Premium booking', '/parent/live/book'],
      ['P12', 'My bookings', 'Upcoming and past sessions', '/parent/live'],
      ['P13', 'Messages', 'Conversations with teachers', '/parent/messages'],
      ['P14', 'Notifications', 'Alerts and reminders', '/parent/notifications'],
      ['P15', 'Subscription and plan', 'Package, trial status and upgrade', '/parent/subscription'],
      ['P16', 'Checkout', 'Mobile money or bank transfer', '/parent/checkout'],
      ['P17', 'Payment history', 'Receipts and invoices', '/parent/payments'],
      ['P18', 'Account settings', 'Profile, language, consent and data', '/parent/settings'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'parent' as const })),
  },
  teacher: {
    label: 'Teacher portal',
    icon: 'award',
    pages: [
      ['T1', 'Teacher dashboard', 'Tasks, training progress and schedule', '/teacher'],
      [
        'T2',
        'Profile and verification',
        'Details, documents and approval status',
        '/teacher/profile',
      ],
      ['T3', 'Messages', 'Conversations with parents', '/teacher/messages'],
      ['T4', 'Notifications', 'Teacher alerts and reminders', '/teacher/notifications'],
      ['T5', 'Settings', 'Language, password and preferences', '/teacher/settings'],
      ['T6', 'Training pathway', 'Stage-by-stage route to certification', '/teacher/training'],
      [
        'T7',
        'Stage training outline',
        'Modules and requirements for one stage',
        '/teacher/training/stage',
      ],
      ['T8', 'Training lesson player', 'Teacher development lesson', '/teacher/training/lesson'],
      ['T9', 'Assessments', 'Stage tests and practical tasks', '/teacher/assessments'],
      ['T10', 'My certificates', 'Earned and all-classes certificates', '/teacher/certificates'],
      [
        'T11',
        'Access fees and payments',
        'Pay for stage access and view receipts',
        '/teacher/payments',
      ],
      ['T12', 'Class schedule', 'Assigned live sessions', '/teacher/classes'],
      ['T13', 'Live classroom host', 'Run a moderated live session', '/teacher/classes/live'],
      [
        'T14',
        'Class roster and notes',
        'Attendance and child observations',
        '/teacher/classes/roster',
      ],
      ['T15', 'Assess child', 'Record teacher assessment', '/teacher/assess-child'],
      ['T16', 'Incident report', 'Report a safety concern', '/teacher/incident'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'teacher' as const })),
  },
  school: {
    label: 'School or centre',
    icon: 'book',
    pages: [
      ['S1', 'School dashboard', 'Overview of teachers and plan', '/centre'],
      ['S2', 'Manage teachers', 'Invite and track teachers', '/centre/teachers'],
      ['S3', 'Manage learners', 'Enrol children under the centre', '/centre/learners'],
      ['S4', 'Plan and billing', 'Group package and payments', '/centre/billing'],
      ['S5', 'Centre reports', 'Group progress and certification', '/centre/reports'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'school' as const })),
  },
  admin: {
    label: 'Admin console',
    icon: 'chart',
    pages: [
      ['D1', 'Admin dashboard', 'Key numbers and alerts', '/platform-admin'],
      ['D2', 'Users', 'Search and filter all accounts', '/platform-admin/users'],
      ['D3', 'User detail', 'One account, status and history', '/platform-admin/users/detail'],
      ['D4', 'Teacher verification', 'Review and approve teachers', '/platform-admin/teachers'],
      ['D5', 'Content library', 'Stages, courses, units and lessons', '/platform-admin/content'],
      [
        'D6',
        'Course editor',
        'Create, preview and publish content',
        '/platform-admin/content/editor',
      ],
      ['D7', 'Media library', 'Videos, songs, audio and images', '/platform-admin/media'],
      [
        'D8',
        'Packages and pricing',
        'Packages, pricing and trial rules',
        '/platform-admin/packages',
      ],
      ['D9', 'Subscriptions', 'Active, trial and expired plans', '/platform-admin/subscriptions'],
      [
        'D10',
        'Payments and reconciliation',
        'Transactions, matching and refunds',
        '/platform-admin/payments',
      ],
      ['D11', 'Live sessions', 'Schedule sessions and assign teachers', '/platform-admin/live'],
      [
        'D12',
        'Moderation and reports',
        'Safety reports, flags and reviews',
        '/platform-admin/moderation',
      ],
      [
        'D13',
        'Certificates',
        'Issue, revoke and look up certificates',
        '/platform-admin/certificates',
      ],
      ['D14', 'Analytics and reports', 'Usage, outcomes and revenue', '/platform-admin/analytics'],
      [
        'D15',
        'Messages and templates',
        'Email, SMS and notification templates',
        '/platform-admin/messages',
      ],
      ['D16', 'Website content', 'Blog, FAQ and public page content', '/platform-admin/website'],
      ['D17', 'Staff and roles', 'Admin accounts and permissions', '/platform-admin/staff'],
      [
        'D18',
        'Audit log and settings',
        'Sensitive actions and platform settings',
        '/platform-admin/settings',
      ],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'admin' as const })),
  },
  system: {
    label: 'System pages',
    icon: 'signal',
    pages: [
      ['X1', 'Page not found', 'Friendly redirect with a way home', '/system/not-found'],
      ['X2', 'Something went wrong', 'Clear error with retry', '/system/error'],
      ['X3', 'You are offline', 'Available offline lessons', '/system/offline'],
      ['X4', 'Access denied', 'Explain why and how to unlock', '/system/locked'],
      ['X5', 'Session expired', 'Prompt the user to sign in again', '/system/session-expired'],
      ['X6', 'Maintenance', 'Planned downtime notice', '/system/maintenance'],
    ].map(([id, title, purpose, path]) => ({ id, title, purpose, path, area: 'system' as const })),
  },
}

const allPages = Object.values(pageGroups).flatMap((group) => group.pages)

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function AppLink({
  to,
  children,
  className = '',
  ariaLabel,
}: {
  to: string
  children: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={(event) => {
        if (!event.metaKey && !event.ctrlKey) {
          event.preventDefault()
          navigate(to)
        }
      }}
    >
      {children}
    </a>
  )
}

function usePathname() {
  return useNextPathname()
}

function PortalIndex() {
  const [query, setQuery] = useState('')
  const filteredGroups = Object.entries(pageGroups)
    .map(([key, group]) => ({
      key,
      ...group,
      pages: group.pages.filter(
        (page) =>
          page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.id.toLowerCase().includes(query.toLowerCase()) ||
          page.purpose.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((group) => group.pages.length)

  return (
    <div className="portal-index">
      <div className="portal-index__hero">
        <div className="portal-index__top">
          <AppLink to="/" className="brand">
            <PortalImage src={footerLogo} alt="Chiyambi Learning Platform" />
            <span>
              <strong>Chiyambi</strong>
              <small>Learning Platform</small>
            </span>
          </AppLink>
          <AppLink to="/" className="button button--secondary">
            Back to public home
          </AppLink>
        </div>
        <div className="portal-index__intro">
          <span className="eyebrow eyebrow--light">
            <Icon name="device" size={18} />
            Complete frontend portal
          </span>
          <h1>Every documented page, in one connected experience.</h1>
          <p>
            Explore all 103 responsive page templates across public, family, learning, teacher,
            centre, administration and system areas.
          </p>
          <label>
            <Icon name="book" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a page by name, ID or purpose"
            />
          </label>
        </div>
        <div className="portal-index__stats">
          <span>
            <strong>103</strong> page templates
          </span>
          <span>
            <strong>8</strong> platform areas
          </span>
          <span>
            <strong>320px+</strong> responsive range
          </span>
        </div>
      </div>
      <main className="portal-index__content">
        {filteredGroups.map((group) => (
          <section className="page-group" key={group.key}>
            <div className="page-group__heading">
              <span>
                <Icon name={group.icon} />
              </span>
              <div>
                <h2>{group.label}</h2>
                <p>{group.pages.length} templates</p>
              </div>
            </div>
            <div className="page-directory">
              {group.pages.map((page) => (
                <AppLink to={page.path} className="page-directory__card" key={page.id}>
                  <span>{page.id}</span>
                  <div>
                    <h3>{page.title}</h3>
                    <p>{page.purpose}</p>
                  </div>
                  <Icon name="arrow" />
                </AppLink>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

function PublicPortalPage({ page }: { page: PageSpec }) {
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState(0)
  const currentPath = usePathname()
  const footerLanguage: HomeLanguage =
    typeof window !== 'undefined' && window.localStorage.getItem('chiyambi-language') === 'NY'
      ? 'NY'
      : 'EN'
  const selectedStage =
    stages.find((item) => `/stages/${stageSlug(item.name)}` === currentPath) ?? stages[0]
  const selectedStageIndex = stages.indexOf(selectedStage)
  const publicNav = pageGroups.public.pages.filter((item) =>
    ['W4', 'W7', 'W8', 'W6', 'W9'].includes(item.id),
  )

  const renderContent = () => {
    if (page.id === 'W4') {
      return (
        <>
          <div className="public-page__split">
            <div>
              <span className="badge badge--standard">Six connected stages</span>
              <h2>A path that grows with every child.</h2>
              <p>
                Short, developmentally appropriate activities build language, movement, number sense
                and confidence through English and Chichewa.
              </p>
              <Button to="/account/choose">Start one month free</Button>
            </div>
            <div className="public-feature-visual">
              <PortalImage src={learnerPhoto} alt="A young Malawian learner ready for school" />
              <small>Listen, move and connect</small>
            </div>
          </div>
          <div className="public-stage-grid">
            {stages.map((item) => (
              <article key={item.name}>
                <div style={{ background: item.color }}>{item.art}</div>
                <span>{item.age}</span>
                <h3>{item.name}</h3>
                <p>{item.outcomes[0]}</p>
                <AppLink to={`/stages/${stageSlug(item.name)}`}>Explore stage</AppLink>
              </article>
            ))}
          </div>
        </>
      )
    }
    if (page.id === 'W5') {
      const courseUnits = [
        ['Language and connection', 'Greetings, first words and listening'],
        ['Numbers in everyday life', 'Counting, matching and simple patterns'],
        ['Movement and discovery', 'Coordination, rhythm and sensory play'],
        ['Stories from our world', 'English and Chichewa story experiences'],
      ]
      return (
        <div className="stage-detail-page">
          <nav className="stage-detail-tabs" aria-label="Choose a learning stage">
            {stages.map((item) => (
              <AppLink
                className={item.name === selectedStage.name ? 'active' : ''}
                to={`/stages/${stageSlug(item.name)}`}
                key={item.name}
              >
                <span>0{stages.indexOf(item) + 1}</span>
                {item.name}
              </AppLink>
            ))}
          </nav>
          <section className="stage-detail-intro">
            <div className="stage-detail-art" style={{ background: selectedStage.color }}>
              <span>{selectedStage.art}</span>
              <small>{selectedStage.age}</small>
            </div>
            <div>
              <span className="badge badge--standard">Stage 0{selectedStageIndex + 1}</span>
              <h2>{selectedStage.name}</h2>
              <p>
                A structured, playful learning stage designed around the language, movement and
                thinking skills children are developing at {selectedStage.age}.
              </p>
              <div className="stage-detail-actions">
                <Button to="/account/choose">Start one month free</Button>
                <Button variant="secondary" to="/pricing">
                  Compare packages
                </Button>
              </div>
            </div>
          </section>
          <section className="stage-outcomes">
            <div className="actor-panel-heading">
              <div>
                <span>Learning outcomes</span>
                <h3>What children grow into</h3>
              </div>
            </div>
            <div>
              {selectedStage.outcomes.map((outcome, index) => (
                <article key={outcome}>
                  <span>0{index + 1}</span>
                  <Icon name={index === 0 ? 'message' : index === 1 ? 'book' : 'leaf'} />
                  <h3>{outcome}</h3>
                  <p>Short guided experiences build this skill through repetition and play.</p>
                </article>
              ))}
            </div>
          </section>
          <section className="stage-course-outline">
            <header>
              <div>
                <span>Sample course outline</span>
                <h3>Inside {selectedStage.name}</h3>
              </div>
              <span>4 learning areas</span>
            </header>
            <div>
              {courseUnits.map(([title, description], index) => (
                <article key={title}>
                  <span>
                    <Icon
                      name={
                        index === 0
                          ? 'message'
                          : index === 1
                            ? 'game'
                            : index === 2
                              ? 'music'
                              : 'story'
                      }
                    />
                  </span>
                  <div>
                    <small>Course 0{index + 1}</small>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <strong>{4 + index} sample lessons</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="stage-sample">
            <div>
              <span className="eyebrow">
                <Icon name="play" size={18} />
                Sample activity
              </span>
              <h2>{selectedStage.activity}</h2>
              <p>
                Children listen, respond and try the activity with clear voice guidance in English
                and Chichewa.
              </p>
              <Button to="/learn/lesson">Open sample lesson</Button>
            </div>
            <PortalImage
              src={childReadingPhoto}
              alt="A young child enjoying an early learning activity"
            />
          </section>
          <section className="stage-package-summary">
            <article>
              <span className="badge badge--standard">Standard</span>
              <h3>Learn at your own rhythm</h3>
              <ul>
                <li>Full stage pathway</li>
                <li>Stories, songs, games and quizzes</li>
                <li>Progress and offline access</li>
              </ul>
              <Button variant="secondary" to="/account/choose">
                Choose Standard
              </Button>
            </article>
            <article>
              <span className="badge badge--premium">Premium</span>
              <h3>Add dedicated teacher support</h3>
              <ul>
                <li>Everything in Standard</li>
                <li>Book moderated live classes</li>
                <li>Teacher observations and guidance</li>
              </ul>
              <Button variant="reward" to="/account/choose">
                Choose Premium
              </Button>
            </article>
          </section>
        </div>
      )
    }
    if (page.id === 'W6') {
      return (
        <div className="public-price-grid">
          {[
            [
              'Standard',
              'Structured independent learning',
              ['Full learning pathway', 'Parent progress', 'Offline lessons'],
            ],
            [
              'Premium',
              'Learning plus dedicated teachers',
              ['Everything in Standard', 'Live classes', 'Teacher guidance'],
            ],
          ].map(([name, description, items]) => (
            <article key={name as string} className={name === 'Premium' ? 'featured' : ''}>
              <span className={`badge badge--${name === 'Premium' ? 'premium' : 'standard'}`}>
                {name as string}
              </span>
              <h2>{description as string}</h2>
              <ul>
                {(items as string[]).map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant={name === 'Premium' ? 'reward' : 'secondary'} to="/account/choose">
                Start free
              </Button>
            </article>
          ))}
        </div>
      )
    }
    if (['W7', 'W8', 'W2', 'W3'].includes(page.id)) {
      const cards =
        page.id === 'W7'
          ? [
              ['chart', 'Understand progress'],
              ['clock', 'Shape healthy routines'],
              ['message', 'Connect with teachers'],
            ]
          : page.id === 'W8'
            ? [
                ['book', 'Learn by stage'],
                ['award', 'Earn certificates'],
                ['users', 'Teach live classes'],
              ]
            : page.id === 'W2'
              ? [
                  ['leaf', 'Locally rooted'],
                  ['shield', 'Inclusive by design'],
                  ['device', 'Built for access'],
                ]
              : [
                  ['users', 'Create an account'],
                  ['play', 'Learn and play'],
                  ['chart', 'Celebrate progress'],
                ]
      return (
        <>
          <div className="public-page__split">
            <div>
              <span className="eyebrow">
                <Icon name="leaf" size={18} />
                Built around real people
              </span>
              <h2>{page.purpose}</h2>
              <p>
                Chiyambi brings warm, structured learning together with clear tools that adults can
                trust and children can enjoy.
              </p>
              <Button
                to={
                  page.id === 'W8'
                    ? '/account/teacher-sign-up'
                    : page.id === 'W7'
                      ? '/account/parent-sign-up'
                      : page.id === 'W3'
                        ? '/account/choose'
                        : '/about'
                }
              >
                Explore your pathway
              </Button>
            </div>
            <div className="quote-panel">
              <PortalImage
                src={page.id === 'W8' ? classroomPhoto : readingPhoto}
                alt={page.id === 'W8' ? 'Children learning together' : 'A family reading together'}
              />
              <div>
                <Icon name={page.id === 'W8' ? 'award' : 'users'} size={50} />
                <blockquote>“Every child deserves a beginning filled with possibility.”</blockquote>
                <span>Chiyambi learning promise</span>
              </div>
            </div>
          </div>
          <div className="public-card-row">
            {cards.map(([icon, title], index) => (
              <article key={title}>
                <span>
                  <Icon name={icon as IconName} />
                </span>
                <small>0{index + 1}</small>
                <h3>{title}</h3>
                <p>Clear guidance, thoughtful tools and a calm experience at every step.</p>
              </article>
            ))}
          </div>
        </>
      )
    }
    if (page.id === 'W9' || page.id === 'W10') {
      if (page.id === 'W10') {
        return (
          <article className="article-page">
            <p className="article-lead">
              Story time is more than a quiet moment—it is where language, imagination and
              connection meet.
            </p>
            <h2>Make the story feel alive</h2>
            <p>
              Pause to notice pictures, wonder aloud and let your child lead. There is no need to
              rush to the final page.
            </p>
            <div className="article-callout">
              <Icon name="leaf" />
              <strong>Try this:</strong> ask “What do you think happens next?” in English or
              Chichewa.
            </div>
            <h2>Repeat favourite stories</h2>
            <p>
              Repetition helps children anticipate words, build confidence and discover new details
              each time.
            </p>
          </article>
        )
      }
      return (
        <div className="resource-grid public-resources">
          {[
            ['Story time that sparks imagination', readingPhoto],
            ['Learning through rhythm and song', classroomPhoto],
            ['Growing up with two languages', childReadingPhoto],
            ['Making screen time meaningful', learnerPhoto],
            ['Play ideas for rainy afternoons', classroomPhoto],
            ['Helping a child try again', readingPhoto],
          ].map(([title, photo], index) => (
            <article className="resource-card" key={title}>
              <div className="resource-art">
                <PortalImage src={photo} alt="" loading="lazy" />
              </div>
              <div>
                <span>Learning together</span>
                <h3>{title}</h3>
                <small>{4 + index} min read</small>
                <AppLink to="/resources/story-time">
                  <Icon name="arrow" />
                </AppLink>
              </div>
            </article>
          ))}
        </div>
      )
    }
    if (page.id === 'W12') {
      return (
        <div className="public-faq">
          {faqs.map(([question, answer], index) => (
            <div key={question}>
              <button onClick={() => setOpen(index === open ? -1 : index)}>
                <span>{question}</span>
                <b>{index === open ? '−' : '+'}</b>
              </button>
              {index === open && <p>{answer}</p>}
            </div>
          ))}
        </div>
      )
    }
    if (['W13', 'W14', 'W15'].includes(page.id)) {
      const sections =
        page.id === 'W15'
          ? [
              'Adults stay in control',
              'No advertising to children',
              'Safe, moderated live learning',
              'Clear reporting and response',
            ]
          : page.id === 'W13'
            ? [
                'Information we collect',
                'How information is used',
                'Parental consent',
                'Your choices and rights',
              ]
            : [
                'Using Chiyambi',
                'Subscriptions and trials',
                'Respectful use',
                'Changes and support',
              ]
      return (
        <div className="policy-layout">
          <aside>
            {sections.map((title, i) => (
              <a href={`#policy-${i}`} key={title}>
                {title}
              </a>
            ))}
          </aside>
          <article>
            {sections.map((title, i) => (
              <section id={`policy-${i}`} key={title}>
                <h2>{title}</h2>
                <p>
                  We explain this commitment in clear language and design every experience around
                  dignity, safety and informed adult choice.
                </p>
                <p>
                  Chiyambi uses only the information needed to provide learning, support families
                  and keep the platform safe. Children never hold independent accounts.
                </p>
              </section>
            ))}
          </article>
        </div>
      )
    }
    if (page.id === 'W11' || page.id === 'W16') {
      return sent ? (
        <div className="form-success">
          <Icon name="check" size={40} />
          <h2>{page.id === 'W16' ? 'Certificate found' : 'Message received'}</h2>
          <p>
            {page.id === 'W16'
              ? 'Certificate CHI-2026-1842 is valid and was issued for Upper Nursery training.'
              : 'Thank you. The Chiyambi team will respond as soon as possible.'}
          </p>
          <Button variant="secondary" onClick={() => setSent(false)}>
            Start again
          </Button>
        </div>
      ) : (
        <form
          className="public-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <div>
            <label>{page.id === 'W16' ? 'Certificate code' : 'Your name'}</label>
            <input
              required
              placeholder={page.id === 'W16' ? 'e.g. CHI-2026-1842' : 'Enter your name'}
            />
          </div>
          {page.id === 'W11' && (
            <>
              <div>
                <label>Email or phone</label>
                <input required placeholder="How should we reply?" />
              </div>
              <div className="full">
                <label>How can we help?</label>
                <textarea required rows={6} placeholder="Write your message" />
              </div>
            </>
          )}
          <Button type="submit">{page.id === 'W16' ? 'Verify certificate' : 'Send message'}</Button>
        </form>
      )
    }
    return null
  }

  return (
    <div className="public-portal-page">
      <header className="portal-public-header">
        <div className="container portal-public-header__inner">
          <AppLink to="/" className="brand">
            <PortalImage src={logo} alt="Chiyambi Learning Platform" />
            <span>
              <strong>Chiyambi</strong>
              <small>Learning Platform</small>
            </span>
          </AppLink>
          <nav>
            {publicNav.map((item) => (
              <AppLink key={item.id} to={item.path}>
                {item.title}
              </AppLink>
            ))}
          </nav>
          <div className="portal-public-actions">
            <AppLink to="/login" className="button button--secondary">
              Log in
            </AppLink>
            <AppLink to="/account/choose" className="button button--primary">
              Start free
            </AppLink>
          </div>
        </div>
      </header>
      <main>
        <section className="public-page-hero">
          <div>
            <h1>{page.id === 'W5' ? selectedStage.name : page.title}</h1>
            <p>
              {page.id === 'W5'
                ? `${selectedStage.age}. Outcomes, course outline and package options for this learning stage.`
                : `${page.purpose}. Thoughtfully designed for Malawi’s families, teachers and young learners.`}
            </p>
          </div>
        </section>
        <section className="public-page-content">{renderContent()}</section>
      </main>
      <SiteFooter language={footerLanguage} />
    </div>
  )
}

function AuthPortalPage({ page }: { page: PageSpec }) {
  const [complete, setComplete] = useState(false)
  const nextRoute =
    page.id === 'A2' || page.id === 'A3' || page.id === 'A4'
      ? '/account/verify'
      : page.id === 'A5'
        ? '/onboarding/setup'
        : page.id === 'A7'
          ? '/reset-password'
          : page.id === 'A8'
            ? '/login'
            : page.id === 'A9'
              ? '/onboarding/package'
              : page.id === 'A3'
                ? '/teacher'
                : '/parent'
  const accountChoices = [
    [
      'users',
      'Parent or guardian',
      'Create child profiles and follow progress',
      '/account/parent-sign-up',
    ],
    ['award', 'Teacher', 'Train, certify or lead live classes', '/account/teacher-sign-up'],
    ['book', 'School or centre', 'Register your organisation', '/account/centre-sign-up'],
  ]

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setComplete(true)
  }

  return (
    <div className="auth-page">
      <aside className="auth-story">
        <PortalImage
          className="auth-story__photo"
          src={classroomPhoto}
          alt="Children learning and playing together"
        />
        <AppLink to="/" className="brand brand--light">
          <PortalImage src={footerLogo} alt="Chiyambi Learning Platform" />
          <span>
            <strong>Chiyambi</strong>
            <small>Learning Platform</small>
          </span>
        </AppLink>
        <div>
          <span className="eyebrow eyebrow--light">
            <Icon name="leaf" size={18} />A safe beginning
          </span>
          <h2>Small steps open big worlds.</h2>
          <p>Set up a warm, personal learning experience in just a few minutes.</p>
        </div>
        <small>No ads, parent-controlled and low-data friendly</small>
      </aside>
      <main className="auth-main">
        <div className="auth-top">
          <AppLink to="/portal">← All pages</AppLink>
          <span>{page.id}</span>
        </div>
        <div className="auth-panel">
          {complete ? (
            <div className="auth-complete">
              <span>
                <Icon name="check" size={36} />
              </span>
              <h1>That step is complete.</h1>
              <p>
                This frontend preview has validated the interaction without storing personal
                information.
              </p>
              <AppLink to={nextRoute} className="button button--primary">
                Continue to the next step
              </AppLink>
              <button onClick={() => setComplete(false)}>Go back</button>
            </div>
          ) : (
            <>
              <span className="auth-step">{page.id}, Account setup</span>
              <h1>{page.title}</h1>
              <p className="auth-intro">{page.purpose}</p>
              {page.id === 'A1' ? (
                <div className="account-choices">
                  {accountChoices.map(([icon, title, text, path]) => (
                    <AppLink to={path} key={title}>
                      <span>
                        <Icon name={icon as IconName} />
                      </span>
                      <div>
                        <strong>{title}</strong>
                        <small>{text}</small>
                      </div>
                      <Icon name="arrow" />
                    </AppLink>
                  ))}
                </div>
              ) : page.id === 'A10' ? (
                <div className="auth-packages">
                  {['Standard', 'Premium'].map((name) => (
                    <button key={name} onClick={() => setComplete(true)}>
                      <span
                        className={`badge badge--${name === 'Premium' ? 'premium' : 'standard'}`}
                      >
                        {name}
                      </span>
                      <strong>
                        {name === 'Premium'
                          ? 'Learning with live teacher support'
                          : 'Independent structured learning'}
                      </strong>
                      <small>One month free, then choose whether to continue.</small>
                    </button>
                  ))}
                </div>
              ) : (
                <form className="auth-form" onSubmit={submit}>
                  {page.id === 'A5' ? (
                    <div>
                      <label>6-digit verification code</label>
                      <input inputMode="numeric" maxLength={6} placeholder="000 000" required />
                    </div>
                  ) : page.id === 'A7' ? (
                    <div>
                      <label>Email address or phone number</label>
                      <input placeholder="Enter your email or phone" required />
                    </div>
                  ) : page.id === 'A8' ? (
                    <>
                      <div>
                        <label>New password</label>
                        <input type="password" required />
                      </div>
                      <div>
                        <label>Confirm new password</label>
                        <input type="password" required />
                      </div>
                    </>
                  ) : page.id === 'A9' ? (
                    <>
                      <div className="form-row">
                        <div>
                          <label>Child’s first name</label>
                          <input required />
                        </div>
                        <div>
                          <label>Month and year of birth</label>
                          <input type="month" required />
                        </div>
                      </div>
                      <div>
                        <label>Suggested starting stage</label>
                        <select defaultValue="upper">
                          <option value="baby">Baby Class</option>
                          <option value="lower">Lower Nursery</option>
                          <option value="upper">Upper Nursery</option>
                          <option value="reception">Reception</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-row">
                        <div>
                          <label>{page.id === 'A6' ? 'Email or phone' : 'First name'}</label>
                          <input required />
                        </div>
                        {page.id !== 'A6' && (
                          <div>
                            <label>Last name</label>
                            <input required />
                          </div>
                        )}
                      </div>
                      {['A2', 'A3', 'A4'].includes(page.id) && (
                        <div>
                          <label>{page.id === 'A4' ? 'Centre name' : 'Phone number'}</label>
                          <input required />
                        </div>
                      )}
                      <div>
                        <label>Password</label>
                        <input type="password" required />
                      </div>
                    </>
                  )}
                  <Button type="submit">
                    {page.id === 'A6'
                      ? 'Log in securely'
                      : page.id === 'A7'
                        ? 'Send reset instructions'
                        : 'Continue'}
                  </Button>
                </form>
              )}
              {page.id === 'A6' && (
                <div className="auth-account-links">
                  <AppLink to="/forgot-password">Forgot password?</AppLink>
                  <AppLink to="/reset-password">Reset password</AppLink>
                </div>
              )}
              {['A2', 'A3', 'A4'].includes(page.id) && (
                <p className="auth-login-prompt">
                  Already have an account? <AppLink to="/login">Log in</AppLink>
                </p>
              )}
              <p className="auth-safe">
                <Icon name="shield" size={17} />
                Protected, private and designed for adult account holders.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

const roleNavigation: Record<
  Exclude<AreaKey, 'public' | 'auth' | 'system'>,
  { label: string; path: string; icon: IconName }[]
> = {
  child: [
    { label: 'Learn', path: '/learn', icon: 'play' },
    { label: 'Courses', path: '/learn/stage', icon: 'book' },
    { label: 'Rewards', path: '/learn/rewards', icon: 'award' },
    { label: 'Live', path: '/learn/live', icon: 'users' },
    { label: 'Me', path: '/learn/settings', icon: 'leaf' },
  ],
  parent: [
    { label: 'Home', path: '/parent', icon: 'device' },
    { label: 'Children', path: '/parent/children', icon: 'users' },
    { label: 'Progress', path: '/parent/progress', icon: 'chart' },
    { label: 'Live classes', path: '/parent/live', icon: 'calendar' },
    { label: 'Library', path: '/parent/library', icon: 'book' },
    { label: 'Messages', path: '/parent/messages', icon: 'message' },
    { label: 'Plan and billing', path: '/parent/subscription', icon: 'wallet' },
  ],
  teacher: [
    { label: 'Home', path: '/teacher', icon: 'device' },
    { label: 'Verification', path: '/teacher/profile', icon: 'shield' },
    { label: 'Training', path: '/teacher/training', icon: 'book' },
    { label: 'Certificates', path: '/teacher/certificates', icon: 'award' },
    { label: 'Classes', path: '/teacher/classes', icon: 'calendar' },
    { label: 'Messages', path: '/teacher/messages', icon: 'message' },
    { label: 'Report incident', path: '/teacher/incident', icon: 'shield' },
  ],
  school: [
    { label: 'Home', path: '/centre', icon: 'device' },
    { label: 'Teachers', path: '/centre/teachers', icon: 'award' },
    { label: 'Learners', path: '/centre/learners', icon: 'users' },
    { label: 'Billing', path: '/centre/billing', icon: 'wallet' },
    { label: 'Reports', path: '/centre/reports', icon: 'chart' },
  ],
  admin: [
    { label: 'Dashboard', path: '/platform-admin', icon: 'device' },
    { label: 'Users', path: '/platform-admin/users', icon: 'users' },
    { label: 'Teacher approvals', path: '/platform-admin/teachers', icon: 'shield' },
    { label: 'Content', path: '/platform-admin/content', icon: 'book' },
    { label: 'Packages', path: '/platform-admin/packages', icon: 'wallet' },
    { label: 'Live sessions', path: '/platform-admin/live', icon: 'calendar' },
    { label: 'Payments', path: '/platform-admin/payments', icon: 'wallet' },
    { label: 'Moderation', path: '/platform-admin/moderation', icon: 'shield' },
    { label: 'Analytics', path: '/platform-admin/analytics', icon: 'chart' },
    { label: 'Settings', path: '/platform-admin/settings', icon: 'lock' },
  ],
}

function PortalNotice({ text }: { text: string }) {
  return text ? (
    <div className="portal-notice" role="status">
      <Icon name="check" size={18} />
      {text}
    </div>
  ) : null
}

function ParentPortalBody({ page }: { page: PageSpec }) {
  const [notice, setNotice] = useState('')
  const [child, setChild] = useState('Tadala')
  const [selectedDay, setSelectedDay] = useState(14)
  const [bookingMonth, setBookingMonth] = useState('November 2026')

  if (page.id === 'P1') {
    return (
      <div className="parent-workspace">
        <section className="parent-child-switcher">
          <div>
            <span>Viewing progress for</span>
            <h2>{child}</h2>
            <small>Upper Nursery, age 4</small>
          </div>
          <div>
            {['Tadala', 'Mwayi'].map((name) => (
              <button
                className={child === name ? 'active' : ''}
                onClick={() => setChild(name)}
                key={name}
              >
                {name[0]}
                <span>{name}</span>
              </button>
            ))}
            <button onClick={() => navigate('/parent/children/edit')}>
              +<span>Add child</span>
            </button>
          </div>
        </section>
        <div className="parent-overview-grid">
          <article className="screen-time-card">
            <div className="time-ring">
              <strong>28</strong>
              <span>of 45 min</span>
            </div>
            <div>
              <span>Today’s screen time</span>
              <h3>17 minutes remaining</h3>
              <p>The daily limit resets at midnight.</p>
              <AppLink to="/parent/controls">Adjust limit</AppLink>
            </div>
          </article>
          <article className="parent-progress-snapshot">
            <span>This week</span>
            <h3>4 learning days</h3>
            <div className="week-dots">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <span className={index < 4 ? 'done' : ''} key={`${day}-${index}`}>
                  {day}
                </span>
              ))}
            </div>
            <AppLink to="/parent/progress">View full progress</AppLink>
          </article>
        </div>
        <div className="parent-dashboard-lower">
          <section>
            <div className="actor-panel-heading">
              <div>
                <span>Skills taking shape</span>
                <h3>Upper Nursery progress</h3>
              </div>
              <AppLink to="/parent/reports">Reports</AppLink>
            </div>
            {[
              ['Letter sounds', 82],
              ['Listening and stories', 74],
              ['Counting to 10', 65],
            ].map(([skill, value]) => (
              <div className="skill-row" key={skill as string}>
                <div>
                  <strong>{skill}</strong>
                  <span>{value}%</span>
                </div>
                <div>
                  <span style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </section>
          <section className="parent-next-step">
            <span className="badge badge--premium">Next live class</span>
            <h3>Sounds around us</h3>
            <p>Thursday at 15:00 with Teacher Thandi</p>
            <Button to="/parent/live">Review booking</Button>
          </section>
        </div>
      </div>
    )
  }

  if (page.id === 'P2') {
    return (
      <div className="profile-management">
        {[
          ['Tadala', 'Upper Nursery', '82%', '#12807c'],
          ['Mwayi', 'Baby Class', '36%', '#0a7a9c'],
        ].map(([name, stageName, progressValue, color]) => (
          <article key={name}>
            <span style={{ background: color }}>{name[0]}</span>
            <div>
              <h3>{name}</h3>
              <p>{stageName}</p>
              <small>{progressValue} stage progress</small>
            </div>
            <AppLink to="/parent/progress">View progress</AppLink>
            <AppLink to="/parent/children/edit">Edit profile</AppLink>
          </article>
        ))}
        <button className="add-profile-card" onClick={() => navigate('/parent/children/edit')}>
          <span>+</span>
          <strong>Add another child</strong>
          <small>Profiles stay inside your adult account</small>
        </button>
      </div>
    )
  }

  if (page.id === 'P3') {
    return (
      <form
        className="actor-form parent-profile-form"
        onSubmit={(event) => {
          event.preventDefault()
          setNotice('Child profile saved.')
        }}
      >
        <div className="avatar-picker">
          <span>T</span>
          <button type="button">Choose avatar</button>
        </div>
        <div className="actor-form-grid">
          <label>
            Nickname
            <input defaultValue="Tadala" />
          </label>
          <label>
            Birth year
            <input type="number" defaultValue="2022" />
          </label>
          <label>
            Suggested stage
            <select defaultValue="upper">
              <option value="baby">Baby Class</option>
              <option value="lower">Lower Nursery</option>
              <option value="upper">Upper Nursery</option>
              <option value="reception">Reception</option>
            </select>
          </label>
          <label>
            Profile PIN
            <input inputMode="numeric" maxLength={4} placeholder="Optional 4-digit PIN" />
          </label>
        </div>
        <div className="actor-form-actions">
          <Button type="submit">Save child profile</Button>
          <Button variant="secondary" to="/parent/children">
            Cancel
          </Button>
        </div>
        <PortalNotice text={notice} />
      </form>
    )
  }

  if (page.id === 'P4') {
    return (
      <div className="parent-progress-page">
        <div className="progress-hero">
          <div>
            <span>Stage progress</span>
            <strong>82%</strong>
            <small>13 of 16 learning adventures</small>
          </div>
          <div className="progress-bars-vertical">
            {[58, 72, 45, 88, 76, 92, 68].map((value, i) => (
              <span key={i} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
        <div className="parent-progress-cards">
          {[
            ['clock', '3h 24m', 'Learning time this week'],
            ['check', '13', 'Lessons completed'],
            ['award', '128', 'Stars collected'],
            ['book', '4', 'Skills improving'],
          ].map(([icon, value, label]) => (
            <article key={label}>
              <Icon name={icon as IconName} />
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <section className="skill-detail-panel">
          <h3>Skill development</h3>
          {[
            'Recognises common sounds',
            'Counts objects to 10',
            'Follows a short story',
            'Names familiar colours',
          ].map((skill, i) => (
            <div key={skill}>
              <span>
                <Icon name={i < 3 ? 'check' : 'clock'} size={17} />
              </span>
              <strong>{skill}</strong>
              <small>{i < 3 ? 'Growing confidently' : 'Keep practising'}</small>
            </div>
          ))}
        </section>
      </div>
    )
  }

  if (page.id === 'P5' || page.id === 'P6') {
    const reports = [
      ['October learning report', '1–31 October', 'Ready'],
      ['September learning report', '1–30 September', 'Emailed'],
      ['Stage milestone summary', 'Upper Nursery', 'Ready'],
    ]
    return page.id === 'P5' ? (
      <div className="report-list">
        {reports.map(([title, period, status]) => (
          <article key={title}>
            <span>
              <Icon name="chart" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{period}</p>
            </div>
            <span className="status status--active">{status}</span>
            <AppLink to="/parent/reports/latest">Open report</AppLink>
          </article>
        ))}
      </div>
    ) : (
      <article className="report-detail">
        <header>
          <div>
            <span>October 2026</span>
            <h2>Tadala’s learning report</h2>
            <p>Upper Nursery</p>
          </div>
          <Button variant="secondary" onClick={() => setNotice('Report prepared for email.')}>
            Email report
          </Button>
        </header>
        <div className="report-highlight">
          <Icon name="award" size={34} />
          <div>
            <strong>A confident month</strong>
            <p>Tadala completed 13 lessons and showed strong growth in letter sounds.</p>
          </div>
        </div>
        <div className="report-columns">
          <section>
            <h3>What is going well</h3>
            <ul>
              <li>Recognising initial sounds</li>
              <li>Listening to complete stories</li>
              <li>Counting familiar objects</li>
            </ul>
          </section>
          <section>
            <h3>Try next at home</h3>
            <ul>
              <li>Name objects beginning with M</li>
              <li>Count fruit while preparing meals</li>
              <li>Retell a favourite short story</li>
            </ul>
          </section>
        </div>
        <PortalNotice text={notice} />
      </article>
    )
  }

  if (page.id === 'P7') {
    return (
      <div className="support-recommendations">
        {[
          [
            'Sound hunt at home',
            'Find three objects beginning with M',
            '10 minutes',
            'High priority',
          ],
          [
            'Count the market basket',
            'Practise counting real fruit or vegetables',
            '8 minutes',
            'Recommended',
          ],
          [
            'Retell a favourite story',
            'Use pictures to remember the beginning, middle and end',
            '12 minutes',
            'This week',
          ],
        ].map(([title, text, time, priority], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <div>
              <small>{priority}</small>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>
                <Icon name="clock" size={16} />
                {time}
              </strong>
            </div>
            <button onClick={() => setNotice(`${title} added to your home plan.`)}>
              Add to plan
            </button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  }

  if (page.id === 'P8' || page.id === 'P9') {
    return page.id === 'P8' ? (
      <div className="parent-library-grid">
        {[
          [readingPhoto, 'Reading together', 'Make stories feel alive at home'],
          [classroomPhoto, 'Learning through play', 'Everyday games for growing minds'],
          [childReadingPhoto, 'Two-language learning', 'Support English and Chichewa'],
          [parentPhoto, 'Healthy routines', 'Balance learning, play and rest'],
        ].map(([image, title, text]) => (
          <article key={title}>
            <PortalImage src={image} alt="" />
            <div>
              <span>Parent guide</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <AppLink to="/parent/library/reading">Read guide</AppLink>
            </div>
          </article>
        ))}
      </div>
    ) : (
      <article className="parent-guide">
        <PortalImage src={readingPhoto} alt="A parent reading together with a child" />
        <span>Upper Nursery parent guide</span>
        <h2>Make story time more magical</h2>
        <p>Short, repeated stories help young children build language, memory and confidence.</p>
        <h3>Three things to try tonight</h3>
        <ol>
          <li>Let your child choose the story.</li>
          <li>Pause and ask what might happen next.</li>
          <li>Retell one part in Chichewa or English.</li>
        </ol>
        <Button onClick={() => setNotice('Guide saved to your library.')}>Save this guide</Button>
        <PortalNotice text={notice} />
      </article>
    )
  }

  if (page.id === 'P10') {
    return (
      <div className="parent-controls">
        <section>
          <div>
            <h3>Daily screen-time limit</h3>
            <p>Applies to Tadala’s learning profile.</p>
          </div>
          <select defaultValue="45">
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </section>
        <section>
          <div>
            <h3>Learning hours</h3>
            <p>Choose when lessons can be opened.</p>
          </div>
          <button onClick={() => setNotice('Learning hours updated.')}>07:00 to 19:00</button>
        </section>
        {[
          'Require PIN to exit child mode',
          'Allow Premium live classes',
          'Use data-saver mode',
          'Keep selected lessons offline',
        ].map((label, i) => (
          <section key={label}>
            <div>
              <h3>{label}</h3>
              <p>
                {i === 0
                  ? 'Protects adult settings and external links.'
                  : 'This setting applies only to Tadala.'}
              </p>
            </div>
            <label className="switch">
              <input type="checkbox" defaultChecked={i !== 2} />
              <span />
            </label>
          </section>
        ))}
        <Button onClick={() => setNotice('Parental controls saved.')}>Save controls</Button>
        <PortalNotice text={notice} />
      </div>
    )
  }

  if (page.id === 'P11' || page.id === 'P12') {
    return (
      <div className="parent-booking-page">
        <div className="booking-calendar">
          <header>
            <button
              onClick={() => {
                setBookingMonth('October 2026')
                setNotice('Showing October classes.')
              }}
            >
              ←
            </button>
            <h3>{bookingMonth}</h3>
            <button
              onClick={() => {
                setBookingMonth('December 2026')
                setNotice('Showing December classes.')
              }}
            >
              →
            </button>
          </header>
          <div>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <strong key={`${day}-${i}`}>{day}</strong>
            ))}
            {Array.from({ length: 28 }, (_, i) => (
              <button
                className={i + 1 === selectedDay ? 'selected' : ''}
                key={i}
                onClick={() => setSelectedDay(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <section>
          <span className="badge badge--premium">Premium classes</span>
          <h2>{page.id === 'P11' ? 'Available on 14 November' : 'Your upcoming bookings'}</h2>
          {[
            ['Sounds around us', '15:00', 'Teacher Thandi'],
            ['Story circle', '16:30', 'Teacher Mercy'],
          ].map(([title, time, teacher]) => (
            <article key={title}>
              <div>
                <strong>{time}</strong>
                <span>45 min</span>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{teacher}, Upper Nursery</p>
              </div>
              <button
                onClick={() => setNotice(page.id === 'P11' ? 'Class booked.' : 'Booking opened.')}
              >
                {page.id === 'P11' ? 'Book' : 'Manage'}
              </button>
            </article>
          ))}
          <PortalNotice text={notice} />
        </section>
      </div>
    )
  }

  if (page.id === 'P13') {
    return <ActorMessageCentre role="parent" />
  }

  if (page.id === 'P14') {
    return (
      <div className="notification-centre">
        {[
          ['calendar', 'Live class starts tomorrow', 'Sounds around us at 15:00', 'New'],
          ['chart', 'October report is ready', 'See Tadala’s latest progress', 'Report'],
          ['wallet', 'Trial ends in 8 days', 'Choose a plan to keep lessons open', 'Billing'],
          ['message', 'Teacher Thandi replied', 'A new home activity is waiting', 'Message'],
        ].map(([icon, title, text, type], i) => (
          <article className={i === 0 ? 'unread' : ''} key={title}>
            <span>
              <Icon name={icon as IconName} />
            </span>
            <div>
              <small>{type}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <button onClick={() => setNotice(`${title} marked as read.`)}>Mark read</button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  }

  if (page.id === 'P15') {
    return (
      <div className="parent-plan-page">
        <section className="current-plan">
          <div>
            <span className="badge badge--trial">Free trial</span>
            <h2>Premium family plan</h2>
            <p>Trial ends 22 November 2026</p>
          </div>
          <strong>8 days left</strong>
        </section>
        <section className="plan-benefits">
          <h3>Your plan includes</h3>
          {[
            'Two child profiles',
            'All stage lessons',
            'Offline learning',
            'Parent progress reports',
            'Live teacher classes',
          ].map((item) => (
            <span key={item}>
              <Icon name="check" size={17} />
              {item}
            </span>
          ))}
        </section>
        <div className="plan-actions">
          <Button to="/parent/checkout">Continue Premium</Button>
          <Button variant="secondary" to="/pricing">
            Compare packages
          </Button>
          <AppLink to="/parent/payments">View payment history</AppLink>
        </div>
      </div>
    )
  }

  if (page.id === 'P16') {
    return (
      <form
        className="checkout-page"
        onSubmit={(event) => {
          event.preventDefault()
          setNotice('Payment request created securely.')
        }}
      >
        <section>
          <span className="badge badge--premium">Premium</span>
          <h2>Family plan</h2>
          <div>
            <span>12 months</span>
            <strong>MWK 120,000</strong>
          </div>
          <div>
            <span>Discount</span>
            <strong>MWK 0</strong>
          </div>
          <div className="total">
            <span>Total</span>
            <strong>MWK 120,000</strong>
          </div>
        </section>
        <section>
          <h3>Choose payment method</h3>
          <label className="payment-choice">
            <input type="radio" name="payment" defaultChecked />
            <span>
              <Icon name="phone" />
              <strong>Mobile money</strong>
              <small>Approve the request on your phone</small>
            </span>
          </label>
          <label className="payment-choice">
            <input type="radio" name="payment" />
            <span>
              <Icon name="wallet" />
              <strong>Bank transfer</strong>
              <small>Use a unique payment reference</small>
            </span>
          </label>
          <label>
            Mobile number
            <input placeholder="+265" required />
          </label>
          <Button type="submit">Continue to payment</Button>
          <PortalNotice text={notice} />
        </section>
      </form>
    )
  }

  if (page.id === 'P17') {
    return (
      <ActorTable
        title="Family payment history"
        columns={['Reference', 'Description', 'Amount', 'Status']}
        rows={[
          ['CHI-PAY-1042', 'Premium annual plan', 'MWK 120,000', 'Paid'],
          ['CHI-PAY-0881', 'Standard monthly plan', 'MWK 12,000', 'Paid'],
          ['CHI-PAY-0744', 'Premium monthly plan', 'MWK 18,000', 'Refunded'],
        ]}
      />
    )
  }

  return (
    <form
      className="actor-form"
      onSubmit={(event) => {
        event.preventDefault()
        setNotice('Account preferences saved.')
      }}
    >
      <h2>Parent account preferences</h2>
      <div className="actor-form-grid">
        <label>
          Full name
          <input defaultValue="Grace Banda" />
        </label>
        <label>
          Preferred language
          <select>
            <option>English</option>
            <option>Chichewa</option>
          </select>
        </label>
        <label>
          Email reports
          <select>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Off</option>
          </select>
        </label>
        <label>
          Security alerts
          <select>
            <option>Email and SMS</option>
            <option>Email only</option>
          </select>
        </label>
      </div>
      <div className="consent-panel">
        <Icon name="shield" />
        <div>
          <strong>Consent and data</strong>
          <p>Review consent records, request a copy of your data or request account deletion.</p>
        </div>
        <button type="button" onClick={() => setNotice('Data request options opened.')}>
          Manage data
        </button>
      </div>
      <Button type="submit">Save account settings</Button>
      <PortalNotice text={notice} />
    </form>
  )
}

function ActorMessageCentre({ role }: { role: 'parent' | 'teacher' }) {
  const [sent, setSent] = useState(false)
  const [selected, setSelected] = useState(0)
  const names =
    role === 'parent' ? ['Teacher Thandi', 'Chiyambi support'] : ['Grace Banda', 'Mwayi’s guardian']
  return (
    <div className={`actor-messages actor-messages--${role}`}>
      <aside>
        {names.map((name, i) => (
          <button
            className={i === selected ? 'active' : ''}
            key={name}
            onClick={() => setSelected(i)}
          >
            <span>{name[0]}</span>
            <div>
              <strong>{name}</strong>
              <small>{i === 0 ? 'New message today' : 'Last active Monday'}</small>
            </div>
          </button>
        ))}
      </aside>
      <section>
        <header>
          <strong>{names[0]}</strong>
          <small>{role === 'parent' ? 'Upper Nursery teacher' : 'Parent of Tadala'}</small>
        </header>
        <div>
          <p className="incoming">
            {role === 'parent'
              ? 'Tadala joined confidently today and enjoyed the sound game.'
              : 'Hello Teacher, what can we practise before Thursday?'}
          </p>
          <p className="outgoing">
            {role === 'parent'
              ? 'Thank you. What should we practise next?'
              : 'Try naming familiar objects beginning with M.'}
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          <input placeholder="Write a private adult message" />
          <button type="submit">
            <Icon name="arrow" />
          </button>
        </form>
        {sent && <small>Message sent. Text only, no child messaging.</small>}
      </section>
    </div>
  )
}

function ActorTable({
  title,
  columns,
  rows,
}: {
  title: string
  columns: string[]
  rows: string[][]
}) {
  const detailPath = title.includes('users')
    ? '/platform-admin/users/detail'
    : title.includes('teacher')
      ? '/teacher/profile'
      : title.includes('learner')
        ? '/parent/progress'
        : title.includes('session')
          ? '/platform-admin/live'
          : title.includes('payment')
            ? '/platform-admin/payments'
            : title.includes('certificate')
              ? '/verify-certificate'
              : '/portal'
  return (
    <section className="actor-table">
      <header>
        <div>
          <span>Management view</span>
          <h2>{title}</h2>
        </div>
        <label>
          <Icon name="book" size={17} />
          <input placeholder="Search" />
        </label>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
                <td>
                  <button onClick={() => navigate(detailPath)}>Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TeacherPortalBody({ page }: { page: PageSpec }) {
  const [notice, setNotice] = useState('')
  if (page.id === 'T1') {
    return (
      <div className="teacher-workspace">
        <section className="teacher-status-banner">
          <div>
            <span className="badge badge--standard">ECD learner-teacher</span>
            <h2>Your Upper Nursery training is 68% complete.</h2>
            <p>Finish two modules and one practical task to unlock the assessment.</p>
          </div>
          <Button to="/teacher/training/stage">Continue training</Button>
        </section>
        <div className="teacher-dashboard-grid">
          <section>
            <div className="actor-panel-heading">
              <div>
                <span>Certification pathway</span>
                <h3>Stage progress</h3>
              </div>
              <AppLink to="/teacher/training">Full pathway</AppLink>
            </div>
            {['Baby Class', 'Lower Nursery', 'Upper Nursery', 'Reception'].map((stageName, i) => (
              <div className="training-stage-row" key={stageName}>
                <span className={i < 2 ? 'complete' : i === 2 ? 'current' : ''}>
                  {i < 2 ? <Icon name="check" size={16} /> : i + 1}
                </span>
                <div>
                  <strong>{stageName}</strong>
                  <small>
                    {i < 2
                      ? 'Certified'
                      : i === 2
                        ? '3 of 5 modules complete'
                        : 'Locked until previous stage'}
                  </small>
                </div>
                {i === 2 && <AppLink to="/teacher/training/stage">Continue</AppLink>}
              </div>
            ))}
          </section>
          <section className="teacher-schedule-card">
            <span>Live-class applicant</span>
            <h3>Verification pending</h3>
            <p>Identity review normally takes 2–3 working days.</p>
            <AppLink to="/teacher/profile">Review documents</AppLink>
            <hr />
            <strong>Next training task</strong>
            <p>Submit a language-rich play observation.</p>
            <AppLink to="/teacher/assessments">Open assessment</AppLink>
          </section>
        </div>
      </div>
    )
  }
  if (page.id === 'T2') {
    return (
      <div className="teacher-verification">
        <section>
          <span className="status status--review">Review in progress</span>
          <h2>Live-class teacher verification</h2>
          <p>Your profile is visible only to the Chiyambi verification team.</p>
          <div className="verification-steps">
            {[
              'Personal details',
              'Qualifications',
              'Identity document',
              'Safeguarding declaration',
            ].map((step, i) => (
              <div key={step}>
                <span className={i < 3 ? 'done' : ''}>
                  {i < 3 ? <Icon name="check" size={16} /> : 4}
                </span>
                <strong>{step}</strong>
                <small>{i < 3 ? 'Received' : 'Needs signature'}</small>
              </div>
            ))}
          </div>
        </section>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setNotice('Verification documents submitted.')
          }}
        >
          <label>
            Teaching qualification
            <input defaultValue="ECD Certificate Level 3" />
          </label>
          <label>
            Identity document
            <div className="upload-field">
              <Icon name="shield" />
              <span>
                <strong>national-id.pdf</strong>
                <small>Uploaded, 1.8 MB</small>
              </span>
              <button type="button">Replace</button>
            </div>
          </label>
          <label className="check-label">
            <input type="checkbox" required />I confirm that the information provided is accurate.
          </label>
          <Button type="submit">Submit for verification</Button>
          <PortalNotice text={notice} />
        </form>
      </div>
    )
  }
  if (page.id === 'T3') return <ActorMessageCentre role="teacher" />
  if (page.id === 'T4') {
    return (
      <div className="teacher-alerts">
        {[
          ['Assessment feedback received', 'Upper Nursery practical task', 'Open feedback'],
          ['Live class assigned', 'Friday at 10:30, Reception', 'View class'],
          ['Certificate ready', 'Lower Nursery certificate', 'View certificate'],
        ].map(([title, text, action], i) => (
          <article key={title}>
            <span>
              <Icon name={i === 0 ? 'book' : i === 1 ? 'calendar' : 'award'} />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <button onClick={() => setNotice(`${title} opened.`)}>{action}</button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  }
  if (page.id === 'T5') {
    return (
      <form
        className="actor-form teacher-preferences"
        onSubmit={(e) => {
          e.preventDefault()
          setNotice('Teacher preferences saved.')
        }}
      >
        <h2>Teaching and account preferences</h2>
        <div className="actor-form-grid">
          <label>
            Interface language
            <select>
              <option>English</option>
              <option>Chichewa</option>
            </select>
          </label>
          <label>
            Class reminder
            <select>
              <option>1 hour before</option>
              <option>1 day before</option>
            </select>
          </label>
          <label>
            Training email updates
            <select>
              <option>Weekly</option>
              <option>Off</option>
            </select>
          </label>
          <label>
            Two-step verification
            <select>
              <option>SMS code</option>
              <option>Authenticator app</option>
            </select>
          </label>
        </div>
        <Button type="submit">Save preferences</Button>
        <PortalNotice text={notice} />
      </form>
    )
  }
  if (page.id === 'T6' || page.id === 'T7') {
    return (
      <div className="teacher-training-path">
        <header>
          <div>
            <span>Professional learning</span>
            <h2>
              {page.id === 'T6' ? 'Your certification pathway' : 'Upper Nursery training outline'}
            </h2>
          </div>
          <div>
            <strong>68%</strong>
            <span>current stage</span>
          </div>
        </header>
        {(page.id === 'T6'
          ? [
              'Baby Class',
              'Lower Nursery',
              'Upper Nursery',
              'Reception',
              'Standard 1',
              'Standard 2',
            ]
          : [
              'How young children learn',
              'Language-rich play',
              'Early number concepts',
              'Observation and assessment',
              'Practical demonstration',
            ]
        ).map((title, i) => (
          <article className={i < 2 ? 'complete' : i === 2 ? 'current' : 'locked'} key={title}>
            <span>{i < 2 ? <Icon name="check" /> : i + 1}</span>
            <div>
              <small>{i < 2 ? 'Complete' : i === 2 ? 'Continue here' : 'Upcoming'}</small>
              <h3>{title}</h3>
              <p>
                {page.id === 'T6'
                  ? i < 2
                    ? 'Certificate earned'
                    : i === 2
                      ? '3 of 5 modules complete'
                      : 'Complete the previous stage first'
                  : `${i + 2} lessons, one knowledge check${i === 4 ? ' and practical review' : ''}`}
              </p>
            </div>
            {i === 2 && <Button to="/teacher/training/lesson">Continue</Button>}
          </article>
        ))}
      </div>
    )
  }
  if (page.id === 'T8') {
    return (
      <div className="teacher-lesson">
        <section>
          <PortalImage src={classroomPhoto} alt="Children taking part in a classroom activity" />
          <button onClick={() => setNotice('Training video started.')}>
            <Icon name="play" size={35} />
          </button>
        </section>
        <aside>
          <span>Module 3, Lesson 2</span>
          <h2>Creating language-rich play</h2>
          <p>
            Learn how purposeful questions, repetition and local materials help children build
            language.
          </p>
          <h3>In this lesson</h3>
          <ul>
            <li>Plan an open-ended play activity</li>
            <li>Use English and Chichewa prompts</li>
            <li>Observe without interrupting play</li>
          </ul>
          <Button onClick={() => setNotice('Lesson marked complete.')}>Mark complete</Button>
          <PortalNotice text={notice} />
        </aside>
      </div>
    )
  }
  if (page.id === 'T9') {
    return (
      <div className="teacher-assessments">
        {[
          ['Upper Nursery knowledge check', '20 questions', 'Ready'],
          ['Language-rich play observation', 'Practical upload', 'Needs submission'],
          ['Child safeguarding essentials', '15 questions', 'Passed, 92%'],
        ].map(([title, type, status], i) => (
          <article key={title}>
            <span>
              <Icon name={i === 2 ? 'check' : 'book'} />
            </span>
            <div>
              <small>{type}</small>
              <h3>{title}</h3>
              <p>{status}</p>
            </div>
            <button onClick={() => setNotice(`${title} opened.`)}>
              {i === 2 ? 'Review' : 'Start'}
            </button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  }
  if (page.id === 'T10') {
    return (
      <div className="certificate-gallery">
        {[
          ['Lower Nursery', 'CHI-TCH-2026-0281', 'Issued 4 October'],
          ['Baby Class', 'CHI-TCH-2026-0156', 'Issued 18 August'],
        ].map(([stageName, code, date]) => (
          <article key={code}>
            <div>
              <Icon name="award" size={45} />
              <span>Chiyambi certified</span>
            </div>
            <h3>{stageName}</h3>
            <p>{date}</p>
            <code>{code}</code>
            <div>
              <button onClick={() => setNotice('Certificate opened.')}>View</button>
              <AppLink to="/verify-certificate">Verify online</AppLink>
            </div>
          </article>
        ))}
        <article className="certificate-locked">
          <Icon name="lock" size={38} />
          <h3>All-classes certification</h3>
          <p>Complete all six stages to unlock.</p>
        </article>
        <PortalNotice text={notice} />
      </div>
    )
  }
  if (page.id === 'T11') {
    return (
      <div className="teacher-fees">
        <section>
          <span className="badge badge--standard">Current access</span>
          <h2>Upper Nursery training</h2>
          <p>Access active until certification is complete.</p>
          <strong>MWK 18,000 paid</strong>
        </section>
        <section>
          <span>Next stage</span>
          <h2>Reception training</h2>
          <p>Unlock modules, assessment and stage certificate.</p>
          <strong>MWK 22,000</strong>
          <Button onClick={() => setNotice('Payment options opened.')}>Pay access fee</Button>
        </section>
        <PortalNotice text={notice} />
      </div>
    )
  }
  if (page.id === 'T12' || page.id === 'T13') {
    return (
      <div className="teacher-live-console">
        <section className="teacher-day-schedule">
          <header>
            <span>Friday, 15 November</span>
            <h2>3 assigned classes</h2>
          </header>
          {[
            ['09:00', 'Baby Class', 'First sounds', '4 learners'],
            ['10:30', 'Reception', 'Story circle', '6 learners'],
            ['14:00', 'Upper Nursery', 'Sounds around us', '6 learners'],
          ].map(([time, stageName, title, count], i) => (
            <article className={i === 1 ? 'next' : ''} key={time}>
              <strong>{time}</strong>
              <div>
                <small>{stageName}</small>
                <h3>{title}</h3>
                <p>{count}</p>
              </div>
              <button onClick={() => navigate('/teacher/classes/live')}>
                {i === 1 ? 'Open room' : 'View'}
              </button>
            </article>
          ))}
        </section>
        <aside>
          <span className="status status--active">Host controls ready</span>
          <h3>Before you begin</h3>
          {[
            'Check microphone and camera',
            'Review the learner roster',
            'Open the activity guide',
            'Confirm audio-first fallback',
          ].map((item) => (
            <span key={item}>
              <Icon name="check" size={16} />
              {item}
            </span>
          ))}
          <Button onClick={() => setNotice('Classroom locked and ready for learners.')}>
            {page.id === 'T13' ? 'Start moderated room' : 'Test equipment'}
          </Button>
          <PortalNotice text={notice} />
        </aside>
      </div>
    )
  }
  if (page.id === 'T14') {
    return (
      <ActorTable
        title="Sounds around us roster"
        columns={['Learner', 'Guardian', 'Attendance', 'Observation']}
        rows={[
          ['Tadala', 'Grace Banda', 'Present', 'Confident with M sounds'],
          ['Mwayi', 'L. Phiri', 'Present', 'Needed one prompt'],
          ['Chikondi', 'A. Tembo', 'Absent', 'No note'],
          ['Tiwonge', 'P. Jere', 'Present', 'Strong story recall'],
        ]}
      />
    )
  }
  if (page.id === 'T15') {
    return (
      <form
        className="actor-form child-assessment"
        onSubmit={(e) => {
          e.preventDefault()
          setNotice('Child assessment saved for parent review.')
        }}
      >
        <h2>Record an observation</h2>
        <div className="assessment-child">
          <span>T</span>
          <div>
            <strong>Tadala Banda</strong>
            <small>Upper Nursery, Sounds around us</small>
          </div>
        </div>
        <label>
          Skill observed
          <select>
            <option>Recognises initial sounds</option>
            <option>Story listening</option>
            <option>Counting objects</option>
          </select>
        </label>
        <label>
          Level
          <div className="level-options">
            {['Needs support', 'Developing', 'Confident'].map((level) => (
              <span key={level}>
                <input type="radio" name="level" />
                {level}
              </span>
            ))}
          </div>
        </label>
        <label>
          Observation note
          <textarea rows={5} placeholder="Write a factual learning observation" />
        </label>
        <Button type="submit">Save assessment</Button>
        <PortalNotice text={notice} />
      </form>
    )
  }
  return (
    <form
      className="actor-form incident-form"
      onSubmit={(e) => {
        e.preventDefault()
        setNotice('Safety report submitted privately to the moderation team.')
      }}
    >
      <div className="incident-warning">
        <Icon name="shield" />
        <div>
          <strong>Private safety report</strong>
          <p>Reports go directly to authorised administrators and are recorded in the audit log.</p>
        </div>
      </div>
      <label>
        Class or session
        <select>
          <option>Sounds around us, 14 November</option>
          <option>Story circle, 12 November</option>
        </select>
      </label>
      <label>
        Type of concern
        <select>
          <option>Safeguarding concern</option>
          <option>Technical incident</option>
          <option>Inappropriate behaviour</option>
        </select>
      </label>
      <label>
        What happened?
        <textarea rows={6} required />
      </label>
      <Button type="submit">Submit confidential report</Button>
      <PortalNotice text={notice} />
    </form>
  )
}

function SchoolPortalBody({ page }: { page: PageSpec }) {
  const [notice, setNotice] = useState('')
  if (page.id === 'S1')
    return (
      <div className="centre-dashboard">
        <section className="centre-plan-banner">
          <div>
            <span>Chisomo Early Learning Centre</span>
            <h2>12 teachers and 84 learners</h2>
            <p>Group plan active until 30 June 2027</p>
          </div>
          <Button to="/centre/billing">Manage plan</Button>
        </section>
        <div className="centre-metrics">
          {[
            ['12', 'Teachers', '9 verified'],
            ['84', 'Learners', '71 active this week'],
            ['68%', 'Training completion', 'Up 6% this month'],
            ['4', 'Certificates earned', '2 pending review'],
          ].map(([value, label, detail]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{detail}</small>
            </article>
          ))}
        </div>
        <div className="centre-lower">
          <section>
            <div className="actor-panel-heading">
              <h3>Teacher training progress</h3>
              <AppLink to="/centre/teachers">Manage teachers</AppLink>
            </div>
            {[
              ['Mercy Phiri', 'Upper Nursery', 82],
              ['Thandi Banda', 'Reception', 74],
              ['Memory Jere', 'Lower Nursery', 55],
            ].map(([name, stageName, value]) => (
              <div className="centre-progress-row" key={name as string}>
                <span>{(name as string)[0]}</span>
                <div>
                  <strong>{name}</strong>
                  <small>{stageName}</small>
                </div>
                <div>
                  <span style={{ width: `${value}%` }} />
                </div>
                <b>{value}%</b>
              </div>
            ))}
          </section>
          <section>
            <h3>Centre actions</h3>
            <Button to="/centre/teachers">Invite teacher</Button>
            <Button variant="secondary" to="/centre/learners">
              Enrol learners
            </Button>
            <Button variant="secondary" to="/centre/reports">
              Open reports
            </Button>
          </section>
        </div>
      </div>
    )
  if (page.id === 'S2')
    return (
      <ActorTable
        title="Centre teachers"
        columns={['Teacher', 'Training stage', 'Verification', 'Progress']}
        rows={[
          ['Mercy Phiri', 'Upper Nursery', 'Verified', '82%'],
          ['Thandi Banda', 'Reception', 'Verified', '74%'],
          ['Memory Jere', 'Lower Nursery', 'Pending', '55%'],
          ['Alinafe Tembo', 'Baby Class', 'Invite sent', '0%'],
        ]}
      />
    )
  if (page.id === 'S3')
    return (
      <ActorTable
        title="Enrolled learners"
        columns={['Learner', 'Stage', 'Assigned teacher', 'Weekly activity']}
        rows={[
          ['Tadala Banda', 'Upper Nursery', 'Mercy Phiri', '4 days'],
          ['Chikondi Tembo', 'Reception', 'Thandi Banda', '3 days'],
          ['Mwayi Phiri', 'Baby Class', 'Memory Jere', '5 days'],
          ['Tiwonge Jere', 'Lower Nursery', 'Memory Jere', '2 days'],
        ]}
      />
    )
  if (page.id === 'S4')
    return (
      <div className="centre-billing">
        <section>
          <span className="badge badge--standard">Centre plan</span>
          <h2>Up to 15 teachers and 100 learners</h2>
          <p>Renews 30 June 2027</p>
          <strong>MWK 840,000 per year</strong>
          <Button onClick={() => setNotice('Plan renewal options opened.')}>Manage renewal</Button>
        </section>
        <section>
          <h3>Plan usage</h3>
          {[
            ['Teacher seats', '12 of 15', 80],
            ['Learner seats', '84 of 100', 84],
            ['Offline storage', '3.2 GB of 5 GB', 64],
          ].map(([label, value, width]) => (
            <div key={label as string}>
              <span>
                <strong>{label}</strong>
                <small>{value}</small>
              </span>
              <div>
                <span style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}
          <AppLink to="/parent/payments">View invoices and receipts</AppLink>
        </section>
        <PortalNotice text={notice} />
      </div>
    )
  return (
    <div className="centre-reports">
      <div className="report-filter">
        <select>
          <option>All learning stages</option>
          <option>Upper Nursery</option>
          <option>Reception</option>
        </select>
        <select>
          <option>Last 30 days</option>
          <option>This term</option>
        </select>
        <Button onClick={() => setNotice('Centre report prepared.')}>Export summary</Button>
      </div>
      <div className="centre-report-grid">
        {[
          ['71', 'Active learners', 'of 84 enrolled'],
          ['426', 'Lessons completed', 'this month'],
          ['76%', 'Average stage progress', 'across the centre'],
          ['9', 'Verified teachers', '3 in review'],
        ].map(([value, label, text]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <small>{text}</small>
          </article>
        ))}
      </div>
      <section className="report-chart">
        <header>
          <h3>Weekly learning participation</h3>
          <span>Target 80%</span>
        </header>
        <div>
          {[62, 68, 72, 75, 81, 79, 84, 86].map((value, i) => (
            <span key={i} style={{ height: `${value}%` }}>
              <small>{value}%</small>
            </span>
          ))}
        </div>
      </section>
      <PortalNotice text={notice} />
    </div>
  )
}

function AdminPortalBody({ page }: { page: PageSpec }) {
  const [notice, setNotice] = useState('')
  if (page.id === 'D1')
    return (
      <div className="admin-operations">
        <section className="admin-alert-strip">
          <div>
            <span>Operations overview</span>
            <h2>Platform health is stable</h2>
            <p>3 queues need review before the end of today.</p>
          </div>
          <span className="status status--active">All core services online</span>
        </section>
        <div className="admin-metrics">
          {[
            ['2,418', 'Active families', '+8.4%'],
            ['6,904', 'Child profiles', '+312'],
            ['184', 'Teachers', '12 pending'],
            ['MWK 18.4m', 'Monthly revenue', '+6.1%'],
          ].map(([value, label, change]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </article>
          ))}
        </div>
        <div className="admin-queue-grid">
          {[
            ['shield', 'Teacher verification', '12 applications', '/platform-admin/teachers'],
            ['wallet', 'Payment matching', '7 transfers', '/platform-admin/payments'],
            ['shield', 'Moderation', '3 high priority', '/platform-admin/moderation'],
            ['calendar', 'Live sessions', '18 this week', '/platform-admin/live'],
          ].map(([icon, title, count, path]) => (
            <AppLink to={path} key={title}>
              <span>
                <Icon name={icon as IconName} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{count}</p>
              </div>
              <Icon name="arrow" />
            </AppLink>
          ))}
        </div>
        <section className="admin-activity-feed">
          <div className="actor-panel-heading">
            <h3>Recent sensitive actions</h3>
            <AppLink to="/platform-admin/settings">Audit log</AppLink>
          </div>
          {[
            'Package price updated by Admin Grace',
            'Teacher application approved by Admin James',
            'Bank transfer matched to CHI-PAY-1042',
          ].map((item, i) => (
            <div key={item}>
              <span>{i + 1}</span>
              <strong>{item}</strong>
              <small>{i + 2} hours ago</small>
            </div>
          ))}
        </section>
      </div>
    )
  if (page.id === 'D2')
    return (
      <ActorTable
        title="Platform users"
        columns={['Account', 'Role', 'Subscription', 'Status']}
        rows={[
          ['Grace Banda', 'Parent', 'Premium trial', 'Active'],
          ['Mercy Phiri', 'Teacher', 'Training access', 'Verified'],
          ['Chisomo Centre', 'Centre', 'Annual group', 'Active'],
          ['James Tembo', 'Parent', 'Standard', 'Suspended'],
        ]}
      />
    )
  if (page.id === 'D3')
    return (
      <div className="admin-user-detail">
        <header>
          <span>GB</span>
          <div>
            <h2>Grace Banda</h2>
            <p>Parent account, created 14 August 2026</p>
          </div>
          <button onClick={() => setNotice('Support view-as session started and logged.')}>
            View as user
          </button>
        </header>
        <div className="admin-user-grid">
          <section>
            <h3>Account details</h3>
            <dl>
              <dt>Phone</dt>
              <dd>+265 99•• ••218</dd>
              <dt>Language</dt>
              <dd>English</dd>
              <dt>Children</dt>
              <dd>2 profiles</dd>
              <dt>Last sign-in</dt>
              <dd>Today at 08:42</dd>
            </dl>
          </section>
          <section>
            <h3>Access and status</h3>
            <label>
              Role
              <select>
                <option>Parent</option>
                <option>Teacher</option>
              </select>
            </label>
            <label>
              Status
              <select>
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </label>
            <Button onClick={() => setNotice('Account access updated and logged.')}>
              Save access
            </Button>
          </section>
        </div>
        <PortalNotice text={notice} />
      </div>
    )
  if (page.id === 'D4')
    return (
      <div className="verification-queue">
        {[
          ['Mercy Phiri', 'ECD Certificate, National ID', '4 days waiting'],
          ['Alinafe Tembo', 'Diploma, Police clearance', '2 days waiting'],
          ['Thoko Jere', 'ECD Certificate', '1 day waiting'],
        ].map(([name, docs, wait], i) => (
          <article key={name}>
            <span>{name[0]}</span>
            <div>
              <h3>{name}</h3>
              <p>{docs}</p>
              <small>{wait}</small>
            </div>
            <button onClick={() => setNotice(`${name} approved.`)}>Approve</button>
            <button onClick={() => setNotice(`More information requested from ${name}.`)}>
              Request info
            </button>
            <button className="reject" onClick={() => setNotice(`${name} application rejected.`)}>
              Reject
            </button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  if (page.id === 'D5' || page.id === 'D6')
    return (
      <div className="content-operations">
        <aside>
          {[
            'Baby Class',
            'Lower Nursery',
            'Upper Nursery',
            'Reception',
            'Standard 1',
            'Standard 2',
          ].map((stageName, i) => (
            <button
              className={i === 2 ? 'active' : ''}
              key={stageName}
              onClick={() => setNotice(`${stageName} content selected.`)}
            >
              <span>0{i + 1}</span>
              {stageName}
            </button>
          ))}
        </aside>
        <section>
          <header>
            <div>
              <span>Upper Nursery</span>
              <h2>{page.id === 'D5' ? 'Content library' : 'Edit: Sounds around us'}</h2>
            </div>
            <span className="status status--review">
              {page.id === 'D5' ? '24 published, 3 drafts' : 'Draft'}
            </span>
          </header>
          {page.id === 'D5' ? (
            ['Language and stories', 'Early number concepts', 'Movement and music'].map(
              (course, i) => (
                <article className="content-course-row" key={course}>
                  <span>
                    <Icon name={i === 0 ? 'story' : i === 1 ? 'game' : 'music'} />
                  </span>
                  <div>
                    <h3>{course}</h3>
                    <p>
                      {4 + i} units, {18 + i * 3} lessons
                    </p>
                  </div>
                  <span className="status status--active">Published</span>
                  <button onClick={() => navigate('/platform-admin/content/editor')}>Edit</button>
                </article>
              ),
            )
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setNotice('Course draft saved with a new version.')
              }}
            >
              <label>
                Course title
                <input defaultValue="Sounds around us" />
              </label>
              <label>
                Learning outcome
                <textarea defaultValue="Children identify familiar environmental and letter sounds." />
              </label>
              <div className="editor-blocks">
                <strong>Lesson blocks</strong>
                {['Welcome narration', 'Story video', 'Sound matching game', 'Quick check'].map(
                  (block, i) => (
                    <div key={block}>
                      <span>{i + 1}</span>
                      {block}
                      <button type="button">Edit</button>
                    </div>
                  ),
                )}
              </div>
              <div>
                <Button type="submit">Save draft</Button>
                <Button
                  variant="secondary"
                  onClick={() => setNotice('Preview opened at phone size.')}
                >
                  Preview
                </Button>
                <Button variant="secondary" onClick={() => setNotice('Course sent for review.')}>
                  Submit for review
                </Button>
              </div>
            </form>
          )}
          <PortalNotice text={notice} />
        </section>
      </div>
    )
  if (page.id === 'D7')
    return (
      <ActorTable
        title="Media processing library"
        columns={['File', 'Media type', 'Processing', 'Usage']}
        rows={[
          ['lake-story-01.mp4', 'Video', 'Ready', '3 lessons'],
          ['moni-song.mp3', 'Audio', 'Ready', '2 lessons'],
          ['maize-counting.webp', 'Image', 'Optimising', '1 lesson'],
          ['reception-intro.mp4', 'Video', 'Failed', 'Not used'],
        ]}
      />
    )
  if (page.id === 'D8')
    return (
      <div className="admin-packages">
        {[
          ['Standard Family', 'MWK 12,000 monthly', '6 stages, offline lessons'],
          ['Premium Family', 'MWK 18,000 monthly', 'Standard plus live classes'],
          ['Centre Annual', 'MWK 840,000 yearly', '15 teachers, 100 learners'],
        ].map(([name, price, scope], i) => (
          <article key={name}>
            <span className={`badge badge--${i === 1 ? 'premium' : 'standard'}`}>
              {i === 1 ? 'Premium' : 'Active'}
            </span>
            <h3>{name}</h3>
            <strong>{price}</strong>
            <p>{scope}</p>
            <button onClick={() => setNotice(`${name} configuration opened.`)}>Configure</button>
          </article>
        ))}
        <section>
          <h3>Free trial rule</h3>
          <p>One 30-day trial per new family.</p>
          <label>
            Trial package
            <select>
              <option>Premium sample</option>
              <option>Standard only</option>
            </select>
          </label>
          <Button onClick={() => setNotice('Trial rules saved.')}>Save rule</Button>
        </section>
        <PortalNotice text={notice} />
      </div>
    )
  if (page.id === 'D9')
    return (
      <ActorTable
        title="Subscription states"
        columns={['Family', 'Package', 'State', 'Renews or ends']}
        rows={[
          ['Grace Banda', 'Premium', 'Trial', '22 Nov'],
          ['L. Phiri', 'Standard', 'Active', '4 Dec'],
          ['P. Jere', 'Premium', 'Past due', 'Action needed'],
          ['A. Tembo', 'Standard', 'Expired', '8 Nov'],
        ]}
      />
    )
  if (page.id === 'D10')
    return (
      <div className="reconciliation-page">
        <section>
          <header>
            <h2>Unmatched bank transfers</h2>
            <span>7 waiting</span>
          </header>
          {[
            ['MWK 120,000', 'FT-284922', 'Grace B.'],
            ['MWK 22,000', 'FT-285104', 'Mercy P.'],
            ['MWK 18,000', 'No reference', 'T. Jere'],
          ].map(([amount, ref, name]) => (
            <article key={ref}>
              <strong>{amount}</strong>
              <span>{ref}</span>
              <span>{name}</span>
              <button onClick={() => setNotice(`${ref} matched and recorded.`)}>
                Match payment
              </button>
            </article>
          ))}
        </section>
        <aside>
          <h3>Reconciliation summary</h3>
          <div>
            <span>Matched today</span>
            <strong>18</strong>
          </div>
          <div>
            <span>Refund review</span>
            <strong>2</strong>
          </div>
          <div>
            <span>Failed mobile money</span>
            <strong>5</strong>
          </div>
          <Button variant="secondary" onClick={() => setNotice('Refund queue opened.')}>
            Review refunds
          </Button>
        </aside>
        <PortalNotice text={notice} />
      </div>
    )
  if (page.id === 'D11')
    return (
      <ActorTable
        title="Live session operations"
        columns={['Session', 'Stage', 'Teacher', 'Capacity']}
        rows={[
          ['Sounds around us', 'Upper Nursery', 'Thandi Banda', '6 of 6'],
          ['Story circle', 'Reception', 'Mercy Phiri', '4 of 6'],
          ['First sounds', 'Baby Class', 'Memory Jere', '3 of 4'],
          ['Number play', 'Standard 1', 'Unassigned', '0 of 8'],
        ]}
      />
    )
  if (page.id === 'D12')
    return (
      <div className="moderation-queue">
        {[
          ['High', 'Live class concern', 'Session CHI-LIVE-884', '12 min ago'],
          ['Medium', 'Reported message thread', 'Parent and teacher', '2 hours ago'],
          ['Low', 'Content quality flag', 'Upper Nursery lesson', 'Yesterday'],
        ].map(([level, title, source, time], i) => (
          <article className={`priority-${level.toLowerCase()}`} key={title}>
            <span>{level}</span>
            <div>
              <h3>{title}</h3>
              <p>{source}</p>
              <small>{time}</small>
            </div>
            <button onClick={() => setNotice(`${title} assigned for review.`)}>Review case</button>
          </article>
        ))}
        <PortalNotice text={notice} />
      </div>
    )
  if (page.id === 'D13')
    return (
      <ActorTable
        title="Certificate registry"
        columns={['Code', 'Recipient', 'Stage', 'State']}
        rows={[
          ['CHI-TCH-2026-0281', 'Mercy Phiri', 'Lower Nursery', 'Valid'],
          ['CHI-TCH-2026-0210', 'Thandi Banda', 'Upper Nursery', 'Valid'],
          ['CHI-TCH-2026-0198', 'Memory Jere', 'Baby Class', 'Revoked'],
        ]}
      />
    )
  if (page.id === 'D14')
    return (
      <div className="admin-analytics">
        <div className="analytics-kpis">
          {[
            ['72%', 'Weekly learner activity'],
            ['4.3', 'Lessons per active child'],
            ['81%', 'Training completion'],
            ['96.4%', 'Payment success'],
          ].map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <section>
          <header>
            <h3>Active learning by stage</h3>
            <select>
              <option>Last 30 days</option>
            </select>
          </header>
          <div className="analytics-bars">
            {[
              ['Baby', 58],
              ['Lower', 72],
              ['Upper', 86],
              ['Reception', 79],
              ['Std 1', 64],
              ['Std 2', 55],
            ].map(([label, value]) => (
              <div key={label as string}>
                <span style={{ height: `${value}%` }} />
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  if (page.id === 'D15')
    return (
      <ActorTable
        title="Communication templates"
        columns={['Template', 'Channel', 'Language', 'Updated']}
        rows={[
          ['Payment receipt', 'Email', 'English and Chichewa', 'Today'],
          ['Class reminder', 'SMS', 'English', 'Yesterday'],
          ['Monthly report ready', 'Email', 'English and Chichewa', '3 days ago'],
        ]}
      />
    )
  if (page.id === 'D16')
    return (
      <ActorTable
        title="Public website content"
        columns={['Content', 'Type', 'State', 'Updated']}
        rows={[
          ['Story time that sparks imagination', 'Blog article', 'Published', 'Today'],
          ['Child safety promise', 'Page', 'Published', '4 days ago'],
          ['Can I pay with mobile money?', 'FAQ', 'Draft', 'Yesterday'],
        ]}
      />
    )
  if (page.id === 'D17')
    return (
      <ActorTable
        title="Staff roles and permissions"
        columns={['Staff member', 'Role', 'Access scope', 'Two-step']}
        rows={[
          ['Grace M.', 'Super admin', 'All modules', 'Required'],
          ['James T.', 'Content editor', 'Content and media', 'Required'],
          ['Ruth P.', 'Finance officer', 'Payments and plans', 'Required'],
          ['Memory C.', 'Moderator', 'Reports and live', 'Required'],
        ]}
      />
    )
  return (
    <div className="audit-settings">
      <section>
        <div className="actor-panel-heading">
          <h2>Sensitive action log</h2>
          <button onClick={() => setNotice('Audit log exported.')}>Export</button>
        </div>
        {[
          ['Package price changed', 'Grace M.', 'Today 09:42', 'D8'],
          ['User role updated', 'Grace M.', 'Today 08:15', 'D3'],
          ['Teacher approved', 'James T.', 'Yesterday 16:20', 'D4'],
          ['Refund issued', 'Ruth P.', 'Yesterday 14:03', 'D10'],
        ].map(([action, staff, time, module]) => (
          <div key={`${action}-${time}`}>
            <span>{module}</span>
            <strong>{action}</strong>
            <small>{staff}</small>
            <time>{time}</time>
          </div>
        ))}
      </section>
      <aside>
        <h3>Platform settings</h3>
        <label>
          Default language
          <select>
            <option>English</option>
            <option>Chichewa</option>
          </select>
        </label>
        <label>
          Admin session timeout
          <select>
            <option>30 minutes</option>
          </select>
        </label>
        <label className="check-label">
          <input type="checkbox" defaultChecked />
          Require two-step verification
        </label>
        <Button onClick={() => setNotice('Platform settings saved and audited.')}>
          Save settings
        </Button>
      </aside>
      <PortalNotice text={notice} />
    </div>
  )
}

function DashboardPageBody({ page }: { page: PageSpec }) {
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('Overview')
  const [activeDate, setActiveDate] = useState(3)
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [selectedColor, setSelectedColor] = useState('#1ba29e')
  const [progress, setProgress] = useState(36)
  const isChild = page.area === 'child'
  const activityRoute =
    page.area === 'child'
      ? '/learn/course'
      : page.area === 'parent'
        ? '/parent/progress'
        : page.area === 'teacher'
          ? '/teacher/training'
          : page.area === 'school'
            ? '/centre/reports'
            : '/platform-admin/analytics'
  const scheduleRoute =
    page.area === 'child'
      ? '/learn/live'
      : page.area === 'parent'
        ? '/parent/live'
        : page.area === 'teacher'
          ? '/teacher/classes'
          : page.area === 'school'
            ? '/centre/teachers'
            : '/platform-admin/live'
  const createRoute =
    page.area === 'parent'
      ? '/parent/children/edit'
      : page.area === 'teacher'
        ? '/teacher/assess-child'
        : page.area === 'school'
          ? '/centre/teachers'
          : page.area === 'admin'
            ? '/platform-admin/content/editor'
            : '/learn/course'
  const detailRoute =
    page.area === 'parent'
      ? '/parent/reports/latest'
      : page.area === 'teacher'
        ? '/teacher/profile'
        : page.area === 'school'
          ? '/centre/reports'
          : '/platform-admin/users/detail'

  if (page.area === 'parent') return <ParentPortalBody page={page} />
  if (page.area === 'teacher') return <TeacherPortalBody page={page} />
  if (page.area === 'school') return <SchoolPortalBody page={page} />
  if (page.area === 'admin') return <AdminPortalBody page={page} />
  const dashboardIds = ['C2', 'P1', 'T1', 'S1', 'D1']
  const formIds = [
    'P3',
    'P10',
    'P18',
    'T2',
    'T5',
    'T15',
    'T16',
    'S4',
    'D6',
    'D8',
    'D15',
    'D17',
    'D18',
  ]
  const messageIds = ['P13', 'T3', 'D15']
  const classIds = ['C11', 'C12', 'P11', 'P12', 'T12', 'T13', 'T14', 'D11']
  const learningIds = ['C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'T6', 'T7', 'T8', 'T9']
  const dataIds = [
    'P4',
    'P5',
    'P6',
    'P7',
    'P17',
    'T10',
    'T11',
    'S5',
    'D2',
    'D3',
    'D4',
    'D5',
    'D7',
    'D9',
    'D10',
    'D12',
    'D13',
    'D14',
    'D16',
  ]

  if (page.id === 'C1') {
    return (
      <div className="profile-picker">
        <h2>Who is learning today?</h2>
        <div>
          {[
            ['Tadala', 'T'],
            ['Mwayi', 'M'],
            ['Grown-up', ''],
          ].map(([name, initial], i) => (
            <button key={name} onClick={() => navigate(i === 2 ? '/parent' : '/learn')}>
              <span>{initial || <Icon name="lock" />}</span>
              <strong>{name}</strong>
              <small>{i === 2 ? 'Parent area' : i === 0 ? 'Upper Nursery' : 'Baby Class'}</small>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (page.id === 'C9' || page.id === 'C10') {
    return (
      <div className="reward-world">
        <div className="star-total">
          <span>★</span>
          <strong>128</strong>
          <small>bright stars</small>
        </div>
        <div className="badge-shelf">
          {['Story explorer', 'Song starter', 'Number finder', 'Kind helper'].map((badge, i) => (
            <article key={badge}>
              <span>
                <Icon name={i % 2 ? 'music' : 'award'} size={35} />
              </span>
              <strong>{badge}</strong>
              <small>{i < 3 ? 'Earned' : '2 lessons to go'}</small>
            </article>
          ))}
        </div>
        <div className="child-progress-card">
          <h3>Your learning trail</h3>
          <div>
            <span className="progress-width--72" />
          </div>
          <p>12 of 16 adventures completed</p>
        </div>
      </div>
    )
  }

  if (page.id === 'C13') {
    return (
      <div className="child-settings">
        {[
          ['Narration', 'On'],
          ['Sound effects', 'On'],
          ['Reading speed', 'Normal'],
          ['Text size', 'Big'],
          ['Friendly font', 'Andika'],
        ].map(([label, value]) => (
          <button
            key={label}
            onClick={() => setNotice(`${label} preference updated for this preview.`)}
          >
            <span>{label}</span>
            <strong>{value}</strong>
            <Icon name="chevron" />
          </button>
        ))}
        {notice && <p className="inline-success">{notice}</p>}
      </div>
    )
  }

  if (page.id === 'C14') {
    return (
      <div className="grown-up-gate">
        <span>
          <Icon name="lock" size={42} />
        </span>
        <h2>Grown-up check</h2>
        <p>Ask your grown-up to solve this before opening settings.</p>
        <div>
          <strong>7 + 5 =</strong>
          <input inputMode="numeric" aria-label="Answer" />
        </div>
        <Button onClick={() => setNotice('Great! The grown-up area is now open.')}>
          Check answer
        </Button>
        {notice && <p className="inline-success">{notice}</p>}
      </div>
    )
  }

  if (dashboardIds.includes(page.id)) {
    return (
      <>
        <div className="dashboard-welcome">
          <div>
            <span className="eyebrow">
              <Icon name="leaf" size={17} />
              {isChild ? 'Moni, Tadala!' : 'Good morning, Grace'}
            </span>
            <h2>{isChild ? 'Ready for today’s adventure?' : page.purpose}</h2>
            <p>
              {isChild
                ? 'Your next story is waiting by the lake.'
                : 'Here is what needs your attention today.'}
            </p>
          </div>
          <Button
            onClick={() =>
              navigate(
                isChild
                  ? '/learn/lesson'
                  : page.area === 'parent'
                    ? '/parent/progress'
                    : page.area === 'teacher'
                      ? '/teacher/training'
                      : page.area === 'admin'
                        ? '/platform-admin/users'
                        : '/centre/teachers',
              )
            }
          >
            {isChild ? 'Continue learning' : 'View next action'}
          </Button>
        </div>
        <div className="metric-grid">
          {(isChild
            ? [
                ['★ 128', 'Stars earned', '+12 this week'],
                ['8', 'Lessons complete', 'Great rhythm'],
                ['3', 'Badges earned', 'One nearly ready'],
                ['72%', 'Stage progress', 'Keep going'],
              ]
            : [
                ['4', 'Items need attention', '2 new today'],
                ['12', 'Completed this week', '+18%'],
                ['84%', 'On-track progress', 'Healthy'],
                ['2', 'Upcoming sessions', 'Next at 15:00'],
              ]
          ).map(([value, label, change]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </article>
          ))}
        </div>
        <div className="dashboard-columns">
          <section>
            <div className="panel-title">
              <h3>{isChild ? 'My learning path' : 'Recent activity'}</h3>
              <button onClick={() => navigate(activityRoute)}>View all</button>
            </div>
            {[
              'First sounds and greetings',
              'Counting with market baskets',
              'The little bird by the lake',
            ].map((item, i) => (
              <div className="activity-row" key={item}>
                <span>
                  <Icon name={i === 2 ? 'story' : i === 1 ? 'game' : 'play'} />
                </span>
                <div>
                  <strong>{item}</strong>
                  <small>
                    {i === 0 ? 'Continue, 8 min' : i === 1 ? 'Completed today' : 'Ready next'}
                  </small>
                </div>
                <Icon name="arrow" size={18} />
              </div>
            ))}
          </section>
          <section>
            <div className="panel-title">
              <h3>Next up</h3>
              <span className="badge badge--premium">Live</span>
            </div>
            <div className="next-class">
              <span>
                <strong>14</strong>
                <small>Nov</small>
              </span>
              <div>
                <strong>Sounds around us</strong>
                <small>Teacher Thandi, 15:00</small>
              </div>
            </div>
            <Button variant="secondary" onClick={() => navigate(scheduleRoute)}>
              View schedule
            </Button>
          </section>
        </div>
      </>
    )
  }

  if (messageIds.includes(page.id)) {
    return (
      <div className="messaging-layout">
        <aside>
          {['Teacher Thandi', 'Grace Banda', 'Support team'].map((name, i) => (
            <button
              className={i === selectedConversation ? 'active' : ''}
              key={name}
              onClick={() => {
                setSelectedConversation(i)
                setNotice(`Conversation with ${name} opened.`)
              }}
            >
              <span>{name[0]}</span>
              <div>
                <strong>{name}</strong>
                <small>
                  {i === 0 ? 'Tadala did wonderfully today.' : 'Tap to open conversation'}
                </small>
              </div>
            </button>
          ))}
        </aside>
        <section>
          <header>
            <span>T</span>
            <div>
              <strong>Teacher Thandi</strong>
              <small>Usually replies today</small>
            </div>
          </header>
          <div className="message-thread">
            <p className="received">
              Hello Grace. Tadala was very confident with today’s sound activity.
            </p>
            <p className="sent">
              That is wonderful to hear. Is there anything we should practise at home?
            </p>
            <p className="received">
              Try naming three things beginning with “m”. Keep it playful and short.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setNotice('Message sent')
            }}
          >
            <input placeholder="Write a message" />
            <button type="submit" aria-label="Send">
              <Icon name="arrow" />
            </button>
          </form>
          {notice && <small className="message-status">{notice}</small>}
        </section>
      </div>
    )
  }

  if (classIds.includes(page.id)) {
    return (
      <div className="class-experience">
        <div className="calendar-strip">
          {['Mon 11', 'Tue 12', 'Wed 13', 'Thu 14', 'Fri 15'].map((day, i) => (
            <button
              className={i === activeDate ? 'active' : ''}
              key={day}
              onClick={() => {
                setActiveDate(i)
                setNotice(`${day} selected.`)
              }}
            >
              <span>{day.split(' ')[0]}</span>
              <strong>{day.split(' ')[1]}</strong>
            </button>
          ))}
        </div>
        <div className="class-main">
          <section className="class-video">
            <PortalImage
              className="live-class-photo"
              src={readingPhoto}
              alt="A teacher reading with a young learner"
            />
            <div className="teacher-avatar">
              <span />
              <strong>Teacher Thandi</strong>
            </div>
            <div className="class-controls">
              <button onClick={() => setNotice('Class chat opened.')} aria-label="Open class chat">
                <Icon name="message" />
              </button>
              <button onClick={() => setNotice('Audio setting changed.')} aria-label="Change audio">
                <Icon name="music" />
              </button>
              <button
                className="end"
                onClick={() => navigate(page.area === 'child' ? '/learn/live' : '/teacher/classes')}
              >
                Leave
              </button>
            </div>
          </section>
          <aside>
            <span className="badge badge--premium">Premium live class</span>
            <h2>Sounds around us</h2>
            <p>Thursday, 14 November at 15:00</p>
            <div className="class-detail">
              <Icon name="users" />
              <span>
                <strong>6 learners</strong>
                <small>Parent-approved session</small>
              </span>
            </div>
            <div className="class-detail">
              <Icon name="shield" />
              <span>
                <strong>Moderated session</strong>
                <small>Safety controls are active</small>
              </span>
            </div>
            <Button
              onClick={() => {
                if (page.id === 'C11') navigate('/learn/live/classroom')
                else if (page.id === 'T12') navigate('/teacher/classes/live')
                else setNotice('Your place is confirmed.')
              }}
            >
              {page.id === 'P11'
                ? 'Book this class'
                : page.id === 'C11'
                  ? 'Join class'
                  : 'Open class room'}
            </Button>
            {notice && <p className="inline-success">{notice}</p>}
          </aside>
        </div>
      </div>
    )
  }

  if (learningIds.includes(page.id)) {
    if (page.id === 'C8') {
      return (
        <div className="colour-studio">
          <div className="colour-canvas">
            <Icon name="leaf" size={170} />
          </div>
          <div className="colour-tools">
            {['#1ba29e', '#0a7a9c', '#f5b82e', '#c8372d', '#7a5a9b'].map((color) => (
              <button
                key={color}
                className={selectedColor === color ? 'selected' : ''}
                style={{ background: color }}
                aria-label={`Choose ${color}`}
                onClick={() => {
                  setSelectedColor(color)
                  setNotice('Colour selected.')
                }}
              />
            ))}
            <Button onClick={() => setNotice('Your picture is saved!')}>Save my picture</Button>
          </div>
          {notice && <p className="inline-success">{notice}</p>}
        </div>
      )
    }
    if (page.id === 'C7' || page.id === 'T9') {
      return (
        <div className="quiz-card">
          <span>Question 2 of 5</span>
          <div className="progress-track">
            <span className="progress-width--40" />
          </div>
          <h2>
            {page.id === 'C7'
              ? 'Which picture begins with the “m” sound?'
              : 'Which activity best supports early phonological awareness?'}
          </h2>
          <div>
            {['Maize basket', 'Lake water', 'Blue bird', 'Story book'].map((answer, i) => (
              <button
                onClick={() => setNotice(i === 0 ? 'That’s right!' : 'Try once more.')}
                key={answer}
              >
                <span>{String.fromCharCode(65 + i)}</span>
                {answer}
              </button>
            ))}
          </div>
          {notice && <p className="inline-success">{notice}</p>}
        </div>
      )
    }
    return (
      <div className="lesson-layout">
        <section className="lesson-player">
          <div className="lesson-scene">
            <span className="lesson-sun" />
            <Icon name={page.id.startsWith('T') ? 'book' : 'play'} size={75} />
            <h2>
              {page.id.startsWith('T') ? 'Creating language-rich play' : 'The sounds around us'}
            </h2>
          </div>
          <div className="player-controls">
            <button
              onClick={() => {
                setProgress(Math.min(100, progress + 10))
                setNotice('Lesson playback started.')
              }}
              aria-label="Play lesson"
            >
              <Icon name="play" />
            </button>
            <div>
              <span style={{ width: `${progress}%` }} />
            </div>
            <small>03:42 / 08:10</small>
          </div>
        </section>
        <aside>
          <span className="badge badge--standard">
            {page.id.startsWith('T') ? 'Training module' : 'Unit 2, Lesson 3'}
          </span>
          <h2>{page.title}</h2>
          <p>Listen, notice and join in. This short activity uses voice, pictures and movement.</p>
          <div className="lesson-list">
            {['Warm-up greeting', 'Watch and listen', 'Try it together', 'Quick check'].map(
              (item, i) => (
                <button
                  className={progress > i * 25 ? 'complete' : ''}
                  key={item}
                  onClick={() => setProgress(Math.min(100, (i + 1) * 25))}
                >
                  <span>{progress > i * 25 ? <Icon name="check" size={16} /> : i + 1}</span>
                  {item}
                </button>
              ),
            )}
          </div>
          <Button
            onClick={() => {
              setProgress(100)
              setNotice('Lesson complete. You earned 3 stars!')
            }}
          >
            Finish lesson
          </Button>
          {notice && <p className="inline-success">{notice}</p>}
        </aside>
      </div>
    )
  }

  if (formIds.includes(page.id)) {
    return (
      <form
        className="settings-form"
        onSubmit={(event) => {
          event.preventDefault()
          setNotice('Your changes have been saved.')
        }}
      >
        <div className="settings-section">
          <h2>{page.title}</h2>
          <p>{page.purpose}. Update the fields below and save when ready.</p>
          <div className="form-grid">
            <label>
              Display name
              <input defaultValue={page.id.startsWith('D') ? 'Learning content' : 'Grace Banda'} />
            </label>
            <label>
              Status
              <select defaultValue="active">
                <option value="active">Active</option>
                <option value="review">Needs review</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="wide">
              Description
              <textarea
                rows={4}
                defaultValue="A clear, welcoming experience that supports the next step."
              />
            </label>
            <label>
              Language
              <select>
                <option>English</option>
                <option>Chichewa</option>
              </select>
            </label>
            <label>
              Visibility
              <select>
                <option>Only me</option>
                <option>My family or team</option>
                <option>Published</option>
              </select>
            </label>
          </div>
        </div>
        <div className="settings-actions">
          <Button type="submit">Save changes</Button>
          <Button variant="secondary" onClick={() => setNotice('')}>
            Cancel
          </Button>
          {notice && <span className="inline-success">{notice}</span>}
        </div>
      </form>
    )
  }

  if (
    dataIds.includes(page.id) ||
    ['P2', 'P8', 'P9', 'P14', 'P15', 'P16', 'T4', 'S2', 'S3'].includes(page.id)
  ) {
    return (
      <>
        <div className="data-toolbar">
          <div className="portal-tabs">
            {['Overview', 'Active', 'Needs attention'].map((tab) => (
              <button
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <input placeholder="Search records" />
            <Button onClick={() => navigate(createRoute)}>Add new</Button>
          </div>
        </div>
        <div className="data-summary">
          {[
            ['24', 'Total records'],
            ['18', 'Active'],
            ['4', 'Needs review'],
            ['2', 'Updated today'],
          ].map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
        <div className="data-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last activity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                'Tadala Banda',
                'Mwayi Phiri',
                'Chisomo Centre',
                'Teacher Thandi',
                'Upper Nursery pathway',
              ].map((name, i) => (
                <tr key={name}>
                  <td>
                    <strong>{name}</strong>
                    <small>CHI-00{42 + i}</small>
                  </td>
                  <td>{i % 2 ? 'Standard' : 'Premium'}</td>
                  <td>
                    <span className={`status status--${i === 2 ? 'review' : 'active'}`}>
                      {i === 2 ? 'Needs review' : 'Active'}
                    </span>
                  </td>
                  <td>
                    {i + 1} day{i ? 's' : ''} ago
                  </td>
                  <td>
                    <button aria-label={`Open ${name}`} onClick={() => navigate(detailRoute)}>
                      <Icon name="arrow" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return (
    <div className="empty-state">
      <span>
        <Icon name="leaf" size={42} />
      </span>
      <h2>{page.title}</h2>
      <p>{page.purpose}. This frontend state is ready for future data integration.</p>
      <Button onClick={() => navigate('/portal')}>Explore another page</Button>
    </div>
  )
}

function RolePortalPage({ page }: { page: PageSpec }) {
  const [navOpen, setNavOpen] = useState(false)
  const currentPath = usePathname()
  const area = page.area as Exclude<AreaKey, 'public' | 'auth' | 'system'>
  const nav = roleNavigation[area]
  const isChild = area === 'child'
  const notificationRoute =
    area === 'parent'
      ? '/parent/notifications'
      : area === 'teacher'
        ? '/teacher/notifications'
        : area === 'admin'
          ? '/platform-admin/moderation'
          : area === 'school'
            ? '/centre/reports'
            : '/learn/rewards'
  const messageRoute =
    area === 'parent'
      ? '/parent/messages'
      : area === 'teacher'
        ? '/teacher/messages'
        : area === 'admin'
          ? '/platform-admin/messages'
          : area === 'school'
            ? '/centre/teachers'
            : '/learn/live'
  const manageRoute =
    area === 'parent'
      ? '/parent/children/edit'
      : area === 'teacher'
        ? '/teacher/assess-child'
        : area === 'school'
          ? '/centre/teachers'
          : '/platform-admin/content/editor'
  const manageLabel =
    area === 'parent'
      ? 'Add child'
      : area === 'teacher'
        ? 'Record assessment'
        : area === 'school'
          ? 'Invite teacher'
          : 'Create content'
  const actorName =
    area === 'child'
      ? 'Tadala'
      : area === 'parent'
        ? 'Grace Banda'
        : area === 'teacher'
          ? 'Mercy Phiri'
          : area === 'school'
            ? 'Chisomo Centre'
            : 'Platform admin'
  return (
    <div className={`role-app role-app--${area}`}>
      <aside className={`role-sidebar ${navOpen ? 'open' : ''}`}>
        <div className="role-sidebar__brand">
          <AppLink
            to={
              isChild
                ? '/learn'
                : `/${area === 'school' ? 'centre' : area === 'admin' ? 'platform-admin' : area}`
            }
            className="brand"
          >
            <PortalImage src={logo} alt="Chiyambi Learning Platform" />
            <span>
              <strong>Chiyambi</strong>
              <small>{pageGroups[area].label}</small>
            </span>
          </AppLink>
          <button onClick={() => setNavOpen(false)} aria-label="Close navigation">
            <Icon name="close" />
          </button>
        </div>
        <nav>
          {nav.map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              className={currentPath === item.path ? 'active' : ''}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </AppLink>
          ))}
        </nav>
        <AppLink to="/portal" className="sidebar-directory-button">
          <Icon name="device" size={19} />
          <span>Page directory</span>
          <Icon name="arrow" size={17} />
        </AppLink>
        <div className="sidebar-profile">
          <span>{actorName[0]}</span>
          <div>
            <strong>{actorName}</strong>
            <small>{pageGroups[area].label}</small>
          </div>
          <AppLink to="/portal">
            <Icon name="globe" />
          </AppLink>
        </div>
        <button className="sidebar-signout" onClick={() => navigate('/')}>
          <Icon name="lock" size={18} />
          Sign out
        </button>
      </aside>
      <div className="role-main">
        <header className="role-topbar">
          <button onClick={() => setNavOpen(true)} aria-label="Open navigation">
            <Icon name="menu" />
          </button>
          <div className="role-breadcrumb" aria-hidden="true" />
          <div className="role-top-actions">
            <button aria-label="Notifications" onClick={() => navigate(notificationRoute)}>
              <Icon name="signal" />
            </button>
            <button aria-label="Messages" onClick={() => navigate(messageRoute)}>
              <Icon name="message" />
            </button>
            <span>{isChild ? '★ 128' : 'EN'}</span>
          </div>
        </header>
        <main className="role-content">
          <div className="role-page-title">
            <div>
              <h1>{page.title}</h1>
              <p>{page.purpose}</p>
            </div>
            {!isChild && <Button onClick={() => navigate(manageRoute)}>{manageLabel}</Button>}
          </div>
          <DashboardPageBody page={page} />
        </main>
        <nav className="role-bottom-nav">
          {nav.slice(0, 5).map((item) => (
            <AppLink
              key={item.path}
              to={item.path}
              className={currentPath === item.path ? 'active' : ''}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </AppLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

function SystemPortalPage({ page }: { page: PageSpec }) {
  const icon: IconName =
    page.id === 'X3'
      ? 'signal'
      : page.id === 'X4' || page.id === 'X5'
        ? 'lock'
        : page.id === 'X6'
          ? 'clock'
          : page.id === 'X2'
            ? 'shield'
            : 'leaf'
  return (
    <div className="system-page">
      <AppLink to="/" className="brand">
        <PortalImage src={logo} alt="Chiyambi Learning Platform" />
        <span>
          <strong>Chiyambi</strong>
          <small>Learning Platform</small>
        </span>
      </AppLink>
      <main>
        <span className="system-icon">
          <Icon name={icon} size={48} />
        </span>
        <h1>{page.title}</h1>
        <p>{page.purpose}. Your learning and account information remain safe.</p>
        {page.id === 'X3' && (
          <div className="offline-lessons">
            <strong>Available offline</strong>
            <span>
              <Icon name="play" />
              First sounds and greetings
            </span>
            <span>
              <Icon name="story" />
              The little bird by the lake
            </span>
          </div>
        )}
        <div>
          <AppLink to="/" className="button button--primary">
            {page.id === 'X5' ? 'Sign in again' : page.id === 'X2' ? 'Try again' : 'Go to home'}
          </AppLink>
          <AppLink to="/portal" className="button button--secondary portal-only-action">
            View all pages
          </AppLink>
        </div>
      </main>
      <small>An initiative of the Foundation for Inclusive and Sustainable Development</small>
    </div>
  )
}

export default function App() {
  const path = usePathname()
  if (path === '/') return <HomePage />
  if (path === '/portal') return <PortalIndex />
  const stageDetailPage =
    path.startsWith('/stages/') && path !== '/stages'
      ? pageGroups.public.pages.find((item) => item.id === 'W5')
      : undefined
  const page = allPages.find((item) => item.path === path) ?? stageDetailPage
  if (!page) return <SystemPortalPage page={pageGroups.system.pages[0]} />
  if (page.area === 'public') return <PublicPortalPage page={page} />
  if (page.area === 'auth') return <AuthPortalPage page={page} />
  if (page.area === 'system') return <SystemPortalPage page={page} />
  return <RolePortalPage page={page} />
}
