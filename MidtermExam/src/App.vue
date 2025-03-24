<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="bi bi-book me-2"></i>
        Bibliothèque Universitaire - Mohamed DALDOULI 
      </a>
    </div>
  </nav>

  <main class="container">
    <LibraryView />
  </main>
</template>

<script>
import LibraryView from '@/components/Library.vue'

export default {
  name: 'App',
  components: {
    LibraryView
  }
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css');

:root {
  --navy-blue: #001f3f;
  --text-color: #2c3e50;
  --background-color: #f8f9fa;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.navbar {
  background-color: var(--navy-blue);
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.4rem;
  font-weight: 500;
}

main {
  min-height: calc(100vh - 4rem);
  padding: 2rem 0;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--navy-blue);
}

.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.btn-dark {
  background-color: var(--navy-blue);
  border-color: var(--navy-blue);
}

.btn-outline-dark {
  color: var(--navy-blue);
  border-color: var(--navy-blue);
}

.btn-outline-dark:hover {
  background-color: var(--navy-blue);
  border-color: var(--navy-blue);
}
</style>
