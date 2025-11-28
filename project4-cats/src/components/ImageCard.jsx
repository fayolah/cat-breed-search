import {use, useEffect, useRef} from "react";

export default function ImageCard({image, isFocused, isFavorite, onToggleFavorite, onOpenModal}) {


    return ( 
        <div className="imagecard">
            <img src={image.url} alt="Cat" className="cat-image" onClick={() => onOpenModal(image)}/>
            <button onClick={() => onToggleFavorite(image)} className="fave-btn">
                {isFavorite ? "★" : "☆"}
            </button>
        </div>
    );
}