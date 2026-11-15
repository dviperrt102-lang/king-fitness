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
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/4b46eac79_forged-black-front-mockup.png",
        back: `${PF}/b25/b25bd40fa4c9c2f6800eac5dd34dc2c2_preview.png`,
      },
      Navy: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/925f3c86b_forged-navy-front-mockup.png",
        back: `${PF}/7bd/7bd0f01d7687dc2d9eb89faf07fa76a5_preview.png`,
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
        front: `${PF}/9e1/9e13a8c7c2eee4816162032ee1745a98_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/bf86da7c2_godstrong-tee-black-back-mockup.png",
      },
      Navy: {
        front: `${PF}/276/276784aeef688fed38a1f5293f440718_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/00581efca_godstrong-tee-navy-back-mockup.png",
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
        front: `${PF}/041/041a29227053d59a290d6ea484e4f009_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/3171aa897_vintage-black-back-mockup.png",
      },
      "True Navy": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/5bd05a2c2_king-fitness-classic-vintage-tee-true-navy-front.png",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2dc1c7f74_vintage-truenavy-back-mockup.png",
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
        front: `${PF}/a0e/a0ebb6cc3476e87fccd2aab4b58ccc35_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9822c68cb_lion-hoodie-asphalt-back-mockup.png",
      },
      "Vintage Black": {
        front: `${PF}/36a/36ab0439edb934b6ebcf26ab17910fcb_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/35bb15066_lion-hoodie-vintageblack-back-mockup.png",
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
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/148c4b1ff_godstrong-hoodie-black-front-mockup.png",
        back: `${PF}/cd3/cd3f72a5a2d7452376016fd1f4d3e387_preview.png`,
      },
      Asphalt: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/660d07d77_godstrong-hoodie-asphalt-front-mockup.png",
        back: `${PF}/a7d/a7d600c97ec6ad946c61c59f702112d1_preview.png`,
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
        front: `${PF}/b0d/b0d2771448185d5edf4a718e76e860bc_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9fa6b347c_sweatshirt-black-back-mockup.png",
      },
      Navy: {
        front: `${PF}/9a0/9a09a7a832a11ff27af80ae065e73439_preview.png`,
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/91537683e_sweatshirt-navy-back-mockup.png",
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