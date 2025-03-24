<template>
  <div class="home">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-8">
          <h2 class="mb-4">Latest Posts</h2>
          <div v-if="error" class="alert alert-danger">
            {{ error }}
          </div>
          <PostList :posts="posts" />
        </div>
        <div class="col-md-4">
          <TagCloud :tags="uniqueTags" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import PostList from '@/components/PostList.vue'
import TagCloud from '@/components/TagCloud.vue'
import { getPosts } from '@/composables/getPosts'

export default {
  name: 'HomeView',
  components: {
    PostList,
    TagCloud
  },
  setup() {
    const { posts, error } = getPosts()

    const uniqueTags = computed(() => {
      const tags = posts.value?.flatMap(post => post.tags) || []
      return [...new Set(tags)]
    })

    return { posts, uniqueTags, error }
  }
}
</script> 