import type {
  AwardsContent,
  CmsPage,
  DesignTipsContent,
  FaqContent,
  FooterContent,
  LocationLinksContent,
  CmsSection,
  ConsultationCtaContent,
  CmsUser,
  FeaturedSpacesContent,
  HeroContent,
  JourneyContent,
  NavSection,
  PartnershipContent,
  ServicesContent,
  SignatureProjectsContent,
  StatsContent,
  TestimonialsContent,
  WhyChooseContent,
} from "../types/cms"

export const currentUser: CmsUser = {
  name: "Sarah Chen",
  role: "Administrator",
  avatarInitials: "SC",
}

export const sidebarNav: NavSection[] = [
  {
    label: "Pages",
    icon: "FileText",
    children: [
      { slug: "home", label: "Home" },
      { slug: "spaces", label: "Spaces" },
      { slug: "space-detail/kitchens", label: "Kitchens (Space Detail)" },
      { slug: "space-detail/wardrobes", label: "Wardrobes (Space Detail)" },
      { slug: "about", label: "About" },
      { slug: "why-t1", label: "Why T1" },
      { slug: "trade", label: "Trade" },
      { slug: "inspiration", label: "Inspiration" },
      { slug: "projects", label: "Projects" },
      {
        slug: "project-detail/emirates-hills",
        label: "Emirates Hills (Project Detail)",
      },
      {
        slug: "project-detail/jumeirah-gate-dubai",
        label: "Jumeirah Gate Dubai (Project Detail)",
      },
      { slug: "design-tips", label: "Design Tips (Blog)" },
      { slug: "services", label: "Services" },
      { slug: "materials-finishes", label: "Materials & Finishes" },
      { slug: "contact", label: "Contact" },
    ],
  },
  { label: "Media Library", icon: "Image", href: "/media" },
  { label: "Projects", icon: "FolderOpen", href: "/projects" },
  { label: "Testimonials", icon: "MessageSquare", href: "/testimonials" },
  { label: "Inquiries", icon: "Inbox", href: "/inquiries" },
  { label: "Team", icon: "Users", href: "/team" },
  { label: "Appearance", icon: "Palette", href: "/appearance" },
  { label: "Settings", icon: "Settings", href: "/settings" },
]

