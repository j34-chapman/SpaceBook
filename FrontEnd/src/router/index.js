import {createRouter, createWebHistory} from 'vue-router';

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn){
        next()
        return
    }
    next('/login')
}


import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import NotFound from "../PageNotFound.vue";
import Article from "../views/pages/Article.vue";
import Comments from "../views/pages/Comment.vue";   
import Dashboard from "../views/pages/Dashboard.vue";  
import User from "../views/pages/User.vue";  


const routes = [
    {  
     path: "/", 
     component: Home 
    },
    { 
     path: "/login",
     component: Login
    },
    { 
     path: "/:pathMatch(.*)*",
     component: NotFound
    },
    {
     path: "/article/:id",
     component: Article
    },
    {
     path: "/users",
     component : User,
     beforeEnter : ifAuthenticated
    },
    {
    path: "/comments/:article_id/comments",
    component: Comments
    },
    {
    path: "/dashboard",
    component : Dashboard,
    beforeEnter : ifAuthenticated,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})



export default router;