import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Book from './pages/Book';
import Workouts from './pages/Workouts';
import Devotionals from './pages/Devotionals';
import Community from './pages/Community';
import BookSuccess from './pages/BookSuccess';
import Merch from './pages/Merch';
import MerchSuccess from './pages/MerchSuccess';
import Layout from './Layout';
import Members from './pages/Members';
import Chat from './pages/Chat';
import MembersSignInPrompt from '@/components/members/MembersSignInPrompt';
import ChatSignInPrompt from '@/components/chat/ChatSignInPrompt';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/Home" element={<Layout><Home /></Layout>} />
      <Route path="/Book" element={<Layout><Book /></Layout>} />
      <Route path="/Workouts" element={<Layout><Workouts /></Layout>} />
      <Route path="/Devotionals" element={<Layout><Devotionals /></Layout>} />
      <Route path="/Community" element={<Layout><Community /></Layout>} />
      <Route path="/BookSuccess" element={<Layout><BookSuccess /></Layout>} />
      <Route path="/Merch" element={<Layout><Merch /></Layout>} />
      <Route path="/MerchSuccess" element={<Layout><MerchSuccess /></Layout>} />
      <Route element={<Layout><ProtectedRoute unauthenticatedElement={<MembersSignInPrompt />} /></Layout>}>
        <Route path="/Members" element={<Members />} />
      </Route>
      <Route element={<Layout><ProtectedRoute unauthenticatedElement={<ChatSignInPrompt />} /></Layout>}>
        <Route path="/Chat" element={<Chat />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Add your page Route elements here */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App