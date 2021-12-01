import {
  IonButton,
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
  IonToolbar,
} from "@ionic/react";

import TGWLogo from "../../components/TGWLogo.png";

import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router';
import {
  businessOutline,
  businessSharp,
  calendarOutline,
  calendarSharp,
  gridOutline,
  gridSharp,
  home,
  homeOutline,
  peopleCircle,
  peopleCircleOutline,
  peopleOutline,
  peopleSharp,
  personCircle,
  personCircleOutline,
  starOutline,
  starSharp,
} from "ionicons/icons";
import "./Menu.css";
import { Storage } from "@capacitor/storage";

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
    title: "Client Management",
    url: "/clients",
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircle,
  },
  {
    title: "Profile",
    url: "/profile",
    iosIcon: personCircleOutline,
    mdIcon: personCircle,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const removeId = async() => {
    await Storage.remove({ key: 'adminId' });
  };

  const signOut = () => {
    removeId();
  };
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
                  href={appPage.url}
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
              <IonButton fill="solid" shape="round" color="primary" href="/signIn" onClick={() => signOut()}>Sign Out</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
