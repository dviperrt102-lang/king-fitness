// Display data for the merch storefront. Prices here are for display only —
// the server catalog in the checkout function decides what is actually charged.
// colorImages holds each color's Printful mockup; `image` is the fallback used
// when a color has no mockup of its own.

export const MERCH_PRODUCTS = [
  {
    key: "forged-in-fire-tee",
    name: "Forged in Fire - Unisex garment-dyed heavyweight t-shirt",
    price: 3299,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-garment-dyed-heavyweight-t-shirt-navy-back-6903dbbc99cf9_medium.jpg?v=1761860569",
    colors: ["Black", "Navy"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/b25/b25bd40fa4c9c2f6800eac5dd34dc2c2_preview.png",
      Navy: "https://files.cdn.printful.com/files/7bd/7bd0f01d7687dc2d9eb89faf07fa76a5_preview.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "god-strong-tee",
    name: "God Strong - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-garment-dyed-heavyweight-t-shirt-black-front-68efcf6daf054_medium.jpg?v=1760546677",
    colors: ["Black", "Navy"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/9e1/9e13a8c7c2eee4816162032ee1745a98_preview.png",
      Navy: "https://files.cdn.printful.com/files/276/276784aeef688fed38a1f5293f440718_preview.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "king-fitness-classic-vintage-tee",
    name: "King Fitness Classic - Vintage - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-garment-dyed-heavyweight-t-shirt-black-front-68efd05fb2665_medium.jpg?v=1760546919",
    colors: ["Black", "True Navy"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/041/041a29227053d59a290d6ea484e4f009_preview.png",
      "True Navy":
        "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/5bd05a2c2_king-fitness-classic-vintage-tee-true-navy-front.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "lion-hoodie",
    name: "King Fitness Oversized Heavyweight Lion Hoodie",
    price: 4999,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-oversized-heavyweight-hoodie-asphalt-back-68efd00d11802_medium.jpg?v=1760546837",
    colors: ["Asphalt", "Vintage Black"],
    colorImages: {
      Asphalt:
        "https://files.cdn.printful.com/files/a0e/a0ebb6cc3476e87fccd2aab4b58ccc35_preview.png",
      "Vintage Black":
        "https://files.cdn.printful.com/files/36a/36ab0439edb934b6ebcf26ab17910fcb_preview.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-hoodie",
    name: "God Strong - Unisex Oversized heavyweight hoodie",
    price: 4999,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-oversized-heavyweight-hoodie-asphalt-back-68efcdcec85af_medium.jpg?v=1760546264",
    colors: ["Black", "Asphalt"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/cd3/cd3f72a5a2d7452376016fd1f4d3e387_preview.png",
      Asphalt:
        "https://files.cdn.printful.com/files/a7d/a7d600c97ec6ad946c61c59f702112d1_preview.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "lion-of-judah-sweatshirt",
    name: "Unisex Oversized heavyweight sweatshirt - Lion of Judah",
    price: 5499,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/unisex-oversized-heavyweight-sweatshirt-black-back-68e53acfa1b89_medium.jpg?v=1759853293",
    colors: ["Black", "Navy"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/b0d/b0d2771448185d5edf4a718e76e860bc_preview.png",
      Navy: "https://files.cdn.printful.com/files/9a0/9a09a7a832a11ff27af80ae065e73439_preview.png",
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "god-strong-beanie",
    name: "God Strong - Embroidered Beanie",
    price: 2499,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/knit-beanie-black-front-68f12d8163d2a_medium.jpg?v=1760636299",
    colors: ["Black", "Gray"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/3b4/3b4e9d23d0da1c2fc0d769775af8c25c_preview.png",
      Gray: "https://files.cdn.printful.com/files/db9/db9ecf0aa2d853109b29566d0f896579_preview.png",
    },
    sizes: [],
  },
  {
    key: "god-strong-snapback",
    name: "God Strong SnapBack - Snapback Hat",
    price: 3499,
    image:
      "https://cdn.shopify.com/s/files/1/0779/5245/0815/files/snapback-black-front-68f1297cf15eb_medium.jpg?v=1760635266",
    colors: ["Black"],
    colorImages: {
      Black:
        "https://files.cdn.printful.com/files/a3b/a3bcf790f94e53c00197373cd1e532f4_preview.png",
    },
    sizes: [],
  },
];