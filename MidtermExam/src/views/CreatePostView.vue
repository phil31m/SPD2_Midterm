<template>
  <div class="create-post container py-4">
    <h1 class="mb-4">Create New Post</h1>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="postSaved" class="alert alert-success">
      Post saved successfully! <router-link to="/">View all posts</router-link>
    </div>

    <form @submit.prevent="handleSubmit" v-if="!postSaved">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="title"
          required
        >
      </div>
      <div class="mb-3">
        <label for="body" class="form-label">Content</label>
        <textarea
          class="form-control"
          id="body"
          rows="6"
          v-model="body"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="tags" class="form-label">Tags (comma separated)</label>
        <input
          type="text"
          class="form-control"
          id="tags"
          v-model="tagInput"
          placeholder="e.g. vue, javascript, frontend"
          required
        >
      </div>
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-save me-2"></i>Save Post
        </button>
        <router-link to="/" class="btn btn-outline-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { savePost } from '@/composables/getPosts'

export default {
  name: 'CreatePostView',
  setup() {
    const router = useRouter()
    const title = ref('')
    const body = ref('')
    const tagInput = ref('')
    const error = ref(null)
    const postSaved = ref(false)

    const handleSubmit = async () => {
      const tags = tagInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      const post = {
        title: title.value,
        body: body.value,
        tags,
        createdAt: new Date().toISOString()
      }

      const success = await savePost(post)
      if (success) {
        postSaved.value = true
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        error.value = 'Failed to save the post. Please try again.'
      }
    }

    return {
      title,
      body,
      tagInput,
      error,
      postSaved,
      handleSubmit
    }
  }
}
</script> 