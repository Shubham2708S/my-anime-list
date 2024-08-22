import apiConfig from "../apiConfig"
import axios from "axios"

export const animeSearch = (page,rowsPerPage) => {
    const url = `${apiConfig.ANIME_URL}/search`
    const config = {
        params: {
            'page_no':page,
            'page_size':rowsPerPage

        }
    }
   return axios
      .get(
        url,{},config
      )
}