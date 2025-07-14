import { createBucketClient } from '@cosmicjs/sdk';
import type { Property, Agent, Office, AboutPage } from '../types';

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Export the cosmic client for direct use
export const cosmicClient = cosmic;

// Properties
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'properties'
    }).props(['title', 'slug', 'metadata']).depth(1);
    
    return response.objects || [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'properties',
      slug: slug
    }).depth(1);
    
    return response.object || null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'properties',
      'metadata.listing_agent': agentId
    }).props(['title', 'slug', 'metadata']).depth(1);
    
    return response.objects || [];
  } catch (error) {
    console.error('Error fetching properties by agent:', error);
    return [];
  }
}

// Agents
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'agents'
    }).props(['title', 'slug', 'metadata']).depth(1);
    
    return response.objects || [];
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
}

export async function getAgent(slug: string): Promise<Agent | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'agents',
      slug: slug
    }).depth(1);
    
    return response.object || null;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}

// Offices
export async function getOffices(): Promise<Office[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'offices'
    }).props(['title', 'slug', 'metadata']).depth(1);
    
    return response.objects || [];
  } catch (error) {
    console.error('Error fetching offices:', error);
    return [];
  }
}

// About Page
export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'about-page',
      slug: 'about'
    }).depth(1);
    
    return response.object || null;
  } catch (error) {
    console.error('Error fetching about page:', error);
    return null;
  }
}

export { cosmic };