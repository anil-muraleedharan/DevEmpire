import Datas from "./Programs-Data";
import NoResults from "../NoResults";
import { useState, useEffect, React } from "react";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";

const Content = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const filterOptions = searchTerm !== ""
    ? Datas.filter((data) => data.head.toLowerCase().includes(searchTerm.toLowerCase()))
    : Datas;

    const getStrippedAboutBasedOnHeaderLength = ({ head, about }) => {
      const aboutMaxCharCount = head.length > 18 ? 45 : 75;
      return about.length > aboutMaxCharCount ? `${about.slice(0, aboutMaxCharCount)}...` : about;
    }

  return (
    <>
      <div className="container-landing">
        <div className="landing-page-header">
          <div className="header-details">
            <h1>Open Source Programs</h1>

            <p>Here you can find all the resources and details of Open Source Programs and event that are available across different countries.</p>

            <Link to="container" smooth={true} duration={1000}>
              <h4>Explore all</h4>
            </Link>

            <div className="search-container">
              <i className="fa fa-search search-icon"></i>

              <input
                className="search"
                text="type"
                placeholder="Search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container" id="container">
        <div className="align-flex">
          {filterOptions.length > 0 ? (
            filterOptions.map((data) => (
                <div className="frame-border" key={`${data.head}_${data.link}`}>
                  <div className="pointer"></div>
                  <div className="card-js">
                    <div className="content">
                      <a href={data.link} target="_blank" rel="noreferrer">
                        <h3>{data.head}</h3>
                        <img src={data.image} alt={data.alt}></img>
                      </a>
                      <p>{getStrippedAboutBasedOnHeaderLength(data)}</p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <NoResults search={searchTerm} />
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
