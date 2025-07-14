export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  created_at: string
  modified_at: string
  status: string
  published_at?: string
  type: string
}

export interface Property extends CosmicObject {
  metadata: {
    address: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    square_feet?: number
    property_type: string | { key: string; value: string }
    description?: string
    features?: string[]
    image?: CosmicImage
    gallery?: CosmicImage[]
    property_status: string | { key: string; value: string }
    listing_agent?: Agent
  }
}

export interface Agent extends CosmicObject {
  metadata: {
    full_name: string
    title?: string
    bio?: string
    phone?: string
    email?: string
    photo?: CosmicImage
    specialties?: string[]
    office?: Office
  }
}

export interface Office extends CosmicObject {
  metadata: {
    office_name: string
    address: string
    phone?: string
    service_areas?: string
  }
}

export interface AboutPage extends CosmicObject {
  metadata: {
    hero_title: string
    hero_subtitle: string
    hero_image?: CosmicImage
    story_title: string
    story_content: string
    story_image?: CosmicImage
    mission_statement: string
    values_title: string
    values: string
    team_title: string
    team_description: string
    cta_title: string
    cta_description: string
  }
}

export interface ImageObject {
  url: string
  imgix_url: string
}

// Utility functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatSquareFeet(sqft: number | null | undefined): string {
  if (!sqft) return 'N/A'
  return new Intl.NumberFormat('en-US').format(sqft)
}

export function getPropertyType(property_type: string | { key: string; value: string }): string {
  if (typeof property_type === 'object' && property_type?.value) {
    return property_type.value
  }
  return property_type as string
}

export function getPropertyStatus(property_status: string | { key: string; value: string }): string {
  if (typeof property_status === 'object' && property_status?.value) {
    return property_status.value
  }
  return property_status as string
}