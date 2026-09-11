"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import { SectionList } from "./section-list"
import {
  heroContent as defaultHeroContent,
  statsContent as defaultStatsContent,
  servicesContent as defaultServicesContent,
  featuredSpacesContent as defaultFeaturedSpacesContent,
  journeyContent as defaultJourneyContent,
  whyChooseContent as defaultWhyChooseContent,
  testimonialsContent as defaultTestimonialsContent,
  consultationCtaContent as defaultConsultationCtaContent,
  awardsContent as defaultAwardsContent,
  designTipsContent as defaultDesignTipsContent,
  faqContent as defaultFaqContent,
  locationLinksContent as defaultLocationLinksContent,
} from "@/data/mock"
import type {
  AwardsContent,
  CmsPage,
  DesignTipsContent,
  FaqContent,
  LocationLinksContent,
  CmsSection,
  ConsultationCtaContent,
  FeaturedSpacesContent,
  HeroContent,
  JourneyContent,
  Language,
  PageStatus,
  ServicesContent,
  SignatureProjectsContent,
  StatsContent,
  TestimonialsContent,
  WhyChooseContent,
} from "@/types/cms"

interface PageEditorProps {
  page: CmsPage
}

export function PageEditor({ page: initialPage }: PageEditorProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [status, setStatus] = useState<PageStatus>(initialPage.status)
  const [sections, setSections] = useState<CmsSection[]>(initialPage.sections)
  const [heroContent, setHeroContent] = useState<HeroContent>(
    initialPage.heroContent ?? defaultHeroContent
  )
  const [statsContent, setStatsContent] = useState<StatsContent>(
    initialPage.statsContent ?? defaultStatsContent
  )
  const [servicesContent, setServicesContent] = useState<ServicesContent>(
    initialPage.servicesContent ?? defaultServicesContent
  )
  const [featuredSpacesContent, setFeaturedSpacesContent] = useState<FeaturedSpacesContent>(
    initialPage.featuredSpacesContent ?? defaultFeaturedSpacesContent
  )
  const [signatureContent, setSignatureContent] = useState<SignatureProjectsContent>(
    initialPage.signatureProjectsContent
  )
  const [journeyContent, setJourneyContent] = useState<JourneyContent>(
    initialPage.journeyContent ?? defaultJourneyContent
  )
  const [whyChooseContent, setWhyChooseContent] = useState<WhyChooseContent>(
    initialPage.whyChooseContent ?? defaultWhyChooseContent
  )
  const [testimonialsContent, setTestimonialsContent] = useState<TestimonialsContent>(
    initialPage.testimonialsContent ?? defaultTestimonialsContent
  )
  const [consultationCtaContent, setConsultationCtaContent] = useState<ConsultationCtaContent>(
    initialPage.consultationCtaContent ?? defaultConsultationCtaContent
  )
  const [awardsContent, setAwardsContent] = useState<AwardsContent>(
    initialPage.awardsContent ?? defaultAwardsContent
  )
  const [designTipsContent, setDesignTipsContent] = useState<DesignTipsContent>(
    initialPage.designTipsContent ?? defaultDesignTipsContent
  )
  const [faqContent, setFaqContent] = useState<FaqContent>(
    initialPage.faqContent ?? defaultFaqContent
  )
  const [locationLinksContent, setLocationLinksContent] = useState<LocationLinksContent>(
    initialPage.locationLinksContent ?? defaultLocationLinksContent
  )

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        pageTitle={initialPage.title.en}
        language={language}
        onLanguageChange={setLanguage}
        status={status}
        onStatusChange={setStatus}
      />
      <SectionList
        sections={sections}
        onSectionsChange={setSections}
        heroContent={heroContent}
        onHeroContentChange={setHeroContent}
        statsContent={statsContent}
        onStatsContentChange={setStatsContent}
        servicesContent={servicesContent}
        onServicesContentChange={setServicesContent}
        featuredSpacesContent={featuredSpacesContent}
        onFeaturedSpacesContentChange={setFeaturedSpacesContent}
        signatureContent={signatureContent}
        onSignatureContentChange={setSignatureContent}
        journeyContent={journeyContent}
        onJourneyContentChange={setJourneyContent}
        whyChooseContent={whyChooseContent}
        onWhyChooseContentChange={setWhyChooseContent}
        testimonialsContent={testimonialsContent}
        onTestimonialsContentChange={setTestimonialsContent}
        consultationCtaContent={consultationCtaContent}
        onConsultationCtaContentChange={setConsultationCtaContent}
        awardsContent={awardsContent}
        onAwardsContentChange={setAwardsContent}
        designTipsContent={designTipsContent}
        onDesignTipsContentChange={setDesignTipsContent}
        faqContent={faqContent}
        onFaqContentChange={setFaqContent}
        locationLinksContent={locationLinksContent}
        onLocationLinksContentChange={setLocationLinksContent}
      />
    </div>
  )
}
