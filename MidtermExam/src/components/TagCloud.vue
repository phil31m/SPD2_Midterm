<template>
  <div class="tag-cloud card">
    <div class="card-header bg-primary text-white">
      <i class="bi bi-tags me-2"></i>Tags
    </div>
    <div class="card-body">
      <div v-if="tags.length === 0" class="text-muted">
        No tags available
      </div>
      <div class="tags d-flex flex-wrap gap-2">
        <router-link
          v-for="tag in tags"
          :key="tag"
          :to="{ path: `/tags/${tag}` }"
          class="badge bg-secondary text-decoration-none"
        >
          <i class="bi bi-tag me-1"></i>{{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagCloud',
  props: {
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s ease-in-out;
}

.badge:hover {
  transform: translateY(-2px);
  background-color: #4a4a4a !important;
}

.gap-2 {
  gap: 0.5rem !important;
}
</style> 