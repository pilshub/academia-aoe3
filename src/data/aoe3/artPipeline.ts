export type ArtAssetType = "hero" | "card-backplate" | "deck-cover" | "map-plate" | "infographic" | "icon-set";

export type ArtPipelineItem = {
  id: string;
  type: ArtAssetType;
  title: string;
  prompt: string;
  destination: string;
  status: "brief-ready" | "needs-reference" | "generate-next" | "in-app";
};

export const artPipeline: ArtPipelineItem[] = [
  {
    id: "civ-hero-french",
    type: "hero",
    title: "French civ hero",
    prompt: "Age of Empires III inspired tactical academy illustration, French colonial base, coureurs des bois, cavalry scouts, parchment UI framing, no logos, painterly realistic, warm gold and blue accents",
    destination: "public/assets/generated/civs/french-hero.png",
    status: "generate-next",
  },
  {
    id: "civ-hero-british",
    type: "hero",
    title: "British civ hero",
    prompt: "British manor boom strategic illustration, manor houses, longbowmen, disciplined colonial economy, readable strategy-game composition, red and ivory accents, no text",
    destination: "public/assets/generated/civs/british-hero.png",
    status: "generate-next",
  },
  {
    id: "civ-hero-ottomans",
    type: "hero",
    title: "Ottoman civ hero",
    prompt: "Ottoman Janissary pressure, barracks rally, cavalry flank, fortress transition mood, teal and brass palette, educational game art, no text",
    destination: "public/assets/generated/civs/ottomans-hero.png",
    status: "generate-next",
  },
  {
    id: "deck-cover-semi-ff",
    type: "deck-cover",
    title: "Semi-FF deck cover",
    prompt: "Strategic deck cover for semi fast fortress, shipment cards, age-up route, trade post silhouette, premium academy UI asset, no copyrighted logos",
    destination: "public/assets/generated/decks/semi-ff-cover.png",
    status: "brief-ready",
  },
  {
    id: "shipment-trainer-plate",
    type: "card-backplate",
    title: "Shipment decision card backplate",
    prompt: "Readable card backplate for RTS shipment decision trainer, parchment, brass frame, tiny resource motifs, blank center for UI text",
    destination: "public/assets/generated/ui/shipment-card-backplate.png",
    status: "brief-ready",
  },
  {
    id: "map-helper-plate",
    type: "map-plate",
    title: "Map helper plate",
    prompt: "Atlas-style strategy map plate for Age of Empires III inspired academy, trade route markers, coast markers, native settlement icons, no real map text",
    destination: "public/assets/generated/maps/map-helper-plate.png",
    status: "brief-ready",
  },
  {
    id: "infographic-shipments",
    type: "infographic",
    title: "Shipment branches infographic",
    prompt: "Clean educational infographic, three branches greed defense transition, AoE3 inspired parchment and tactical arrows, Spanish labels added later in app not in image",
    destination: "public/assets/generated/infographics/shipment-branches.png",
    status: "brief-ready",
  },
  {
    id: "role-icons",
    type: "icon-set",
    title: "Core/Flex/Greed/Defense role icons",
    prompt: "Small consistent RTS academy icon set, core flex greed defense transition timing, flat engraved brass style, transparent background",
    destination: "public/assets/generated/icons/roles/",
    status: "needs-reference",
  },
];

