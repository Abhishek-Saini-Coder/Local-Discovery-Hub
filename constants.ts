import { BusinessCategory, Business, User, UserRole, CommunityPost } from './types';

export const APP_NAME = "Local Discovery"; // Shortened for potentially smaller header space

export const CATEGORIES_AVAILABLE: BusinessCategory[] = [
  BusinessCategory.FOOD_AND_DINING,
  BusinessCategory.ACCOMMODATION,
  BusinessCategory.SHOPPING_AND_RETAIL,
  BusinessCategory.PROFESSIONAL_SERVICES,
  BusinessCategory.HEALTH_AND_WELLNESS,
  BusinessCategory.REAL_ESTATE,
  BusinessCategory.ARTS_AND_ENTERTAINMENT,
  BusinessCategory.EDUCATION_AND_TUTORING,
  BusinessCategory.COMMUNITY_AND_LOCAL_GROUPS,
  BusinessCategory.OTHER,
];

export const MOCK_USERS: User[] = [
  { id: 'user1', email: 'owner@example.com', name: 'Alice Owner', role: UserRole.BUSINESS_OWNER, password: 'password' },
  { id: 'user2', email: 'customer@example.com', name: 'Bob Customer', role: UserRole.GENERAL_USER, password: 'password' },
  { id: 'user3', email: 'new@example.com', name: 'Charlie New', role: null, password: 'password'}, // User without pre-selected role
];


export const INITIAL_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Campus Cafe Deluxe',
    category: BusinessCategory.FOOD_AND_DINING,
    description: 'Upgraded cozy cafe near the university, perfect for study sessions and quick bites. Offering fresh coffee, gourmet pastries, and sandwiches.',
    contactEmail: 'campus.cafe@example.com',
    contactPhone: '555-1234',
    location: '123 University Ave',
    imageUrl: `https://picsum.photos/seed/a1/600/300`,
    ownerId: 'user1',
    catalogueItems: [
      { id: 'cat1-1', name: 'Espresso', description: 'Rich and strong', price: '$3.00', imageUrl: `https://picsum.photos/seed/coffee/200` },
      { id: 'cat1-2', name: 'Croissant', description: 'Flaky and buttery', price: '$2.50', imageUrl: `https://picsum.photos/seed/croissant/200` },
    ],
    reviews: [
      { id: 'rev1-1', businessId: '1', userId: 'user2', userName: 'Bob Customer', userRole: UserRole.GENERAL_USER, rating: 5, comment: 'Great coffee and atmosphere!', date: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 'rev1-2', businessId: '1', userId: 'user3', userName: 'Charlie New', userRole: UserRole.GENERAL_USER, rating: 4, comment: 'Loved the pastries.', date: new Date(Date.now() - 86400000).toISOString()},
    ],
    averageRating: 4.5,
  },
  {
    id: '2',
    name: 'City Central Suites',
    category: BusinessCategory.ACCOMMODATION,
    description: 'Modern hotel in the heart of the city. Comfortable suites and excellent service for business and leisure travelers.',
    contactEmail: 'reservations@citycentral.com',
    location: '456 Main St',
    imageUrl: `https://picsum.photos/seed/b2/600/300`,
    ownerId: 'user1',
    catalogueItems: [
       { id: 'cat2-1', name: 'Standard Suite', description: 'Comfortable and well-equipped', price: '$150/night' },
       { id: 'cat2-2', name: 'Deluxe Suite', description: 'Spacious with city view', price: '$250/night' },
    ],
    reviews: [
      { id: 'rev2-1', businessId: '2', userId: 'user2', userName: 'Bob Customer', userRole: UserRole.GENERAL_USER, rating: 4, comment: 'Very comfortable stay.', date: new Date().toISOString() }
    ],
    averageRating: 4,
  },
  {
    id: '3',
    name: 'QuickWash & Fold',
    category: BusinessCategory.PROFESSIONAL_SERVICES,
    description: 'Fast, reliable laundry and dry cleaning. Self-service and drop-off options available. Open 7 days a week.',
    location: '789 Oak Rd',
    contactPhone: '555-5678',
    imageUrl: `https://picsum.photos/seed/c3/600/300`,
    catalogueItems: [],
    reviews: [],
    averageRating: 0, // No reviews yet
  },
  {
    id: '4',
    name: 'Student Hub Apartments',
    category: BusinessCategory.ACCOMMODATION,
    description: 'Affordable and secure housing options for students. Close to campus facilities and public transport. Includes shared kitchen and study areas.',
    contactEmail: 'student.digs@example.com',
    location: '101 College Drive',
    imageUrl: `https://picsum.photos/seed/d4/600/300`,
    catalogueItems: [
        { id: 'cat4-1', name: 'Single Room', description: 'Private room with shared facilities.', price: '$600/month' },
        { id: 'cat4-2', name: 'Shared Twin Room', description: 'Shared room for two.', price: '$400/month per person' },
    ],
    reviews: [
        { id: 'rev4-1', businessId: '4', userId: 'user3', userName: 'Charlie New', userRole: UserRole.GENERAL_USER, rating: 5, comment: 'Perfect for students!', date: new Date().toISOString() }
    ],
    averageRating: 5,
  },
  {
    id: '5',
    name: 'The Discount Den',
    category: BusinessCategory.SHOPPING_AND_RETAIL,
    description: 'Discover amazing local deals and discounts on various products and services. Exclusively for our community members. New deals weekly!',
    location: 'Online / 202 Market St',
    imageUrl: `https://picsum.photos/seed/e5/600/300`,
    catalogueItems: [],
    reviews: [],
    averageRating: 0,
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  { id: 'post1', userId: 'user1', userName: 'Alice Owner', userRole: UserRole.BUSINESS_OWNER, content: "Campus Cafe Deluxe is launching a new student discount next week! Come check us out.", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'post2', userId: 'user2', userName: 'Bob Customer', userRole: UserRole.GENERAL_USER, content: "Anyone know a good place for late-night study snacks near the university?", timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: 'post3', userId: 'user3', userName: 'Charlie New', userRole: UserRole.GENERAL_USER, content: "Just moved to the city! Looking for recommendations for weekend activities.", timestamp: new Date().toISOString() },
];

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';