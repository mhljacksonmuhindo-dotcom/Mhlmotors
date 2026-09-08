const localAssets = import.meta.glob("../../img/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const assetEntries = Object.entries(localAssets).filter(
  ([path]) => !path.toLowerCase().includes("logo"),
);

const aliases = [
  ["allex", ["alex"]],
  ["alex", ["alex"]],
  ["harrier", ["HARRIERR"]],
  ["forrester", ["forrester"]],
  ["impreza", ["impreza"]],
  ["corolla", ["corona"]],
  ["corona", ["corona"]],
  ["land cruiser", ["LAND"]],
  ["land", ["LAND"]],
  ["ist", ["IST"]],
  ["premio", ["premio", "premoi"]],
  ["probox", ["probox"]],
  ["raum", ["Raum"]],
  ["swift", ["Suift", "swif"]],
  ["suift", ["Suift", "swif"]],
  ["tiguan", ["Tiguan", "Tigua", "TUGUAN"]],
  ["v8", ["V8"]],
  ["xte", ["XTE", "xte"]],
  ["xt", ["XT"]],
  ["xv", ["XV"]],
  ["subaru", ["subaru"]],
  ["mercedes benz", ["mhlback"]],
  ["toyota", ["Toyota", "toyota"]],
];

const clean = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

function findAssets(keywords) {
  return assetEntries
    .filter(([path]) =>
      keywords.some((keyword) => clean(path).includes(clean(keyword))),
    )
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, url]) => url);
}

export function getVehicleImages(vehicle) {
  const source = vehicle?.images || [];

  const validDirectImages = source.filter(
    (img) =>
      typeof img === "string" &&
      (img.startsWith("data:image") || /^https?:\/\//i.test(img)),
  );

  if (validDirectImages.length > 0) {
    return validDirectImages;
  }

  const sourceAssets = source
    .map((image) => {
      const directMatch = assetEntries.find(([path]) =>
        clean(path).includes(clean(image)),
      );
      if (directMatch) return directMatch[1];

      const API_BASE_URL =
        import.meta.env.VITE_API_URL ||
        "https://mhl-motors-api.onrender.com/api";
      const serverRoot = API_BASE_URL.replace(/\/api$/, "");
      return `${serverRoot}/uploads/${String(image).trim()}`;
    })
    .filter(Boolean);

  if (sourceAssets.length > 0) {
    return sourceAssets;
  }

  const vehicleText = clean(`${vehicle?.make} ${vehicle?.model}`);
  const matchingAlias = aliases.find(([alias]) =>
    vehicleText.includes(clean(alias)),
  );
  const matchingAssets = matchingAlias ? findAssets(matchingAlias[1]) : [];

  if (matchingAssets.length > 0) {
    return matchingAssets;
  }

  const makeAssets = findAssets([vehicle?.make]);
  if (makeAssets.length > 0) return makeAssets;

  return assetEntries.slice(0, 1).map(([, url]) => url);
}
