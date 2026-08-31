const { exec } = require("child_process");
const readline = require("readline");

const allNewPerfumes = [
  {
    "name": "XERJOFF TORINO 21",
    "description": "A crisp, energetic fragrance with a polished green-citrus character perfect for warm days. Notes include mint, lemon, basil, thyme, blackcurrant, lavender, rosemary and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF BLUE HOPE",
    "description": "A smooth and elegant scent balancing bright freshness with a warm, refined dry-down. Notes include bergamot, mandarin, saffron, jasmine, cedar, vanilla and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF ACCENTO",
    "description": "A vibrant fruity-floral fragrance with a creamy, sophisticated finish. Notes include pineapple, hyacinth, iris, jasmine, pink pepper, musk, amber, vanilla and patchouli.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF ALEXANDRIA II",
    "description": "A rich and luxurious woody oriental fragrance with a deep, regal character. Notes include rosewood, lavender, cinnamon, apple, rose, cedar, oud, sandalwood, vanilla, amber and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF WARDASINA",
    "description": "A bold rose-led fragrance with smoky, spicy and sensual depth. Notes include rose, saffron, tobacco, patchouli, cedar, vanilla and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF ERBA GOLD",
    "description": "A bright fruity fragrance with a warm, smooth and luxurious finish. Notes include citrus, ginger, melon, pear, apple, cloves, cinnamon, cardamom, amber, vanilla, musk and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "XERJOFF NAXOS",
    "description": "A rich aromatic fragrance that blends fresh citrus with sweet honeyed tobacco. Notes include bergamot, lemon, lavender, honey, cinnamon, jasmine, tobacco, tonka bean and vanilla.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "INITIO PARAGON",
    "description": "A calming yet powerful woody-aromatic fragrance with a smooth modern edge. Notes include lavender, sage, bergamot, plum, palo santo, sandalwood and white oud.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "INITIO SIDE EFFECT",
    "description": "A seductive warm-spicy fragrance with a sweet, boozy and addictive character. Notes include rum, vanilla, tobacco, cinnamon, saffron and hedione.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD BITTER PEACH",
    "description": "A decadent fruity fragrance built around juicy peach with a rich boozy warmth. Notes include peach, blood orange, cardamom, rum, cognac, jasmine, sandalwood, patchouli, vanilla and tonka bean.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD SOLEIL BEIGE",
    "description": "A creamy solar fragrance with a warm, beachy and softly floral feel. Notes include bergamot, coconut, ylang-ylang, cardamom, pistachio, amber and benzoin.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD FUCKING FABULOUS",
    "description": "A bold leather fragrance with an aromatic, creamy and unapologetically luxurious character. Notes include lavender, clary sage, bitter almond, leather, orris, vanilla, tonka bean, amber and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD BLACK ORCHID",
    "description": "A dark and opulent floral fragrance with rich spice, earthiness and sensual sweetness. Notes include truffle, ylang-ylang, bergamot, blackcurrant, orchid, spice, chocolate, patchouli, vanilla, incense and amber.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD OMBRE LEATHER",
    "description": "A smooth, confident leather fragrance with floral warmth and a dry woody finish. Notes include cardamom, jasmine sambac, leather, patchouli, amber and moss.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD TOBACCO VANILLE",
    "description": "A warm and luxurious gourmand fragrance combining rich tobacco with creamy sweetness. Notes include tobacco leaf, spices, vanilla, cacao, tonka bean, dried fruits and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "TOM FORD LOST CHERRY",
    "description": "A rich cherry gourmand with boozy sweetness, almond warmth and a sensual woody base. Notes include black cherry, bitter almond, cherry liqueur, plum, rose, jasmine, tonka bean, vanilla, cinnamon and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "BURBERRY HERO",
    "description": "A fresh yet masculine woody fragrance with a clean, confident character. Notes include bergamot, juniper, black pepper and a trio of cedarwoods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "BURBERRY HER",
    "description": "A playful fruity fragrance with juicy berries, soft florals and a creamy musky base. Notes include strawberry, raspberry, blackberry, blackcurrant, cherry, violet, jasmine, vanilla, musk and amber.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "BURBERRY GODDESS",
    "description": "A warm and comforting vanilla fragrance with an elegant aromatic freshness. Notes include vanilla, lavender, cacao and ginger.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "CELINE BLACK TIE",
    "description": "A refined powdery-vanilla fragrance with a smooth, dressed-up elegance. Notes include orris, cedar, tree moss, vanilla and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "CELINE PARADE",
    "description": "A bright and understated citrus-aromatic fragrance with effortless sophistication. Notes include bergamot, neroli, vetiver, oakmoss and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "DIOR GRIS",
    "description": "A sophisticated unisex fragrance blending floral elegance with earthy woods and moss. Notes include bergamot, rose, patchouli, oakmoss, cedar and amber.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "DIOR MISS DIOR",
    "description": "A romantic floral fragrance with soft sweetness and an elegant, feminine finish. Notes include rose, peony, iris, lily-of-the-valley, peach, vanilla, musk and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "DIOR ROUGE TRAFALGAR",
    "description": "A vibrant fruity fragrance bursting with juicy red berries and sparkling citrus. Notes include raspberry, strawberry, cherry, blackcurrant, mandarin, grapefruit, musk and patchouli.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "DIOR SAUVAGE",
    "description": "A fresh spicy fragrance with a clean, powerful and unmistakably modern character. Notes include bergamot, pepper, lavender, star anise, nutmeg, ambroxan, cedar and labdanum.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "DIOR ROSE KABUKI",
    "description": "A delicate rose fragrance with an airy, powdery and beautifully minimalist feel. Notes include rose, soft green accords and white musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "YSL TUXEDO",
    "description": "A polished spicy-woody fragrance with a dark, elegant and evening-ready character. Notes include violet leaf, coriander, bergamot, rose, black pepper, patchouli, ambergris and vanilla.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "MAISON CRIVELLI OUD STALLION",
    "description": "A powerful oud fragrance combining rich woods, leather and vibrant spice. Notes include saffron, cardamom, nutmeg, rose, osmanthus, leather, oud, cedar and patchouli.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "MAISON CRIVELLI OUD MARACUJA",
    "description": "A striking fruity-oud fragrance where tropical brightness meets deep leather and woods. Notes include passion fruit, saffron, Turkish rose, leather, oud, amber, vanilla and patchouli.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "MAISON CRIVELLI HIBISCUS MAHAJAD",
    "description": "A bold floral fragrance with lush sweetness, spice and a rich velvety finish. Notes include hibiscus, rose, cassis, cinnamon, leather, vanilla and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "MAISON CRIVELLI TUBEREUSE ASTRALE",
    "description": "A radiant white-floral fragrance with creamy warmth and an intriguing spicy edge. Notes include tuberose, cinnamon, osmanthus, peach, musk and vanilla.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "BYREDO MOJAVE GHOST",
    "description": "A soft woody-floral fragrance with an airy, clean and effortlessly modern feel. Notes include ambrette, sapodilla, violet, magnolia, sandalwood, ambergris, cedar and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON AFTERNOON SWIM",
    "description": "A sparkling citrus fragrance designed to feel bright, refreshing and effortlessly uplifting. Notes include mandarin, orange, bergamot and ginger.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON CITY OF STARS",
    "description": "A vibrant citrus fragrance inspired by warm evenings, glowing skies and coastal energy. Notes include blood orange, lemon, mandarin, bergamot, lime, tiare flower and musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON NUIT DE FEU",
    "description": "A dark and smoky fragrance with a warm, spiritual and luxurious depth. Notes include incense, frankincense, leather, oud and musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON PUR OUD",
    "description": "An intense oud-focused fragrance with smoky, leathery and deeply woody richness. Notes include agarwood, smoky woods, leather and soft musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON LOVERS",
    "description": "A fresh woody fragrance with green brightness and a smooth, sunlit warmth. Notes include galbanum, bergamot, ginger, solar accords, cedar and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON ATTRAPE-REVES",
    "description": "A sparkling floral-gourmand fragrance with juicy fruit, soft rose and a delicious cocoa twist. Notes include lychee, ginger, bergamot, peony, Turkish rose, cacao and patchouli.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON SYMPHONY",
    "description": "A luminous citrus fragrance with exceptional freshness and a clean, elegant finish. Notes include grapefruit, bergamot and ginger.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON ON THE BEACH",
    "description": "A breezy citrus-aromatic fragrance that captures the freshness of a sunny coastline. Notes include yuzu, neroli, rosemary, thyme, pink pepper, cloves and cypress.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON CALIFORNIA DREAM",
    "description": "A soft citrus-musky fragrance inspired by the glowing warmth of a California sunset. Notes include mandarin, ambrette, benzoin and musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON HEURES D'ABSENCE",
    "description": "An elegant floral fragrance with luminous white flowers and a soft musky warmth. Notes include jasmine sambac, May rose, mimosa, raspberry, vanilla, sandalwood and musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON LES SABLES ROSES",
    "description": "A rich rose-and-oud fragrance with a warm, luxurious Middle Eastern character. Notes include rose, oud, saffron, amber and musk.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON FLEUR DE DESERT",
    "description": "A radiant floral-amber fragrance inspired by blossoms flourishing in the desert heat. Notes include jasmine, orange blossom, rose, oud, amber and soft spices.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "LOUIS VUITTON PACIFIC CHILL",
    "description": "A refreshing fruity-aromatic fragrance with a cool, vibrant and wellness-inspired character. Notes include blackcurrant, citron, lemon, mint, coriander, apricot, basil, fig and ambrette.",
    "images": "",
    "stock": "100",
    "price": "75",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S ARTHUR",
    "description": "A mysterious smoky fragrance with a warm, regal blend of incense and sweetness. Notes include incense, vanilla, tonka bean, amber, woods and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S HALFETI",
    "description": "A rich spicy-woody fragrance with exotic florals, leather and deep oriental warmth. Notes include bergamot, grapefruit, saffron, cardamom, rose, jasmine, leather, oud, amber, vanilla and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S CONSTANCE",
    "description": "A warm gourmand fragrance with spicy sweetness and a confident, unconventional character. Notes include cardamom, pimento, caramel, salt, vanilla, tobacco and cashmeran.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S LORD GEORGE",
    "description": "A refined masculine fragrance with a classic barbershop feel and warm gentlemanly depth. Notes include brandy, shaving-soap accords, tonka bean, amber and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S DUCHESS ROSE",
    "description": "A graceful modern rose fragrance that feels fresh, elegant and softly musky. Notes include mandarin, rose, musk and woody accords.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PENHALIGON'S MISTER SAM",
    "description": "A charismatic spicy fragrance with warm tobacco, woods and a bold confident presence. Notes include cardamom, cinnamon, black pepper, saffron, tobacco, vanilla, patchouli and cedar.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "KILIAN ANGELS' SHARE",
    "description": "A rich boozy gourmand with warm spice and a smooth dessert-like sweetness. Notes include cognac, cinnamon, tonka bean, oak, praline, vanilla and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "GUERLAIN NEROLIA VETIVER",
    "description": "A bright green-citrus fragrance with an easygoing freshness and earthy vetiver base. Notes include neroli, basil, fig and vetiver.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "GUERLAIN NEROLI OUTRENOIR",
    "description": "A sophisticated citrus-tea fragrance that moves from bright neroli into a darker smoky finish. Notes include bergamot, petitgrain, neroli, orange blossom, black tea, smoky woods and vanilla.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "VAN CLEEF & ARPELS MOONLIGHT PATCHOULI",
    "description": "An elegant patchouli fragrance with powdery florals and a smooth, sensual leather touch. Notes include patchouli, iris, Bulgarian rose, leather, suede, amber and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "MFK GRAND SOIR",
    "description": "A deep amber fragrance with a smooth, warm and luxurious evening character. Notes include labdanum, benzoin, amber, vanilla and tonka bean.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM DELINA LA ROSEE",
    "description": "A fresh watery floral fragrance with juicy fruit and a delicate rose heart. Notes include lychee, pear, bergamot, Turkish rose, peony, white musk, vetiver and woods.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM DELINA ROYAL ESSENCE",
    "description": "A bright yet creamy rose fragrance with fruity freshness and an elegant musky sweetness. Notes include rhubarb, lychee, bergamot, Turkish rose, peony, vanilla, musk, cashmeran and cedar.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM DELINA EXCLUSIF",
    "description": "A richer and more sensual take on rose with creamy fruit, incense and warm woods. Notes include lychee, pear, bergamot, Turkish rose, oud, incense, vanilla, amber and woody notes.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM KALAN",
    "description": "A bold spicy fragrance with vivid citrus, aromatic freshness and a warm woody base. Notes include blood orange, black pepper, spices, lavender, orange blossom, moss, sandalwood, amber and tonka bean.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM HALTANE",
    "description": "A refined woody fragrance combining aromatic freshness with sweet praline and luxurious oud. Notes include clary sage, lavender, bergamot, saffron, praline, cedar and oud.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM ALTHAIR",
    "description": "A smooth vanilla fragrance with warm spice, creamy woods and a rich gourmand feel. Notes include orange blossom, bergamot, cinnamon, bourbon vanilla, elemi, guaiac wood, praline, ambrox and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM ORIANA",
    "description": "A playful fruity-floral gourmand with bright citrus and a fluffy marshmallow sweetness. Notes include mandarin, bergamot, grapefruit, orange blossom, raspberry, blackcurrant, marshmallow, cream and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "PDM VALAYA",
    "description": "A clean luminous floral fragrance with airy fruit, soft musk and modern woody depth. Notes include aldehydes, white peach, bergamot, mandarin, orange blossom, lily-of-the-valley, vetiver, ambroxan and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "AMOUAGE INTERLUDE BLACK IRIS",
    "description": "A deep smoky fragrance with elegant iris softening its powerful resinous and woody character. Notes include bergamot, rosemary, violet leaf, orris, frankincense, myrrh, amber, vanilla, leather, oud and sandalwood.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "AMOUAGE ROYAL TOBACCO",
    "description": "A complex tobacco fragrance packed with spice, resins and a dark luxurious warmth. Notes include cardamom, anise, basil, tobacco, licorice, frankincense, lavender, birch tar, oud, benzoin, myrrh, vanilla and tonka bean.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "AMOUAGE JUBILATION",
    "description": "A majestic woody-incense fragrance with fruit, spice and a rich resinous depth. Notes include blackberry, orange, coriander, labdanum, honey, oud, rose, cinnamon, myrrh, cedar, musk, moss and patchouli.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "JO MALONE ENGLISH PEAR & FREESIA",
    "description": "A fresh fruity-floral fragrance with juicy pear and an elegant, airy floral heart. Notes include pear, melon, freesia, rose, rhubarb, patchouli, amber and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "JO MALONE WOOD SAGE & SEA SALT",
    "description": "A breezy mineral fragrance inspired by fresh sea air and rugged coastal landscapes. Notes include ambrette seed, sea salt, sage, grapefruit and red algae.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "LE LABO ANOTHER 13",
    "description": "A clean skin-like fragrance with an airy, musky and quietly addictive character. Notes include ambroxan, jasmine, ambrette, moss, musk and woody accords.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "LE LABO THE NOIR 29",
    "description": "A dark aromatic fragrance blending black tea, woods and soft smoky sweetness. Notes include fig, bay leaf, bergamot, cedar, vetiver, musk, black tea, tobacco and hay.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "LE LABO SANTAL 33",
    "description": "A distinctive dry woody fragrance with smoky leather, spice and creamy sandalwood. Notes include sandalwood, cedar, cardamom, violet, papyrus, leather, amber and iris.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "CREED QUEEN OF SILK",
    "description": "A luxurious floral-amber fragrance with a silky texture, exotic fruit and warm woods. Notes include osmanthus, magnolia, saffron, passion fruit, tuberose, patchouli, oud, vanilla, myrrh and musk.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "CREED AVENTUS FOR HER",
    "description": "A vibrant fruity-floral fragrance with sparkling freshness and an elegant woody-musky base. Notes include green apple, bergamot, lemon, blackcurrant, peach, rose, violet, patchouli, musk, sandalwood and amber.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  },
  {
    "name": "CLIVE CHRISTIAN AMBERWOOD",
    "description": "A rich woody-amber fragrance with elegant spice and a smooth, opulent finish. Notes include bergamot, angelica, sage, saffron, tobacco, patchouli, sandalwood, oud, amber and tonka bean.",
    "images": "",
    "stock": "100",
    "price": "60",
    "collections": ""
  }
]


const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

function waitForInput() {
   return new Promise(resolve => {
      rl.question("Press ENTER to open the next 5...", () => {
         resolve();
      });
   });
}

function openUrl(url) {
   exec(`start chrome "${url}"`);
}

async function main() {
   for (let i = 0; i < allNewPerfumes.length; i += 5) {
      const batch = allNewPerfumes.slice(i, i + 5);

      console.log(
         `\nOpening ${i + 1}-${Math.min(i + 5, allNewPerfumes.length)} of ${allNewPerfumes.length}`
      );

      for (const perfume of batch) {
         const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${perfume.name.toLowerCase()} perfume image`)}`;
         openUrl(url);
         console.log(`${perfume.name.toLowerCase().replaceAll(" ", "_")}.png`)
      }

      // Don't wait after the final batch
      if (i + 5 < allNewPerfumes.length) {
         await waitForInput();
      }
   }

   console.log("\nDone!");
   rl.close();
}


function loadit () {
   for (const perfume of allNewPerfumes) {
      console.log(`${perfume.name.toLowerCase().replaceAll(" ", "_")}.png`)
   }
}

main();