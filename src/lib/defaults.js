// Pehli baar DB khali hone par ye default content daalta hai.
// Baad mein sab kuch Admin Dashboard se badla ja sakta hai.

export const SERVICE_KINDS = ["AI Automation", "AIoT"]; // showcase / gallery ke filter

export const DEFAULT_SERVICES = [
  {
    kind: "ai",
    tag: "01 / INTELLIGENCE",
    title: "AI Automation",
    description:
      "Custom AI agents, intelligent workflow automation, WhatsApp/Instagram chatbots, CRM pipelines aur business processes ko 10x fast banane ke liye smart AI solutions.",
    features: ["Custom LLM Agents & Chatbots", "Workflow & Process Automation", "WhatsApp / Instagram Bots"],
    order: 1,
  },
  {
    kind: "aiot",
    tag: "02 / AIoT",
    title: "AIoT Development",
    description:
      "AI + IoT ek saath: ESP32/Arduino/Raspberry Pi sensors, cloud dashboards aur smart devices jo data se khud decision lete hain — hardware se cloud tak end-to-end.",
    features: ["Smart Home & Industrial AIoT", "Real-Time Cloud Dashboards", "Embedded Firmware + AI Logic"],
    order: 2,
  },
];

export const DEFAULT_GALLERY = [
  {
    id: 1,
    title: "Autonomous AI Workflow Engine",
    category: "AI Automation",
    description: "Custom LLM agent pipeline automating enterprise customer support & CRM operations.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Smart Industrial AIoT Telemetry Node",
    category: "AIoT",
    description: "ESP32 & LoRaWAN based real-time cloud sensor network for factory automation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
];

export const DEFAULT_PROJECTS = [
  {
    name: "XOScrap",
    tag: "Web App • Scrap Pickup Platform",
    url: "https://www.xoscrap.com",
    description:
      "Ghar baithe scrap bechne ka platform — live rates, doorstep pickup request form aur admin panel. Varanasi me live.",
    images: [
      "https://www.xoscrap.com/images/a.jpeg",
      "https://www.xoscrap.com/images/b.jpeg",
      "https://www.xoscrap.com/images/c.jpeg",
    ],
    stats: ["26+ Live Rate Items", "Admin Panel", "Pickup Requests"],
    order: 1,
  },
  {
    name: "The Little Moon Academy",
    tag: "School Website + ERP",
    url: "https://www.thelittlemoonacademy.com",
    description:
      "Nursery se Class VIII school ki website — toppers, events, admission inquiry aur student/teacher ERP login.",
    images: [
      "https://thelittlemoonacademy.com/_next/image?url=%2Flogo.png&w=256&q=75",
      "https://thelittlemoonacademy.com/activities/science-1.svg",
      "https://thelittlemoonacademy.com/activities/sports-1.svg",
    ],
    stats: ["Student ERP", "Toppers & Events", "Admission Inquiry"],
    order: 2,
  },
];

export const DEFAULT_OWNER = {
  name: "Ritik Kosh",
  role: "Founder & Engineer, Nexwork Tech",
  photo: "/ritik.jpg",
  bio: "B.Tech engineer leading Nexwork Tech. Kaam: AI Automation aur AIoT products — smart bots se leke hardware + cloud tak complete solutions.",
  experience: "B.Tech • AI Automation • AIoT",
  location: "India",
  email: "contact@nexworktech.com",
  phone: "+91 98765 43210",
  // Social links — Admin > Owner & Social se set karein (khali ho toh icon nahi dikhta)
  linkedin: "",
  instagram: "",
  facebook: "",
  whatsapp: "", // number (91XXXXXXXXXX) ya poora wa.me link
  youtube: "",
};

// Fake reviews nahi: sirf wahi reviews dikhte hain jo admin ne select kiye hain
export const DEFAULT_REVIEWS = [];
