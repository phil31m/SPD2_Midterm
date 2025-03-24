<template>
  <div v-if="post" class="card shadow-sm hover-shadow">
    <div class="card-body">
      <h2 class="card-title h4">{{ post.title }}</h2>
      <div class="tags mb-3">
        <router-link 
          v-for="tag in post.tags" 
          :key="tag"
          :to="{ path: `/tags/${tag}` }"
          class="badge bg-secondary me-2 text-decoration-none"
        >
          <i class="bi bi-tag me-1"></i>{{ tag }}
        </router-link>
      </div>
      <p class="card-text text-muted">{{ snippet }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <router-link 
          :to="{ path: `/posts/${post.id}` }" 
          class="btn btn-primary"
        >
          Read More
        </router-link>
        <small class="text-muted">
          <i class="bi bi-calendar me-1"></i>
          {{ new Date(post.createdAt).toLocaleDateString() }}
        </small>
      </div>
    </div>
  </div>
  <div v-else class="alert alert-info">
    Loading post...
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    snippet() {
      return this.post.body.substring(0, 200) + '...'
    }
  }
}
</script>

<style scoped>
.hover-shadow {
  transition: box-shadow 0.3s ease;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4rem 0.6rem;
}

.card-title {
  margin-bottom: 1rem;
}
</style> 