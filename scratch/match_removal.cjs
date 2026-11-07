const fs = require('fs');
const { PRODUCTS } = require('./src/data/catalog.js');
console.log('Total PRODUCTS in catalog:', PRODUCTS.length);

const rawList = `
miniature-ancient-fort.jpg
miniature-beach-umbrellas-set.jpg
miniature-beanie-purple-couple.jpg
miniature-bench-couple.jpg
miniature-beret-purple-couple.jpg
miniature-bird-stand-branch.jpg
miniature-black-coat-couple.jpg
miniature-black-street-lamps-trio.jpg
miniature-blue-rowboats.jpg
miniature-bo-bird-house.jpg
miniature-boat-fishermen-dock.jpg
miniature-bookworm-boy-girl.jpg
miniature-botanical-leaves-set.jpg
miniature-cherry-red-park-bench.jpg
miniature-chinese-wedding-couple.jpg
miniature-chinese-wise-man.jpg
miniature-christmas-santa-couple.jpg
miniature-classic-piano.jpg
miniature-cobblestone-bridge.jpg
miniature-cormorant-chinese-fisherman.jpg
miniature-couple-romance.jpg
miniature-cute-babies-twins.jpg
miniature-cute-bunnies-group.jpg
miniature-cute-dog.jpg
miniature-deer-horse-unicorn-set.jpg
miniature-directional-signposts.jpg
miniature-doctor-nurse-duo.jpg
miniature-doll-planter.jpg
miniature-dungaree-cute-couple.jpg
miniature-duo-forest-owls.jpg
miniature-fairy-pastel-cottage.jpg
miniature-fairy-quartet.jpg
miniature-fairy-stone-window.jpg
miniature-fantasy-blue-fort.jpg
miniature-farm-horse-cart.jpg
miniature-flock-colorful-birds.jpg
miniature-floral-table-chairs.jpg
miniature-flower-brooch.jpg
miniature-football.jpg
miniature-gardener-resin-planter.jpg
miniature-greenery-umbrella-couple.jpg
miniature-grey-safari-elephant.jpg
miniature-grey-zen-buddha.jpg
miniature-holding-purple-couple.jpg
miniature-hoodie-unicorn-couple.jpg
miniature-iron-barrel-tree.jpg
miniature-king-queen-archers.jpg
miniature-kissing-sweet-couple.jpg
miniature-lawn-picnic-couple.jpg
miniature-leafy-bird-nest.jpg
miniature-meditating-blue-buddha.jpg
miniature-mickey-minnie-cute-couple.jpg
miniature-mini-cactus-garden-bowl.jpg
miniature-mini-water-can.jpg
miniature-monk-buddha-trio.jpg
miniature-mother-father-parents.jpg
miniature-ocean-mermaid.jpg
miniature-old-couple-sofa.jpg
miniature-ox-family.jpg
miniature-pastel-display-rack.jpg
miniature-pastel-moon-couple.jpg
miniature-picket-fence-railing.jpg
miniature-post-office.jpg
miniature-preschool-boy-girl.jpg
miniature-pure-white-lotus-buddha.jpg
miniature-raincoat-umbrella-couple.jpg
miniature-red-mushroom.jpg
miniature-red-roof-oriental-temple.jpg
miniature-romantic-gift-couple.jpg
miniature-rustic-boat.jpg
miniature-rustic-wooden-bench.jpg
miniature-seated-moon-couple-pastel.jpg
miniature-spotted-ladybird-pack.jpg
miniature-standing-bunnies-pack.jpg
miniature-stone-arch-bridge.jpg
miniature-stone-pagoda-shrine.jpg
miniature-striped-beach-bench.jpg
miniature-study-table.jpg
miniature-sweet-kitten-cat.jpg
miniature-tea-table-and-bench.jpg
miniature-teachers-pair.jpg
miniature-tiny-white-bunnies.jpg
miniature-traditional-chinese-couple.jpg
miniature-travelling-boys-girl.jpg
miniature-vintage-pink-car.jpg
miniature-vintage-street-lamp.jpg
miniature-white-cat-family-single.jpg
miniature-white-rabbit.jpg
miniature-winter-hat-friends.jpg
miniature-winter-jacket-couple-pair.jpg
miniature-wooden-resin-park-bench.jpg
miniature-wooden-sign-boards.jpg
miniature-yellow-perched-bird.jpg
miniature-yellow-safari-giraffe.jpg
miniature-yellow-school-bus.jpg
miniature-young-couple-scooter.jpg
`;

const items = rawList.split('\n').map(s => s.trim()).filter(Boolean);
console.log('List count:', items.length);

const matchedIds = new Set();
const unmatched = [];

items.forEach(item => {
  const base = item.replace(/\.jpg|\.png/g, '').toLowerCase();
  const found = PRODUCTS.find(p => {
    const pImg = (p.visual_assets?.primary_image || p.image || '').toLowerCase();
    const pId = (p.id || '').toLowerCase();
    return pImg.includes(base) || pId === base || pId.includes(base) || base.includes(pId);
  });
  if (found) {
    matchedIds.add(found.id);
  } else {
    unmatched.push(item);
  }
});

console.log('Matched count:', matchedIds.size);
console.log('Unmatched items:', unmatched);
console.log('Remaining products count will be:', PRODUCTS.length - matchedIds.size);
