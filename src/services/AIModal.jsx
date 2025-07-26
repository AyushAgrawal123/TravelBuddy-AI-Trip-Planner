// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
} from '@google/genai';

async function main(AI_PROMPT) {
    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
    const tools = [
        {
            googleSearch: {
            }
        },
    ];
    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        tools,
        responseMimeType: 'text/plain',
        systemInstruction: [
            {
                text: AI_PROMPT,
            }
        ],
    };
    const model = 'gemini-2.5-pro';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: AI_PROMPT,
                },
            ],
        },
        {
            role: 'model',
            parts: [
                {
                    text: `**Initiating Travel Planning**

I'm currently searching for affordable hotel options in Las Vegas for a 3-day couple's trip. I'm gathering details such as the hotel name, address, price, image URL, geo-coordinates, rating, and description. Simultaneously, I'm working on a budget-friendly 3-day itinerary, focusing on activities and attractions suitable for a couple.


**Expanding Itinerary Details**

I've moved on to the itinerary phase, focusing on free and low-cost attractions suitable for couples in Las Vegas.  I'm gathering crucial information for each potential activity: place names, brief descriptions, image URLs, geo-coordinates, ticket prices, and user ratings.  Simultaneously, I'm working on pinpointing the ideal times to visit these locations and estimating travel times between them to create a solid 3-day plan.


**Exploring Vegas Options**

I've begun to zero in on potential Vegas stays. The Flamingo, LINQ, and Excalibur are looking promising, and I've compiled basic details about each, including addresses, descriptions, and amenities. I'm focusing on finding the best value for my needs, considering the typical offerings.


**Compiling Hotel Details**

I'm now diving deeper into the Las Vegas hotel options. I've begun compiling the specific pricing for a 3-day stay at the Flamingo, LINQ, and Excalibur. Additionally, I'm gathering image URLs, precise geo-coordinates, and user ratings for each hotel to enhance the data. I've also started to structure a 3-day itinerary focusing on the Bellagio Fountains, LINQ Promenade, and Fremont Street Experience.


**Collecting Hotel Data**

I've successfully compiled a substantial database of hotel options. I have names, addresses, descriptions, and initial pricing. Moreover, I've started collecting details on budget-friendly attractions for the proposed itinerary.


**Expanding Data Collection**

I've made considerable progress. I now have gathered all the necessary data for a comprehensive JSON response. I have found precise geo-coordinates for the hotels and attractions. I have also located image URLs. The itinerary is now structured as a day-by-day plan with travel times and suggested visit times. I have consolidated the hotel pricing, as well.


**Analyzing Potential Locations**

I've compiled extensive hotel data, encompassing names, addresses, detailed descriptions, and some pricing information, along with precise geo-coordinates. I've also put together a comprehensive list of free and low-cost attractions, complete with descriptions and geolocation data. This information forms the foundation for my analysis.


**Organizing Data and Planning**

I am now focusing on structuring the collected data into a cohesive, day-by-day 3-day itinerary in JSON format. I am working to synthesize pricing for hotels to accurately reflect a budget-friendly range and search for representative image URLs where missing. I have included operating hours to optimize the itinerary's logical flow, ensuring estimated travel times and visit durations are incorporated.


**Refining and Structuring Data**

I'm now focusing on synthesizing the pricing data to establish a realistic budget-friendly hotel range and acquiring representative image URLs. I am structuring the information into a detailed, day-by-day JSON-formatted itinerary for the 3-day plan, incorporating travel times, visit durations, and operating hours for a logical flow. I am actively refining the data to ensure the final itinerary is accurate and helpful.


`,
                },
                {
                    text: `\`\`\`json
{
  "travelPlan": {
    "location": "Las Vegas",
    "duration": "3 Days",
    "travelerType": "Couple",
    "budget": "Cheap",
    "hotelOptions": [
      {
        "hotelName": "Flamingo Las Vegas",
        "hotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$50 - $150 per night",
        "hotelImageUrl": "https://www.caesars.com/content/dam/flv/hotel/rooms/non-strip-view/flv-king-ns-g-d1-flv-0352-crp-16x9.jpg.transform/card-img/image.jpg",
        "geoCoordinates": {
          "latitude": 36.1161,
          "longitude": -115.1706
        },
        "rating": 3.5,
        "description": "A classic Las Vegas hotel with a vibrant, tropical theme. It features a 15-acre Caribbean-style water playground, a wildlife habitat with flamingos, and a central location on the Strip."
      },
      {
        "hotelName": "The LINQ Hotel + Experience",
        "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$60 - $180 per night",
        "hotelImageUrl": "https://www.caesars.com/content/dam/linq/hotel/general/the-linq-hotel-experience-exterior-night-1-16x9.jpg.transform/card-img/image.jpg",
        "geoCoordinates": {
          "latitude": 36.1176,
          "longitude": -115.1684
        },
        "rating": 4,
        "description": "A modern and energetic hotel at the heart of the Strip, offering direct access to the LINQ Promenade, the High Roller Observation Wheel, and a variety of dining and entertainment options."
      },
      {
        "hotelName": "Excalibur Hotel & Casino",
        "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
        "price": "$40 - $120 per night",
        "hotelImageUrl": "https://www.mgmresorts.com/content/dam/MGM/excalibur/hotel/excalibur-hotel-resort-tower-king-room-d/excalibur-hotel-resort-tower-king-room-d-hero-16x9.jpg.transform/card-img/image.jpg",
        "geoCoordinates": {
          "latitude": 36.0989,
          "longitude": -115.1756
        },
        "rating": 3.5,
        "description": "A castle-themed resort offering a fun and unique experience with a large casino, multiple pools, and family-friendly entertainment, including the Tournament of Kings dinner show."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "theme": "Iconic Strip Exploration",
        "bestTimeToVisit": "Late Afternoon to Evening",
        "plan": [
          {
            "placeName": "Welcome to Fabulous Las Vegas Sign",
            "placeDetails": "The iconic neon sign that has welcomed visitors since 1959. A must-do photo opportunity to kick off your Vegas trip. There can be a line for photos, so visiting in the morning is often less crowded.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Welcome_to_Fabulous_Las_Vegas_sign.jpg/1200px-Welcome_to_Fabulous_Las_Vegas_sign.jpg",
            "geoCoordinates": {
              "latitude": 36.0821,
              "longitude": -115.1728
            },
            "ticketPricing": "Free",
            "rating": 4.5,
            "timeToTravel": "Varies (Located at the south end of the Strip)",
            "suggestedDuration": "30 minutes"
          },
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "A stunning 14,000-square-foot indoor garden that changes with the seasons and for holidays. It's a beautiful and peaceful escape from the casino floor.",
            "placeImageUrl": "https://news.mgmresorts.com/wp-content/uploads/2023/05/Bellagio_Conservatory_Summer_2023_credit_MGM_Resorts_International_2.jpg",
            "geoCoordinates": {
              "latitude": 36.1126,
              "longitude": -115.1767
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "timeToTravel": "Approx. 15-20 minutes walk from Flamingo Hotel",
            "suggestedDuration": "1 hour"
          },
          {
            "placeName": "Fountains of Bellagio",
            "placeDetails": "A mesmerizing show of water, music, and light. The fountains dance to a variety of songs. Shows run every 30 minutes in the afternoon and every 15 minutes in the evening.",
            "placeImageUrl": "https://www.got-vegas.com/wp-content/uploads/2019/08/fountains-of-bellagio-show.jpg",
            "geoCoordinates": {
              "latitude": 36.1127,
              "longitude": -115.1743
            },
            "ticketPricing": "Free",
            "rating": 4.8,
            "timeToTravel": "Located in front of the Bellagio",
            "suggestedDuration": "15-30 minutes (watch a show or two)"
          }
        ]
      },
      {
        "day": 2,
        "theme": "Downtown & Unique Vegas",
        "bestTimeToVisit": "Evening",
        "plan": [
          {
            "placeName": "Fremont Street Experience",
            "placeDetails": "A vibrant pedestrian mall in downtown Las Vegas known for its dazzling Viva Vision light shows on an overhead canopy, live music on multiple stages, and a variety of street performers. A completely different vibe from the Strip.",
            "placeImageUrl": "https://i.insider.com/5c9d2f2b3243a41d7d5e4a5d?width=1136&format=jpeg",
            "geoCoordinates": {
              "latitude": 36.1707,
              "longitude": -115.144
            },
            "ticketPricing": "Free (attractions within may have costs)",
            "rating": 4.6,
            "timeToTravel": "Approx. 15-20 minute drive or bus ride from the Strip",
            "suggestedDuration": "3-4 hours"
          },
          {
            "placeName": "High Roller Observation Wheel",
            "placeDetails": "The world's tallest observation wheel, offering stunning 360-degree views of the Las Vegas Strip and beyond. The ride takes about 30 minutes. It's a great way to see the city lights at night.",
            "placeImageUrl": "https://www.caesars.com/content/dam/linq/things-to-do/high-roller/high-roller-day-1-16x9.jpg.transform/card-img/image.jpg",
            "geoCoordinates": {
              "latitude": 36.1176,
              "longitude": -115.1684
            },
            "ticketPricing": "Approx. $25-40 (prices vary by time of day)",
            "rating": 4.7,
            "timeToTravel": "Located at The LINQ Promenade, easily accessible from the Strip",
            "suggestedDuration": "1 hour (including wait time)"
          }
        ]
      },
      {
        "day": 3,
        "theme": "Art & Natural Wonders",
        "bestTimeToVisit": "Morning to Early Afternoon",
        "plan": [
          {
            "placeName": "Seven Magic Mountains",
            "placeDetails": "A colorful large-scale desert art installation featuring seven towers of brightly painted, stacked boulders. It's a unique and popular spot for photos, located about 10 miles south of Las Vegas.",
            "placeImageUrl": "https://www.travelandleisure.com/thmb/9-7a718b95f16f1e8f2a4f4d2f8b8c2c/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/seven-magic-mountains-LASVEGAS0123-1e5f8653e0244365aa705b0d0a424296.jpg",
            "geoCoordinates": {
              "latitude": 35.8386,
              "longitude": -115.2709
            },
            "ticketPricing": "Free",
            "rating": 4.4,
            "timeToTravel": "Approx. 20-30 minute drive from the Strip",
            "suggestedDuration": "1 - 1.5 hours (including travel time)"
          },
          {
            "placeName": "Flamingo Wildlife Habitat",
            "placeDetails": "A serene and free attraction located at the Flamingo Hotel. It's home to a flock of Chilean flamingos, as well as other birds, fish, and turtles. A nice, relaxing break from the city's hustle.",
            "placeImageUrl": "https://www.vegas.com/attractions/on-the-strip/flamingo-wildlife-habitat/",
            "geoCoordinates": {
              "latitude": 36.1165,
              "longitude": -115.1701
            },
            "ticketPricing": "Free",
            "rating": 4.5,
            "timeToTravel": "Located at the Flamingo Hotel",
            "suggestedDuration": "30-45 minutes"
          }
        ]
      }
    ]
  }
}
\`\`\``,
                },
            ],
        },
        {
            role: 'user',
            parts: [
                {
                    text: `INSERT_INPUT_HERE`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let fileIndex = 0;
    let fullResponse = '';
    for await (const chunk of response) {
        fullResponse += chunk.text;
    }

    return fullResponse;
}

export default main;

// services/AIModal.ts
// import { GoogleGenAI } from '@google/genai';

// async function main(userPrompt) {
//     const ai = new GoogleGenAI({
//         apiKey: import.meta.env.GEMINI_API_KEY,
//     });

//     const tools = [{ googleSearch: {} }];

//     const config = {
//         thinkingConfig: { thinkingBudget: -1 },
//         tools,
//         responseMimeType: 'text/plain',
//         systemInstruction: [
//             {
//                 text: userPrompt,
//             },
//         ],
//     };

//     const model = 'gemini-2.5-pro';

//     const contents = [
//         {
//             role: 'user',
//             parts: [
//                 {
//                     text: userPrompt,
//                 },
//             ],
//         },
//     ];

//     const response = await ai.models.generateContentStream({
//         model,
//         config,
//         contents,
//     });

//     let fullResponse = '';
//     for await (const chunk of response) {
//         fullResponse += chunk.text;
//     }

//     return fullResponse;
// }

// export default main;

