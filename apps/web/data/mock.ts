import type {
  CmsPage,
  CmsSection,
  CmsUser,
  FeaturedSpacesContent,
  HeroContent,
  NavSection,
  ServicesContent,
  SignatureProjectsContent,
  StatsContent,
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
      { slug: "home", label: "Home", active: true },
      { slug: "about", label: "About" },
      { slug: "projects", label: "Projects" },
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
    name: { en: "Partner Logos", ar: "شعارات الشركاء" },
    type: "Collection",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s11",
    number: "11",
    name: { en: "Design Tips & Insights", ar: "نصائح وأفكار التصميم" },
    type: "Linked: Blog",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s12",
    number: "12",
    name: { en: "FAQ", ar: "الأسئلة الشائعة" },
    type: "Linked: FAQ",
    status: { en: true, ar: true },
    visible: true,
  },
  {
    id: "s13",
    number: "13",
    name: { en: "Footer", ar: "التذييل" },
    type: "Global",
    status: { en: true, ar: true },
    visible: true,
  },
]

export const signatureProjectsContent: SignatureProjectsContent = {
  headingEn: "Signature Projects",
  headingAr: "المشاريع المميزة",
  buttonLabelEn: "View All Projects",
  buttonLabelAr: "عرض جميع المشاريع",
  selectedProjects: [
    {
      id: "p01",
      title: "Blue Waters Dubai",
      location: "Dubai, UAE",
      imageUrl: undefined,
    },
    {
      id: "p02",
      title: "Emirates Gate",
      location: "Abu Dhabi, UAE",
      imageUrl: undefined,
    },
    {
      id: "p03",
      title: "Al Yasmeen",
      location: "Sharjah, UAE",
      imageUrl: undefined,
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
    { id: "svc-1", icon: "Pencil", titleEn: "Custom Design", titleAr: "تصميم مخصص", subtitleEn: "Bespoke Solutions", subtitleAr: "حلول مصممة خصيصاً", visible: true },
    { id: "svc-2", icon: "Hammer", titleEn: "Renovation", titleAr: "تجديد", subtitleEn: "Modern Refresh", subtitleAr: "لمسة عصرية متجددة", visible: true },
    { id: "svc-3", icon: "Gem", titleEn: "Luxury Design", titleAr: "تصميم فاخر", subtitleEn: "Premium Materials", subtitleAr: "مواد عالية الجودة", visible: true },
    { id: "svc-4", icon: "Cog", titleEn: "Installation", titleAr: "التركيب", subtitleEn: "Expert Execution", subtitleAr: "تنفيذ احترافي", visible: true },
  ],
}

export const statsContent: StatsContent = {
  sectionTitleEn: "Our Numbers",
  sectionTitleAr: "أرقامنا",
  statistics: [
    { id: "stat-1", value: "500+", labelEn: "Happy Clients", labelAr: "عميل سعيد" },
    { id: "stat-2", value: "200+", labelEn: "Projects Completed", labelAr: "مشروع مكتمل" },
    { id: "stat-3", value: "100+", labelEn: "Design Experts", labelAr: "خبير تصميم" },
    { id: "stat-4", value: "100+", labelEn: "5-Star Reviews", labelAr: "تقييم 5 نجوم" },
  ],
}

export const heroContent: HeroContent = {
  eyebrowEn: "Dutch Craftsmanship. Kitchens & Wardrobes",
  eyebrowAr: "الحرفية الهولندية. المطابخ وخزائن الملابس",
  mainHeadingEn: "Made for Dubai Homes.",
  mainHeadingAr: "مصنوع لمنازل دبي.",
  descriptionEn:
    "Custom kitchens, wardrobes, and complete home interiors tailored to your lifestyle.",
  descriptionAr: "مطابخ وخزائن ملابس مخصصة، وديكورات منزلية متكاملة مصممة وفق أسلوب حياتك.",
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
    { id: "sp-2", titleEn: "Wardrobes", titleAr: "خزائن الملابس", visible: true },
    { id: "sp-3", titleEn: "Living Room", titleAr: "غرفة المعيشة", visible: true },
    { id: "sp-4", titleEn: "Bedrooms", titleAr: "غرف النوم", visible: true },
    { id: "sp-5", titleEn: "Bathrooms", titleAr: "الحمامات", visible: true },
    { id: "sp-6", titleEn: "Home Offices", titleAr: "مكاتب منزلية", visible: true },
    { id: "sp-7", titleEn: "Outdoor Living", titleAr: "المعيشة الخارجية", visible: true },
    { id: "sp-8", titleEn: "Bespoke Joinery", titleAr: "نجارة مخصصة", visible: true },
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
}
