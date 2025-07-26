export const SelectedTravelList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'Discover new places on your own terms.',
    icon: '🧳', // suitcase
    people: '1 people',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Perfect destination for couples.',
    icon: '💑', // couple with heart
    people: '2 people',
  },
  {
    id: 3,
    title: 'Family Vacation',
    desc: 'Relaxing and fun trip for the whole family.',
    icon: '🏡', // house or 👨‍👩‍👧‍👦 family emoji
    people: '3 to 5 people',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers.',
    icon: '🎉', // party emoji or 🧑‍🤝‍🧑 people holding hands
    people: '5 people',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of your budget.',
    icon: '💸', // flying money
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs on the average side.',
    icon: '💵', // dollar banknotes
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about the cost.',
    icon: '💎', // diamond
  },
];

export const AI_PROMPT =
  'Generate Travel Plan for Location : {location}, for {days} days for {people} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {days} days with each day plan with best time to visit (in JSON format)';
