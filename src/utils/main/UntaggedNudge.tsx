import { insertTaggingPrompt} from "../DOM_SCRIPTS/TaggingPrompt";
import { isWebsiteTagged } from "../queryStorage/IsWebsiteTagged";

export class UntaggedNudge {
  private timeSpent: number = 0;
  private website: string;
  private interval: NodeJS.Timer | undefined;

  constructor() {
    this.website = window.location.origin; // Get the current website
    this.checkAndTrack();
  }

  private async checkAndTrack() {
    const isTagged = await isWebsiteTagged(this.website);
    if (!isTagged) {
      this.startTracking(); // Start tracking if the website is not tagged
    }
  }

  private startTracking() {
    this.interval = setInterval(() => {
      this.timeSpent += 1; // Increment time spent every second
      if (this.timeSpent >= 10) {
        // Trigger the nudge after 5 minutes (300 seconds)
        insertTaggingPrompt(this.website);
        this.clearTracking();
      }
    }, 1000);
  }

  private clearTracking() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
