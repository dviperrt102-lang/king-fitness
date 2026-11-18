// Display data for the merch storefront. Prices here are for display only —
// the server catalog in the checkout function decides what is actually charged.
// `images` holds each color's front and back mockups; `front` is shown first.

const PF = "https://files.cdn.printful.com/files";

export const MERCH_PRODUCTS = [
  {
    key: "forged-in-fire-tee",
    name: "Forged in Fire - Unisex garment-dyed heavyweight t-shirt",
    price: 3299,
    colors: ["Black", "Navy"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/24e6053d6_7825903a2_forged-tee_black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/18f5bec84_4758b2f9c_forged-tee_black_back.png",
      },
      Navy: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/7ade0c3d1_02abbe50f_forged-tee_navy_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/c512ba7ac_bb7621f9e_forged-tee_navy_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "god-strong-tee",
    name: "God Strong - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    colors: ["Black", "Navy"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9da7edad9_9a874a941_godstrong-tee_black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/83fad8c95_0e3bdd417_godstrong-tee_black_back.png",
      },
      Navy: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2619c9e71_adfd403a0_godstrong-tee_navy_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/b59c0acb5_a3b884fb9_godstrong-tee_navy_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "king-fitness-classic-vintage-tee",
    name: "King Fitness Classic - Vintage - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    colors: ["Black", "True Navy"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/35c7a5786_029f1a1be_classic-tee_black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/51fb1119c_328a0feb9_classic-tee_black_back.png",
      },
      "True Navy": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/d0dd43a54_5ad789d40_classic-tee_true-navy_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/c9d0e4331_fcd2b9db4_classic-tee_true-navy_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "lion-hoodie",
    name: "King Fitness Oversized Heavyweight Lion Hoodie",
    price: 4999,
    colors: ["Asphalt", "Vintage Black"],
    images: {
      Asphalt: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/37a5aba96_507f325f9_lion-hoodie_asphalt_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9822c68cb_lion-hoodie-asphalt-back-mockup.png",
      },
      "Vintage Black": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/45145e2ec_414f31a27_lion-hoodie_vintage-black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/fe0e4b72e_c9bbbd885_lion-hoodie_vintage-black_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-hoodie",
    name: "God Strong - Unisex Oversized heavyweight hoodie",
    price: 4999,
    colors: ["Black", "Asphalt"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/bbbe38659_c8955a94e_godstrong-hoodie_black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/32d5e9f3a_d3835ccf2_godstrong-hoodie_black_back.png",
      },
      Asphalt: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/726206f1a_d9d9fe35c_godstrong-hoodie_asphalt_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/91f2fb5de_fc853da88_godstrong-hoodie_asphalt_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "lion-of-judah-sweatshirt",
    name: "Unisex Oversized heavyweight sweatshirt - Lion of Judah",
    price: 5499,
    colors: ["Black", "Navy"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/6304ac7e3_63e5e7588_lion-judah_black_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/7249c5907_88c2345e6_lion-judah_black_back.png",
      },
      Navy: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/b52f16ff8_657d60d1d_lion-judah_navy_front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/8ca9132bf_d3da0c01a_lion-judah_navy_back.png",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-beanie",
    name: "God Strong - Embroidered Beanie",
    price: 2499,
    colors: ["Black", "Gray"],
    images: {
      Black: {
        front: `${PF}/3b4/3b4e9d23d0da1c2fc0d769775af8c25c_preview.png`,
      },
      Gray: {
        front: `${PF}/db9/db9ecf0aa2d853109b29566d0f896579_preview.png`,
      },
    },
    sizes: [],
  },
  {
    key: "god-strong-snapback",
    name: "God Strong SnapBack - Snapback Hat",
    price: 3499,
    colors: ["Black"],
    images: {
      Black: {
        front: `${PF}/a3b/a3bcf790f94e53c00197373cd1e532f4_preview.png`,
      },
    },
    sizes: [],
  },
];