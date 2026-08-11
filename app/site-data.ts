const media = (name: string) => `/media/${name}`;

export const headshot = media("23kTPtmYLWxD0O3bcmnDeMaK8w.png");

export const snippets = [
  media("ome1gB4VkS0PULC7Lw2tQPyGN0.png"),
  media("ZQPrgmarXsW9ux5XbhxY1V62wgs.png"),
  media("0RR4KYzLoRC8TKWTj6vt3r1lpPA.png"),
  media("LOOy06uOZcoTuTbCATvvqX2Q9o.png"),
  media("lsudGEhhVZiMhf2u4UBhddnwpo.png"),
  media("M4LxjVWIK9JJ3NMe9a8a8k4ysOM.png"),
];

export const projects = [
  { name: "Experiments", detail: "Personal", href: "/selected-works" },
  { name: "Oath", detail: "Community gaming app", href: "/work/oath" },
  { name: "Claimbee", detail: "Airline compensation, simplified", href: "/work/claimbee" },
  { name: "Simple Online Healthcare", detail: "Safer healthcare at scale", href: "/work/simple-online-healthcare" },
  { name: "BadgerPost", detail: "Social media on autopilot", href: "/work/badger-post" },
  { name: "Exchange Art", detail: "The leading marketplace for Solana", href: "/work/exchange-art" },
  { name: "Biorelate", detail: "Smarter biomedical research", href: "/work/biorelate" },
  { name: "Selfridges", detail: "Seamless omnichannel UX", href: "/work/selfridges" },
  { name: "Spocktail", detail: "Soon" },
  { name: "Boldscience", detail: "Soon" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  meta: [string, string][];
  sections: { title: string; paragraphs: string[] }[];
  images: string[];
  quotes?: { quote: string; byline: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "oath",
    title: "Oath",
    subtitle: "Your games, remembered. A social game-logging app, like Letterboxd for games.",
    meta: [["Role", "End-to-end design & build"], ["Category", "Social"], ["Platform", "App (iOS 17+)"], ["Timeline", "2 weeks"]],
    sections: [
      { title: "The goal", paragraphs: ["Give players a home for the personal record of what they play. Oath is built around one habit: review, post, react. Finish a game, rate it, share the thought, and see it land in a feed where other players respond. Each screen feeds the next, so the app rewards coming back rather than just checking in."] },
      { title: "The problem", paragraphs: ["Film has Letterboxd. Music has RateYourMusic. Gaming has storefronts and scores, but no home for the personal side of playing: what you finished, what you thought, and who saw it. The logging that exists is private and transactional. Oath is a concept for the missing space, where logging a game starts a conversation instead of ending one."] },
      { title: "My role", paragraphs: [
        "I designed and built Oath end to end, from UX architecture through to a working SwiftUI prototype. A few decisions worth calling out:",
        "Familiar patterns, so nothing needs explaining. The feed, the bottom nav, search-as-you-type, and the bottom-sheet compose flow all lean on conventions people know from other social apps. The novelty sits in the content, not the navigation.",
        "A colour system with rules. A vibrant orange-red drives every primary action, so \"what do I tap\" is never in question. Purple is reserved exclusively for progression: levels, quests, and badges. That keeps achievement reading as its own distinct layer. On a mostly clean, light canvas, both colours carry real weight instead of competing.",
        "Low-friction logging. Search a title, tap a rating, add optional thoughts, set it public or private, done. A review can be one tap or a full write-up, and the design never forces the long version.",
        "Progression as a reason to return. A quest and levelling system turns passive logging into something with momentum. Streaks, milestones, and collectible badges give lightweight goals without turning the app into a game itself.",
        "Built, not just drawn. Oath runs as a functioning SwiftUI prototype, with real navigation, a custom rating control, and the full loop wired end to end. Designing in code kept the interactions honest and the transitions considered rather than assumed."
      ] },
      { title: "Outcome and achievements", paragraphs: ["A complete, coherent product concept, from onboarding to profile to the social loop, that proves out both the idea and the craft. It gave me a space to design a consumer product with full creative control, and stands as my strongest mobile design work to date."] },
    ],
    images: ["G6y7qd89vD5P716ELNnpxICKvdo.png", "2S0IVRyQht1Y9BQWa4HmOFjVSs.png", "B5j1GAmtWkZmb1qmLvlaDOatoE.png", "zsC5QehsdbIoQwg5PINZt6CuB3o.png", "ktaDJ8kyEsG0EMAluzv53MNHEM.png", "IA6bl0uoSKjqtCxHZDXMfnIMC4.png", "BKnF7uGE6Gj5Y8mgD5nT31DT5JI.png"].map(media),
  },
  {
    slug: "claimbee",
    title: "ClaimBee: Airline compensation made easy",
    subtitle: "Helping air passengers check eligibility and claim compensation for delayed, cancelled, and disrupted flights.",
    meta: [["Role", "Freelance"], ["Category", "Legal-tech"], ["Platform", "App"], ["Timeline", "3 weeks"]],
    sections: [
      { title: "The goal", paragraphs: ["Design a claims experience that felt simple, trustworthy, and worth completing. The aim was to reduce drop-off, make a legally complex process feel more approachable, and improve conversion from first visit through to claim submission."] },
      { title: "The problem", paragraphs: ["Flight compensation is high intent, but also high friction. People arrive wanting a quick answer, then hit forms, legal steps, identity checks, and uncertainty around whether they’re even eligible. The challenge was to create a flow that kept momentum high, built trust early, and handled sensitive requirements without feeling heavy or bureaucratic."] },
      { title: "My role", paragraphs: ["I led the product design across the end-to-end claim experience, from early UX thinking through to polished UI. This included competitor analysis, funnel strategy, user flow design, page structure, microcopy, trust-building moments, and the overall visual direction of the product and brand."] },
      { title: "Outcome and achievements", paragraphs: ["The redesigned experience focused on earlier value, clearer guidance, and a more deliberate progression through the claim journey. I reworked the flow to surface potential compensation sooner, delay high-friction steps until commitment was stronger, and make each stage feel lighter and easier to complete. The result was a more confident, conversion-minded UX that balanced business goals, legal constraints, and user trust."] },
    ],
    images: ["wfKf1WdW7iP4vUilr7pyMABCYhQ.png", "Sq9FY5j7pvSxrUWzwAl4kzOYjZs.png", "gPkEx6tH1Ele2AkE6gsDyVitB2M.png", "mpSKh6yhD3quLdMObkpC9TR2UM.png", "EBETlqmGuizysEpmVXYjKuxc.png", "ulbMkttt998kkWjafMZNRtN1SxU.png", "Fp8tv8BqkmNFGEUapyAWNFz9m8.png"].map(media),
  },
  {
    slug: "simple-online-healthcare",
    title: "Simple Online Healthcare: Designing safer, simpler healthcare at scale",
    subtitle: "Simple Online Healthcare is a digital health company that helps patients access treatments online, while giving clinicians the tools they need to prescribe safely within strict regulatory frameworks.",
    meta: [["Role", "Head of Design"], ["Category", "Healthcare, E-commerce, SaaS"], ["Platform", "Website & product"], ["Timeline", "~6 months"]],
    sections: [
      { title: "The goal", paragraphs: ["Modernise Simple’s legacy patient and clinician experience into a scalable digital healthcare platform. The work needed to improve usability, support safe prescribing, and create a stronger foundation for international growth across multiple markets."] },
      { title: "The problem", paragraphs: ["The existing website and admin system had grown over time and were no longer fit for the scale or complexity of the business. Patient journeys felt dated, internal tools were harder for clinical teams to use efficiently, and the platform needed to support regulation-heavy prescribing workflows without creating unnecessary friction for either patients or staff."] },
      { title: "My role", paragraphs: ["I led the end-to-end redesign of both the patient-facing website and the internal admin ecosystem, including the patient management system. I worked closely with clinicians and cross-functional teams to understand the rules, risks, and operational realities behind digitally prescribing private medication, then translated those needs into clearer, safer, and more intuitive product experiences."] },
      { title: "Outcome and achievements", paragraphs: ["The redesign replaced a legacy experience with a more modern, scalable platform for both patients and internal teams. It improved the usability of key clinical and operational workflows, helped the business better support safe digital prescribing, and created a patient-facing experience ready for rollout across international markets including the UK, Australia, Denmark, Germany, Brazil, and later Japan."] },
    ],
    images: ["DZqmFUvc9FeLxpzsYcGIt5T4QCU.png", "jCb2iXaYFcOWPQocAV6HDfHYpw.png", "Z9DvzdvFTzFhA6NeuyJ6gKbnG4.png", "OFtA5RTxuZrjWAIu7oF5SFIMBCs.png", "mZtyhxkqkEfLHp43yQ6xkpFBSkE.png", "mnW49TmUnfJ0ADTTQkb7kv7k1k.png", "gQ0iqkaTKKLtiO2s1Qb2BxGLQJ0.png", "bMfCCTDCbAZMA5pk087qwAnmV0.png", "Khfn3RGnLmn70hl1mS6iMay8.png", "4eTfK2JTqquUfr6KTF8wdrBuBU.png", "rRdZErpCO5aB0uGlPCA99hVPYM.png", "CfyBs49Qx2Q5lQASJ2XKFGukTRw.png", "wxy0Y9HYEwdfvo77lkURNRawE.png", "U3NavnD1iNyk651jC3trjCVWDRw.png"].map(media),
  },
  {
    slug: "badger-post",
    title: "BadgerPost: Streamlining content creation, publication, and social media management",
    subtitle: "An AI-powered, user-friendly solution that enables marketing teams to automate complex workflows across multiple platforms.",
    meta: [["Role", "Freelance Designer"], ["Category", "B2B, SaaS, AI"], ["Platform", "Desktop (web app)"], ["Timeline", "3 weeks"]],
    sections: [
      { title: "The goal", paragraphs: ["Create an intuitive, user-centered tool that simplifies complex workflows while empowering users to amplify their reach. I wanted to design seamless, efficient interfaces that streamline processes, reduce friction, and promote ease of use, ensuring that teams and individuals can scale their operations effortlessly. By crafting a visually engaging and functional experience, the design will help drive productivity, enhance collaboration, and deliver measurable impact for users."] },
      { title: "The problem", paragraphs: ["Teams and individuals often face the challenge of managing complex workflows across multiple platforms, resulting in inefficiencies, miscommunication, and wasted time. As businesses grow, so does the need to streamline processes, maintain consistency, and expand their reach to a broader audience. However, without the right tools, scaling operations becomes overwhelming, limiting both productivity and impact."] },
      { title: "My role", paragraphs: ["As a freelance designer, my primary focus was to streamline the existing AI generation flow to help the team onboard less tech-savvy users and support Badger Post’s go-to-market strategy. Although a beta MVP was in place, usability testing revealed that the interface was not user-friendly. I was tasked with a two-week deadline to revamp several existing pages, while also overhauling the UI and UX for AI generation, automation, and smart replies. The smart replies feature enables users to efficiently generate responses to social media posts at scale.", "Throughout the project, I collaborated closely with stakeholders and the engineering team, ensuring that the designs were feasible and progress stayed on track. Despite the short timeframe, additional requirements emerged, including marketing templates, an update to the visual identity, a new logo, and “badger avatars” (which I created using Midjourney)."] },
      { title: "Outcome and achievements", paragraphs: ["I successfully met the requirements within the strict two-week deadline and exceeded expectations by also delivering marketing materials, a refreshed visual identity, and a new logo, in addition to the UX/UI overhaul of the product. As a result, Badger Post was able to go to market with a significantly stronger MVP, which was confidently tested with their target audience."] },
    ],
    images: ["017yWJ5v87miDlKwcwnQNfKHrNQ.png", "n3zpOSLzXh6KpzdU5fR1aLKX4.png", "QGeBoglsTt3hnfwtMMN1ReXAcU.png", "KKO45HfRfhj2ZFrHvLOoaJ95ewc.png", "eTEvRKSWBkkNMy1hf20BmTLJBXk.png", "z1D74Tdwy0nrSiUlXnH4bSO6jpM.png", "0a7YJGng01td6vezL2IY50k1w90.png", "2KkHlQZp4nyxohbnusqcOMbQTY.png", "sk9IgOIADcDFV0jJgDmVwHExaw.png", "4A8bUd1Ja3Fg2BbI9JhQ1o3Fs.png", "hVlFduG76xM7etpD1PiX3XjpxHM.png"].map(media),
  },
  {
    slug: "exchange-art",
    title: "Exchange Art: Designing the leading 1:1 art marketplace on Solana",
    subtitle: "Exchange Art is a digital art marketplace built on Solana, focused on 1:1 artwork and helping artists and collectors buy, sell, and discover original pieces in a fast-moving web3 space.",
    meta: [["Role", "Lead Product Designer"], ["Category", "Web3, E-commerce"], ["Platform", "Website"], ["Timeline", "1 year"]],
    sections: [
      { title: "The goal", paragraphs: ["Help shape a marketplace experience that felt credible, usable, and artist-first in a space that was often noisy, confusing, and driven more by hype than trust. The aim was to make buying and selling 1:1 digital art feel intuitive, valuable, and worth coming back to."] },
      { title: "The problem", paragraphs: ["Web3 products often expected too much from users too quickly. The space was full of friction, unfamiliar patterns, and poor UX, which made it harder for artists to showcase their work and for collectors to engage with confidence. Exchange Art needed a clearer, more polished product experience that could support growth while standing out in a crowded market."] },
      { title: "My role", paragraphs: ["I led product design across the marketplace experience, helping shape the platform for both artists and collectors. My work focused on improving usability, strengthening the visual quality of the product, and building trust into key flows across discovery, artwork pages, creator profiles, and transactional moments."] },
      { title: "Outcome and achievements", paragraphs: ["The product helped support a major stage of growth for Exchange Art, which became the leading 1:1 art marketplace on Solana. During that period, the platform achieved 27x revenue growth, brought in 11,000 new creators and 32,000 new collectors, and helped hundreds of artists generate meaningful income, including 20+ artists earning over $100k from art sales."] },
    ],
    images: ["zFdi78gUwEIky80SSUmbZemOU.webp", "JglzpiZ7tRi3MVvg0Eh47MCorc.png", "9dH7hM5mly4gcP6isEn544zmGA.png", "5Rgikp2WM3FqqGrWdWbUeitfw.png", "tJQYtrWs8lqqAgcG9fd0kt3KM90.png", "XPrAEHnfZC8xMmV5pttsCeHam7Q.png", "u1Cutj3W0QwFuK7MHQHARUBYog.png", "LWdlVrYsmXJ88gW42rOobL8.png", "pPcvGWTwRrGOJbIKKVhn9DtcSc.png", "QWl3jbueo2v6RLRdtyE16wffblU.png", "Ts2Qd9ldYc16FDR0weYmAXw9kE.png", "0QAydvbtIuLGuRteDDlXFIG1vXY.png"].map(media),
  },
  {
    slug: "biorelate",
    title: "Biorelate: Designing a smarter way to navigate biomedical research",
    subtitle: "Biorelate is a biomedical intelligence platform that helps researchers uncover hidden connections across scientific literature, making it easier to identify drug-target relationships and prioritise the most relevant evidence.",
    meta: [["Role", "Senior Product Designer"], ["Category", "Healthcare, AI, SaaS, B2B"], ["Platform", "Desktop (web app)"], ["Timeline", "~6 months"]],
    sections: [
      { title: "The goal", paragraphs: ["Turn a highly complex scientific product into something researchers could actually use with confidence. The aim was to make advanced search, literature analysis, and knowledge discovery feel intuitive enough to reduce training needs and strong enough to support enterprise adoption."] },
      { title: "The problem", paragraphs: ["A huge amount of useful scientific insight sits buried in literature, locked behind complexity, poor tooling, and fragmented workflows. Existing products felt dated and difficult to use, while the scale of the data made it even harder for researchers to find what mattered quickly. Biorelate needed a product that could surface value fast without overwhelming users."] },
      { title: "My role", paragraphs: ["As the sole designer during the 0–1 phase, I led product design across research, UX, UI, information architecture, prototyping, and testing. I worked closely with data scientists, product, marketing, and end users to shape Galactic AI into a usable web platform. This included designing complex search and results experiences, making boolean-style querying more intuitive, creating a scalable design system, and helping define collaboration, saved content, and knowledge discovery workflows."] },
      { title: "Outcome and achievements", paragraphs: ["The final product gave biologists a much more usable way to explore biomedical literature and identify drug-target relationships faster. It helped reduce client training from 1–2 weeks onsite to lighter-touch online onboarding, supported multiple commercial deals with pharmaceutical companies, and proved the value of turning highly technical AI capability into a product people could actually use. It remains one of the most complex and rewarding 0–1 products I’ve led."] },
    ],
    images: ["6ZQlwFAH5mBPfwJ3a89EVOkdNu4.png", "w80a24Vp1Uf0DD8Urxl6e5DpIDE.png", "t0Xzm66lkYOgPf552fs1jQnK9g.png", "uOB7cqrgLzKC54wFWnZ8NJwGDE.png", "2a91Ss2rI6ktzFz9kUzjMgylo0.png", "DFOL0b4cANHhTQJ0ETyTu2iK40.png", "HyFzN3GndpNTKwFVmn8snoltFA.png", "roNqtwkoBL67huCvvpmtOaEIspg.png", "LyPvuAn3ySv4ISYGOtq1OvplZX0.png", "W4fJO54DNTDf2sySy0FIyzn6I.png", "imPTP8fFOiGPDXKW89Y3KCqKyro.png", "U9WyWEuPPRgFyRQ5ku3tfC3l4.png", "VQXwWyAehy2kmYOYCe1bPWIX05Q.png"].map(media),
    quotes: [
      { quote: "Biorelate has been a game changer. The cutting-edge platform can help biologists find hidden insights.", byline: "Christopher J Nicholson – Head of Biology @Pepper Bio" },
      { quote: "Biorelate has managed to provide a user-friendly tool to Indorsia scientists to cope with the massive amount of biomedical literature and more efficiently discover relevant aspects for our projects to speed up processes.", byline: "Peter Groenen – Head of Biomarkers @Indorsia Pharmaceuticals" },
      { quote: "The contextual data from Biorelate is critical to our efforts to embed knowledge graphs into the drug discovery pipeline", byline: "Dr. Ben Sidders – Director of Ongology Informatics @AstraZeneca" },
    ],
  },
  {
    slug: "selfridges",
    title: "Selfridges: Connecting in-store and digital luxury shopping",
    subtitle: "Selfridges is a leading luxury retailer with a large international customer base, combining ecommerce with a high-touch in-store experience across its flagship locations.",
    meta: [["Role", "UX Designer"], ["Category", "E-commerce"], ["Platform", "App (iOS & Android)"], ["Timeline", "3 months"]],
    sections: [
      { title: "The goal", paragraphs: ["Explore how the app could better connect digital and physical retail by helping shoppers navigate stores, find products more easily, and create a smoother path between browsing online and buying in person. Alongside that, improve ecommerce performance through testing and deeper insight into international customer behaviour."] },
      { title: "The problem", paragraphs: ["The app included store information, but it didn’t help customers actually navigate the space or locate products in-store. There was also a need to better understand how different user groups, particularly international shoppers, moved through ecommerce journeys and where experience improvements could drive stronger conversion."] },
      { title: "My role", paragraphs: ["As the UX designer, I led research into omnichannel shopping behaviours through in-store investigation, competitor analysis, user flows, empathy mapping, personas, and usability testing. I designed a high-fidelity concept for in-app store navigation, tailored for both iOS and Android patterns, and also led the UX and UI for a range of A/B and multivariate tests across key e-commerce journeys."] },
      { title: "Outcome and achievements", paragraphs: ["Although the in-store navigation concept didn’t move forward, the optimisation work delivered strong commercial results. Key tests included an 11% conversion uplift from showing stock availability on PDPs (£13M annual gross sales impact), +£1M gross revenue from PDP layout changes, and 225K new opt-in customers annually through improved checkout registration (+£1.3M yearly revenue). Delivery-focused improvements also performed strongly, including a 0.15% conversion uplift from a countdown to cut-off (£547K annually) and a 7% uplift for international customers through more relevant delivery information (£1.2M annually)."] },
    ],
    images: ["Ph2vykmi0nReXunwy09DFUCR5E.png", "O6qH4R6LwfFhtpmRsD7yn8rgByo.png", "Ube2DbK3BkuUMpw7z27p8SlVE.png", "Qf6skTUtZEmGjqRBYbBgsJFglk.png", "mMPQpTnnaAwV47YdxQXHshuotA.png", "onXL9QppAJcwHx58ZsWYi9Exqg.png"].map(media),
  },
];

export type Experiment =
  | { type: "image"; label: string; image: string }
  | { type: "video"; label: string; video: string; variant: "mori" | "magnetic" }
  | { type: "stamp"; label: string }
  | { type: "graveyard"; label: string };

export const experiments: Experiment[] = [
  { type: "image", label: "BadgerPost smart replies & analytics", image: media("ZQPrgmarXsW9ux5XbhxY1V62wgs.png") },
  { type: "image", label: "Oath, a community for gaming", image: media("ome1gB4VkS0PULC7Lw2tQPyGN0.png") },
  { type: "video", label: "Mori AI agent", video: media("mori-ai-agent.mp4"), variant: "mori" },
  { type: "image", label: "Spocktail party app", image: media("LOOy06uOZcoTuTbCATvvqX2Q9o.png") },
  { type: "image", label: "Simple Online Healthcare health profile", image: media("srv62xK5LcGRfsrmAyjYN27cYg.png") },
  { type: "image", label: "Assembled Intelligence homepage concept", image: media("M4LxjVWIK9JJ3NMe9a8a8k4ysOM.png") },
  { type: "image", label: "Exchange Art gallery hero", image: media("rohNe280wj9msgWgovX0gBqw.png") },
  { type: "image", label: "ClaimBee, airline compensation made easy", image: media("Viq4bVBC8q0GB1Rm2wBWTnAVcis.png") },
  { type: "image", label: "Playstation dashboard concept", image: media("aMt2SjE2oSLCH7k5M49tBW0KXOs.png") },
  { type: "image", label: "Hike & surf app concept", image: media("Fi56tUIJ4WcrXKFAjfs6Ox4USWU.png") },
  { type: "image", label: "Exchange Art series hero", image: media("kPI9TlqB0fMIzFPr4sL9C2ls8og.png") },
  { type: "image", label: "Invoice generator concept", image: media("0RR4KYzLoRC8TKWTj6vt3r1lpPA.png") },
  { type: "image", label: "Simple Online Healthcare homepage hero", image: media("lsudGEhhVZiMhf2u4UBhddnwpo.png") },
  { type: "image", label: "Brand & identity for Simple, BadgerPost, and Jabbr", image: media("gamTYJq6EShYOFZl0XWWwjJUNA.png") },
  { type: "image", label: "Publication validation concept", image: media("CuA5ynkQMddJ3PNbRyHqGIXPVU.png") },
  { type: "video", label: "Magnetic segmented control", video: media("magnetic-segmented-control.mp4"), variant: "magnetic" },
  { type: "image", label: "Food delivery app concept", image: media("afMOEkRoS8yn1KebkJkfWWWh7g.png") },
  { type: "image", label: "Various iOS widgets", image: media("SdkAUVnXHXclbFOW14IjRVOZQ.png") },
  { type: "stamp", label: "Eki stamp generator" },
  { type: "image", label: "Zoox self driving taxi app concept", image: media("wdq9XsvKGIB2IOlN7R8KRmo7d30.png") },
  { type: "graveyard", label: "Graveyard bloom" },
];

export const artImages = ["Id8OcAZ8jtnTMsdES4KlASVbDKc.jpeg", "UytYhWjtCNv5BeHyO9lizenkADE.jpeg", "mq70JfqaKobymlC7iKRzR1uYmD8.jpeg", "En9StZpLLOnN7lFNDJbXlhMnsqA.jpeg", "JN3UH2iDE5kd73mCEUxaHK3Cjjs.jpeg", "i5pQRIOyGQfX2Q6lXBHwSZorfRw.jpeg", "Id8OcAZ8jtnTMsdES4KlASVbDKc.jpeg", "XWTnE6YVcrw0O59y5jJQK69obyE.jpeg", "sxvdTNNMsFPkICnJFnVfwE7nN7c.jpeg", "S7RafBd5EbD48lrbTgKxVlzaF34.jpeg", "7VRc4FBCLK1CbTW9rHJntZdO9P4.jpeg", "yEFoayqXCUGbEnbz8zC5ryZxuTE.jpeg", "khDzpI2P92NHdAadtoXitUftE4c.jpeg"].map(media);

export const photoImages = [
  ["Odaiba", "NRfxVX5BH8a8RbqhIm7do4HzMIs.jpg"], ["Barcelona", "44aLBEvONw6WHXDdZnrvLw4dnp8.jpg"], ["Romania", "8AlOgVjYDszvmkgHnMGGjtqwWk.jpeg"], ["Odaiba", "C7iqTxytVzNOI3zJ53Hv2zQWGTM.jpg"], ["Arishiyama", "5a5t5w8f2PR5HOKCwr4n7wRfXs.jpg"], ["Rome", "dPpHkcCcBjuZNWMGi72qoaMfuYU.jpg"], ["Ueno", "zvyBBfH6q4FBK5ExJO7vIGhdjDA.jpg"], ["Peak District", "poQlgfYBYMaZjfLe6aW3URH1mg.jpeg"], ["Greenland", "3yaWCKSZJPpmDFvoEUgvBU3sO5U.jpg"], ["Rome", "R1x9DtCFL9KkuYBHiskHAFT0N4s.jpeg"], ["Greece", "tysT0ULe82ILW1BxFAdJJ1U6sMo.jpg"], ["Osaka", "sjLnQ0E4kYTkKKTgc1yVlm03h0.jpeg"], ["Nara", "5drotbINRaJXJvs9OtKBAVgIiRc.jpeg"], ["Amsterdam", "EXYIre8vc2fn69eNv82CNYjork.jpg"], ["Fuji", "tIEo8o3toPidaJhufZ9PajMgc8.jpeg"], ["Wales", "aYOIrCoreeVSbc5rWTWufVL5Y.jpeg"], ["Shibuya", "hvSwad8TfNRmiYoYEhM3g38IkHQ.jpeg"], ["A good friend", "oDqdrrxMscRBq8K0gCGcN9rA1Go.jpg"], ["New York", "dNEDMYo0rWRQYF5r6mqUF0g38X8.jpg"], ["Tokyo", "IoQ5c5y6EFnY9NtFMH9Zf7wEY0.jpeg"], ["Bucharest", "kovtQuGHx5HiPz669A2T54IXijA.jpeg"], ["Peak District", "9q6ep90jVTFOU07Zk5e9bfZ4dg.jpeg"], ["My beautiful wife", "HKIbtHT1ZOmJuXQxSlRME7wJpo8.jpg"], ["Peak District", "fLjgGCkiU9dAYetbD1ngOWprLA.jpg"],
].map(([label, image]) => ({ label, image: media(image) }));

export const bottomImages = {
  wallpaper: media("oYO6xAdZWJGpUdhFO6UJwWinnk.jpeg"),
  desk: media("LuxttzWvkQaFhlOTjLPtgq2Irk0.jpeg"),
  run: media("IORUftDv5cI03ucQ6epwIRrVj7A.png"),
  friends: media("MjeWVSAzxdERwwXgSpTE7KxNPXQ.jpeg"),
  figma: media("pJpLid8ZsxTSI1qkA6OB9zoSOc.png"),
  drawing: media("wfvFIEbWfkynmI08zjsx41cGyVY.png"),
  spark: media("KUC0qqS2MPdHQiIkdR4YDZr1xs.png"),
  devils: media("9iQCj4XxeO3k1Lbtc3p0DzF3VJU.png"),
  halloween: media("pUlImXV8sSV3jCdV3cbsF6JMkU8.png"),
  spookyMovies: media("spooky-movies-vhs-isolated.png"),
  album: media("album-current.jpg"),
};
