import axios from "axios";
import { trackPromise } from 'react-promise-tracker';


export const EnumUniActions = Object.freeze({
   SET_COURSE_LIST: 'SET_COURSE_LIST',
   SET_NOTIFICATION_LIST: 'SET_NOTIFICATION_LIST',
   COURSE_COMMENTS: 'COURSE_COMMENTS',
   UPDATE_COURSE_COMMENTS: 'UPDATE_COURSE_COMMENTS',
   UPDATE_POST: 'UPDATE_POST',
   SET_POSTS_LIST: 'SET_POSTS_LIST',
   UPDATE_POSTS: 'UPDATE_POSTS',
   LIST_FRIENDS: 'LIST_FRIENDS',
   FRIEND_REQ: 'FRIEND_REQ',
   SET_USER_COURSE: 'SET_USER_COURSE'
});


class UniManActions {

   getListAvCourses() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         const data = await trackPromise(axios.get(baseUrl + "/course", { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.SET_COURSE_LIST,
            dati: data.data
         });
      }
   }

   getNotifications() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         const data = await trackPromise(axios.get(baseUrl + "/notification/all", { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.SET_NOTIFICATION_LIST,
            dati: data.data
         });
      }
   }

   getUserCourses(id) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let obj = {pageNumber:0};
         const data = await trackPromise(axios.get(baseUrl + "/course-user/user/"+ id, { headers: { "Authorization": `Bearer ${token}` }, data: obj }, dispatch));
         dispatch({
            type: EnumUniActions.SET_USER_COURSE,
            dati: data.data
         });
      }
   }

   getCourseComments(id) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         const data = await trackPromise(axios.get(baseUrl + "/comment/course/courseid/"+id, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.COURSE_COMMENTS,
            dati: data.data
         });
      }
   }

   dropCourse(courseId){
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         let obj = { courseDto: { id: courseId }, userDto: { id: id } }
         const data = await trackPromise(axios.post(baseUrl + "/course-user", obj, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         
         let userCourses = getState().auth.userCourses.filter((el) => el.id !== data.data.id)
         dispatch({
            type: EnumUniActions.SET_USER_COURSE,
            dati: userCourses
         });
      }
   }

   joinCourse(courseId) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         let obj = { courseDto: { id: courseId }, userDto: { id: id } }
         const data = await trackPromise(axios.post(baseUrl + "/course-user", obj, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         let userCourses = getState().auth.userCourses ? getState().auth.userCourses: [];
         userCourses.push(data.data.courseDto)
         dispatch({
            type: EnumUniActions.SET_USER_COURSE,
            dati: userCourses
         });
      }
   }

   findById(id, comments, idx) {
      const item = comments[idx];

      if (!item) return null;
      if (item.id === id) return item;

      const newComments = item.replies ? [...comments, ...item.replies] : comments;

      return this.findById(id, newComments, idx + 1);
   }


   createComment(text, parentId) {
      var that = this;
      const baseUrl = "https://uniman.herokuapp.com/api/v1";

      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         let com = { comment: text, userDto: { id: id }, commentType: 0, replyingTo: { id: parentId } } //comment type for course?

         const data = await trackPromise(axios.post(baseUrl + "/comment/course", com, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));

         let comments = getState().uniManagment.courseComments;
         let userDto = getState().auth.user.userDto;
         let item = that.findById(parentId, comments, 0);
         if (item) {
            item.replies = item.replies ? item.replies : [];
            item.replies.push(data.data);
            dispatch({
               type: EnumUniActions.UPDATE_COURSE_COMMENTS,
               dati: item,
            });
            Promise.resolve()
         } else {
            comments.push(data.data);
            dispatch({
               type: EnumUniActions.COURSE_COMMENTS,
               dati: comments
            });
            Promise.resolve()
         }
      }
   }

   setPost(obj) {
      console.log("[" + this.moduleName + "] setPost");
      return function (dispatch) {
         dispatch({
            type: EnumUniActions.UPDATE_POST,
            dati: obj
         });
         return Promise.resolve();
      }
   }


   createPost(post) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         let obj = { comment: post.content, userDto: { id: id }, commentType: 1 }
         const data = await trackPromise(axios.post(baseUrl + "/comment/course", obj, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         let lista = getState().uniManagment.posts;
         lista.push(data.data)
         dispatch({
            type: EnumUniActions.SET_POSTS_LIST,
            dati: lista
         });
      }
   }

   fetchPosts() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         const data = await trackPromise(axios.get(baseUrl + "/comment/course/timeline/"+id, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.SET_POSTS_LIST,
            dati: data.data
         });

      }
   }

   addLove(obj) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         const data = await trackPromise(axios.post(baseUrl + "/like", obj, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         //obj.likes.push(like);
         dispatch({
            type: EnumUniActions.UPDATE_POSTS,
            dati: data.data
         });
      }
   }

   getLikes(obj) {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = obj.id;
         const data = await trackPromise(axios.get(baseUrl + "/like/comment/" + id, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         obj.likes = data.data;
         dispatch({
            type: EnumUniActions.UPDATE_POSTS,
            dati: obj
         });
      }
   }

   getFriends() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         const data = await trackPromise(axios.get(baseUrl + "/friendship/user/"+id, {pageNumber:0,pageSize:12}, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.LIST_FRIENDS,
            dati: data.data
         });
      }
   }

   getFriendReq() {
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         let id = getState().auth.user.userDto.id;
         const data = await trackPromise(axios.get(baseUrl + "/friendship/user/"+id+"/requests", { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         dispatch({
            type: EnumUniActions.FRIEND_REQ,
            dati: data.data
         });
      }
   }

   respondFriend(obj){
      const baseUrl = "https://uniman.herokuapp.com/api/v1";
      return async function (dispatch, getState) {
         let token = getState().auth.user.bearer;
         const data = await trackPromise(axios.put(baseUrl + "/friendship", obj, { headers: { "Authorization": `Bearer ${token}` } }, dispatch));
         let friends = getState().auth.friends ? getState().auth.friends : [];
         friends.push(data.data);
         dispatch({
            type: EnumUniActions.LIST_FRIENDS,
            dati: friends
         });
      }
   }


}
export default UniManActions = new UniManActions();