import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import BubbleForm from "./BubbleForm";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      // .get(`https://familiar-water-sale.glitch.me/api/colors`)
      .get(`/api/colors`)
      .then((res) => {
        // console.log(res)
        setColorList(res.data);
      });
  }, []);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <BubbleForm colors={colorList} updateColors={setColorList} />
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
