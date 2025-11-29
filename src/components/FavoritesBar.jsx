import {useState} from 'react';

export default function FavoritesBar({favorites, onToggleFavorite, onOpenModal}) {
   const [isOpen, setIsOpen] = useState(false);

   function toggleMenu() {
    setIsOpen(prev => !prev);
   }

   
    return (
    <div className="favorites-dropdown">
        <button className="favorites-toggle" onClick={toggleMenu}>
            {isOpen ? "Hide Favorites ▲" : "Show Favorites ▼"}
        </button>
        {isOpen && (
        <div className="favorites-bar">
            <h3 className="favorites-header">Favorites</h3>
            {/* no faves*/}
            {favorites.length === 0 && <p className="no-faves">No favorite images yet.</p>}
            <div className="favorites-list">
                {/*loop through faves*/}
                {favorites.map(image => (
                    <div key={image.id} className="favorite-item">
                        <img 
                            src={image.url}
                            alt={image.breeds && image.breeds[0] ? image.breeds[0].name : 'Favorite Cat'}
                            onClick={() => onOpenModal(image)}
                            className="fave-image"/>
                        <button onClick={() => onToggleFavorite(image)}>Remove</button>
                    </div>
                ))}
            </div>  
        </div>
        )}
    </div>
    );
}