<template>
  <div class="book-library">
    <div class="search-bar mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control"
            v-model="searchQuery"
            placeholder="Rechercher par titre ou auteur..."
          >
        </div>
        <div class="col-md-3">
          <select v-model="statusFilter" class="form-select">
            <option value="">Tous les livres</option>
            <option value="disponible">Disponible</option>
            <option value="emprunté">Emprunté</option>
          </select>
        </div>
        <div class="col-md-3">
          <div class="btn-group w-100" role="group">
            <button 
              @click="viewMode = 'grid'"
              :class="['btn', viewMode === 'grid' ? 'btn-dark' : 'btn-outline-dark']"
            >
              <i class="bi bi-grid"></i>
            </button>
            <button 
              @click="viewMode = 'list'"
              :class="['btn', viewMode === 'list' ? 'btn-dark' : 'btn-outline-dark']"
            >
              <i class="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div :class="['books-shelf', viewMode]">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-dark" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>
      
      <div v-else-if="filteredBooks.length === 0" class="alert alert-info">
        Aucun livre ne correspond à votre recherche.
      </div>

      <template v-else>
        <div v-for="book in filteredBooks" :key="book.id" class="book-item" @click="showBookDetails(book)">
          <div class="book-card h-100">
            <div class="book-cover-wrapper">
              <img 
                :src="book.image" 
                class="book-cover" 
                :alt="book.titre"
                @error="handleImageError"
                loading="lazy"
              >
            </div>
            <div class="book-info">
              <h5 class="book-title">{{ book.titre }}</h5>
              <p class="book-metadata">
                <small class="text-muted">
                  <i class="bi bi-person"></i> {{ book.auteur }}<br>
                  <i class="bi bi-calendar"></i> {{ book.annee }}
                </small>
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Modal détails du livre -->
    <div v-if="selectedBook" class="modal fade show" style="display: block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedBook.titre }}</h5>
            <button type="button" class="btn-close" @click="selectedBook = null"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <img :src="selectedBook.image" class="img-fluid rounded" :alt="selectedBook.titre">
              </div>
              <div class="col-md-8">
                <div class="book-details">
                  <div class="detail-item">
                    <h6>Auteur</h6>
                    <p>{{ selectedBook.auteur }}</p>
                  </div>
                  
                  <div class="detail-item">
                    <h6>Année de publication</h6>
                    <p>{{ selectedBook.annee }}</p>
                  </div>
                  
                  <div class="detail-item">
                    <h6>Catégorie</h6>
                    <p>{{ selectedBook.categorie }}</p>
                  </div>
                  
                  <div class="detail-item">
                    <h6>Disponibilité</h6>
                    <p>
                      <span :class="['availability-badge', selectedBook.statut === 'disponible' ? 'available' : 'borrowed']">
                        {{ selectedBook.statut === 'disponible' ? 'Disponible' : 'Emprunté' }}
                      </span>
                    </p>
                  </div>
                  
                  <div class="detail-item">
                    <h6>Résumé</h6>
                    <p class="book-summary">{{ selectedBook.resume }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedBook = null">Fermer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedBook" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'LibraryView',
  setup() {
    const books = ref([])
    const loading = ref(true)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const viewMode = ref('grid')
    const selectedBook = ref(null)

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/livres')
        if (!response.ok) throw new Error('Erreur lors du chargement des livres')
        books.value = await response.json()
      } catch (error) {
        console.error('Erreur:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredBooks = computed(() => {
      return books.value.filter(book => {
        const matchesSearch = searchQuery.value === '' || 
          book.titre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          book.auteur.toLowerCase().includes(searchQuery.value.toLowerCase())
        
        const matchesStatus = statusFilter.value === '' || book.statut.toLowerCase() === statusFilter.value.toLowerCase()
        
        return matchesSearch && matchesStatus
      })
    })

    const showBookDetails = (book) => {
      selectedBook.value = book
    }

    const handleImageError = (e) => {
      // Image par défaut en cas d'erreur
      e.target.src = 'https://via.placeholder.com/300x400/f8f9fa/2c3e50?text=Livre'
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      loading,
      searchQuery,
      statusFilter,
      viewMode,
      selectedBook,
      filteredBooks,
      showBookDetails,
      handleImageError
    }
  }
}
</script>

<style scoped>
.book-library {
  padding: 2rem 0;
}

.books-shelf {
  margin-top: 2rem;
}

.books-shelf.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.books-shelf.list .book-item {
  margin-bottom: 1rem;
}

.books-shelf.list .book-card {
  flex-direction: row;
}

.books-shelf.list .book-cover-wrapper {
  width: 150px;
  height: 200px;
}

.book-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.book-item:hover {
  transform: translateY(-5px);
}

.book-card {
  position: relative;
  overflow: hidden;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 8px;
}

.book-cover-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  will-change: transform;
}

.book-info {
  padding: 1rem;
}

.book-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.search-bar {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.1);
}

.book-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-item h6 {
  color: #495057;
  margin-bottom: 0.5rem;
}

.availability-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.availability-badge.available {
  background-color: #198754;
  color: white;
}

.availability-badge.borrowed {
  background-color: #ffc107;
  color: #000;
}

.book-summary {
  line-height: 1.6;
  color: #495057;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style> 