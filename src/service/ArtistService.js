

/**
 * @typedef {Object} Artist
 * @property {int} id
 * @property {string} name
 * @property {string} genre
 * @property {int} nationality
 * @property {Date} birthdate
 */

import { SupabaseClientApi } from "../api/SupabaseAPI";


/**
 * @callback callbackGetAllArtist
 * @property {Artist[]} artists
 */
/**
 * 
 * @param {callbackGetAllArtist} callback 
 */
export function getAllArtist(callback) {
  SupabaseClientApi
    .from("Artist")
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

/**
 * 
 * @param {*} callback 
 */
export function addArtist(callback){

}
