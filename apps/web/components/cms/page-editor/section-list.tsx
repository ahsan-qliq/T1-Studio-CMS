// "use client"

// import { useState } from "react"
// import { SectionFilters, type FilterKey } from "./section-filters"
// import { SectionRow } from "./section-row"
// import { SignatureProjectsSectionDetail } from "../section-detail/signature-projects/signature-projects-section-detail"
// import { HeroSectionDetail } from "../section-detail/hero/hero-section-detail"
// import { StatsSectionDetail } from "../section-detail/stats/stats-section-detail"
// import { ServicesSectionDetail } from "../section-detail/services/services-section-detail"
// import { FeaturedSpacesSectionDetail } from "../section-detail/featured-spaces/featured-spaces-section-detail"
// import { JourneySectionDetail } from "../section-detail/journey/journey-section-detail"
// import { WhyChooseSectionDetail } from "../section-detail/why-choose/why-choose-section-detail"
// import { TestimonialsSectionDetail } from "../section-detail/testimonials/testimonials-section-detail"
// import { ConsultationCtaSectionDetail } from "../section-detail/consultation-cta/consultation-cta-section-detail"
// import { AwardsRecognitionSectionDetail } from "../section-detail/awards-recognition/awards-recognition-section-detail"
// import { DesignTipsSectionDetail } from "../section-detail/design-tips/design-tips-section-detail"
// import { FaqSectionDetail } from "../section-detail/faq/faq-section-detail"
// import { LocationLinksSectionDetail } from "../section-detail/location-links/location-links-section-detail"
// import { SectionInfo } from "./section-info"
// import type {
//   AwardsContent,
//   CmsSection,
//   DesignTipsContent,
//   FaqContent,
//   LocationLinksContent,
//   ConsultationCtaContent,
//   FeaturedSpacesContent,
//   HeroContent,
//   JourneyContent,
//   ServicesContent,
//   SignatureProjectsContent,
//   StatsContent,
//   SectionType,
//   TestimonialsContent,
//   WhyChooseContent,
// } from "@/types/cms"

// interface SectionListProps {
//   sections: CmsSection[]
//   onSectionsChange: (sections: CmsSection[]) => void
//   heroContent: HeroContent
//   onHeroContentChange: (content: HeroContent) => void
//   statsContent: StatsContent
//   onStatsContentChange: (content: StatsContent) => void
//   servicesContent: ServicesContent
//   onServicesContentChange: (content: ServicesContent) => void
//   featuredSpacesContent: FeaturedSpacesContent
//   onFeaturedSpacesContentChange: (content: FeaturedSpacesContent) => void
//   signatureContent: SignatureProjectsContent
//   onSignatureContentChange: (content: SignatureProjectsContent) => void
//   journeyContent: JourneyContent
//   onJourneyContentChange: (content: JourneyContent) => void
//   whyChooseContent: WhyChooseContent
//   onWhyChooseContentChange: (content: WhyChooseContent) => void
//   testimonialsContent: TestimonialsContent
//   onTestimonialsContentChange: (content: TestimonialsContent) => void
//   consultationCtaContent: ConsultationCtaContent
//   onConsultationCtaContentChange: (content: ConsultationCtaContent) => void
//   awardsContent: AwardsContent
//   onAwardsContentChange: (content: AwardsContent) => void
//   designTipsContent: DesignTipsContent
//   onDesignTipsContentChange: (content: DesignTipsContent) => void
//   faqContent: FaqContent
//   onFaqContentChange: (content: FaqContent) => void
//   locationLinksContent: LocationLinksContent
//   onLocationLinksContentChange: (content: LocationLinksContent) => void
// }

// function matchesFilter(type: SectionType, filter: FilterKey): boolean {
//   if (filter === "all") return true
//   if (filter === "manual") return type === "Manual"
//   if (filter === "global") return type === "Global"
//   if (filter === "linked") return type.startsWith("Linked") || type === "Collection"
//   return true
// }

// export function SectionList({
//   sections,
//   onSectionsChange,
//   heroContent,
//   onHeroContentChange,
//   statsContent,
//   onStatsContentChange,
//   servicesContent,
//   onServicesContentChange,
//   featuredSpacesContent,
//   onFeaturedSpacesContentChange,
//   signatureContent,
//   onSignatureContentChange,
//   journeyContent,
//   onJourneyContentChange,
//   whyChooseContent,
//   onWhyChooseContentChange,
//   testimonialsContent,
//   onTestimonialsContentChange,
//   consultationCtaContent,
//   onConsultationCtaContentChange,
//   awardsContent,
//   onAwardsContentChange,
//   designTipsContent,
//   onDesignTipsContentChange,
//   faqContent,
//   onFaqContentChange,
//   locationLinksContent,
//   onLocationLinksContentChange,
// }: SectionListProps) {
//   const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
//   const [expandedId, setExpandedId] = useState<string | null>("s05")

