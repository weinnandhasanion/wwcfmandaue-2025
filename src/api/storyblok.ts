import { useStoryblokApi } from "@storyblok/astro";
import { getContentVersion } from "@/utils/helper";

const storyblokApi = useStoryblokApi();

const getSettings = async (version: "draft" | "published") => {
  const { data: globals } = await storyblokApi.get(
    "cdn/stories/globals/settings",
    {
      version,
    },
  );

  return globals;
};

const getNavigation = async (version: "draft" | "published") => {
  const { data: navigation } = await storyblokApi.get(
    "cdn/stories/globals/navigation",
    {
      version,
    },
  );

  const headerItems = {
    links: navigation.story.content.header_navigation_items,
    cta: navigation.story.content.call_to_action,
  };
  const footerItems = navigation.story.content.footer_navigation_items;

  return {
    headerItems,
    footerItems,
  };
};

const getPage = async (
  slug: string,
  params?: any,
  options?: any,
): Promise<any> => {
  const response = await storyblokApi.get(
    `cdn/stories/${slug}`,
    params,
    options,
  );

  return response.data.story;
};

export const StoryblokApi = {
  getSettings,
  getNavigation,
  getPage,
};
