// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Property interface
export interface Property extends CosmicObject {
  type: 'properties';
  metadata: {
    address: string;
    price: number;
    property_type: {
      key: PropertyTypeKey;
      value: string;
    };
    bedrooms: number;
    bathrooms: number;
    square_feet?: number;
    description?: string;
    features?: string[];
    gallery?: {
      url: string;
      imgix_url: string;
    }[];
    property_status: {
      key: PropertyStatusKey;
      value: string;
    };
    listing_agent?: Agent;
  };
}

// Agent interface
export interface Agent extends CosmicObject {
  type: 'agents';
  metadata: {
    full_name: string;
    bio?: string;
    phone?: string;
    email?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    specialties?: string[];
    office?: Office;
  };
}

// Office interface
export interface Office extends CosmicObject {
  type: 'offices';
  metadata: {
    office_name: string;
    address: string;
    phone?: string;
    service_areas?: string;
  };
}

// About Page interface
export interface AboutPage extends CosmicObject {
  type: 'about-page';
  metadata: {
    hero_title: string;
    hero_subtitle: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    story_title: string;
    story_content: string;
    story_image?: {
      url: string;
      imgix_url: string;
    };
    mission_statement: string;
    values_title: string;
    values: string; // JSON string containing array of value objects
    team_title: string;
    team_description: string;
    cta_title: string;
    cta_description: string;
  };
}

// Type literals for select dropdowns
export type PropertyTypeKey = 'house' | 'condo' | 'townhouse' | 'apartment';
export type PropertyStatusKey = 'sale' | 'rent' | 'sold';

// Value object interface for about page
export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

// Type guards
export function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties';
}

export function isAgent(obj: CosmicObject): obj is Agent {
  return obj.type === 'agents';
}

export function isOffice(obj: CosmicObject): obj is Office {
  return obj.type === 'offices';
}

export function isAboutPage(obj: CosmicObject): obj is AboutPage {
  return obj.type === 'about-page';
}

// Helper function to parse values JSON
export function parseCompanyValues(valuesString: string): CompanyValue[] {
  try {
    return JSON.parse(valuesString) as CompanyValue[];
  } catch {
    return [];
  }
}

// Utility function to format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Utility function to format square feet
export function formatSquareFeet(sqft: number): string {
  return new Intl.NumberFormat('en-US').format(sqft);
}