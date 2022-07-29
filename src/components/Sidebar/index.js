import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import UserDetails from "components/UserDetails";
import "./_sidebar.scss";
import AddThread from "components/AddThread";
import SideBarThreads from "components/SideBarThreads";

export default () => {
  const [value, setValue] = useState("");

  function handleSearch(e) {
    setValue(e.target.value);
  }

  return (
    <section className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <AiOutlineSearch className="sidebar__search-icon" />
          <input
            type="text"
            className="sidebar__input"
            placeholder="search"
            onChange={handleSearch}
            value={value}
          />
        </div>
        <AddThread />
      </div>
      <div className="sidebar__body">
        <SideBarThreads />
      </div>
      <UserDetails />
    </section>
  );
};
