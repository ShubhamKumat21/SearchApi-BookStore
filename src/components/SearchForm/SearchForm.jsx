import React, { useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.";
import "./SearchForm.css";

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext(); //sharing search term globally
  const searchText = useRef(""); //reads the input value using a ref, and updates a shared state using React Context.
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []); //as form loads .focus to the input field so the user can start typing immediately.

  const handleSubmit = (e) => {
    e.preventDefault();     // prevents the default form reload.
    
    let tempSearchTerm = searchText.current.value.trim();        // {
    if (tempSearchTerm.replace(/[^\w\s]/gi, "").length === 0) {
      setSearchTerm("the lost world");                               //default search term
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchText.current.value);             
    }                                                           //    }  

    navigate("/book");//navigates the user to a new page (/book) where the search results are shown
  };

  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="The Lost World ..."
                ref={searchText}
              />
              <button
                type="submit"
                className="flex flex-c"
                onClick={handleSubmit}
              >
                <FaSearch className="text-purple" size={32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
