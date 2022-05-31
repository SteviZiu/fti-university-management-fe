import React from "react";
import CourseSearch from "../components/CourseSearch";
import Dashboard from "../components/Dashboard";
 import Friendship from "../components/Friendship";
 import Notifications from "../components/Notifications";
import Profile from "../components/Profile";

var routes = [
  {
    path: "/courseSearch",
    name: "Courses",
    icon: "nc-icon nc-book-bookmark",
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
   {
     path: "/notifications",
    name: "Notifications",
     icon: "nc-icon nc-bell-55",
     component: <Notifications />,
     layout: "/",
   },
      {
     path: "/friendship",
    name: "Friends",
     icon: "nc-icon nc-satisfied",
     component: <Friendship />,
     layout: "/admin",
   },
   {
     path: "/user-page",
     name: "User Profile",
     icon: "nc-icon nc-single-02",
     component: <Profile />,
     layout: "/",
   },


];
export default routes;
