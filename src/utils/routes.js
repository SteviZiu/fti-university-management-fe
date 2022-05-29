import React from "react";
import CourseSearch from "../components/CourseSearch";
import Dashboard from "../components/Dashboard";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
 import Notifications from "../components/Notifications";
import Profile from "../components/Profile";
// import UserPage from "views/User.js";
// import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/courseSearch",
    name: "Courses",
    icon: "nc-icon nc-bank",
    component: <CourseSearch />,
    layout: "/",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/",
  },
//   {
//     path: "/icons",
//     name: "Icons",
//     icon: "nc-icon nc-diamond",
//     component: Icons,
//     layout: "/admin",
//   },
  //  {
  //    path: "/maps",
  //    name: "Maps",
  //    icon: "nc-icon nc-pin-3",
  //    component: Maps,
  //    layout: "/admin",
  //  },
   {
     path: "/notifications",
    name: "Notifications",
     icon: "nc-icon nc-bell-55",
     component: <Notifications />,
     layout: "/",
   },
   {
     path: "/user-page",
     name: "User Profile",
     icon: "nc-icon nc-single-02",
     component: <Profile />,
     layout: "/",
   },
//   {
//     path: "/tables",
//     name: "Table List",
//     icon: "nc-icon nc-tile-56",
//     component: TableList,
//     layout: "/admin",
//   },
//   {
//     path: "/typography",
//     name: "Typography",
//     icon: "nc-icon nc-caps-small",
//     component: Typography,
//     layout: "/admin",
//   },
//   {
//     pro: true,
//     path: "/upgrade",
//     name: "Upgrade to PRO",
//     icon: "nc-icon nc-spaceship",
//     component: UpgradeToPro,
//     layout: "/admin",
//   },
];
export default routes;
