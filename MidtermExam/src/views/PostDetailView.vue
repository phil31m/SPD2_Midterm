<template>
  <div class="post-detail container py-4">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div v-else-if="post" class="card shadow">
      <div class="card-body">
        <h1 class="card-title mb-4">{{ post.title }}</h1>
        <div class="tags mb-4">
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="{ path: `/tags/${tag}` }"
            class="badge bg-secondary me-2 text-decoration-none"
          >
            <i class="bi bi-tag me-1"></i>{{ tag }}
          </router-link>
        </div>
        <p class="card-text lead">{{ post.body }}</p>
        <div class="mt-4 text-muted">
          <i class="bi bi-calendar me-2"></i>
          Posted on {{ new Date(post.createdAt).toLocaleDateString() }}
        </div>
      </div>
    </div>
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="mt-4">
      <router-link to="/" class="btn btn-outline-primary">
        <i class="bi bi-arrow-left me-2"></i>Back to Posts
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'PostDetailView',
  setup() {
    const route = useRoute()
    const post = ref(null)
    const error = ref(null)

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${route.params.id}`)
        if (!res.ok) throw new Error('Post not found')
        post.value = await res.json()
      } catch (err) {
        error.value = err.message
        console.error('Error:', err)
      }
    }

    onMounted(() => {
      fetchPost()
    })

    return { post, error }
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
}

.lead {
  font-size: 1.1rem;
  line-height: 1.8;
}
</style> 