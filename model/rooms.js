const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const room = [
  {
    title: "Three Bed House w/ Cozy Furniture",
    description: `1000 Square Feet Three Bedroom house with large windows and skylights above the boutique.
    Second bedroom at the opposite end of the unit for extra privacy. There is two separate entrances from street and back yard and one free parking spot in the back(extra parking $10 per night). Small balcony on the back. Kitchen is fully equipped , 3 piece bathroom with all essentials you might need.
    65 inch SMART TV, Free WIFI, Netflix , Air Conditioning,
    TTC Bus Stop Out front of building (Stop # 6899)
    The space
    Bedroom 1: queen size bed(100% cotton sheets )night lamp, wardrobe,hangers, TV, AC, two lounge chairs, coffee table
    Bedroom 2: queen size bed, night table, lamp, walk-in-clothed, hangers
    
    Kitchen: cook top, full size fridge, dishwasher, microwave, toaster, kettle, Keurig Coffee maker, pots, plates, coffee and tea
    3 piece Bathroom, washer, hair drier, iron, medical box, body wash, shampoo, conditioner
    Guest access
    Entire apartment on second floor of two story building
    Other things to note
    TTC Bus Stop 6899 directly out front. Access to Lakeshore GO Line (To Union Station) and easy access to TTC Subway Line.
    
    http://ttc.ca/ (left side of screen search Stop # 6899 for bus times)
    Licence number
    STR-2101-GCKXVF`,
    city: "Toronto",
    province: "Ontario",
    country: "Canada",
    price: "$129.99",
    file: "img/room1.jpeg",
  },
  {
    title: "Two Bed Apartment w/ lots of Sunlight",
    description: `Perfect for anyone who is to study at McGill or anyone who is in town for a visit.
    Location is right in downtown Montreal.
    
    The apt is located near all necessities, such as the McGill metro station, groceries, bus stations (all less 3 mins walk). If you are in town for a short visit or longer stay and looking for a very quiet place to stay, this would be a great fit.
    
    High speed wifi, towels, shampoo, soap are all included. If you need any recommendation from a local, do not hesitate to ask :)
    `,
    city: "Montreal",
    province: "Quebec",
    country: "Canada",
    price: "$69.99",
    file: "img/room2.jpeg",
  },
  {
    title: "Stunning 7 Bed Luxury Home",
    description: `We would love to welcome you to our home in West Vancouver. Our new and beautiful home is located in Ambleside, one of the most desirable and convenient locations in West Vancouver-only a short walk to beach, shops, library and recreation centre, and a bus in front house so easy access to downtown Vancouver (20 minutes), Park Royal, Stanley Park, Capilano suspension bridge, Lonsdale Quay, Museum ,Grouse Mountain, whistler, and many other amenities in beautiful North and West Vancouver.
    Guest access
    Bedroom #1: Private entrance, shared full bathroom
    Bedrooms #2-7: Private bedrooms with lock, shared entrance with tenants, shared full bathroom.
    Other things to note
    Additional available services at an extra charge :
    Pick up service: CAD120.00 one-way
    Washer and dryer is once a week per machine load 10$CAD`,
    city: "Vancouver",
    province: "British Columbia",
    country: "Canada",
    price: "$299.99",
    file: "img/room3.jpeg",
  },
  {
    title: "Cozy Attic for Bachelor",
    description: `This is a great cozy apartment suitable for a single person, a couple, or a small group. The place has everything that you might need, a kitchen, furnished bedroom, bathroom, and even exercise equipment. Not to mention, the apartment is located in the centre of Ottawa close to downtown and all the attractions.
    The space
    The place features 1 bedroom with a full bed and a desk with a comfortable office chair. There is also exercise equipment which includes a bench, plates, dumbbell, and yoga mat, which are all available to use. The kitchen is fully equipped with all the necessary cutlery and dishes, as well as a fridge/freezer, microwave, kettle, and stove/range. The dining area has a table with some stools and a smart TV that you can stream any content on from your devices or using the built in apps. The bathroom has the necessities such as clean towels and personal care products (shampoo, conditioner, body wash). The apartment also includes high speed internet and AC which cools down the whole place. There is free parking on the premises in case you need it and the building has laundry machines to use.
     
    The apartment is located in the heart of Ottawa, very close to all the popular destinations. It is about a 10 minute drive and 20 minute bus ride to downtown. There are grocery stores and restaurants within a 5 minute walking distance and multiple bus stops near the apartment.
    Other things to note
    REGULAR CHECK-IN: 5:30 PM. We offer free early check-in and late check-out upon request (schedule permitting).`,
    city: "Ottawa",
    province: "Ontario",
    country: "Canada",
    price: "$49.99",
    file: "img/room4.jpeg",
  },
  {
    title: "2 Bedroom Condo w. Outdoor Patio",
    description: `This is a shared accommodation which includes a one private bedroom in an condominium in the best central location in Toronto. Ideal for one person or a couple who enjoy smart ambient light and beautiful view. Located in the heart of midtown Toronto at Yonge and Eglinton location. Steps away from Eglinton TTC subway station and walking distance to the shopping centre few minute transport to Dundas Square, U of T, gay village, Yorkville, Yonge & Bloor, College Street.
    The space
    ***as growing concern for CORONAVIRUS in Ontario, to ensure peace of mind and everything perfect as usual for our guests, we have made the following protective countermeasures and hereby notify you: our cleaner team is equipped with disinfectant supplies including dettol dew, disinfect laundry detergent, disinfectant spray, disinfectant wipes; unit is disinfected and all sheets are changed after each reservation; screening our guests well-being for the last 14 days. Should you have any questions or concern, please do not hesitate to ask us***
    
    Unique Private Romantic with Amazing abient. Very clean and spacious room. upscale decor, separate entrance and very private. Quiet neighbourhood but 5minutes walking distance to Yonge street, Eglinton station.
    *Beautiful decor from every angles.
    *55 inch smart tv for all streaming purpose.
    *Smart lighting to enhance the mood.
    Other things to note
    •If you want to book certain dates or discuss about terms and conditions, I may accommodate you upon request.
    •Guests may do self check in/out or late/early for check in/out, please notify me if you wish to do so.
    Licence number
    STR-2106-FLVPHC`,
    city: "Toronto",
    province: "Ontario",
    country: "Canada",
    price: "$139.99",
    file: "img/room5.jpeg",
  },
  {
    title: "Outdoor Space Rental for Large Party",
    description: `A very cozy private space that's on a quiet tree lined street. The suite consists of a comfy sitting area with TV, bedroom with a queen size bed, private washroom, work desk, mini fridge, microwave, washer & dryer. You enter the lower unit from a private side entrance. You're a 15 minute walk to the beach and Queen St or a short streetcar ride to downtown. My space is good for couples, solo adventurers.
    The space
    Our guest suite is a completely private studio basement apartment in a family home. You access the lower level by a side entrance via a keypad lock. The entire finished basement is yours to use. That includes a sitting area with TV, bedroom with queen bed, private washroom with stand up shower, washer and dryer
    Guest access
    The laundry room is located in the basement, so you have full access to that during your stay.
    
    There is a mini fridge and microwave for you to use during your stay
    Other things to note
    Some ceilings are a little lower in places for ductwork, so someone over 6ft might need to keep that in mind.
    
    free street parking overnight can be found on Gerrard st a 1 minute walk away. Follow parking signs closely.
    
    parking in front of my house overnight requires
    a parking permit that can be obtained through the City of Toronto Municipal Website. Go to the site and search under "temporary street parking permit." You will need our address, a valid credit card and your car's license plate number. A 24-hour permit costs $9.93, a 48-hour permit costs $14.90 and a week-long permit is $23.28. Must be printed out ahead of time. Note: All amounts include applicable tax
    Licence number
    STR-2010-HZVDPM`,
    city: "Toronto",
    province: "Ontario",
    country: "Canada",
    price: "$399.99",
    file: "img/room6.jpeg",
  },
];

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "User",
  },
  file: {
    type: String,
    required: false,
  },
});

const roomModel = mongoose.model("Rooms", roomSchema);
module.exports = roomModel;
