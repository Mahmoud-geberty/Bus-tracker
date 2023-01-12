const routeList = [
  "CP-FKE",
  "CP-CLUSTER",
  "CP-SBME",
  "K9/K10/KTC - LINGKARAN ILMU",
  "KDOJ/KDSE - CLUSTER",
  "KDOJ/KDSE - LINGKARAN ILMU",
  "KP/K9/K10 - CLUSTER",
  "KP - LINGKARAN ILMU",
  "KTR/KTHO/KTDI - LINGKARAN ILMU",
  "KTR/KTHO/KTDI - SKT",
];

export const routeDataList = [
  {
    origin: [103.634783, 1.559694], // cp
    end: [103.640156, 1.55805], // fke
  },
  {
    origin: [103.634783, 1.559694], // cp
    end: [103.654998, 1.562907], // cluster
  },
  {
    origin: [103.634783, 1.559694], // cp
    points: ";103.638942,1.561146;", // ';' separated points in a string
    end: [103.632542, 1.54371], // sbme
  },
  {
    origin: [103.6492, 1.558706], // k9 k10 ktc
    points: ";103.640839,1.558111;",
    end: [103.639139, 1.562663], // lingkaran ilmu
  },
  {
    origin: [103.619681, 1.575603], //kdoj kdse
    points: ";103.626020,1.565238;103.633928,1.559259;103.652889,1.563493;",
    end: [103.654998, 1.562907], // cluster
  },
  {
    origin: [103.619681, 1.575603], // kdoj kdse
    end: [103.639139, 1.562663], // lingkaran ilmu
  },
  {
    origin: [103.6492, 1.558706], // kp k9 k10
    points: ";103.652889,1.563493;",
    end: [103.654998, 1.562907], // cluster
  },
  {
    origin: [103.6492, 1.558706], // kp
    points: ";103.640839,1.558111;",
    end: [103.639139, 1.562663], // lingkaran ilmu
  },
  {
    origin: [103.627702, 1.564688], // ktr ktho ktdi
    end: [103.639139, 1.562663], // lingkaran ilmu
  },
  {
    origin: [103.627702, 1.564688], // ktr ktho ktdi
    end: [103.63854, 1.564351], // linkaran ilmu
  },
];

export default routeList;
