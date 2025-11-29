export default function Pagination({page, loadMore}) {
    return (
        <div className="pagination">
            <button onClick={loadMore}>Load More Images</button>
        </div>
    )
}