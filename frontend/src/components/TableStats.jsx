const TableStats = ({
  allMoviesCount,
  importedMoviesCount,
  addedMoviesCount,
  deletedMoviesCount,
}) => {
  return (
    <div className="mt-10">
      <table className="border-collapse border border-gray-300 text-center text-2xl">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">All</th>
            <th className="border border-gray-300 px-4 py-2">Imported</th>
            <th className="border border-gray-300 px-4 py-2">Added</th>
            <th className="border border-gray-300 px-4 py-2">Deleted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">
              {allMoviesCount}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {importedMoviesCount}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {addedMoviesCount}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {deletedMoviesCount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableStats;
