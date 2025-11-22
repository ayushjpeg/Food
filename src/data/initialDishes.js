export const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

const placeholderImage = (query) =>
  `https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60&sat=-25&blend-mode=multiply&blend=333333&mark-align=center&mark=https://dummyimage.com/600x400/000/fff.png&mark-w=0&mark-pad=0#${query}`

const baseDishes = [
  {
    id: 'dish-chole',
    name: 'Chole',
    meal: 'Lunch',
    recipe:
      'Pressure cook soaked chickpeas with tea bag and salt. Temper with onion-tomato masala, finish with garam masala and kasuri methi.',
    notes: 'Pairs well with bhature or jeera rice.',
    image: placeholderImage('chole'),
    ingredients: [
      { id: 'ing-chole-1', name: 'Soaked chickpeas', amount: '2 cups' },
      { id: 'ing-chole-2', name: 'Onion-tomato masala', amount: '1 1/2 cups' },
      { id: 'ing-chole-3', name: 'Chole masala', amount: '2 tbsp' },
    ],
    lastMade: '2025-10-18',
  },
  {
    id: 'dish-aloo-paratha',
    name: 'Aloo Paratha',
    meal: 'Breakfast',
    recipe: 'Stuff whole wheat dough with spiced potato mash, roll and roast on tawa with ghee.',
    notes: 'Serve with dahi and pickled onions.',
    image: placeholderImage('paratha'),
    ingredients: [
      { id: 'ing-aloo-1', name: 'Whole wheat dough', amount: '4 balls' },
      { id: 'ing-aloo-2', name: 'Potato filling', amount: '2 cups' },
      { id: 'ing-aloo-3', name: 'Ghee', amount: '2 tbsp' },
    ],
    lastMade: '2025-11-05',
  },
  {
    id: 'dish-palak-paneer',
    name: 'Palak Paneer',
    meal: 'Lunch',
    recipe: 'Blanch spinach, blend smooth, simmer with onion masala and add paneer cubes.',
    notes: 'Finish with lemon juice to keep color vibrant.',
    image: placeholderImage('palak'),
    ingredients: [
      { id: 'ing-palak-1', name: 'Spinach', amount: '400 g' },
      { id: 'ing-palak-2', name: 'Paneer', amount: '250 g' },
      { id: 'ing-palak-3', name: 'Fresh cream', amount: '2 tbsp' },
    ],
    lastMade: '2025-10-30',
  },
  {
    id: 'dish-butter-chicken',
    name: 'Butter Chicken',
    meal: 'Dinner',
    recipe: 'Roast marinated chicken, simmer in buttery tomato-cashew gravy, finish with kasuri methi.',
    notes: 'Keep gravy silky by blending twice.',
    image: placeholderImage('butter-chicken'),
    ingredients: [
      { id: 'ing-bc-1', name: 'Chicken tikka', amount: '500 g' },
      { id: 'ing-bc-2', name: 'Tomato puree', amount: '2 cups' },
      { id: 'ing-bc-3', name: 'Butter & cream', amount: '1/2 cup' },
    ],
    lastMade: '2025-09-24',
  },
  {
    id: 'dish-chilli-chicken',
    name: 'Chilli Chicken',
    meal: 'Dinner',
    recipe: 'Crisp fry battered chicken, toss with garlic-chilli sauce, peppers, and spring onions.',
    notes: 'Double fry for best crunch.',
    image: placeholderImage('chilli-chicken'),
    ingredients: [
      { id: 'ing-cc-1', name: 'Chicken thigh', amount: '400 g' },
      { id: 'ing-cc-2', name: 'Capsicum', amount: '1 cup' },
      { id: 'ing-cc-3', name: 'Chilli sauce mix', amount: '1/2 cup' },
    ],
    lastMade: '2025-08-12',
  },
  {
    id: 'dish-butter-paneer',
    name: 'Butter Paneer',
    meal: 'Dinner',
    recipe: 'Same gravy base as butter chicken but finished with charred paneer cubes.',
    notes: 'Use smoked paprika for color.',
    image: placeholderImage('butter-paneer'),
    ingredients: [
      { id: 'ing-bp-1', name: 'Paneer', amount: '300 g' },
      { id: 'ing-bp-2', name: 'Tomato-cashew gravy', amount: '2 cups' },
    ],
    lastMade: '2025-09-12',
  },
  {
    id: 'dish-chilli-paneer',
    name: 'Chilli Paneer',
    meal: 'Snacks',
    recipe: 'Crispy paneer tossed in Indo-Chinese chilli sauce with peppers.',
    notes: 'Good as filling for wraps.',
    image: placeholderImage('chilli-paneer'),
    ingredients: [
      { id: 'ing-cp-1', name: 'Paneer cubes', amount: '300 g' },
      { id: 'ing-cp-2', name: 'Bell peppers', amount: '1 cup' },
      { id: 'ing-cp-3', name: 'Soy-chilli sauce', amount: '1/3 cup' },
    ],
    lastMade: '2025-10-04',
  },
  {
    id: 'dish-shrimp',
    name: 'Shrimp Masala',
    meal: 'Dinner',
    recipe: 'Quick sauté shrimp with garlic butter then simmer in coconut-tomato masala.',
    notes: 'Cook shrimp only 3 minutes to avoid rubbery texture.',
    image: placeholderImage('shrimp'),
    ingredients: [
      { id: 'ing-shrimp-1', name: 'Shrimp', amount: '300 g' },
      { id: 'ing-shrimp-2', name: 'Coconut milk', amount: '1 cup' },
    ],
    lastMade: '2025-11-10',
  },
  {
    id: 'dish-aloo-dum',
    name: 'Aloo Dum',
    meal: 'Lunch',
    recipe: 'Fry baby potatoes then simmer in yoghurt-based gravy with mustard oil tempering.',
    notes: 'Finish with hing tempering.',
    image: placeholderImage('aloo-dum'),
    ingredients: [
      { id: 'ing-ad-1', name: 'Baby potatoes', amount: '500 g' },
      { id: 'ing-ad-2', name: 'Yoghurt gravy', amount: '1 1/2 cups' },
    ],
    lastMade: '2025-10-14',
  },
  {
    id: 'dish-sattu-paratha',
    name: 'Sattu Paratha',
    meal: 'Breakfast',
    recipe: 'Stuff dough with roasted chickpea flour filling seasoned with pickle masala.',
    notes: 'Keep filling moist with mustard oil splash.',
    image: placeholderImage('sattu-paratha'),
    ingredients: [
      { id: 'ing-sp-1', name: 'Whole wheat dough', amount: '3 balls' },
      { id: 'ing-sp-2', name: 'Sattu filling', amount: '1 1/2 cups' },
    ],
    lastMade: '2025-10-01',
  },
  {
    id: 'dish-kurkuri-bhindi',
    name: 'Kurkuri Bhindi',
    meal: 'Snacks',
    recipe: 'Coat bhindi in gram flour spice mix and fry crisp.',
    notes: 'Great crunchy topping for dal chawal.',
    image: placeholderImage('bhindi'),
    ingredients: [
      { id: 'ing-kb-1', name: 'Okra', amount: '400 g' },
      { id: 'ing-kb-2', name: 'Besan coating', amount: '1 cup' },
    ],
    lastMade: '2025-09-20',
  },
  {
    id: 'dish-dahi-aloo',
    name: 'Dahi Aloo',
    meal: 'Lunch',
    recipe: 'Simmer parboiled potatoes in yoghurt gravy, temper with cumin and curry leaves.',
    notes: 'Keep yoghurt whisked to avoid splitting.',
    image: placeholderImage('dahi-aloo'),
    ingredients: [
      { id: 'ing-da-1', name: 'Potatoes', amount: '4 medium' },
      { id: 'ing-da-2', name: 'Whisked yoghurt', amount: '1 cup' },
    ],
    lastMade: '2025-09-18',
  },
  {
    id: 'dish-utapam',
    name: 'Utapam',
    meal: 'Breakfast',
    recipe: 'Pour thick batter, top with onions, tomatoes, chillies, and cook on both sides.',
    notes: 'Use cast iron dosa tawa.',
    image: placeholderImage('utapam'),
    ingredients: [
      { id: 'ing-uta-1', name: 'Idli-dosa batter', amount: '3 cups' },
      { id: 'ing-uta-2', name: 'Toppings', amount: '1 1/2 cups' },
    ],
    lastMade: '2025-11-01',
  },
  {
    id: 'dish-pulao',
    name: 'Veg Pulao',
    meal: 'Lunch',
    recipe: 'Toast whole spices, add veggies and basmati rice, cook with stock.',
    notes: 'Add saffron water for aroma.',
    image: placeholderImage('pulao'),
    ingredients: [
      { id: 'ing-pul-1', name: 'Basmati rice', amount: '2 cups' },
      { id: 'ing-pul-2', name: 'Mixed vegetables', amount: '2 cups' },
    ],
    lastMade: '2025-08-30',
  },
  {
    id: 'dish-fried-rice',
    name: 'Fried Rice',
    meal: 'Dinner',
    recipe: 'Use day-old rice, high heat wok toss with sauces and eggs/veg.',
    notes: 'Finish with sesame oil.',
    image: placeholderImage('fried-rice'),
    ingredients: [
      { id: 'ing-fr-1', name: 'Cooked rice', amount: '3 cups' },
      { id: 'ing-fr-2', name: 'Stir fry mix', amount: '2 cups' },
    ],
    lastMade: '2025-07-22',
  },
  {
    id: 'dish-dal-makhani',
    name: 'Dal Makhani',
    meal: 'Dinner',
    recipe: 'Slow cook black urad and rajma for 6+ hours, finish with cream, butter, and smoke.',
    notes: 'Always soak overnight.',
    image: placeholderImage('dal-makhani'),
    ingredients: [
      { id: 'ing-dm-1', name: 'Whole urad dal', amount: '1 cup' },
      { id: 'ing-dm-2', name: 'Kidney beans', amount: '1/4 cup' },
    ],
    lastMade: '2025-09-02',
  },
  {
    id: 'dish-pasta',
    name: 'Creamy Pasta',
    meal: 'Dinner',
    recipe: 'Boil pasta al dente, toss with garlic cream sauce, parmesan, and herbs.',
    notes: 'Reserve pasta water.',
    image: placeholderImage('pasta'),
    ingredients: [
      { id: 'ing-pas-1', name: 'Pasta', amount: '250 g' },
      { id: 'ing-pas-2', name: 'Cream sauce', amount: '2 cups' },
    ],
    lastMade: '2025-11-02',
  },
  {
    id: 'dish-gobi-manchurian',
    name: 'Gobi Manchurian',
    meal: 'Snacks',
    recipe: 'Double fry cauliflower florets, toss in spicy Manchurian sauce.',
    notes: 'Air fryer version also works.',
    image: placeholderImage('gobi'),
    ingredients: [
      { id: 'ing-gm-1', name: 'Cauliflower florets', amount: '1 head' },
      { id: 'ing-gm-2', name: 'Manchurian sauce', amount: '1 cup' },
    ],
    lastMade: '2025-10-08',
  },
]

const ensurePhotoGallery = (dish) => {
  const existingPhotos = Array.isArray(dish.photos) ? dish.photos : []
  if (existingPhotos.length > 0) {
    return dish
  }
  if (!dish.image) {
    return { ...dish, photos: [] }
  }
  return {
    ...dish,
    photos: [
      {
        id: `photo-${dish.id}`,
        url: dish.image,
        recordedAt: dish.lastMade ?? null,
      },
    ],
  }
}

export const defaultDishes = baseDishes.map(ensurePhotoGallery)
