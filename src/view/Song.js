/**
 * @typedef {import("../service/SongService").Song} Song
 */

import { getArtistById } from "../service/ArtistService";
import {
  addFavoriteSong,
  isSongFavorite,
  removeFavoriteSong,
} from "../service/FavoriteLocalStorageService";
import { getAllSongs } from "../service/SongService";

/**
 *
 * @param {HTMLDivElement} main
 */
export function Song(main) {
  main.innerHTML = "";

  const div = document.createElement("div");
  div.className = "card shadow p-4";

  const divCardHead = document.createElement("div");
  divCardHead.className = "card-header bg-white border-bottom-0 d-flex";

  const h2 = document.createElement("h2");
  h2.textContent = "Canciones";
  h2.className = "w-auto me-auto mb-0";
  divCardHead.appendChild(h2);

  const aButtonCreate = document.createElement("a");
  aButtonCreate.href = "#/SongManager?action=create";
  const buttonCreate = document.createElement("button");
  buttonCreate.className = "btn btn-color-custom rounded-5";
  buttonCreate.textContent = "Añadir nueva Canción";
  aButtonCreate.appendChild(buttonCreate);
  divCardHead.appendChild(aButtonCreate);

  const divTable = document.createElement("div");
  divTable.className =
    "table-responsive table-responsive rounded-3 overflow-hidden";
  const table = document.createElement("table");
  addTableHead(table);
  table.className = "table table-striped mb-0 text-center align-middle";
  const tbody = document.createElement("tbody");
  tbody.id = "tableSong";
  table.appendChild(tbody);
  getAllSongs(renderTableData);
  divTable.appendChild(table);

  div.appendChild(divCardHead);
  div.appendChild(divTable);

  main.appendChild(div);
}

/**
 *
 * @param {HTMLTableElement} table
 */
export function addTableHead(table) {
  const thead = document.createElement("thead");
  thead.className = "table-dark";

  const tr = document.createElement("tr");

  const thTitle = document.createElement("th");
  thTitle.textContent = "Título";
  tr.appendChild(thTitle);

  const thGenre = document.createElement("th");
  thGenre.textContent = "Género";
  tr.appendChild(thGenre);

  const thArtist = document.createElement("th");
  thArtist.textContent = "Artista";
  tr.appendChild(thArtist);

  const thYear = document.createElement("th");
  thYear.textContent = "Año";
  tr.appendChild(thYear);

  const thAction = document.createElement("th");
  thAction.textContent = "Acciones";
  tr.appendChild(thAction);

  thead.appendChild(tr);
  table.appendChild(thead);
}

/**
 *
 * @param {Song} songs
 */
function renderTableData(songs) {
  const tbody = document.getElementById("tableSong");
  tbody.innerHTML = "";
  songs.forEach((song) => {
    addNewRow(song, tbody);
  });
}

/**
 *
 * @param {Song} song
 * @param {HTMLTableElement} tbody
 */
function addNewRow(song, tbody) {
  const tr = document.createElement("tr");

  const tdTitle = document.createElement("td");
  tdTitle.textContent = song.title;
  tr.appendChild(tdTitle);

  const tdGenre = document.createElement("td");
  tdGenre.textContent = song.genre;
  tr.appendChild(tdGenre);

  const tdArtist = document.createElement("td");
  getArtistById(song.idArtist, (artist) => {
    tdArtist.textContent = artist.name;
  });
  tr.appendChild(tdArtist);

  const tdYear = document.createElement("td");
  tdYear.textContent = song.year;
  tr.appendChild(tdYear);

  const tdAction = document.createElement("td");
  renderAction(tdAction, song);
  tr.appendChild(tdAction);

  tbody.appendChild(tr);
}

/**
 *
 * @param {HTMLTableCellElement} td
 * @param {Song} song
 */
function renderAction(td, song) {
  /*const aShow = document.createElement("a");
    aShow.href = "#/ArtistManager?action=show&artistId=" + artist.id;
    const btnShow = document.createElement("button");
    btnShow.className = "btn";
    const imgShow = document.createElement("img");
    imgShow.src = "src/asset/svg/show.svg";
    imgShow.width = 20;
    imgShow.height = 20;
    imgShow.style = "display: block";
    btnShow.appendChild(imgShow);
    aShow.appendChild(btnShow);
    td.appendChild(aShow);

    const aEdit = document.createElement("a");
    aEdit.href = "#/ArtistManager?action=show&artistId=" + artist.id;
    const btnEdit = document.createElement("button");
    btnEdit.className = "btn";
    const imgEdit = document.createElement("img");
    imgEdit.src = "src/asset/svg/edit.svg";
    imgEdit.width = 20;
    imgEdit.height = 20;
    imgEdit.style = "display: block";
    btnEdit.appendChild(imgEdit);
    aEdit.appendChild(btnEdit);
    td.appendChild(aEdit);
    
    const aDelete = document.createElement("a");
    aDelete.href = "#/ArtistManager?action=show&artistId=" + artist.id;
    const btnDelete = document.createElement("button");
    btnDelete.className = "btn";
    const imgDelete = document.createElement("img");
    imgDelete.src = "src/asset/svg/delete.svg";
    imgDelete.width = 20;
    imgDelete.height = 20;
    imgDelete.style = "display: block";
    btnDelete.appendChild(imgDelete);
    aDelete.appendChild(btnDelete);
    td.appendChild(aDelete);*/

  const btnFavorite = document.createElement("button");
  btnFavorite.className = "btn";
  const imgFavorite = document.createElement("img");
  if (isSongFavorite(song.id)) {
    imgFavorite.src = "./src/asset/svg/star_filled.svg";
    imgFavorite.alt = "Estrella llena";
    btnFavorite.addEventListener("click", () => {
      unfavSong(btnFavorite, imgFavorite, song.id);
    });
  } else {
    imgFavorite.src = "./src/asset/svg/star.svg";
    imgFavorite.alt = "Estrella vacía";
    btnFavorite.addEventListener("click", () => {
      favSong(btnFavorite, imgFavorite, song.id);
    });
  }
  imgFavorite.width = 20;
  imgFavorite.height = 20;
  imgFavorite.style = "display: block";
  btnFavorite.appendChild(imgFavorite);
  td.appendChild(btnFavorite);
}

/**
 *
 * @param {HTMLButtonElement} btn
 * @param {number} id
 */
function favSong(btn, img, id) {
  img.src = "./src/asset/svg/star_filled.svg";
  img.alt = "Estrella llena";
  addFavoriteSong(id);
  btn.removeEventListener("click", () => favSong(btn, img, id));
  btn.addEventListener("click", () => unfavSong(btn, img, id));
}

/**
 *
 * @param {HTMLButtonElement} btn
 * @param {number} id
 */
function unfavSong(btn, img, id) {
  img.src = "./src/asset/svg/star.svg";
  img.alt = "Estrella vacía";
  removeFavoriteSong(id);
  btn.removeEventListener("click", () => unfavSong(btn, img, id));
  btn.addEventListener("click", () => favSong(btn, img, id));
}
