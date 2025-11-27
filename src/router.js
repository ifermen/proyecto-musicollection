import { Artist } from "./view/Artist.js";
import { ArtistManager } from "./view/ArtistManager.js";
import { Home } from "./view/Home.js";
import { NotFound } from "./view/NotFound.js";
import { Song } from "./view/Song.js";

/**
 * @typedef {Object} Param
 * @property {string} name
 * @property {string} value
 */

export function router() {
  const view = document.getElementById("view");
  const route = location.hash.slice(1).toLowerCase() || "/";
  const routeSplit = route.split("?");

  const routes = {
    "/": Home,
    "/song": Song,
    "/artist": Artist,
    "/artistmanager": ArtistManager
  };
  const screen = routes[routeSplit[0]] || NotFound;
  if(routeSplit.length > 1){
    const params = routeSplit[1].split("&").map(param => {
      return {name : param.split("=")[0], value : param.split("=")[1]};
    });
    screen(view,params);
  }else{
    screen(view);
  }
}
