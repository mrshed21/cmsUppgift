import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";
import { unstable_noStore as noStore } from "next/cache";
import { draftMode } from "next/headers";
import Hero from "@/components/blocks/Hero";
import FeatureItem from "@/components/blocks/FeatureItem";
import FeatureGrid from "@/components/blocks/FeatureGrid";
import TextSection from "@/components/blocks/TextSection";
import CtaSection from "@/components/blocks/CtaSection";

const components = {
  hero: Hero,
  feature_item: FeatureItem,
  feature_grid: FeatureGrid,
  text_section: TextSection,
  cta_section: CtaSection,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: { region: "eu" },
});

/**
 * Dynamically checks if Next.js Draft Mode is enabled or uses the env variable.
 */
async function getVersion() {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) {
      return "draft";
    }
  } catch (e) {
    // Expected to throw if called outside of a request context (e.g., generateStaticParams)
  }
  return process.env.STORYBLOK_VERSION || "published";
}

/**
 * In draft mode: We bypass the cache completely - every call gets fresh data from Storyblok.
 */
function bypassCacheIfDraft(version) {
  if (version === "draft") {
    noStore();
  }
}

// ============ Jobs ============

export async function getJobs({ department, searchTerm } = {}) {
  const version = await getVersion();
  bypassCacheIfDraft(version);
  const sbApi = getStoryblokApi();
  const params = {
    starts_with: "jobs/",
    content_type: "job-post",
    version: version,
    sort_by: "content.publishedAt:desc",
  };
  if (department) {
    params.filter_query = { department: { in: department } };
  }
  if (searchTerm) {
    params.search_term = searchTerm;
  }
  const { data } = await sbApi.get("cdn/stories", params);
  return data.stories;
}

export async function getJob(slug) {
  const version = await getVersion();
  bypassCacheIfDraft(version);
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/jobs/${slug}`, {
      version: version,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    throw error;
  }
}

// ============ Datasources ============

export async function getDatasourceMap(slug) {
  const version = await getVersion();
  bypassCacheIfDraft(version);
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/datasource_entries", {
    datasource: slug,
    version: version,
  });
  return new Map(data.datasource_entries.map((e) => [e.value, e.name]));
}

export async function getDatasourceEntries(slug) {
  const version = await getVersion();
  bypassCacheIfDraft(version);
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/datasource_entries", {
    datasource: slug,
    version: version,
  });
  return data.datasource_entries;
}

// ============ Pages (blocks-based) ============

export async function getPage(slug) {
  const version = await getVersion();
  bypassCacheIfDraft(version);
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/${slug}`, {
      version: version,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    throw error;
  }
}

export async function getPageSlugs() {
  const version = await getVersion();
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    content_type: "page",
    version: version,
  });
  return data.stories.map((s) => s.slug);
}
