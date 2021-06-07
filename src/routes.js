
import Dashboard from "views/Dashboard.js";
import Student from "views/Student/StudentList.js";
import Course from "views/Course/CourseList.js";
import Enroll from "views/Enroll/Enroll.jsx";
const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",  
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/student",
    name: "Student",
    icon: "nc-icon nc-badge",
    component: Student,
    layout: "/admin",
    display: true
  },
  {
    path: "/course",
    name: "Course",
    icon: "nc-icon nc-notes",
    component: Course,
    layout: "/admin",
    display: true
  },
  {
    path: "/students/enrol/:id",
    // name: "Enroll",
    // icon: "nc-icon nc-notes",
    component: Enroll,
    layout: "/admin",
    display: false
  },
 
];

export default dashboardRoutes;
