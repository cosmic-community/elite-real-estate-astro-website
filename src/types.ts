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
    property_type: string;
    status: 'For Sale' | 'Sold' | 'Under Contract';
    description: string;
    images?: Array<{
      imgix_url: string;
      title?: string;
    }>;
    address: string;
    listing_agent?: Agent;
  };
}

export interface Agent extends CosmicObject {
  metadata: {
    bio: string;
    phone?: string;
    email?: string;
    profile_image?: {
      imgix_url: string;
    };
    specialties?: string[];
    years_experience?: number;
    office?: {
      title: string;
    };
  };
}

export interface AboutPage extends CosmicObject {
  metadata: {
    content: string;
    hero_image?: {
      imgix_url: string;
    };
  };
}

export interface ImageObject {
  imgix_url: string;
  title?: string;
}