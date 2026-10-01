import {
  ArrowUpDown, Award, Baby, BadgeCheck, Building2, Bus, Calendar, Car, Cctv, Clock, Droplets, Dumbbell, Eye,
  FileCheck, FilePenLine, Flame, Flower, Footprints, Gem, GraduationCap, HandHeart, Handshake, HardHat, Heart,
  HeartPulse, House, Key, Landmark, Leaf, MapPin, Search, Shield, ShieldCheck, Sofa, Sun, Target, Trees,
  TrendingUp, Trophy, Truck, Users, Waves, Wifi, Zap, Route, Ruler, Scale, Factory, PlugZap, Gamepad2, Bike, Laptop, type LucideIcon, type LucideProps,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  waves: Waves, sofa: Sofa, dumbbell: Dumbbell, baby: Baby, footprints: Footprints, trees: Trees, shield: Shield,
  zap: Zap, car: Car, "arrow-up-down": ArrowUpDown, cctv: Cctv, droplets: Droplets, sun: Sun, wifi: Wifi,
  truck: Truck, flame: Flame, landmark: Landmark, flower: Flower, award: Award, building: Building2, home: House,
  "shield-check": ShieldCheck, gem: Gem, clock: Clock, "file-check": FileCheck, handshake: Handshake,
  search: Search, "map-pin": MapPin, "file-signature": FilePenLine, key: Key, eye: Eye, target: Target,
  heart: Heart, "badge-check": BadgeCheck, "hard-hat": HardHat, leaf: Leaf, "graduation-cap": GraduationCap,
  "hand-heart": HandHeart, users: Users, "trending-up": TrendingUp, "heart-pulse": HeartPulse,
  calendar: Calendar, bus: Bus, trophy: Trophy, route: Route, ruler: Ruler, scale: Scale, factory: Factory,
  "plug-zap": PlugZap, gamepad: Gamepad2, bike: Bike, laptop: Laptop,
};

/** Renders a lucide icon from the kebab-case name stored in /data JSON. */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name] ?? Gem;
  return <Cmp aria-hidden {...props} />;
}

/** Brand glyphs (lucide 1.x no longer ships logos) */
export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
          <path d="M16.5 2h-9A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2Zm3.7 14.5a3.7 3.7 0 0 1-3.7 3.7h-9a3.7 3.7 0 0 1-3.7-3.7v-9a3.7 3.7 0 0 1 3.7-3.7h9a3.7 3.7 0 0 1 3.7 3.7v9Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V22h3.4Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3Z" />
          <path d="M20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 23.8l6.3-1.6a11.8 11.8 0 0 0 5.6 1.4 11.8 11.8 0 0 0 8.4-20.1Zm-8.4 18.2a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Z" />
        </svg>
      );
    default:
      return null;
  }
}
