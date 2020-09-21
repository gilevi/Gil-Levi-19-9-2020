
import MessageIcon from '@material-ui/icons/Message';
import PostAddIcon from '@material-ui/icons/PostAdd';
import RecieveMessages from "components/RecieveMessages/RecieveMessages.js";
import SentMessages from "components/SentMessages/SentMessages.js";
import UserProfile from "views/UserProfile/UserProfile.js";

const dashboardRoutes = [
  {
    path: "/recieve-messages",
    name: "Recieve Messages",
    icon: MessageIcon,
    component: RecieveMessages,
    layout: "/admin"
  },
  {
    path: "/sent-messages",
    name: "Sent Messages",
    icon: MessageIcon,
    component: SentMessages,
    layout: "/admin"
  },
  {
    path: "/add-message",
    name: "Add new message",
    icon: PostAddIcon,
    component: UserProfile,
    layout: "/admin"
  }

];

export default dashboardRoutes;
