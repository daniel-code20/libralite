import { AiOutlineSearch } from "react-icons/ai";

export const SearchBar = () => {
  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          type="search"
          placeholder="Type Here"
          className="w-full p-4 rounded-full bg-slate-800"
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-600 rounded-full">
          <AiOutlineSearch />
        </button>
      </div>
    </form>
  );
};
