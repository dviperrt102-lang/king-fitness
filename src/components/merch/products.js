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
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/b7bc23774_lion-hoodie_asphalt_back.png",
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
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/07cef8f4b_9a1bc56cf_beanie_black_front.png",
      },
      Gray: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/1446aceaa_bcb31b3f1_beanie_gray_front.png",
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
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/c764e23d4_fae558754_snapback_black_front.png",
      },
    },
    sizes: [],
  },
  {
    key: "love-well-hoodie",
    name: "Love Well - Lift Heavy - Unisex Oversized heavyweight hoodie",
    price: 4999,
    colors: ["Asphalt", "Forest", "Maroon", "Navy", "Vintage Black"],
    images: {
      Asphalt: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/fb9c71944_899775eba_lovewell-hoodie_asphalt_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/c73f6e88d_6d30451f5_lovewell-hoodie_asphalt_back.jpg",
      },
      Forest: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/0d1fc848c_6888291b8_lovewell-hoodie_forest_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/d91a6fbde_ffb476a8e_lovewell-hoodie_forest_back.jpg",
      },
      Maroon: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/a0786dcf2_c04f03cfe_lovewell-hoodie_maroon_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/306761183_9d432ccd6_lovewell-hoodie_maroon_back.jpg",
      },
      Navy: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/e1bfe4784_89687efd4_lovewell-hoodie_navy_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/457ae4b41_23d83b8ca_lovewell-hoodie_navy_back.jpg",
      },
      "Vintage Black": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/f11d1fd9e_a996d518f_lovewell-hoodie_vintage-black_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/0f7ce4862_aaa17dc4b_lovewell-hoodie_vintage-black_back.jpg",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    key: "love-well-tee",
    name: "Love Well - Lift Heavy - Unisex garment-dyed heavyweight t-shirt",
    price: 2999,
    colors: ["Black", "Blue Spruce", "Brick", "Denim", "Graphite", "Grey"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/8ea08c3ac_0c1bb9f45_tee_black_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/dceebdf9d_f5c2a0957_lovewell-tee_black_back.jpg",
      },
      "Blue Spruce": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/31b449975_796ef3888_tee_blue-spruce_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/c41ec4a3f_1c44ac7bd_lovewell-tee_blue-spruce_back.jpg",
      },
      Brick: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2d97d8190_35cfb84c1_tee_brick_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/0007edc6f_a6acc9393_lovewell-tee_brick_back.jpg",
      },
      Denim: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/5fe2e4852_27b60430e_tee_denim_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/b9011843c_3bc62d8c9_lovewell-tee_denim_back.jpg",
      },
      Graphite: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/1ea8c8c0e_0cfc5d112_tee_graphite_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/0f22c7004_2156b9b9e_lovewell-tee_graphite_back.jpg",
      },
      Grey: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/3347f4eeb_606de600a_tee_grey_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/ff36581c5_816eb8118_lovewell-tee_grey_back.jpg",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "phil-121-tee",
    name: "PHIL 1:21 - Unisex garment-dyed heavyweight t-shirt",
    price: 3299,
    colors: ["Black", "Blue Spruce", "Brick", "Denim", "Granite", "True Navy"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/8ea08c3ac_0c1bb9f45_tee_black_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2f672dec1_9cd9c5dad_phil121-tee_black_back.jpg",
      },
      "Blue Spruce": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/31b449975_796ef3888_tee_blue-spruce_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/48971a5e4_fbc9aa527_phil121-tee_blue-spruce_back.jpg",
      },
      Brick: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/2d97d8190_35cfb84c1_tee_brick_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/9cb26b2c2_phil121_brick_back.jpg",
      },
      Denim: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/5fe2e4852_27b60430e_tee_denim_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/82d39a0c2_phil121_denim_back.jpg",
      },
      Granite: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/cc63cadbb_tee_granite_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/e65fde626_phil121_granite_back.jpg",
      },
      "True Navy": {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/b86538462_tee_true_navy_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/70550d3c1_phil121_true_navy_back.jpg",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
  {
    key: "jesus-is-king-tee",
    name: "Jesus is King - Unisex garment-dyed heavyweight t-shirt",
    price: 3299,
    colors: ["Black", "Denim", "Graphite", "Grey", "Midnight", "Navy", "Pepper"],
    images: {
      Black: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/8ea08c3ac_0c1bb9f45_tee_black_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/65669bd9a_jesusking_black_back.jpg",
      },
      Denim: {
        front: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/5fe2e4852_27b60430e_tee_denim_front.jpg",
        back: "https://base44.app/api/apps/68a3616f46b64caea80fe05b/files/mp/public/68a3616f46b64caea80fe05b/d97374c55_jesusking_denim_back.jpg",
      },
    },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
  },
];