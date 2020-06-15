export type PlanFeature = {
  key: string
  value: string
  link: string
  bold: boolean
}

export type PricingPlan = {
  name: string
  tagline: string
  currency?: string
  priceMonthly?: string
  priceAnnually?: string
  ctaText?: string
  smallPrint?: string
  features: PlanFeature[]
}
