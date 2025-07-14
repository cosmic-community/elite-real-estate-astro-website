export interface CosmicObject {
  id: string;
  title: string;
  slug: string;
  content?: string;
  bucket: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at?: string;
  type: string;
}

export interface CosmicFile {
  url: string;
  imgix_url: string;
  name?: string;
  size?: number;
  type?: string;
}

export interface SelectOption {
  key: string;
  value: string;
}

export interface Agent extends CosmicObject {
  metadata: {
    full_name: string;
    bio?: string;
    phone?: string;
    email?: string;
    photo?: CosmicFile;
    specialties?: string[];
    office?: Office;
  };
}

export interface Office extends CosmicObject {
  metadata: {
    office_name: string;
    address: string;
    phone?: string;
    service_areas?: string;
  };
}

export interface Property extends CosmicObject {
  metadata: {
    address: string;
    price: number;
    property_type: SelectOption;
    bedrooms: number;
    bathrooms: number;
    square_feet?: number;
    description?: string;
    features?: string[];
    gallery?: CosmicFile[];
    property_status: SelectOption;
    listing_agent?: Agent;
  };
}

export interface AboutPage extends CosmicObject {
  metadata: {
    hero_title: string;
    hero_subtitle: string;
    hero_image?: CosmicFile;
    story_title: string;
    story_content: string;
    story_image?: CosmicFile;
    mission_statement: string;
    values_title: string;
    values: string; // JSON string
    team_title: string;
    team_description: string;
    cta_title: string;
    cta_description: string;
  };
}

export interface ContactSubmission extends CosmicObject {
  metadata: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    interest?: SelectOption;
    message: string;
    submitted_at: string;
  };
}

export interface Value {
  title: string;
  description: string;
  icon: string;
}

// Utility functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatSquareFeet(sqft: number): string {
  return new Intl.NumberFormat('en-US').format(sqft);
}

export function getPropertyType(propertyType: SelectOption): string {
  return propertyType?.value || 'Unknown';
}

export function getPropertyStatus(propertyStatus: SelectOption): string {
  return propertyStatus?.value || 'Unknown';
}