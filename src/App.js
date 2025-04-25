import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import WelcomeScreen from './navigations/Welcome.screen';
import CreateAccount from './navigations/CreateAccount.screen';
import BeginScreen from './navigations/Begin.screen';
import QuestionnaireScreen from './navigations/Questionaire.screen';
import LoginScreen from './navigations/Login.screen';
import ConfirmationScreen from './navigations/Confirmation.screen';
import DashboardScreen from './navigations/Dashboard.screen';
import ForgotPasswordScreen from './navigations/ForgotPassword.screen';
import EndScreen from './navigations/End.screen';
import OTPVerification from './navigations/OTPVerification.screen';
import CompleteAccountScreen from './navigations/CompleteAccount.screen';
import InstructionsScreen from './navigations/Instructions.screen';
import ResetPasswordScreen from './navigations/ResetPassword.screen';
import SubQuestionnaireScreen from './navigations/SubQuestionaire.screen';
import SubEndScreen from './navigations/Sub.End.screen';
import StudyMaterialsScreen from './navigations/StudyMaterials.screen';
import CategorySelectionScreen from './navigations/CategorySelection.screen';

import './animations.css';

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
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={redirectRoute} replace />} />
          <Route path="/landing" element={<WelcomeScreen />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/complete-account" element={<CompleteAccountScreen />} />
          <Route path="/instructions" element={<InstructionsScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="/validation" element={<OTPVerification />} />
          <Route path="/confirmation" element={<ConfirmationScreen />} />
          <Route path="/quest-begin" element={<BeginScreen />} /> 
          <Route path="/category-selection" element={<CategorySelectionScreen />} />
          <Route path="/end-screen" element={<EndScreen />} /> 
          <Route path="/sub-end-screen" element={<SubEndScreen />} /> 
          <Route path="/questionnaire" element={<QuestionnaireScreen />} />
          <Route path="/sub-quest" element={<SubQuestionnaireScreen />} />
          <Route path="/study" element={<StudyMaterialsScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
