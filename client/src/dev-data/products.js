const devProducts = [
  {
    title: "Bird Teaser with Feathers",
    price: 2.62,
    category: "cat",
    description:
      "This is no angry bird, but the perfect play buddy for your kitty. Wave it around and let the colorful feathers, dangly string, crinkly sound and catnip entice bored felines to jump into play. Leap, actually! By stimulating their natural hunting instincts, it's the perfect way to provide cats with the daily exercise they need. Playing together also helps strengthen the bond between you and your cat, on the daily.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/161199_MAIN._AC_SL400_V1568240232_.jpg",
    weight: "100g",
    maker: "Frisco",
    slug: "bird-teaser",
  },
  {
    title: "Buggin' Out Puzzle & Play",
    price: 19.99,
    category: "cat",
    description:
      "Keep your kitty busy while rewarding her with her favorite treats! Petstages Buggin' Out Puzzle & Play Cat Toy is designed for the most curious kitties out there. This puzzle can be used for daily feeding to help her maintain a healthy eating pace, or you can use it to help keep her preoccupied. Simply place the treats in the hidden treat compartments and watch your feline forage away! And while she's doing everything in her power to reveal every last bite, you can rest assured knowing that there are no removable parts and that the toy is made from only food safe materials and never any BPA, PVC or phthalates.",
    imageUrl:
      "https://cdn.abicart.com/shop/30710/art10/h8815/175398815-origpic-c96a68.jpg",
    weight: "300g",
    maker: "Petstages",
    slug: "buggin-out-puzzle",
  },
  {
    title: "IQ Treat Dispenser Ball",
    price: 13.95,
    category: "dog",
    description:
      "Have your pet work for his treats with the Pet Zone IQ Treat Ball Interactive Dog Toy. A challenging way to give your buddy his favorite snacks, simply fill the ball, select the difficulty level and let your dog get to work! He'll love to play with the ball and figure out how to get to the tasty morsels inside, and with adjustable levels, you can keep increasing the challenge. It's not only a reward of treats, but it also rewards him with physical and mental activity—which has loads of benefits! By keeping him engaged he'll stay happy and healthy, and less prone to bored, destructive behavior.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/115632_Pt5._AC_SL400_V1583771892_.jpg",
    weight: "350g",
    maker: "Pet Zone",
    slug: "iq-treat-dispenser",
  },
  {
    title: "Cozie Marvin the Moose Plush",
    price: 11.49,
    category: "dog",
    description:
      "The KONG Cozies are cute, soft and cuddly plush toys made with an extra layer of material, so they're extra tough. Cozies are perfect for a game of fetch or as a comfort toy for your furry friend. Grab one of the 10 amazingly cute Cozie characters for your dog and we know your dog will love you for it.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/160735_MAIN._AC_SL400_V1604072534_.jpg",
    weight: "220g",
    maker: "Kong",
    slug: "cozie-marvin-the-moose",
  },
  {
    title: "Bird Teaser with Feathers",
    price: 2.62,
    category: "cat",
    description:
      "This is no angry bird, but the perfect play buddy for your kitty. Wave it around and let the colorful feathers, dangly string, crinkly sound and catnip entice bored felines to jump into play. Leap, actually! By stimulating their natural hunting instincts, it's the perfect way to provide cats with the daily exercise they need. Playing together also helps strengthen the bond between you and your cat, on the daily.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/161199_MAIN._AC_SL400_V1568240232_.jpg",
    weight: "100g",
    maker: "Frisco",
    slug: "bird_teaser",
  },
  {
    title: "Buggin' Out Puzzle & Play",
    price: 19.99,
    category: "cat",
    description:
      "Keep your kitty busy while rewarding her with her favorite treats! Petstages Buggin' Out Puzzle & Play Cat Toy is designed for the most curious kitties out there. This puzzle can be used for daily feeding to help her maintain a healthy eating pace, or you can use it to help keep her preoccupied. Simply place the treats in the hidden treat compartments and watch your feline forage away! And while she's doing everything in her power to reveal every last bite, you can rest assured knowing that there are no removable parts and that the toy is made from only food safe materials and never any BPA, PVC or phthalates.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/227098_PT2._AC_SL400_V1595560592_.jpg",
    weight: "300g",
    maker: "Petstages",
    slug: "buggin_out_puzzle",
  },
  {
    title: "IQ Treat Dispenser Ball",
    price: 13.95,
    category: "dog",
    description:
      "Have your pet work for his treats with the Pet Zone IQ Treat Ball Interactive Dog Toy. A challenging way to give your buddy his favorite snacks, simply fill the ball, select the difficulty level and let your dog get to work! He'll love to play with the ball and figure out how to get to the tasty morsels inside, and with adjustable levels, you can keep increasing the challenge. It's not only a reward of treats, but it also rewards him with physical and mental activity—which has loads of benefits! By keeping him engaged he'll stay happy and healthy, and less prone to bored, destructive behavior.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/115632_Pt5._AC_SL400_V1583771892_.jpg",
    weight: "350g",
    maker: "Pet Zone",
    slug: "iq_treat_dispenser",
  },
  {
    title: "Cozie Marvin the Moose Plush",
    price: 11.49,
    category: "dog",
    description:
      "The KONG Cozies are cute, soft and cuddly plush toys made with an extra layer of material, so they're extra tough. Cozies are perfect for a game of fetch or as a comfort toy for your furry friend. Grab one of the 10 amazingly cute Cozie characters for your dog and we know your dog will love you for it.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/160735_MAIN._AC_SL400_V1604072534_.jpg",
    weight: "220g",
    maker: "Kong",
    slug: "cozie_marvin_the_moose",
  },
  {
    title: "Faux Shearling Jacket",
    price: 19.95,
    category: "dog",
    description:
      "Quilted Jacket With a High Collar. Contrast Fabric. Opening Detail at the Back. Breathable Mesh Lining. Back Pocket With Thermo-sealed Zip. Hook-and-loop Strap Fastening.",
    imageUrl:
      "https://static.zara.net/photos///2021/I/0/1/p/0653/289/712/2/w/1126/0653289712_2_1_1.jpg?ts=1632311345187",
    weight: "270g",
    maker: "Zara",
    slug: "faux_shearling_jacket",
  },
  {
    title: "Quilted Jacket",
    price: 39.55,
    category: "dog",
    description:
      "Water-repellent Thermo-sealed Quilted Jacket. High Neck With Adjustable Drawstring and Stopper. Zip-up Opening at the Back. Reflective Piping Details. Adjustable Hook-and-loop.",
    imageUrl:
      "https://static.zara.net/photos///2021/I/0/1/p/0653/288/505/2/w/1738/0653288505_1_1_1.jpg?ts=1632311327730",
    weight: "350g",
    maker: "Zara",
    slug: "quilted_jacket",
  },
  {
    title: "Check Pet Bed",
    price: 59.95,
    category: "dog",
    description:
      "Rectangular bed with a contrast check design for pets. The cushion cover can be removed for easy cleaning.",
    imageUrl:
      "https://static.zarahome.net/8/photos4/2021/I/4/1/b/1321/000/305/BH/PM/1321000305_1_1_1.jpg?t=1627479940812",
    weight: "600g",
    maker: "Zara Home",
    slug: "check_pet_bed",
  },
  {
    title: "Mouse Pet Toy",
    price: 13.95,
    category: "cat",
    description: "Crochet mouse pet toy with bell inside.",
    imageUrl:
      "https://static.zarahome.net/8/photos4/2021/I/4/1/p/1322/149/309/1322149309_2_7_1.jpg?t=1624271788641",
    weight: "30g",
    maker: "Zara Home",
    slug: "mouse_pet_toy",
  },
  {
    title: "Snuggle Puppy",
    price: 50.95,
    category: "dog",
    description:
      "It's more than just a plush toy. Simply open the belly pouch to pop in the heart-shaped heat pack to provide extra comfort.",
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/th2hgj8VuMxHzvZEKcUEv4-970-80.jpg.webp",
    weight: "280g",
    maker: "Snuggle puppy",
    slug: "snuggle_puppy",
  },
  {
    title: "Interactive Toys Balls",
    price: 20.0,
    category: "dog",
    description:
      "Each is made from a durable natural rubber and features plenty of rigid indentations that help massage the gums and clean teeth at the same time.",
    imageUrl:
      "https://cdn.mos.cms.futurecdn.net/eo8GTgyxP4cJ3xhPqmUdjF-970-80.jpg.webp",
    weight: "90g",
    maker: "Slopehill",
    slug: "interactive_toys_balls",
  },
  {
    title: "Robotic Cat Toy",
    price: 450.0,
    category: "cat",
    description:
      "Maybe this toy with its 360-degree range of motion will even help your kitty overcome their fear of the Roomba.",
    imageUrl:
      "https://www.gannett-cdn.com/-mm-/cce0ffbdb6148b36d2a278c665d5f7db7b914b15/c=98-0-693-446/local/-/media/2020/09/08/USATODAY/usatsports/Reviewed.com-RvEW-25477-3._robot_toy.png?width=2560",
    weight: "260g",
    maker: "HEXBUG",
    slug: "robotic_cat_toy",
  },
  {
    title: "Catnip Yellow Banana",
    price: 42.5,
    category: "cat",
    description:
      "Happy buyers of this catnip-filled banana say their cats love playing with the shell long after they've torn it to pieces.",
    imageUrl:
      "https://img.chewy.com/is/image/catalog/102761_PT1._AC_SL1500_V1555941237_.jpg",
    weight: "75g",
    maker: "Yeowww!",
    slug: "catnip_yellow_banana",
  },
];
export default devProducts;
