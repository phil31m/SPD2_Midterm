<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-journal-text me-2"></i>Blog App
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-house-door me-1"></i>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add-post">
              <i class="bi bi-plus-circle me-1"></i>New Post
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  margin-bottom: 2rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.9) !important;
}
</style> 