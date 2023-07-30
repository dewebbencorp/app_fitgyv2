import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

export const Home = () => {
  return (
    <>
      <IonTabs>
        <IonRouterOutlet></IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/inicio">
            <IonIcon icon="#" />
            <IonLabel>Listen now</IonLabel>
          </IonTabButton>

          <IonTabButton tab="radio" href="/perfil">
            <IonIcon icon="#" />
            <IonLabel>Radio</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};
