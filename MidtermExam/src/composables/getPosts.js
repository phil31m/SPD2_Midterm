import { ref, watch } from 'vue'

const API_URL = 'http://localhost:3000'

// Get all posts
export function getPosts() {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const res = await fetch('http://localhost:3000/posts')
      if (!res.ok) throw new Error('Could not fetch the posts')
      posts.value = await res.json()
    } catch (err) {
      error.value = err.message
      console.error('Error:', err)
    }
  }

  load()

  return { posts, error }
}

// Get a single post by id
export function getPost(id) {
  const post = ref(null)
  const error = ref(null)

  const load = async () => {
    try {
      const res = await fetch(`http://localhost:3000/posts/${id}`)
      if (!res.ok) throw new Error('Could not fetch the post')
      post.value = await res.json()
    } catch (err) {
      error.value = err.message
      console.error('Error:', err)
    }
  }

  load()

  return { post, error }
}

// Get posts by tag
export function getPostsByTag(tag) {
  const posts = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      // Get all posts and filter by tag
      const res = await fetch('http://localhost:3000/posts')
      if (!res.ok) throw new Error('Could not fetch the posts')
      const allPosts = await res.json()
      posts.value = allPosts.filter(post => post.tags.includes(tag.value))
    } catch (err) {
      error.value = err.message
      console.error('Error:', err)
    }
  }

  // Watch for changes in the tag value
  watch(tag, () => {
    load()
  }, { immediate: true })

  return { posts, error }
}

export async function savePost(post) {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    if (!response.ok) throw new Error('Failed to save post')
    return true
  } catch (err) {
    console.error('Error saving post:', err)
    return false
  }
}

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete post')
    return true
  } catch (err) {
    console.error('Error deleting post:', err)
    return false
  }
} 