export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata?: Record<string, any>;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
}

export interface Property extends CosmicObject {
  metadata: {
    price: number;
    bedrooms: number;
    bathrooms: number;
    square_feet?: number;
    property_type: string | {
      key: string;
      value: string;
    };
    property_status?: {
      key: string;
      value: string;
    };
    status?: 'For Sale' | 'For Rent' | 'Sold' | 'Under Contract';
    description: string;
    gallery?: Array<{
      url: string;
      imgix_url: string;
      title?: string;
    }>;
    features?: string[];
    address: string;
    listing_agent?: Agent;
  };
}

export interface Agent extends CosmicObject {
  metadata: {
    full_name: string;
    bio: string;
    phone?: string;
    email?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    profile_image?: {
      url: string;
      imgix_url: string;
    };
    specialties?: string[];
    years_experience?: number;
    office?: {
      title: string;
      metadata: {
        office_name: string;
      };
    };
  };
}

export interface Office extends CosmicObject {
  metadata: {
    office_name: string;
    address: string;
    phone?: string;
    email?: string;
  };
}

export interface AboutPage extends CosmicObject {
  metadata: {
    hero_title: string;
    hero_subtitle: string;
    hero_image?: {
      imgix_url: string;
    };
    story_title: string;
    story_content: string;
    story_image?: {
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

export interface ImageObject {
  url: string;
  imgix_url: string;
  title?: string;
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