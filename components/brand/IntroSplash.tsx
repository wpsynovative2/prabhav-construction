import { LogoLoader } from "./LogoLoader";

// Runs before first paint: skip the splash on repeat page loads within the same session.
const SCRIPT = `try{if(sessionStorage.getItem('pc-splash')){document.documentElement.dataset.splash='off'}else{sessionStorage.setItem('pc-splash','1');setTimeout(function(){document.documentElement.dataset.splash='done'},3000)}}catch(e){}`;

/** Full-screen logo intro shown once per browser session. */
export function IntroSplash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div
        aria-hidden
        className="splash fixed inset-0 z-[100] grid place-items-center bg-bg"
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_65%)]" />
        <LogoLoader label="Loading Prabhav Construction" />
      </div>
    </>
  );
}
