import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // console.log(colorToEdit.id)
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        updateColors(
          colors.map((color) => {
            return color.id === colorToEdit.id ? res.data : color;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        console.log(res);
        updateColors(colors.filter((color) => color.id !== res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>Colors</p>
      <p>Edit or Delete a Color</p>
      {colors.length === 0 ? (
        <p className="loading-message">LOADING COLORS...</p>
      ) : (
        <ul>
          {colors.map((color) => (
            <li
              data-testid="colors"
              key={color.color}
              onClick={() => editColor(color)}
            >
              <span>
                <span
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteColor(color);
                  }}
                >
                  x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
          {console.log(colors)}
        </ul>
      )}
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
