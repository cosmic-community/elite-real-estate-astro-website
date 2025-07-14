import { createBucketClient } from '@cosmicjs/sdk';
import type { Property, Agent, Office, AboutPage } from '../types';

const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.COSMIC_READ_KEY,
  apiEnvironment: "staging",
});

// Export the createBucketClient function and cosmic client
export { createBucketClient };
export { cosmic };

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Property[];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .depth(1);
    
    return response.object as Property;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.listing_agent': agentId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Property[];
  } catch (error) {
    console.error('Error fetching properties by agent:', error);
    return [];
  }
}

export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Agent[];
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function getAgent(slug: string): Promise<Agent | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'agents', slug })
      .depth(1);
    
    return response.object as Agent;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}

export async function getOffices(): Promise<Office[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'offices' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Office[];
  } catch (error) {
    console.error('Error fetching offices:', error);
    return [];
  }
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-page' })
      .depth(1);
    
    return response.object as AboutPage;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}