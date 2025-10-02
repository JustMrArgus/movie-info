const ImportCard = ({ moviesHandler }) => {
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/movies/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error: ${response.status}`);
      }

      console.log("File uploaded:", result);
      moviesHandler(result.data);
    } catch (err) {
      console.log("Upload failed:", err);
    }
  };

  return (
    <div className="bg-green-500 shadow-md pb-3 rounded-3xl px-3 flex flex-col items-center text-center max-w-50 duration-200 hover:scale-[1.1] cursor-pointer">
      <input type="file" id="file" onChange={uploadFile} className="hidden" />
      <label
        htmlFor="file"
        className="text-[2.5rem] text-white uppercase flex items-center justify-center h-full cursor-pointer duration-200 hover:scale-[1.1] hover:opacity-50 opacity-80"
      >
        Import
      </label>
    </div>
  );
};

export default ImportCard;
