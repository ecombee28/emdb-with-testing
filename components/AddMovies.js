import React, { useState, useEffect } from "react";
import style from "../styles/AddMovie.module.css";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAddMovie from "../custom hooks/useAddMovie";
import useRemoveMovie from "../custom hooks/useRemoveMovie";

export default function AddMovies({
  movie_id,
  media_type,
  name,
  count,
  imagePath,
}) {
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState(faPlus);

  useEffect(() => {
    const fetchData = async () => {
      if (count[0].count === 1) {
        setIcon(faCheck);
        setSelected(true);
      } else {
        setIcon(faPlus);
        setSelected(false);
      }
    };

    fetchData();
  }, [movie_id]);

  const handleMovie = async () => {
    setLoading(true);
    if (!selected) {
      const { response } = await useAddMovie(
        movie_id,
        media_type,
        name,
        imagePath
      );

      await setLoading(false);
      await setIcon(faCheck);
      await setSelected(true);
    } else {
      const { response } = await useRemoveMovie(movie_id);

      setTimeout(() => {
        setLoading(false);
        setIcon(faPlus);
        setSelected(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className={style.movie_container}>
        {loading ? (
          <img src="/loading.gif" alt="" className={style.loader} />
        ) : (
          <FontAwesomeIcon
            icon={icon}
            className={style.icons}
            onClick={handleMovie}
          />
        )}
        <span className={style.tooltiptext}>{`${
          selected ? "Remove from list" : `Add to watch list`
        }`}</span>
      </div>
    </div>
  );
}
