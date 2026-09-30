import { LogoLoader } from "@/components/brand/LogoLoader";

export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5">
      <LogoLoader />
    </div>
  );
}
