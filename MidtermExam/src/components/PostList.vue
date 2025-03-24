<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="alert alert-info">
      No posts available.
    </div>
    <SinglePost
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="mb-4"
    />
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue'

export default {
  name: 'PostList',
  components: {
    SinglePost
  },
  props: {
    posts: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script> 