export const homeSections: CmsSection[] = [
  {
    id: "s01",
    number: "01",
    name: { en: "Hero Banner", ar: "البانر الرئيسي" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s02",
    number: "02",
    name: { en: "Stats", ar: "الإحصائيات" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s03",
    number: "03",
    name: { en: "Services", ar: "الخدمات" },
    type: "Linked: Services",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s04",
    number: "04",
    name: { en: "Featured Spaces", ar: "المساحات المميزة" },
    type: "Linked: Spaces",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s05",
    number: "05",
    name: { en: "Signature Projects", ar: "المشاريع المميزة" },
    type: "Linked: Projects",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s06",
    number: "06",
    name: { en: "Process / Journey", ar: "المسيرة / الرحلة" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s07",
    number: "07",
    name: { en: "Why Choose T1", ar: "لماذا تختار T1" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s08",
    number: "08",
    name: { en: "Client Testimonials", ar: "شهادات العملاء" },
    type: "Linked: Testimonials",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s09",
    number: "09",
    name: { en: "Consultation CTA", ar: "دعوة للاستشارة" },
    type: "Global",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s10",
    number: "10",
    name: { en: "Partnerships", ar: "الشراكات" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s11",
    number: "11",
    name: { en: "Awards & Recognition", ar: "الجوائز والتقدير" },
    type: "Collection",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s12",
    number: "12",
    name: { en: "Design Tips & Insights", ar: "نصائح وأفكار التصميم" },
    type: "Linked: Blog",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s13",
    number: "13",
    name: { en: "FAQ", ar: "الأسئلة الشائعة" },
    type: "Linked: FAQ",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s14",
    number: "14",
    name: { en: "Location Links", ar: "روابط المواقع" },
    type: "Manual",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s15",
    number: "15",
    name: { en: "Footer", ar: "التذييل" },
    type: "Global",
    status: { en: true, ar: true },
    visible: true,
  },
]

export const signatureProjectsContent: SignatureProjectsContent = {
  headingEn: "Signature Projects",
  headingAr: "المشاريع المميزة",
  buttonLabelEn: "View all Projects",
  buttonLabelAr: "عرض جميع المشاريع",
  buttonLink: "/projects",
  selectedProjects: [
    {
      id: "p01",
      title: "Jumeirah Gate Dubai",
      location: "Dubai, UAE",
      imageUrl: undefined,
      position: "Top Left (1,1)",
    },
    {
      id: "p02",
      title: "Blue Waters Dubai",
      location: "Dubai, UAE",
      imageUrl: undefined,
      position: "Middle Right (2,2)",
    },
    {
      id: "p03",
      title: "Al Yasmeen Sharjah",
      location: "Dubai, UAE",
      imageUrl: undefined,
      position: "Bottom Left (3,1)",
    },
  ],
  sourceType: "Linked: Projects",
  displayMode: "manual",
  itemsToDisplay: 3,
  showLocation: true,
  showCta: true,
  sameLayoutForAr: false,
}

export const servicesContent: ServicesContent = {
  eyebrowEn: "Our Services",
  eyebrowAr: "خدماتنا",
  headingEn: "What Services Do You Offer?",
  headingAr: "ما هي الخدمات التي تقدمونها؟",
  descriptionEn: "",
  descriptionAr: "",
  cards: [
    {
      id: "svc-1",
      icon: "Pencil",
      titleEn: "Custom Design",
      titleAr: "تصميم مخصص",
      subtitleEn: "Bespoke Solutions",
      subtitleAr: "حلول مصممة خصيصاً",
      visible: true,
    },
    {
      id: "svc-2",
      icon: "Hammer",
      titleEn: "Renovation",
      titleAr: "تجديد",
      subtitleEn: "Modern Refresh",
      subtitleAr: "لمسة عصرية متجددة",
      visible: true,
    },
    {
      id: "svc-3",
      icon: "Gem",
      titleEn: "Luxury Design",
      titleAr: "تصميم فاخر",
      subtitleEn: "Premium Materials",
      subtitleAr: "مواد عالية الجودة",
      visible: true,
    },
    {
      id: "svc-4",
      icon: "Cog",
      titleEn: "Installation",
      titleAr: "التركيب",
      subtitleEn: "Expert Execution",
      subtitleAr: "تنفيذ احترافي",
      visible: true,
    },
  ],
}

export const statsContent: StatsContent = {
  sectionTitleEn: "Our Numbers",
  sectionTitleAr: "أرقامنا",
  statistics: [
    {
      id: "stat-1",
      value: "500+",
      labelEn: "Happy Clients",
      labelAr: "عميل سعيد",
    },
    {
      id: "stat-2",
      value: "200+",
      labelEn: "Projects Completed",
      labelAr: "مشروع مكتمل",
    },
    {
      id: "stat-3",
      value: "100+",
      labelEn: "Design Experts",
      labelAr: "خبير تصميم",
    },
    {
      id: "stat-4",
      value: "100+",
      labelEn: "5-Star Reviews",
      labelAr: "تقييم 5 نجوم",
    },
  ],
}

export const heroContent: HeroContent = {
  eyebrowEn: "Dutch Craftsmanship. Kitchens & Wardrobes",
  eyebrowAr: "الحرفية الهولندية. المطابخ وخزائن الملابس",
  mainHeadingEn: "Made for Dubai Homes.",
  mainHeadingAr: "مصنوع لمنازل دبي.",
  descriptionEn:
    "Custom kitchens, wardrobes, and complete home interiors tailored to your lifestyle.",
  descriptionAr:
    "مطابخ وخزائن ملابس مخصصة، وديكورات منزلية متكاملة مصممة وفق أسلوب حياتك.",
  primaryButton: { label: "Explore Our Work", link: "/projects" },
  secondaryButton: { label: "Book a Consultation", link: "/contact" },
  backgroundType: "image",
  useSameMediaForBothLanguages: true,
  desktopImageUrl: undefined,
  mobileImageUrl: undefined,
  imageAltText: "Luxury interior living room",
  visible: true,
}

export const featuredSpacesContent: FeaturedSpacesContent = {
  sectionTitleEn: "Featured Spaces",
  sectionTitleAr: "المساحات المميزة",
  buttonLabelEn: "View All Spaces",
  buttonLabelAr: "عرض جميع المساحات",
  buttonLink: "/spaces",
  cards: [
    { id: "sp-1", titleEn: "Kitchen", titleAr: "المطبخ", visible: true },
    {
      id: "sp-2",
      titleEn: "Wardrobes",
      titleAr: "خزائن الملابس",
      visible: true,
    },
    {
      id: "sp-3",
      titleEn: "Living Room",
      titleAr: "غرفة المعيشة",
      visible: true,
    },
    { id: "sp-4", titleEn: "Bedrooms", titleAr: "غرف النوم", visible: true },
    { id: "sp-5", titleEn: "Bathrooms", titleAr: "الحمامات", visible: true },
    {
      id: "sp-6",
      titleEn: "Home Offices",
      titleAr: "مكاتب منزلية",
      visible: true,
    },
    {
      id: "sp-7",
      titleEn: "Outdoor Living",
      titleAr: "المعيشة الخارجية",
      visible: true,
    },
    {
      id: "sp-8",
      titleEn: "Bespoke Joinery",
      titleAr: "نجارة مخصصة",
      visible: true,
    },
  ],
}

export const journeyContent: JourneyContent = {
  eyebrowEn: "The T1 Project Journey",
  eyebrowAr: "رحلة مشروع T1",
  mainHeadingEn: "From Vision to a Smarter, Beautifully Delivered Space",
  mainHeadingAr: "من الرؤية إلى مساحة أكثر ذكاءً وجمالاً",
  steps: [
    {
      id: "step-1",
      number: "01",
      icon: "Globe",
      titleEn: "Discover",
      titleAr: "الاكتشاف",
      subtitleEn: "Designed Around Your Life",
      subtitleAr: "مصمم حول حياتك",
      descriptionEn:
        "We understand how you live, cook, work and entertain before defining the design, storage needs, budget and project timeline.",
      descriptionAr:
        "نفهم كيف تعيش وتطبخ وتعمل وتستضيف قبل تحديد التصميم واحتياجات التخزين والميزانية والجدول الزمني للمشروع.",
      noteEn: "A solution designed around you–not selected from a catalogue.",
      noteAr: "حل مصمم حولك — لا يُختار من كتالوج.",
      advantageTitleEn: "T1 ADVANTAGE",
      advantageTitleAr: "ميزة T1",
      advantageTextEn:
        "Lifestyle-led consultation with one experienced design partner.",
      advantageTextAr:
        "استشارة مرتكزة على أسلوب الحياة مع شريك تصميم ذي خبرة واحدة.",
    },
    {
      id: "step-2",
      number: "02",
      icon: "Lightbulb",
      titleEn: "Innovate",
      titleAr: "الابتكار",
      subtitleEn: "Smarter Use of Every Space",
      subtitleAr: "استخدام أذكى لكل مساحة",
      descriptionEn:
        "T1 creates intelligent layouts, concealed storage and multifunctional solutions that improve how every square metre performs.",
      descriptionAr:
        "تُنشئ T1 تخطيطات ذكية وتخزيناً مخفياً وحلولاً متعددة الوظائف تحسّن أداء كل متر مربع.",
      noteEn:
        "More storage, better functionality and greater freedom within the same space.",
      noteAr: "مساحة تخزين أكبر ووظائف أفضل وحرية أوسع ضمن نفس المساحة.",
      advantageTitleEn: "T1 ADVANTAGE",
      advantageTitleAr: "ميزة T1",
      advantageTextEn:
        "Smart space-saving innovation powered by Keller European engineering.",
      advantageTextAr:
        "ابتكار ذكي لتوفير المساحة مدعوم بهندسة Keller الأوروبية.",
    },
    {
      id: "step-3",
      number: "03",
      icon: "Building2",
      titleEn: "Engineer",
      titleAr: "الهندسة",
      subtitleEn: "Every Detail Resolved Before Execution",
      subtitleAr: "كل التفاصيل تُحسم قبل التنفيذ",
      descriptionEn:
        "Our designers, technical specialists and project managers coordinate drawings, specifications, manufacturing and installation requirements before work begins.",
      descriptionAr:
        "يُنسّق مصممونا والمتخصصون التقنيون ومديرو المشاريع الرسومات والمواصفات ومتطلبات التصنيع والتركيب قبل بدء العمل.",
      noteEn: "",
      noteAr: "",
      advantageTitleEn: "T1 ADVANTAGE",
      advantageTitleAr: "ميزة T1",
      advantageTextEn:
        "European manufacturing precision combined with experienced local technical planning.",
      advantageTextAr:
        "دقة التصنيع الأوروبية مقترنة بالتخطيط التقني المحلي الخبير.",
    },
  ],
}

export const whyChooseContent: WhyChooseContent = {
  eyebrowEn: "Why Clients Choose T1",
  eyebrowAr: "لماذا يختار العملاء T1",
  mainHeadingEn: "Why Clients Choose T1",
  mainHeadingAr: "لماذا يختار العملاء T1",
  descriptionEn: "",
  descriptionAr: "",
  columns: [
    {
      id: "col-1",
      number: "01",
      titleEn: "T1 Studios",
      titleAr: "استوديوهات T1",
      highlighted: true,
      bullets: [
        { id: "b-1-1", textEn: "15 Min Design", textAr: "تصميم في 15 دقيقة" },
        {
          id: "b-1-2",
          textEn: "4 - 6 Weeks Delivery",
          textAr: "التسليم في 4 - 6 أسابيع",
        },
        {
          id: "b-1-3",
          textEn: "Premium (Not Overpriced)",
          textAr: "متميز (غير مبالغ في سعره)",
        },
        { id: "b-1-4", textEn: "European Quality", textAr: "جودة أوروبية" },
        { id: "b-1-5", textEn: "Architectural Design", textAr: "تصميم معماري" },
        { id: "b-1-6", textEn: "Transparent Process", textAr: "عملية شفافة" },
      ],
    },
    {
      id: "col-2",
      number: "02",
      titleEn: "Luxury Brands",
      titleAr: "العلامات التجارية الفاخرة",
      highlighted: false,
      bullets: [
        {
          id: "b-2-1",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-2-2",
          textEn: "Gorem ipsum dolor sit amet, consectetur adipi",
          textAr: "",
        },
        {
          id: "b-2-3",
          textEn: "Gorem ipsum dolor sit amet, consectetur adip",
          textAr: "",
        },
        {
          id: "b-2-4",
          textEn: "Gorem ipsum dolor sit amet, consectetur adipi",
          textAr: "",
        },
        {
          id: "b-2-5",
          textEn: "Gorem ipsum dolor sit amet, consectetur adipi",
          textAr: "",
        },
        {
          id: "b-2-6",
          textEn: "Gorem ipsum dolor sit amet, consectetur adipi",
          textAr: "",
        },
      ],
    },
    {
      id: "col-3",
      number: "03",
      titleEn: "Budget Brands",
      titleAr: "العلامات التجارية الاقتصادية",
      highlighted: false,
      bullets: [
        {
          id: "b-3-1",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-3-2",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-3-3",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-3-4",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-3-5",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
        {
          id: "b-3-6",
          textEn: "Gorem ipsum dolor sit amet, consectetur",
          textAr: "",
        },
      ],
    },
  ],
}

export const testimonialsContent: TestimonialsContent = {
  sectionTitleEn: "Client Testimonials",
  sectionTitleAr: "شهادات العملاء",
  testimonials: [
    {
      id: "t-1",
      number: "01",
      clientName: "Ahmed Khalid",
      clientRole: "Home Owner",
      quoteEn:
        "“T1 turned our house into a home. The attention to detail and professionalism were exceptional.”",
      quoteAr:
        "“حوّل T1 منزلنا إلى بيت حقيقي. الاهتمام بالتفاصيل والاحترافية كانا استثنائيَّين.”",
      imageUrl: undefined,
    },
    {
      id: "t-2",
      number: "02",
      clientName: "Sara Malik",
      clientRole: "Apartment Owner",
      quoteEn:
        "“A seamless experience from start to finish. The team understood our vision perfectly.”",
      quoteAr:
        "“تجربة سلسة من البداية إلى النهاية. فهم الفريق رؤيتنا بشكل مثالي.”",
      imageUrl: undefined,
    },
    {
      id: "t-3",
      number: "03",
      clientName: "Emily Carter",
      clientRole: "Villa Owner",
      quoteEn:
        "“Beautiful designs, great communication and outstanding execution. Highly recommended!”",
      quoteAr: "“تصاميم رائعة وتواصل ممتاز وتنفيذ استثنائي. أوصي بهم بشدة!”",
      imageUrl: undefined,
    },
    {
      id: "t-4",
      number: "04",
      clientName: "James Peterson",
      clientRole: "Business Owner",
      quoteEn:
        "“The quality, creativity and service from T1 exceeded our expectations. A truly professional team.”",
      quoteAr: "“تجاوزت جودة وإبداع وخدمة T1 توقعاتنا. فريق محترف حقاً.”",
      imageUrl: undefined,
    },
  ],
}

export const consultationCtaContent: ConsultationCtaContent = {
  mainHeadingEn: "Let's Create Your Dream Space",
  mainHeadingAr: "لنبتكر معاً مساحة أحلامك",
  tabs: [
    { id: "ctab-1", labelEn: "Home Owners", labelAr: "أصحاب المنازل" },
    { id: "ctab-2", labelEn: "Apartment Owners", labelAr: "أصحاب الشقق" },
    { id: "ctab-3", labelEn: "Property Developers", labelAr: "مطورو العقارات" },
  ],
  formFields: [
    {
      id: "ff-1",
      label: "Property Type",
      type: "Dropdown",
      placeholder: "Select property type",
    },
    {
      id: "ff-2",
      label: "Space Required",
      type: "Dropdown",
      placeholder: "Select space required",
    },
    {
      id: "ff-3",
      label: "Type of Service",
      type: "Dropdown",
      placeholder: "Select type of service",
    },
    {
      id: "ff-4",
      label: "Timeline",
      type: "Dropdown",
      placeholder: "Select timeline",
    },
    {
      id: "ff-5",
      label: "First Name",
      type: "Text",
      placeholder: "Enter first name",
    },
    {
      id: "ff-6",
      label: "Last Name",
      type: "Text",
      placeholder: "Enter last name",
    },
  ],
  imageUrl: undefined,
}

export const partnershipContent: PartnershipContent = {
  sectionTitleEn: "Grow Together Through Trusted Partnerships",
  sectionTitleAr: "النمو معاً من خلال شراكات موثوقة",
  descriptionEn:
    "T1 works with a select group of trusted partners who share our commitment to excellence, innovation and delivering exceptional value. Together, we create opportunities, build lasting relationships and achieve greater success.",
  descriptionAr:
    "تعمل T1 مع مجموعة مختارة من الشركاء الموثوقين الذين يشاركوننا التزامنا بالتميز والابتكار وتقديم قيمة استثنائية. معاً، نخلق الفرص ونبني علاقات دائمة ونحقق نجاحاً أكبر.",
  steps: [
    {
      id: "ps-1",
      number: "01",
      icon: "Headset",
      titleEn: "Register",
      titleAr: "التسجيل",
      descriptionEn: "Join our partner network and share your details.",
      descriptionAr: "انضم إلى شبكة شركائنا وشارك تفاصيلك.",
    },
    {
      id: "ps-2",
      number: "02",
      icon: "CheckCircle",
      titleEn: "Approval",
      titleAr: "الموافقة",
      descriptionEn:
        "We review your information and align on collaboration terms.",
      descriptionAr: "نراجع معلوماتك ونتوافق على شروط التعاون.",
    },
    {
      id: "ps-3",
      number: "03",
      icon: "Lightbulb",
      titleEn: "Introduce Opportunity",
      titleAr: "تقديم الفرصة",
      descriptionEn: "We connect you with relevant opportunities.",
      descriptionAr: "نربطك بالفرص ذات الصلة.",
    },
    {
      id: "ps-4",
      number: "04",
      icon: "Monitor",
      titleEn: "Meeting",
      titleAr: "الاجتماع",
      descriptionEn: "Discuss project details and explore collaboration.",
      descriptionAr: "مناقشة تفاصيل المشروع واستكشاف التعاون.",
    },
    {
      id: "ps-5",
      number: "05",
      icon: "UserCheck",
      titleEn: "Project Award",
      titleAr: "منح المشروع",
      descriptionEn: "Get shortlisted and receive project awards.",
      descriptionAr: "احصل على القائمة المختصرة واستلم جوائز المشروع.",
    },
    {
      id: "ps-6",
      number: "06",
      icon: "Users",
      titleEn: "Referral Recognition",
      titleAr: "الاعتراف بالإحالة",
      descriptionEn: "Earn recognition for successful referrals.",
      descriptionAr: "احصل على التقدير مقابل الإحالات الناجحة.",
    },
    {
      id: "ps-7",
      number: "07",
      icon: "Handshake",
      titleEn: "Long-term Partnership",
      titleAr: "الشراكة طويلة الأمد",
      descriptionEn: "Grow together and create lasting value.",
      descriptionAr: "انمو معاً وأنشئ قيمة دائمة.",
    },
  ],
}

export const awardsContent: AwardsContent = {
  sectionTitleEn: "Awards & Recognition",
  sectionTitleAr: "الجوائز والتقدير",
  subtitleEn: "",
  subtitleAr: "",
  logos: [
    {
      id: "logo-1",
      number: "01",
      imageUrl: undefined,
      altText: "Zawya",
      linkUrl: "https://zawya.com",
    },
    {
      id: "logo-2",
      number: "02",
      imageUrl: undefined,
      altText: "Campaign",
      linkUrl: "https://campaignme.com",
    },
    {
      id: "logo-3",
      number: "03",
      imageUrl: undefined,
      altText: "Adgully",
      linkUrl: "https://adgully.com",
    },
    {
      id: "logo-4",
      number: "04",
      imageUrl: undefined,
      altText: "Social Samosa",
      linkUrl: "https://socialsamosa.com",
    },
  ],
}

export const designTipsContent: DesignTipsContent = {
  sectionTitleEn: "Design Tips & Insights",
  sectionTitleAr: "نصائح وأفكار التصميم",
  descriptionEn: "",
  descriptionAr: "",
  articles: [
    {
      id: "art-1",
      number: "01",
      imageUrl: undefined,
      titleEn: "Creating a calm and modern in Dubai",
      titleAr: "إنشاء مساحة هادئة وعصرية في دبي",
      category: "Guide",
      readTime: "5 min read",
      link: "",
    },
    {
      id: "art-2",
      number: "02",
      imageUrl: undefined,
      titleEn: "What are Panelled Kitchens? Essential Elements?",
      titleAr: "ما هي المطابخ ذات الألواح؟ العناصر الأساسية؟",
      category: "Guide",
      readTime: "8 min read",
      link: "",
    },
    {
      id: "art-3",
      number: "03",
      imageUrl: undefined,
      titleEn: "Dubai's Kitchens in D-Lux",
      titleAr: "مطابخ دبي في D-Lux",
      category: "Inspiration",
      readTime: "6 min read",
      link: "",
    },
    {
      id: "art-4",
      number: "04",
      imageUrl: undefined,
      titleEn: "Bold and Smart: Style that Works in Dubai",
      titleAr: "جريء وذكي: أسلوب يناسب دبي",
      category: "Guide",
      readTime: "2 min read",
      link: "",
    },
  ],
}

export const faqContent: FaqContent = {
  eyebrowEn: "Our FAQs",
  eyebrowAr: "أسئلتنا الشائعة",
  sectionTitleEn: "Frequently Asked Questions",
  sectionTitleAr: "الأسئلة المتكررة",
  faqs: [
    {
      id: "faq-1",
      number: "01",
      questionEn: "Dorem ipsum dolor sit amet, consectetur adipiscing elit.",
      questionAr: "ما هي خدمات التصميم الداخلي التي تقدمونها؟",
      answerEn:
        "Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Cla-ass aptent taciti sociosqu ad litora torquent per conubia nostra.",
      answerAr: "",
    },
    {
      id: "faq-2",
      number: "02",
      questionEn: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
      questionAr: "كم تستغرق مشاريع التصميم الداخلي عادةً؟",
      answerEn: "",
      answerAr: "",
    },
    {
      id: "faq-3",
      number: "03",
      questionEn: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
      questionAr: "هل تعملون خارج دبي؟",
      answerEn: "",
      answerAr: "",
    },
    {
      id: "faq-4",
      number: "04",
      questionEn: "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
      questionAr: "كيف يمكنني البدء مع T1 Studio؟",
      answerEn: "",
      answerAr: "",
    },
  ],
}

export const locationLinksContent: LocationLinksContent = {
  sectionTitleEn: "Locations",
  sectionTitleAr: "المواقع",
  descriptionEn: "",
  descriptionAr: "",
  columns: [
    {
      id: "col-1",
      number: "01",
      titleEn: "Palm Jumeirah",
      titleAr: "نخلة جميرا",
      links: [
        {
          id: "ll-1-1",
          label: "Custom Kitchens in Palm Jumeirah",
          href: "/locations/palm-jumeirah/custom-kitchens",
        },
        {
          id: "ll-1-2",
          label: "Bespoke Joinery in Palm Jumeirah",
          href: "/locations/palm-jumeirah/bespoke-joinery",
        },
        {
          id: "ll-1-3",
          label: "Luxury Wardrobes in Palm Jumeirah",
          href: "/locations/palm-jumeirah/luxury-wardrobes",
        },
        {
          id: "ll-1-4",
          label: "Custom Cabinets in Palm Jumeirah",
          href: "/locations/palm-jumeirah/custom-cabinets",
        },
      ],
    },
    {
      id: "col-2",
      number: "02",
      titleEn: "Dubai Marina",
      titleAr: "دبي مارينا",
      links: [
        {
          id: "ll-2-1",
          label: "Custom Kitchens in Dubai Marina",
          href: "/locations/dubai-marina/custom-kitchens",
        },
        {
          id: "ll-2-2",
          label: "Bespoke Joinery in Dubai Marina",
          href: "/locations/dubai-marina/bespoke-joinery",
        },
        {
          id: "ll-2-3",
          label: "Luxury Wardrobes in Dubai Marina",
          href: "/locations/dubai-marina/luxury-wardrobes",
        },
        {
          id: "ll-2-4",
          label: "Custom Cabinets in Dubai Marina",
          href: "/locations/dubai-marina/custom-wardrobes",
        },
      ],
    },
    {
      id: "col-3",
      number: "03",
      titleEn: "Downtown Dubai",
      titleAr: "وسط مدينة دبي",
      links: [
        {
          id: "ll-3-1",
          label: "Custom Kitchens in Downtown Dubai",
          href: "/locations/downtown-dubai/custom-kitchens",
        },
        {
          id: "ll-3-2",
          label: "Bespoke Joinery Work in Downtown Dubai",
          href: "/locations/downtown-dubai/bespoke-joinery",
        },
        {
          id: "ll-3-3",
          label: "Luxury Wardrobes in Downtown Dubai",
          href: "/locations/downtown-dubai/luxury-wardrobes",
        },
        {
          id: "ll-3-4",
          label: "Custom Cabinets in Downtown Dubai",
          href: "/locations/downtown-dubai/custom-cabinets",
        },
      ],
    },
    {
      id: "col-4",
      number: "04",
      titleEn: "Abu Dhabi",
      titleAr: "أبوظبي",
      links: [
        {
          id: "ll-4-1",
          label: "Custom Kitchens in Abu Dhabi",
          href: "/locations/abu-dhabi/custom-kitchens",
        },
        {
          id: "ll-4-2",
          label: "Bespoke Joinery Work in Abu Dhabi",
          href: "/locations/abu-dhabi/bespoke-joinery",
        },
        {
          id: "ll-4-3",
          label: "Luxury Wardrobes in Abu Dhabi",
          href: "/locations/abu-dhabi/luxury-wardrobes",
        },
        {
          id: "ll-4-4",
          label: "Custom Cabinets in Abu Dhabi",
          href: "/locations/abu-dhabi/custom-cabinets",
        },
      ],
    },
  ],
}

export const footerContent: FooterContent = {
  newsletterHeadingEn: "Stay In Loop",
  newsletterHeadingAr: "ابقَ على اطلاع",
  newsletterSubtextEn:
    "Be the first to know about our exclusive offers, newest collections, and latest products!",
  newsletterSubtextAr: "",
  newsletterPlaceholderEn: "Enter your email",
  newsletterPlaceholderAr: "أدخل بريدك الإلكتروني",
  newsletterButtonLabelEn: "Submit",
  newsletterButtonLabelAr: "إرسال",
  brandDescriptionEn:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.",
  brandDescriptionAr: "",
  socialLinks: [
    { id: "soc-1", platform: "Facebook", url: "" },
    { id: "soc-2", platform: "Instagram", url: "" },
    { id: "soc-3", platform: "X", url: "" },
    { id: "soc-4", platform: "LinkedIn", url: "" },
    { id: "soc-5", platform: "YouTube", url: "" },
  ],
  linkColumns: [
    {
      id: "fcol-1",
      number: "01",
      titleEn: "Spaces",
      titleAr: "المساحات",
      links: [
        { id: "fl-1-1", label: "Kitchen", href: "/spaces/kitchen" },
        { id: "fl-1-2", label: "Wardrobes", href: "/spaces/wardrobes" },
        {
          id: "fl-1-3",
          label: "Bespoke Joinery",
          href: "/spaces/bespoke-joinery",
        },
        { id: "fl-1-4", label: "Living Room", href: "/spaces/living-room" },
        { id: "fl-1-5", label: "Bedrooms", href: "/spaces/bedrooms" },
        { id: "fl-1-6", label: "Bathrooms", href: "/spaces/bathrooms" },
        { id: "fl-1-7", label: "Home Offices", href: "/spaces/home-offices" },
        {
          id: "fl-1-8",
          label: "Outdoor Living",
          href: "/spaces/outdoor-living",
        },
      ],
    },
    {
      id: "fcol-2",
      number: "02",
      titleEn: "Projects",
      titleAr: "المشاريع",
      links: [
        {
          id: "fl-2-1",
          label: "Jumeirah Gate Dubai",
          href: "/projects/jumeirah-gate-dubai",
        },
        {
          id: "fl-2-2",
          label: "Blue Waters Dubai",
          href: "/projects/blue-waters-dubai",
        },
        {
          id: "fl-2-3",
          label: "Al Yasmeen Sharjah",
          href: "/projects/al-yasmeen-sharjah",
        },
        {
          id: "fl-2-4",
          label: "Citywalk Dubai",
          href: "/projects/citywalk-dubai",
        },
      ],
    },
    {
      id: "fcol-3",
      number: "03",
      titleEn: "Company",
      titleAr: "الشركة",
      links: [
        { id: "fl-3-1", label: "Trade", href: "/trade" },
        { id: "fl-3-2", label: "About", href: "/about" },
        { id: "fl-3-3", label: "Contact", href: "/contact" },
        { id: "fl-3-4", label: "Why T1", href: "/why-t1" },
      ],
    },
  ],
  openingHoursHeadingEn: "Opening Hours",
  openingHoursHeadingAr: "ساعات العمل",
  hoursRows: [
    {
      id: "hr-1",
      daysEn: "Mon – Fri",
      daysAr: "الإثنين - الجمعة",
      hoursEn: "8am – 6pm",
      hoursAr: "٨ص - ٦م",
    },
    {
      id: "hr-2",
      daysEn: "Sat",
      daysAr: "السبت",
      hoursEn: "8am – 4pm",
      hoursAr: "٨ص - ٤م",
    },
  ],
  showroomHeadingEn: "Showroom",
  showroomHeadingAr: "صالة العرض",
  showroomAddressEn:
    "Showroom 1, MSM 2 Building, Exit 44, Sheikh Zayed Road, Dubai",
  showroomAddressAr: "",
  showroomPhone: "+971 4 2386 488",
  showroomEmail: "info@tonestudios.com",
  showroomDirectionsUrl: "",
  showroomDirectionsLabelEn: "Get direction to showroom",
  showroomDirectionsLabelAr: "احصل على الاتجاهات إلى صالة العرض",
  copyrightTextEn: "© 2026 Prism. All rights reserved.",
  copyrightTextAr: "",
  legalLinks: [
    { id: "leg-1", labelEn: "Privacy", labelAr: "الخصوصية", href: "/privacy" },
    { id: "leg-2", labelEn: "Terms", labelAr: "الشروط", href: "/terms" },
    {
      id: "leg-3",
      labelEn: "Cookies",
      labelAr: "ملفات تعريف الارتباط",
      href: "/cookies",
    },
    {
      id: "leg-4",
      labelEn: "Accessibility",
      labelAr: "إمكانية الوصول",
      href: "/accessibility",
    },
    {
      id: "leg-5",
      labelEn: "Sitemap",
      labelAr: "خريطة الموقع",
      href: "/sitemap",
    },
    {
      id: "leg-6",
      labelEn: "Copyright",
      labelAr: "حقوق النشر",
      href: "/copyright",
    },
  ],
}

export const homePage: CmsPage = {
  slug: "home",
  title: { en: "Home", ar: "الرئيسية" },
  status: "Published",
  sections: homeSections,
  heroContent,
  statsContent,
  servicesContent,
  featuredSpacesContent,
  signatureProjectsContent,
  journeyContent,
  whyChooseContent,
  testimonialsContent,
  consultationCtaContent,
  partnershipContent,
  awardsContent,
  designTipsContent,
  faqContent,
  locationLinksContent,
  footerContent,
}
