import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import TGWLogo from "../../components/TGWLogo.png";

import { useLocation } from "react-router-dom";
import {
  businessOutline,
  businessSharp,
  calendarOutline,
  calendarSharp,
  gridOutline,
  gridSharp,
  home,
  homeOutline,
  peopleOutline,
  peopleSharp,
  personOutline,
  personSharp,
  starOutline,
  starSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}
interface Admin {
  name: string;
  surname: string;
}

const admin: Admin = {
  name: "name",
  surname: "surname",
};

const appPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: homeOutline,
    mdIcon: home,
  },
  {
    title: "Calendar",
    url: "/calendar",
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
  },
  {
    title: "Agent Management",
    url: "/page/Agent/agent",
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
  },
  {
    title: "Complex Management",
    url: "/page/Complex/complex",
    iosIcon: businessOutline,
    mdIcon: businessSharp,
  },
  {
    title: "Package Management",
    url: "/page/Package/package",
    iosIcon: gridOutline,
    mdIcon: gridSharp,
  },
  {
    title: "Promotion Management",
    url: "/page/Promotion/promotion",
    iosIcon: starOutline,
    mdIcon: starSharp,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonImg src={TGWLogo}/>
          <IonListHeader>The Green Wash Admin</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonFooter>
          <IonToolbar>
              <IonButton href="/signIn" fill="solid" shape="round" color="primary">Sign Out</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
