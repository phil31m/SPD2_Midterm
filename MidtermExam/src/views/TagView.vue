<template>
  <div class="tag-view container py-4">
    <h1 class="mb-4">
      <i class="bi bi-tag me-2"></i>Posts tagged with "{{ tag }}"
    </h1>
    
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else-if="posts.length === 0" class="alert alert-info">
      <i class="bi bi-info-circle me-2"></i>No posts found with this tag.
    </div>
    
    <div v-else class="row">
      <div class="col-md-9">
        <PostList :posts="posts" />
      </div>
      <div class="col-md-3">
        <TagCloud :tags="uniqueTags" />
      </div>
    </div>
    
    <div class="mt-4">
      <router-link to="/" class="btn btn-outline-primary">
        <i class="bi bi-arrow-left me-2"></i>Back to All Posts
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPostsByTag } from '@/composables/getPosts'
import PostList from '@/components/PostList.vue'
import TagCloud from '@/components/TagCloud.vue'

export default {
  name: 'TagView',
  components: {
    PostList,
    TagCloud
  },
  setup() {
    const route = useRoute()
    const tag = computed(() => route.params.tag)
    const { posts, error } = getPostsByTag(tag)

    const uniqueTags = computed(() => {
      const tags = posts.value?.flatMap(post => post.tags) || []
      return [...new Set(tags)].sort()
    })

    return {
      tag,
      posts,
      error,
      uniqueTags
    }
  }
}
</script> 