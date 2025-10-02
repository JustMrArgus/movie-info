import { useState } from "react";

const Search = ({
  titleParam,
  setTitleParam,
  actorParam,
  setActorParam,
  searchParam,
  setSearchParam,
}) => {
  const [searchMode, setSearchMode] = useState("any");

  const renderSearchMode = () => {
    if (searchMode === "any") {
      setTitleParam("");
      setActorParam("");

      return (
        <input
          type="text"
          placeholder="Search..."
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          className="text-2xl border-b-2 w-full p-3 border-[#cecece]"
        />
      );
    }
    if (searchMode === "title") {
      setSearchParam("");
      setActorParam("");

      return (
        <input
          type="text"
          placeholder="Avengers..."
          value={titleParam}
          onChange={(e) => setTitleParam(e.target.value)}
          className="text-2xl border-b-2 w-full p-3 border-[#cecece]"
        />
      );
    }
    if (searchMode === "actor") {
      setTitleParam("");
      setSearchParam("");

      return (
        <input
          type="text"
          placeholder="Johny Deb..."
          value={actorParam}
          onChange={(e) => setActorParam(e.target.value)}
          className="text-2xl border-b-2 w-full p-3 border-[#cecece]"
        />
      );
    }
    return null;
  };

  return (
    <div className="flex gap-5 items-center w-full">
      <div className="bg-white rounded-2xl text-xl p-4 shadow-xl">
        <select
          name="searchMode"
          id="searchMode"
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
        >
          <option value="any">Any</option>
          <option value="title">Title</option>
          <option value="actor">Actor</option>
        </select>
      </div>
      <div className="flex-grow">{renderSearchMode()}</div>
    </div>
  );
};

export default Search;
