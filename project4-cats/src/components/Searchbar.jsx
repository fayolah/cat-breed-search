export default function Searchbar({searchQuery, onSearchChange, breeds, onSelectBreed}) {
    const suggestions = breeds.filter(breed => breed.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
        <div>
            <input type="text" placeholder="Search for a cat breed..." 
            value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="searchbar"/>

            {/*suggestion dropdown!*/}
            {searchQuery && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map(breed => (
                        <li key={breed.id} onClick={() => { onSearchChange("");
                            onSelectBreed(breed.id); }
                        }>
                            {breed.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
            </>
    )
            console.log("Suggestions:", suggestions);
}