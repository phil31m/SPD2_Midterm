import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import TagView from '@/views/TagView.vue'
import CreatePostView from '@/views/CreatePostView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true
  },
  {
    path: '/tags/:tag',
    name: 'Tag',
    component: TagView,
    props: true
  },
  {
    path: '/posts/new',
    name: 'CreatePost',
    component: CreatePostView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 