//   const counts = {
//     all: sections.length,
//     manual: sections.filter((s) => s.type === "Manual").length,
//     linked: sections.filter((s) => s.type.startsWith("Linked") || s.type === "Collection").length,
//     global: sections.filter((s) => s.type === "Global").length,
//   }

//   const filteredSections = sections.filter((s) => matchesFilter(s.type, activeFilter))

//   const toggleVisible = (id: string, visible: boolean) => {
//     onSectionsChange(sections.map((s) => (s.id === id ? { ...s, visible } : s)))
//   }

//   const toggleExpand = (id: string) => {
//     setExpandedId(expandedId === id ? null : id)
//   }

//   return (
//     <div className="flex-1 overflow-y-auto">
//       {/* Header */}
//       <div className="flex items-start gap-4 border-b border-zinc-200 bg-white px-6 py-4">
//         <div className="flex-1">
//           <h2 className="text-sm font-semibold text-zinc-900">Home Page Structure</h2>
//           <p className="mt-0.5 text-xs text-zinc-500">
//             {sections.length} components compose your homepage. Reorder, edit, and manage content
//             for each section.
//           </p>
//           <div className="mt-3">
//             <SectionFilters active={activeFilter} counts={counts} onChange={setActiveFilter} />
//           </div>
//         </div>
//         <div className="hidden w-56 shrink-0 xl:block">
//           <SectionInfo />
//         </div>
//       </div>

//       {/* Section rows */}
//       <div role="list" aria-label="Page sections">
//         {filteredSections.map((section) => (
//           <div key={section.id} role="listitem">
//             <SectionRow
//               section={section}
//               expanded={expandedId === section.id}
//               onToggleExpand={() => toggleExpand(section.id)}
//               onToggleVisible={(visible) => toggleVisible(section.id, visible)}
//             />

//             {expandedId === section.id && section.id === "s01" && (
//               <HeroSectionDetail
//                 section={section}
//                 content={heroContent}
//                 onContentChange={onHeroContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s02" && (
//               <StatsSectionDetail
//                 section={section}
//                 content={statsContent}
//                 onContentChange={onStatsContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s03" && (
//               <ServicesSectionDetail
//                 section={section}
//                 content={servicesContent}
//                 onContentChange={onServicesContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s04" && (
//               <FeaturedSpacesSectionDetail
//                 section={section}
//                 content={featuredSpacesContent}
//                 onContentChange={onFeaturedSpacesContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s05" && (
//               <SignatureProjectsSectionDetail
//                 section={section}
//                 content={signatureContent}
//                 onContentChange={onSignatureContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s06" && (
//               <JourneySectionDetail
//                 section={section}
//                 content={journeyContent}
//                 onContentChange={onJourneyContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s07" && (
//               <WhyChooseSectionDetail
//                 section={section}
//                 content={whyChooseContent}
//                 onContentChange={onWhyChooseContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s08" && (
//               <TestimonialsSectionDetail
//                 section={section}
//                 content={testimonialsContent}
//                 onContentChange={onTestimonialsContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s09" && (
//               <ConsultationCtaSectionDetail
//                 section={section}
//                 content={consultationCtaContent}
//                 onContentChange={onConsultationCtaContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s10" && (
//               <AwardsRecognitionSectionDetail
//                 section={section}
//                 content={awardsContent}
//                 onContentChange={onAwardsContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s11" && (
//               <DesignTipsSectionDetail
//                 section={section}
//                 content={designTipsContent}
//                 onContentChange={onDesignTipsContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s12" && (
//               <FaqSectionDetail
//                 section={section}
//                 content={faqContent}
//                 onContentChange={onFaqContentChange}
//               />
//             )}

//             {expandedId === section.id && section.id === "s13" && (
//               <LocationLinksSectionDetail
//                 section={section}
//                 content={locationLinksContent}
//                 onContentChange={onLocationLinksContentChange}
//               />
//             )}

