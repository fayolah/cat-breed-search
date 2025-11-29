import React, {useEffect} from 'react';

export default function DetailsModal({image, isFavorite, onToggleFavorite, onClose}) {
    if (!image) return null;

    const breedInfo = image.breeds && image.breeds[0];

    const handleKeyDown = (e) => {

    //closes on esc key for accessibility
        useEffect(() => {
            function handleKeyDown(e) {
                if (e.key === 'Escape') onClose();
            }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        }, [onClose]);
    }

    // locks page scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
     }, []);


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-popup" onClick={e => e.stopPropagation()}>
                <img src={image.url} alt="Cat" className="modal-image" />
                {breedInfo && (
                    <div className="breed-info">
                        <h2>{breedInfo.name}</h2>
                        <p>{breedInfo.description}</p>
                        <p><strong>Temperament:</strong> {breedInfo.temperament}</p>
                        <p><strong>Origin:</strong> {breedInfo.origin}</p>
                        <p><strong>Life Span:</strong> {breedInfo.life_span} years</p>
                    </div>
                )}
                <button onClick={() => onToggleFavorite(image)} className="favmenu-btn">
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}