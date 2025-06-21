import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import WelcomeScreen from './navigations/Welcome.screen';
import CreateAccount from './navigations/CreateAccount.screen';
import BeginScreen from './navigations/Begin.screen';
import QuestionnaireScreen from './navigations/Questionnaire.screen';
import LoginScreen from './navigations/Login.screen';
import ConfirmationScreen from './navigations/Confirmation.screen';
import DashboardScreen from './navigations/Dashboard.screen';
import ForgotPasswordScreen from './navigations/ForgotPassword.screen';
import EndScreen from './navigations/End.screen';
import OTPVerification from './navigations/OTPVerification.screen';
import CompleteAccountScreen from './navigations/CompleteAccount.screen';
import InstructionsScreen from './navigations/Instructions.screen';
import ResetPasswordScreen from './navigations/ResetPassword.screen';
import SubQuestionnaireScreen from './navigations/SubQuestionnaire.screen';
import SubEndScreen from './navigations/Sub.End.screen';
import StudyMaterialsScreen from './navigations/StudyMaterials.screen';
import CategorySelectionScreen from './navigations/CategorySelection.screen';
import ScoreScreen from './navigations/Score.screen';
import ProfileScreen from './navigations/Profile.screen';
import AboutScreen from './navigations/About.screen';
import RankScreen from './navigations/Rank.screen';
import TermsScreen from './navigations/Terms.screen';
import PrivacyScreen from './navigations/Privacy.screen';
import LanguageScreen from './navigations/Language.screen';
import ToastProvider from './components/ToastProvider';

import './animations.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('username');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [redirectRoute, setRedirectRoute] = useState('/landing');

  useEffect(() => {
    const changeRoute = () => {
      if (localStorage.getItem('username')) {
        if (localStorage.getItem('passed') === "Passed") {
          setRedirectRoute('/dashboard');
        } else {
          setRedirectRoute('/quest-begin');
        }
      }
    };
    changeRoute();
  }, []);

  return (
    <Router>
      <ToastProvider>
        <div className="App">
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/validation" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/terms" element={<TermsScreen />} />
          <Route path="/privacy" element={<PrivacyScreen />} />

          {/* Protected Routes */}
          <Route path="/complete-account" element={<ProtectedRoute><CompleteAccountScreen /></ProtectedRoute>} />
          <Route path="/instructions" element={<ProtectedRoute><InstructionsScreen /></ProtectedRoute>} />
          <Route path="/confirmation" element={<ProtectedRoute><ConfirmationScreen /></ProtectedRoute>} />
          <Route path="/quest-begin" element={<ProtectedRoute><BeginScreen /></ProtectedRoute>} />
          <Route path="/category-selection" element={<ProtectedRoute><CategorySelectionScreen /></ProtectedRoute>} />
          <Route path="/questionnaire" element={<ProtectedRoute><QuestionnaireScreen /></ProtectedRoute>} />
          <Route path="/end-screen" element={<ProtectedRoute><EndScreen /></ProtectedRoute>} />
          <Route path="/study" element={<StudyMaterialsScreen />} />
          <Route path="/sub-quest" element={<ProtectedRoute><SubQuestionnaireScreen /></ProtectedRoute>} />
          <Route path="/sub-end-screen" element={<ProtectedRoute><SubEndScreen /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutScreen /></ProtectedRoute>} />
          <Route path="/language-settings" element={<ProtectedRoute><LanguageScreen /></ProtectedRoute>} />
          <Route path="/rank" element={<ProtectedRoute><RankScreen /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardScreen /></ProtectedRoute>} />
          <Route path="/score" element={<ProtectedRoute><ScoreScreen /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />

          {/* Redirect unknown routes or add a 404 */}
          <Route path="*" element={<Navigate to={localStorage.getItem('username') ? "/dashboard" : "/"} />} />
        </Routes>
        </div>
      </ToastProvider>
    </Router>
  );
}

export default App;