//             {expandedId === section.id &&
//               !["s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08", "s09", "s10", "s11", "s12", "s13"].includes(section.id) && (
//                 <div
//                   className="border-b border-zinc-200 bg-zinc-50/60 px-6 py-6 text-sm text-zinc-500"
//                   role="region"
//                   aria-label={`${section.name.en} section editor`}
//                 >
//                   <p>
//                     Editor for{" "}
//                     <strong className="text-zinc-700">{section.name.en}</strong> (
//                     {section.type}) — content editing UI coming soon.
//                   </p>
//                 </div>
//               )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { SectionFilters, type FilterKey } from "./section-filters"
import { SectionRow } from "./section-row"
import { SignatureProjectsSectionDetail } from "../section-detail/signature-projects/signature-projects-section-detail"
import { HeroSectionDetail } from "../section-detail/hero/hero-section-detail"
import { StatsSectionDetail } from "../section-detail/stats/stats-section-detail"
import { ServicesSectionDetail } from "../section-detail/services/services-section-detail"
import { FeaturedSpacesSectionDetail } from "../section-detail/featured-spaces/featured-spaces-section-detail"
import { JourneySectionDetail } from "../section-detail/journey/journey-section-detail"
import { WhyChooseSectionDetail } from "../section-detail/why-choose/why-choose-section-detail"
import { TestimonialsSectionDetail } from "../section-detail/testimonials/testimonials-section-detail"
import { ConsultationCtaSectionDetail } from "../section-detail/consultation-cta/consultation-cta-section-detail"
import { PartnershipSectionDetail } from "../section-detail/partnership/partnership-section-detail"
import { AwardsRecognitionSectionDetail } from "../section-detail/awards-recognition/awards-recognition-section-detail"
import { DesignTipsSectionDetail } from "../section-detail/design-tips/design-tips-section-detail"
import { FaqSectionDetail } from "../section-detail/faq/faq-section-detail"
import { LocationLinksSectionDetail } from "../section-detail/location-links/location-links-section-detail"
import { SectionInfo } from "./section-info"
import type {
  AwardsContent,
  CmsSection,
  DesignTipsContent,
  FaqContent,
  LocationLinksContent,
  ConsultationCtaContent,
  FeaturedSpacesContent,
  HeroContent,
  JourneyContent,
  ServicesContent,
  SignatureProjectsContent,
  StatsContent,
  SectionType,
  TestimonialsContent,
  WhyChooseContent,
  PartnershipContent,
} from "@/types/cms"

interface SectionListProps {
  sections: CmsSection[]
  onSectionsChange: (sections: CmsSection[]) => void
  heroContent: HeroContent
  onHeroContentChange: (content: HeroContent) => void
  statsContent: StatsContent
  onStatsContentChange: (content: StatsContent) => void
  servicesContent: ServicesContent
  onServicesContentChange: (content: ServicesContent) => void
  featuredSpacesContent: FeaturedSpacesContent
  onFeaturedSpacesContentChange: (content: FeaturedSpacesContent) => void
  signatureContent: SignatureProjectsContent
  onSignatureContentChange: (content: SignatureProjectsContent) => void
  journeyContent: JourneyContent
  onJourneyContentChange: (content: JourneyContent) => void
  whyChooseContent: WhyChooseContent
  onWhyChooseContentChange: (content: WhyChooseContent) => void
  testimonialsContent: TestimonialsContent
  onTestimonialsContentChange: (content: TestimonialsContent) => void
  consultationCtaContent: ConsultationCtaContent
  onConsultationCtaContentChange: (content: ConsultationCtaContent) => void
  partnershipContent: PartnershipContent
  onPartnershipContentChange: (content: PartnershipContent) => void
  awardsContent: AwardsContent
  onAwardsContentChange: (content: AwardsContent) => void
  designTipsContent: DesignTipsContent
  onDesignTipsContentChange: (content: DesignTipsContent) => void
  faqContent: FaqContent
  onFaqContentChange: (content: FaqContent) => void
  locationLinksContent: LocationLinksContent
  onLocationLinksContentChange: (content: LocationLinksContent) => void
}

function matchesFilter(type: SectionType, filter: FilterKey): boolean {
  if (filter === "all") return true
  if (filter === "manual") return type === "Manual"
  if (filter === "global") return type === "Global"
  if (filter === "linked")
    return type.startsWith("Linked") || type === "Collection"
  return true
}

