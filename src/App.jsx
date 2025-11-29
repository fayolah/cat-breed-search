import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import BreedSelect from './components/BreedSelect.jsx';
import Searchbar from './components/Searchbar.jsx';
import ImageGrid from './components/ImageGrid.jsx';
import ImageCard from './components/ImageCard.jsx';
import { useEffect } from 'react';
import './styles/index.css';
import Banner from './components/Banner.jsx';
import Pagination from './components/Pagination.jsx';
import FavoritesBar from './components/FavoritesBar.jsx';
import DetailsModal from './components/DetailsModal.jsx';

function App() {

  const apiKey = import.meta.env.VITE_CAT_API_KEY;

  // states for breeds
  const [breeds, setBreeds] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(true);
  const [breedsError, setBreedsError] = useState(null);

  //states for images
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagesError, setImagesError] = useState(null);

  //pages/pagination
  const [page, setPage] = useState(0);

    // filters
  const [selectedBreedId, setSelectedBreedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

    // persisting favorites
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

    // modal 
  const [modalImage, setModalImage] = useState(null);

  function handleKeydown(e) {
    if (e.key === 'Enter') {
      const breed = suggestions[focusedIndex];
      onSearchChange(breed.name);
      onSelectBreed(breed ? breed.id : "");
      onFocusedIndex(-1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onFocusedIndex((prevIndex) => (prevIndex <= 0 ? suggestions.length - 1 : prevIndex - 1));
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onFocusedIndex((prevIndex) => (prevIndex >= suggestions.length - 1 ? 0 : prevIndex + 1));
    }
  }

    // fetch breeds on app load
    useEffect (() => {
      async function fetchBreeds() {
        setLoadingBreeds(true);
        try {
          const response = await fetch("https://api.thecatapi.com/v1/breeds", {
            headers: {
              "x-api-key": apiKey 
            }
            });
            const data = await response.json();
            setBreeds(data);
          } catch (error) {
            setBreedsError("Failed to load breeds!");
          } finally {
            setLoadingBreeds(false);
          }
        }

    fetchBreeds();
}, []);

    // fetch images when breed or page changes
    useEffect(() => {
      async function fetchImages() {

        if (!selectedBreedId) {
          setImages([]);
          return;
        }
        setLoadingImages(true);
        setImagesError(null);
        try {
          const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5&page=${page}&has_breeds=1`;

          const response = await fetch(url, {
            headers: {
              "x-api-key" : apiKey 
            }
            });

            const data = await response.json();

            if (page === 0) {
              setImages(data);
            } else {
              setImages(prevImages => [...prevImages, ...data]);
            }
          } catch (error) {
            setImagesError("Failed to load images!");
          } finally {
            setLoadingImages(false);
          }
        }

      fetchImages();
    }, [selectedBreedId, page, apiKey]);

    //handles breed change
    function handleBreedChange(breedId) {
        setSelectedBreedId(breedId);
        setPage(0);
        setImages([]);
    }

    //loads more images
    function handleLoadMore() {
      setPage(prevPage => prevPage + 1);
    }

    //toggles favorites
    function toggleFavorite(image) {
      if (favorites.some(fav => fav.id === image.id)) {
        setFavorites(favorites.filter(fav => fav.id !== image.id));
      } else {
        setFavorites([...favorites, image]);
      }
    }


  const filteredImages = images.filter(image => 
    image.breeds && image.breeds[0] && image.breeds[0].name.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
      <>
      <Banner />

      <FavoritesBar favorites={favorites} onToggleFavorite={toggleFavorite} onOpenModal={setModalImage} />

      <BreedSelect breeds={breeds} selectedBreedId={selectedBreedId} onSelect={handleBreedChange} />
      {/*show breed error */}
      {breedsError && <p>{breedsError}</p>}

      <Searchbar searchQuery={searchQuery} onSearchChange={setSearchQuery} breeds={breeds}
      onSelectBreed={handleBreedChange}/>
      {/*show images error */}
      {imagesError && <p>{imagesError}</p>}

      <ImageGrid images={filteredImages} favorites={favorites}
      onToggleFavorite={toggleFavorite} onOpenModal={setModalImage} />

      <Pagination page={page} loadMore={handleLoadMore} />

      {modalImage && (
        <DetailsModal image={modalImage} isFavorite={favorites.some(fav => fav.id === modalImage.id)}
        onToggleFavorite={toggleFavorite} onClose={() => setModalImage(null)} />

      )}


      </>
    )
  }

export default App;
