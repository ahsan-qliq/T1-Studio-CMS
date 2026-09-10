"use client"

import { useState } from "react"
import { PageHeader } from "./page-header"
import { SectionList } from "./section-list"
import {
  heroContent as defaultHeroContent,
  statsContent as defaultStatsContent,
  servicesContent as defaultServicesContent,
  featuredSpacesContent as defaultFeaturedSpacesContent,
} from "@/data/mock"
import type {
  CmsPage,
  CmsSection,
  FeaturedSpacesContent,
  HeroContent,
  Language,
  PageStatus,
  ServicesContent,
  SignatureProjectsContent,
  StatsContent,
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
      />
    </div>
  )
}