export function SectionList({
  sections,
  onSectionsChange,
  heroContent,
  onHeroContentChange,
  statsContent,
  onStatsContentChange,
  servicesContent,
  onServicesContentChange,
  featuredSpacesContent,
  onFeaturedSpacesContentChange,
  signatureContent,
  onSignatureContentChange,
  journeyContent,
  onJourneyContentChange,
  whyChooseContent,
  onWhyChooseContentChange,
  testimonialsContent,
  onTestimonialsContentChange,
  consultationCtaContent,
  onConsultationCtaContentChange,
  partnershipContent,
  onPartnershipContentChange,
  awardsContent,
  onAwardsContentChange,
  designTipsContent,
  onDesignTipsContentChange,
  faqContent,
  onFaqContentChange,
  locationLinksContent,
  onLocationLinksContentChange,
}: SectionListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")
  const [expandedId, setExpandedId] = useState<string | null>("s05")

  const counts = {
    all: sections.length,
    manual: sections.filter((s) => s.type === "Manual").length,
    linked: sections.filter(
      (s) => s.type.startsWith("Linked") || s.type === "Collection"
    ).length,
    global: sections.filter((s) => s.type === "Global").length,
  }

  const filteredSections = sections.filter((s) =>
    matchesFilter(s.type, activeFilter)
  )

  const toggleVisible = (id: string, visible: boolean) => {
    onSectionsChange(sections.map((s) => (s.id === id ? { ...s, visible } : s)))
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="flex items-start gap-4 border-b border-zinc-200 bg-white px-6 py-4">
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-zinc-900">
            Home Page Structure
          </h2>
          <p className="mt-0.5 text-xs text-zinc-500">
            {sections.length} components compose your homepage. Reorder, edit,
            and manage content for each section.
          </p>
          <div className="mt-3">
            <SectionFilters
              active={activeFilter}
              counts={counts}
              onChange={setActiveFilter}
            />
          </div>
        </div>
        <div className="hidden w-56 shrink-0 xl:block">
          <SectionInfo />
        </div>
      </div>

      {/* Section rows */}
      <div role="list" aria-label="Page sections">
        {filteredSections.map((section) => (
          <div key={section.id} role="listitem">
            <SectionRow
              section={section}
              expanded={expandedId === section.id}
              onToggleExpand={() => toggleExpand(section.id)}
              onToggleVisible={(visible) => toggleVisible(section.id, visible)}
            />

            {expandedId === section.id && section.id === "s01" && (
              <HeroSectionDetail
                section={section}
                content={heroContent}
                onContentChange={onHeroContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s02" && (
              <StatsSectionDetail
                section={section}
                content={statsContent}
                onContentChange={onStatsContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s03" && (
              <ServicesSectionDetail
                section={section}
                content={servicesContent}
                onContentChange={onServicesContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s04" && (
              <FeaturedSpacesSectionDetail
                section={section}
                content={featuredSpacesContent}
                onContentChange={onFeaturedSpacesContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s05" && (
              <SignatureProjectsSectionDetail
                section={section}
                content={signatureContent}
                onContentChange={onSignatureContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s06" && (
              <JourneySectionDetail
                section={section}
                content={journeyContent}
                onContentChange={onJourneyContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s07" && (
              <WhyChooseSectionDetail
                section={section}
                content={whyChooseContent}
                onContentChange={onWhyChooseContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s08" && (
              <TestimonialsSectionDetail
                section={section}
                content={testimonialsContent}
                onContentChange={onTestimonialsContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s09" && (
              <ConsultationCtaSectionDetail
                section={section}
                content={consultationCtaContent}
                onContentChange={onConsultationCtaContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s10" && (
              <PartnershipSectionDetail
                section={section}
                content={partnershipContent}
                onContentChange={onPartnershipContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s11" && (
              <AwardsRecognitionSectionDetail
                section={section}
                content={awardsContent}
                onContentChange={onAwardsContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s12" && (
              <DesignTipsSectionDetail
                section={section}
                content={designTipsContent}
                onContentChange={onDesignTipsContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s13" && (
              <FaqSectionDetail
                section={section}
                content={faqContent}
                onContentChange={onFaqContentChange}
              />
            )}

            {expandedId === section.id && section.id === "s14" && (
              <LocationLinksSectionDetail
                section={section}
                content={locationLinksContent}
                onContentChange={onLocationLinksContentChange}
              />
            )}

            {expandedId === section.id &&
              ![
                "s01",
                "s02",
                "s03",
                "s04",
                "s05",
                "s06",
                "s07",
                "s08",
                "s09",
                "s10",
                "s11",
                "s12",
                "s13",
                "s14",
              ].includes(section.id) && (
                <div
                  className="border-b border-zinc-200 bg-zinc-50/60 px-6 py-6 text-sm text-zinc-500"
                  role="region"
                  aria-label={`${section.name.en} section editor`}
                >
                  <p>
                    Editor for{" "}
                    <strong className="text-zinc-700">{section.name.en}</strong>{" "}
                    ({section.type}) — content editing UI coming soon.
                  </p>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
