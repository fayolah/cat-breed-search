import useLocalStorage from "../hooks/useLocalStorage"


export default function BreedSelect({breeds, selectedBreedId, onSelect}) {
    return (
        <>
        <select value={selectedBreedId} onChange={(e) => onSelect(e.target.value)} className="breed-select">
            <option value="">Select a breed</option>
            {breeds.map(breed => (
                <option key={breed.id} value={breed.id}>{breed.name}</option>
            ))}
        </select>
        </>
    );
}