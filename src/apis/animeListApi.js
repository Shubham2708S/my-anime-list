import apiConfig from "../apiConfig";
import axios from "axios";

export const animeSearch = (page, rowsPerPage, searchCriteria = {}) => {
  const url = `${apiConfig.ANIME_URL}/search`;
  const query = {
    params: {
      page_no: page,
      page_size: rowsPerPage,
      ...searchCriteria,
    },
  };
  return axios.get(url, query);
};

export const refreshAnime = () => {
  const url = `${apiConfig.ANIME_URL}/refresh`;
  return axios.get(url);
};

export const shuffleAnime = (rowsPerPage) => {
  const url = `${apiConfig.ANIME_URL}/random`;
  const query = {
    params: {
      page_size: rowsPerPage,
    },
  };
  return axios.get(url, query);
};

export const updateAnime = (animeUpdateRequest) => {
  const url = apiConfig.ANIME_URL;
  return axios.put(url, animeUpdateRequest, {});
};
