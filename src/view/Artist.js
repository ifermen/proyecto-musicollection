/**
 * @typedef {import("../service/ArtistService").Artist} Artist
 */

import { getAllArtist } from "../service/ArtistService";
import {
  addFavoriteArtist,
  isArtistFavorite,
  removeFavoriteArtist,
} from "../service/FavoriteLocalStorageService";

/**
 *
 * @param {HTMLDivElement} main
 */
export function Artist(main) {
  main.innerHTML = "";

  const div = document.createElement("div");
  div.className = "card shadow p-4";

  const divCardHead = document.createElement("div");
  divCardHead.className = "card-header bg-white border-bottom-0 d-flex";

  const h2 = document.createElement("h2");
  h2.textContent = "Artista";
  h2.className = "w-auto me-auto mb-0";
  divCardHead.appendChild(h2);

  const aButtonCreate = document.createElement("a");
  aButtonCreate.href = "#/ArtistManager?action=create";
  const buttonCreate = document.createElement("button");
  buttonCreate.className = "btn btn-color-custom rounded-5";
  buttonCreate.textContent = "Añadir nuevo Artista";
  aButtonCreate.appendChild(buttonCreate);
  divCardHead.appendChild(aButtonCreate);

  const divTable = document.createElement("div");
  divTable.className =
    "table-responsive table-responsive rounded-3 overflow-hidden";
  const table = document.createElement("table");
  addTableHead(table);
  table.className = "table table-striped mb-0 text-center align-middle";
  const tbody = document.createElement("tbody");
  tbody.id = "tableArtist";
  table.appendChild(tbody);
  getAllArtist(renderTableData);
  divTable.appendChild(table);

  div.appendChild(divCardHead);
  div.appendChild(divTable);

  main.appendChild(div);
}

/**
 *
 * @param {HTMLTableElement} table
 */
function addTableHead(table) {
  const thead = document.createElement("thead");
  thead.className = "table-dark";

  const tr = document.createElement("tr");

  const thTitle = document.createElement("th");
  thTitle.textContent = "Nombre";
  tr.appendChild(thTitle);

  const thGenre = document.createElement("th");
  thGenre.textContent = "Género";
  tr.appendChild(thGenre);

  const thArtist = document.createElement("th");
  thArtist.textContent = "Nacionalidad";
  tr.appendChild(thArtist);

  const thDate = document.createElement("th");
  thDate.textContent = "Fecha de Nacimiento";
  tr.appendChild(thDate);

  const thAction = document.createElement("th");
  thAction.textContent = "Acciones";
  tr.appendChild(thAction);

  thead.appendChild(tr);
  table.appendChild(thead);
}

/**
 *
 * @param {Artist} artists
 */
function renderTableData(artists) {
  const tbody = document.getElementById("tableArtist");
  tbody.innerHTML = "";
  artists.forEach((artist) => {
    addNewRow(artist, tbody);
  });
}

/**
 *
 * @param {Artist} artist
 * @param {HTMLTableElement} tbody
 */
function addNewRow(artist, tbody) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  tdName.textContent = artist.name;
  tr.appendChild(tdName);

  const tdGenre = document.createElement("td");
  tdGenre.textContent = artist.genre;
  tr.appendChild(tdGenre);

  const tdNationality = document.createElement("td");
  tdNationality.textContent = artist.nationality;
  tr.appendChild(tdNationality);

  const tdDate = document.createElement("td");
  tdDate.textContent = artist.birthdate;
  tr.appendChild(tdDate);

  const tdAction = document.createElement("td");
  renderAction(tdAction, artist);
  tr.appendChild(tdAction);

  tbody.appendChild(tr);
}

/**
 *
 * @param {HTMLTableCellElement} td
 * @param {Artist} artist
 */
function renderAction(td, artist) {
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
  if (isArtistFavorite(artist.id)) {
    imgFavorite.src = "./src/asset/svg/star_filled.svg";
    btnFavorite.addEventListener("click", () => {
      unfavArtist(btnFavorite,imgFavorite,artist.id);
    });
  } else {
    imgFavorite.src = "./src/asset/svg/star.svg";
    btnFavorite.addEventListener("click", () => {
      favArtist(btnFavorite,imgFavorite,artist.id);
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
function favArtist(btn,img, id) {
  img.src = "./src/asset/svg/star_filled.svg";
  addFavoriteArtist(id);
  btn.removeEventListener("click",() => favArtist(btn,img,id));
  btn.addEventListener("click", () => unfavArtist(btn,img,id));
}

/**
 *
 * @param {HTMLButtonElement} btn
 * @param {number} id
 */
function unfavArtist(btn,img, id) {
  img.src = "./src/asset/svg/star.svg";
  removeFavoriteArtist(id);
  btn.removeEventListener("click",() => unfavArtist(btn,img,id));
  btn.addEventListener("click", () => favArtist(btn,img,id));
}


