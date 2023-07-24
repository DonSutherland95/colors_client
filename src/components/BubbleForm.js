import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const BubbleForm = ({ colors, updateColors }) => {
  const [colorValues, setColorValues] = useState(initialColor);

  const onSubmit = (evt) => {
    evt.preventDefault();
    let newColor = {
      color: colorValues.color,
      code: colorValues.code,
    };
    // console.log(newColor);
    axiosWithAuth()
      .post(`/api/colors`, newColor)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <form onSubmit={onSubmit}>
        <legend>Create a color</legend>
        <label>
          color name:
          <input
            type="text"
            name="color"
            onChange={(e) =>
              setColorValues({ ...colorValues, color: e.target.value })
            }
            value={colorValues.color}
          />
        </label>
        <label>
          hex code:
          <input
            type="text"
            name="code"
            onChange={(e) =>
              setColorValues({
                ...colorValues,
                code: { hex: e.target.value },
              })
            }
            value={colorValues.code.hex}
          />
        </label>
        <span>Eg. color name: blue</span>
        <span>hex code: #6093ca</span>
        <div className="button-row">
          <button type="submit">save</button>
          <button>cancel</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default BubbleForm;
