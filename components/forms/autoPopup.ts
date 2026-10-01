/** One-time enquiry popup: shown once per visitor, never after they have enquired. */
export const AUTO_POPUP_DELAY_MS = 17000;
const AUTO_POPUP_KEY = "pc-auto-popup";
export const NO_POPUP_PATHS = ["/contact-us", "/collaborate", "/career", "/thank-you"];

export const hasSeenAutoPopup = () => {
  try {
    return localStorage.getItem(AUTO_POPUP_KEY) === "1";
  } catch {
    return true; // storage blocked: don't risk popping on every page
  }
};

/** Also called after any successful enquiry, so people who already enquired are never auto-prompted */
export const markAutoPopupSeen = () => {
  try {
    localStorage.setItem(AUTO_POPUP_KEY, "1");
  } catch {}
};
