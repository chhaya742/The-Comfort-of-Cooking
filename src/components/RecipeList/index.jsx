import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import NavDropdown from '../SearchBar/ResipeSearchBar';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const fevRec = localStorage?.getItem("fevRec")

const LikeButton = ({ recipeId }) => {
  const [isLiked, setLiked] = useState(fevRec.includes(recipeId));

  const handleLikeClick = () => {
    setLiked(!isLiked);

    const updatedFevRec = isLiked
      ? JSON.stringify(JSON.parse(fevRec).filter(id => id !== recipeId))
      : JSON.stringify([...JSON.parse(fevRec), recipeId]);

    localStorage.setItem("fevRec", updatedFevRec);
  };
  return (
    <div onClick={handleLikeClick}>
      {isLiked ? (
        // Liked icon
        <div className="icon" style={{ color: "rgb(255, 0, 255)" }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></div>
      ) : (
        // Not liked icon
        <div className="icon" style={{ color: "rgb(0, 0, 0)" }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="25px" width="25px" xmlns="http://www.w3.org/2000/svg"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></div>
      )}
    </div>
  );
};

const ResipeList = () => {
  const { QueryString, listItems, listItemsLo, recipeListLocal, recipeList } = useAuth();

  const data = {
    querySearch: QueryString || "",
  };
  // console.log(data);
  useEffect(() => {
    listItems.length == 0 ? recipeListLocal(data) : recipeList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QueryString]);
  console.log(listItemsLo);
  return (
    <>
      <NavBar search={<NavDropdown />} />
      <div className='home'>
        {(listItems.length == 0 ? listItemsLo : listItems)?.results?.map((element) => (
          <div className='my-3' key={element.id}>
            <div className="card">
              <img
                src={element.image || "https://i.ytimg.com/vi/5LgxOXGH3y4/hqdefault.jpg"}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <Link to={`/recipe-details/${element.id}`}><h5 className="card-title">{element.title}</h5> </Link>
                <LikeButton recipeId={element.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResipeList;

