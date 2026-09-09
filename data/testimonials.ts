export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
  project: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were shown a possession date of June 2021 and got the keys in March. In this city that alone is worth writing about — but the thing I actually remember is that the snagging list we raised was closed in eleven days.",
    name: "Sandeep & Rachna Malhotra",
    detail: "3 BHK owners since 2021",
    project: "Prabhav Greens, Mulund West",
    image: "/images/testimonials/1.jpg",
  },
  {
    quote:
      "I asked for the title documents and the sanctioned plan on my second visit. They handed over a folder the same afternoon, without asking why I wanted it. That is when I stopped looking at other projects.",
    name: "Farhan Qureshi",
    detail: "2 BHK owner since 2019",
    project: "Prabhav Heights, Borivali West",
    image: "/images/testimonials/2.jpg",
  },
  {
    quote:
      "Eight years in and the building is still maintained the way it was on day one. Our society voted to keep the Prabhav facility team rather than tender it out — that vote was unanimous.",
    name: "Mrs. Latika Bhandari",
    detail: "Society Secretary",
    project: "Prabhav Heights, Borivali West",
    image: "/images/testimonials/3.jpg",
  },
  {
    quote:
      "The monthly progress photographs are not marketing pictures. They show the actual slab, with the date on it. As a buyer sitting in Dubai, that was the difference between anxiety and confidence.",
    name: "Nikhil Raghavan",
    detail: "NRI buyer, booked 2024",
    project: "Prabhav Solitaire, Powai",
    image: "/images/testimonials/4.jpg",
  },
  {
    quote:
      "We moved our office into Business Square before it was fully occupied and were nervous about it. The building services were commissioned properly and the facility team responded to every ticket within the day.",
    name: "Deepa Iyer",
    detail: "Founder, Meridian Consulting",
    project: "Prabhav Business Square, Thane",
    image: "/images/testimonials/5.jpg",
  },
  {
    quote:
      "What sold us was the floor plan. Four homes per floor means our flat gets morning light in the kitchen and evening light in the living room. No other project on the road offered that.",
    name: "Aditya & Shweta Kamat",
    detail: "Booked at launch, 2025",
    project: "Codename Crown, Andheri West",
    image: "/images/testimonials/6.jpg",
  },
];
