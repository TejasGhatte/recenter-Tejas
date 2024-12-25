import { TaggedURL } from "../../types/TaggedURL";

export async function isWebsiteTagged(website: string): Promise<boolean> {
    return new Promise((resolve) => {
      chrome.storage.local.get("taggedURLs", (result) => {
        const taggedURLs :TaggedURL[] = result.taggedURLs || [];
        const isTagged = taggedURLs.some(
          (url: { website: string }) => url.website === website
        );
        resolve(isTagged);
      });
    });
  }
  