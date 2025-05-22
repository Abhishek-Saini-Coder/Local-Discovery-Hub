
import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'; // Removed useNavigate, useLocation from here as AuthRedirect is gone
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AddListingPage } from './pages/AddListingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage'; 
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { BusinessDetailPage } from './pages/BusinessDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { BusinessDashboardPage } from './pages/BusinessDashboardPage';
import { Business, BusinessCategory, User, UserRole, Review, CatalogueItem, CommunityPost } from './types';
import { INITIAL_BUSINESSES, INITIAL_COMMUNITY_POSTS, MOCK_USERS } from './constants';
import { PrivateRoute } from './components/PrivateRoute';

const App: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | 'All'>('All');
  
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  
  const determineRedirectPath = (user: User | null): string => {
    if (!user) return '/login'; // Should ideally not be called if user is null, but defensive.
    if (user.role === null) return '/select-role';
    if (user.role === UserRole.BUSINESS_OWNER) return '/dashboard';
    return '/';
  };

  const handleSignUp = useCallback((name: string, email: string, password_param: string): { success: boolean; message?: string } => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already exists. Please try logging in or use a different email.' };
    }
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: password_param, 
      role: null, 
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  }, [users]);

  const handleLogin = useCallback((email: string, password_param: string): boolean => {
    const foundUser = users.find(user => user.email === email && user.password === password_param);
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  }, [users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const handleSetRole = useCallback((role: UserRole) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, role: role };
      setCurrentUser(updatedUser);
      setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    }
  }, [currentUser]);

  const addBusiness = useCallback((business: Business) => {
    const newBusinessWithOwner = { ...business, ownerId: currentUser?.id };
    setBusinesses(prevBusinesses => [newBusinessWithOwner, ...prevBusinesses]);
  }, [currentUser]);

  const addReview = useCallback((businessId: string, review: Review) => {
    setBusinesses(prevBusinesses => 
      prevBusinesses.map(b => 
        b.id === businessId 
        ? { ...b, reviews: [review, ...b.reviews], averageRating: calculateAverageRating([review, ...b.reviews]) } 
        : b
      )
    );
  }, []);

  const calculateAverageRating = (reviews: Review[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / reviews.length).toFixed(1));
  };
  
  const addCatalogueItem = useCallback((businessId: string, item: CatalogueItem) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(b =>
        b.id === businessId
        ? { ...b, catalogueItems: [item, ...b.catalogueItems] }
        : b
      )
    );
  }, []);

  const updateCatalogueItem = useCallback((businessId: string, updatedItem: CatalogueItem) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(b =>
        b.id === businessId
        ? { ...b, catalogueItems: b.catalogueItems.map(item => item.id === updatedItem.id ? updatedItem : item) }
        : b
      )
    );
  }, []);

  const deleteCatalogueItem = useCallback((businessId: string, itemId: string) => {
    setBusinesses(prevBusinesses =>
      prevBusinesses.map(b =>
        b.id === businessId
        ? { ...b, catalogueItems: b.catalogueItems.filter(item => item.id !== itemId) }
        : b
      )
    );
  }, []);


  const addCommunityPost = useCallback((post: CommunityPost) => {
    setCommunityPosts(prevPosts => [post, ...prevPosts]);
  }, []);

  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    const matchesSearchTerm = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              business.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });
  
  const trendingBusinesses = [...businesses].sort((a,b) => (b.averageRating || 0) - (a.averageRating || 0)).slice(0,3);


  useEffect(() => {
    // API Key check - assuming process.env is handled by the execution environment or build tool
    if (typeof process !== 'undefined' && process.env) {
      if (!process.env.API_KEY) {
        // console.warn("API_KEY environment variable is not set. Gemini features may not work.");
      }
    } else {
      // console.warn("'process.env' is not available in this environment. API_KEY check skipped for App.tsx.");
    }
  }, []);

  return (
    <HashRouter>
      {/* Use new semantic color for body background - applied in index.html */}
      <div className="min-h-screen flex flex-col font-sans"> {/* text-text-body and bg-page-bg are on body in index.html */}
        <Header currentUser={currentUser} onLogout={handleLogout} />
        {/* AuthRedirect component removed */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20"> {/* pt-20 for sticky header */}
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  businesses={filteredBusinesses}
                  trendingBusinesses={trendingBusinesses}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              } 
            />
            {/* Updated login/signup routes to use determineRedirectPath correctly */}
            <Route 
              path="/login" 
              element={currentUser ? <Navigate to={determineRedirectPath(currentUser)} replace /> : <LoginPage onLogin={handleLogin} />} 
            />
            <Route 
              path="/signup" 
              element={currentUser ? <Navigate to={determineRedirectPath(currentUser)} replace /> : <SignUpPage onSignUp={handleSignUp} />} 
            />
            <Route 
              path="/select-role" 
              element={
                currentUser ? 
                  (currentUser.role === null ? <RoleSelectionPage onSetRole={handleSetRole} /> : <Navigate to={determineRedirectPath(currentUser)} replace />) 
                : <Navigate to="/login" replace />
              }
            />
            
            <Route path="/business/:id" element={<BusinessDetailPage businesses={businesses} currentUser={currentUser} addReview={addReview} />} />

            <Route path="/add-listing" element={
              <PrivateRoute currentUser={currentUser} requiredRole={UserRole.BUSINESS_OWNER}>
                <AddListingPage addBusiness={addBusiness} />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute currentUser={currentUser} requiredRole={UserRole.BUSINESS_OWNER}>
                <BusinessDashboardPage 
                  businesses={businesses.filter(b => b.ownerId === currentUser?.id)} 
                  currentUser={currentUser!} 
                  onAddCatalogueItem={addCatalogueItem}
                  onUpdateCatalogueItem={updateCatalogueItem}
                  onDeleteCatalogueItem={deleteCatalogueItem}
                />
              </PrivateRoute>
            } />
             <Route path="/community" element={
              <PrivateRoute currentUser={currentUser}>
                <CommunityPage 
                  posts={communityPosts} 
                  currentUser={currentUser!} 
                  addPost={addCommunityPost} 
                />
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
