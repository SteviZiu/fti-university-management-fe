import axios from "axios";

export const EnumUniActions = Object.freeze({
   SET_COURSE_LIST: 'SET_COURSE_LIST',
   SET_NOTIFICATION_LIST: 'SET_NOTIFICATION_LIST',
   COURSE_COMMENTS: 'COURSE_COMMENTS'
});


class UniManActions  {

   getListAvCourses() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function(dispatch, getState) {
         let token = getState().auth.user.bearer;
         const  data  = await axios.get(baseUrl + "/course", { headers: {"Authorization" : `Bearer ${token}`} }, dispatch);
         dispatch({
            type: EnumUniActions.SET_COURSE_LIST,
            dati: data.data
         });
      }
   } 

   getNotifications() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function(dispatch, getState) {
         let token = getState().auth.user.bearer;
         const  data  = await axios.get(baseUrl + "/notification/all", { headers: {"Authorization" : `Bearer ${token}`} }, dispatch);
         dispatch({
            type: EnumUniActions.SET_NOTIFICATION_LIST,
            dati: data.data
         });
      }
   } 

   getUserCourses(){
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function(dispatch, getState) {
         let token = getState().auth.user.bearer;
         const  data  = await axios.get(baseUrl + "/course-user", { headers: {"Authorization" : `Bearer ${token}`} }, dispatch);
         dispatch({
            type: EnumUniActions.SET_USER_COURSE,
            dati: data.data
         });
      }
   } 

   getCourseComments(id) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function(dispatch,getState) {
         let token = getState().auth.user.bearer;
         const  data  = await axios.get(baseUrl + "/comment/course/courseid/6",  { headers: {"Authorization" : `Bearer ${token}`} }, dispatch);
         dispatch({
            type: EnumUniActions.COURSE_COMMENTS,
            dati: data.data
         });
      }
   }
   
}
export default UniManActions = new UniManActions();