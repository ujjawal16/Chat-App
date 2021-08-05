import React,{lazy, Suspense} from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss'
import {Switch} from 'react-router'
// import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/home/index';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { ErrorBoundary } from './components/ErrorBoundary';

const SignIn = lazy(() => import('./pages/SignIn'));

function App() {
  return(
  <ErrorBoundary>
  <ProfileProvider>
      <Switch>
        <PublicRoute path ='/signin'>
        <Suspense fallback={<div>Loading...</div>}>
          <SignIn  path='/signin'/>
          </Suspense>
        </PublicRoute>
        <PrivateRoute path ='/' >
          <Home />
        </PrivateRoute>
      </Switch>
  </ProfileProvider>
  </ErrorBoundary>
  )
}

export default App;
