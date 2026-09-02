import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";
import { unstable_noStore as noStore } from "next/cache";
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

const CONTENT_VERSION = process.env.STORYBLOK_VERSION || "published";

function bypassCacheIfDraft() {
  if (CONTENT_VERSION === "draft") {
    noStore();
  }
}

// ============ Jobs ============ 

export async function getJobs({ department, searchTerm } = {}) {
  bypassCacheIfDraft();
  const sbApi = getStoryblokApi();
  const params = {
    starts_with: "jobs/",
    content_type: "job-post",
    version: CONTENT_VERSION,
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
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/jobs/${slug}`, {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    throw error;
  }
}

// ============ Datasources ============

export async function getDatasourceMap(slug) {
  bypassCacheIfDraft();
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/datasource_entries", {
    datasource: slug,
    version: CONTENT_VERSION,
  });
  return new Map(data.datasource_entries.map((e) => [e.value, e.name]));
}

export async function getDatasourceEntries(slug) {
  bypassCacheIfDraft();
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/datasource_entries", {
    datasource: slug,
    version: CONTENT_VERSION,
  });
  return data.datasource_entries;
}

// ============ Pages (blocks-based) ============

export async function getPage(slug) {
  bypassCacheIfDraft();
  try {
    const sbApi = getStoryblokApi();
    const { data } = await sbApi.get(`cdn/stories/${slug}`, {
      version: CONTENT_VERSION,
    });
    return data.story;
  } catch (error) {
    if (error?.status === 404 || error?.response?.status === 404) return null;
    throw error;
  }
}

export async function getPageSlugs() {
  const sbApi = getStoryblokApi();
  const { data } = await sbApi.get("cdn/stories", {
    content_type: "page",
    version: CONTENT_VERSION,
  });
  return data.stories.map((s) => s.slug);
}
