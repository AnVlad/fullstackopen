import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();
  const handleChanges = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChanges} />
    </div>
  );
}

export default Filter;
