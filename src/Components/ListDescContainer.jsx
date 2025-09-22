import { useState, useEffect } from "react";
import ItemDesc from "./ItemDesc"; 
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Toastify } from "toastify";

function ListDescContainer() {
  
  return (
    <div className="item-list">
      {items.map(item => (
        <ItemDesc key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListDescContainer;
