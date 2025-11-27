import { SupabaseClientApi } from "../api/SupabaseAPI";

/**
 * @typedef {Object} Song
 * @property {int} id
 * @property {string} title
 * @property {string} genre
 * @property {int} idArtist
 * @property {Date} date
 */

/**
 * @callback callbackGetAllSongs
 * @property {Song[]} songs
 */
/**
 * 
 * @param {callbackGetAllSongs} callback 
 */
export function getAllSongs(callback) {
  SupabaseClientApi
    .from("Song")
    .select()
    .then((response) => {
      if (response.error) {
        throw new Error("Select Error");
      }
      callback(response.data);
    })
    .catch(error => {
        console.error(error);
        
    })
}
