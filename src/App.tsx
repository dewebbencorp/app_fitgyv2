import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';

import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */


/* Theme variables */
import './theme/main.css';
import { AuthProvider } from './UserProvider';

setupIonicReact();

const App: React.FC = () => (

  <IonApp>
  <AuthProvider>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login/>
        </Route>
          <Route exact path="/Home">
            <Home/>
          </Route>

         
    


          <Route exact path="/">
          <Redirect to="/login" />
          </Route>
      </IonRouterOutlet>
    </IonReactRouter>

  </AuthProvider>
  </IonApp>

);

export default App;
