import ImageCard from './ImageCard.jsx';
import { useState } from 'react';

export default function ImageGrid({images, onOpenModal, favorites, onToggleFavorite}) {
    
    if (!images.length) return <p className="no-img">No images found for this breed.</p>;
    return (
        <div className="image-grid">
            {images.map(image => (
                <ImageCard key={image.id} image={image} isFavorite={favorites.some(fav => fav.id === image.id)}
                onToggleFavorite={() => onToggleFavorite(image)}
                onOpenModal={() => onOpenModal(image)} />
            ))}
        </div>
    );
}