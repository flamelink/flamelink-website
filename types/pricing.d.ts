export type PlanFeature = {
  key: string
  value: string
  link: string
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
