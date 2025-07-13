import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: import.meta.env.COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.COSMIC_READ_KEY,
  writeKey: import.meta.env.COSMIC_WRITE_KEY,
  apiEnvironment: 'staging'
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all properties with agent information
export async function getProperties() {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch properties')
  }
}

// Get single property by slug
export async function getProperty(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch property')
  }
}

// Get all agents with office information
export async function getAgents() {
  try {
    const response = await cosmic.objects
      .find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agents')
  }
}

// Get single agent by slug
export async function getAgent(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'agents', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch agent')
  }
}

// Get about page content
export async function getAboutPage() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'about-page' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch about page')
  }
}

// Get all offices
export async function getOffices() {
  try {
    const response = await cosmic.objects
      .find({ type: 'offices' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch offices')
  }
}

// Get properties by agent
export async function getPropertiesByAgent(agentId: string) {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties', 'metadata.listing_agent': agentId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agent properties')
  }
}