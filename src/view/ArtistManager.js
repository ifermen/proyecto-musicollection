/**
 * @typedef {import("../router").Param} Param
 */

import { isBetween, isRequired } from "../utility/formValidation";
import { ErrorView } from "./ErrorView";

const ACTIONS_WITH_ID = ["show", "edit", "delete"];
let paramAction = "";
let paramId = "";

/**
 *
 * @param {HTMLDivElement} main
 * @param {Param[]} params
 */
export function ArtistManager(main, params) {
  main.innerHTML = "";

  try {
    loadParams(params);
  } catch (error) {
    ErrorView(main, error.message);
    return false;
  }

  const div = document.createElement("div");
  div.className = "card shadow p-4 rounded-4";

  const divCardHead = document.createElement("div");
  divCardHead.className = "card-header bg-white border-bottom-0 d-flex";

  const h2 = document.createElement("h2");
  try {
    switch (paramAction) {
      case "edit":
        h2.textContent = "Editar Artista";
        break;
      case "create":
        h2.textContent = "Crear Artista";
        break;
      case "delete":
        h2.textContent = "Borrar Artista";
        break;
      case "show":
        h2.textContent = "Mostar Artista";
        break;
      default:
        throw new Error("Acción incorrecta");
        break;
    }
  } catch (error) {
    ErrorView(main, error.message);
    return false;
  }
  h2.className = "w-auto me-auto mb-0";
  divCardHead.appendChild(h2);

  const aButtonCreate = document.createElement("a");
  aButtonCreate.href = "#/artist";
  const buttonCreate = document.createElement("button");
  buttonCreate.className = "btn btn-secondary rounded-5";
  buttonCreate.textContent = "Volver";
  aButtonCreate.appendChild(buttonCreate);
  divCardHead.appendChild(aButtonCreate);

  div.appendChild(divCardHead);

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-header bg-white border-bottom-0";
  renderForm(divCardBody)
  div.appendChild(divCardBody);

  main.appendChild(div);
}

/**
 *
 * @param {Param[]} params
 */
function loadParams(params) {
  if (params[0].name == "action") {
    paramAction = params[0].value;
  } else {
    throw new Error("Acción no especificada");
  }

  if (ACTIONS_WITH_ID.includes(paramAction)) {
    if (params.length > 1 && params[1].name == "artistid") {
      paramId = params[1].value;
    } else {
      throw new Error("Parametro necesario no encontrado");
    }
  }

}

/**
 * 
 * @param {HTMLDivElement} divCardBody 
 */
function renderForm(divCardBody){
  const form = document.createElement("form");
  form.className = "border rounded-4 p-3";
  form.id = "artistForm";
  form.addEventListener("input", event => validateInput(event));
  form.addEventListener("submit", event => {
    event.preventDefault();
    submitForm(event);
  });


  const divRow = document.createElement("div");
  divRow.className = "row"
  const divCol1 = document.createElement("div");
  divCol1.className = "col col-6 border-end"
  const divCol2 = document.createElement("div");
  divCol2.className = "col col-6"

  renderInputName(divCol1);
  renderInputGenre(divCol1);
  renderInputNationality(divCol2);
  renderInputBirthdate(divCol2);

  divRow.appendChild(divCol1);
  divRow.appendChild(divCol2);
  form.appendChild(divRow);

  const button = document.createElement("button");
  button.textContent = "Enviar";
  button.className = "btn btn-color-custom rounded-5 w-100 mt-3";
  button.type = "submit";
  form.appendChild(button);

  divCardBody.appendChild(form);
}

/**
 * 
 * @param {HTMLFormElement} form 
 */
function renderInputName(form){
  const divFormControl = document.createElement("div");
  divFormControl.className = "form-group";
  const input = document.createElement("input");
  input.id = "nameInput";
  input.name = "nameInput";
  input.className = "form-control rounded-5";
  const label = document.createElement("label");
  label.textContent = "Nombre";
  label.htmlFor = "nameInput";
  label.className = "form-label";

  divFormControl.appendChild(label);
  divFormControl.appendChild(input);

  const small = document.createElement("small");
  small.className = "text-danger";
  divFormControl.appendChild(small);

  form.appendChild(divFormControl);
}

/**
 * 
 * @param {HTMLFormElement} form 
 */
function renderInputGenre(form){
  const divFormControl = document.createElement("div");
  divFormControl.className = "form-group";
  const input = document.createElement("input");
  input.id = "genreInput";
  input.name = "genreInput";
  input.className = "form-control rounded-5";
  const label = document.createElement("label");
  label.textContent = "Géreno";
  label.htmlFor = "genreInput";
  label.className = "form-label";

  divFormControl.appendChild(label);
  divFormControl.appendChild(input);

  const small = document.createElement("small");
  small.className = "text-danger";
  divFormControl.appendChild(small);

  form.appendChild(divFormControl);
}

/**
 * 
 * @param {HTMLFormElement} form 
 */
function renderInputNationality(form){
  const divFormControl = document.createElement("div");
  divFormControl.className = "form-group";
  const input = document.createElement("input");
  input.id = "nationalityInput";
  input.name = "nationalityInput";
  input.className = "form-control rounded-5";
  const label = document.createElement("label");
  label.textContent = "Nacionalidad";
  label.htmlFor = "nationalityInput";
  label.className = "form-label";

  divFormControl.appendChild(label);
  divFormControl.appendChild(input);

  const small = document.createElement("small");
  small.className = "text-danger";
  divFormControl.appendChild(small);

  form.appendChild(divFormControl);
}

/**
 * 
 * @param {HTMLFormElement} form 
 */
function renderInputBirthdate(form){
  const divFormControl = document.createElement("div");
  divFormControl.className = "form-group";
  const input = document.createElement("input");
  input.id = "birthdateInput";
  input.name = "birthdateInput";
  input.className = "form-control rounded-5";
  const label = document.createElement("label");
  label.textContent = "Fecha de nacimiento";
  label.htmlFor = "birthdateInput";
  label.className = "form-label";

  divFormControl.appendChild(label);
  divFormControl.appendChild(input);

  const small = document.createElement("small");
  small.className = "text-danger";
  divFormControl.appendChild(small);

  form.appendChild(divFormControl);
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @param {string} message 
 */
function showError(input,message){
  const formField = input.parentElement;
  const errorSmall = formField.querySelector("small");
  errorSmall.textContent = message;
}

/**
 * 
 * @param {string} input 
 */
function showSuccess(input){
  const formField = input.parentElement;
  const errorSmall = formField.querySelector("small");
  errorSmall.textContent = "";
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
function checkNameInput(input){
  let result = false;
  if(isRequired(input.value)){
    if(isBetween(input.value.length,3,50)){
      showSuccess(input);
      result = true;
    }else{
      showError(input,"El nombre debe de estar entre 3 y 50 caracteres.")
    }
  }else{
    showError(input,"Este campo es obligatorio.")
  }
  return result;
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
function checkGenreInput(input){
  let result = false;
  if(isRequired(input.value)){
    if(isBetween(input.value.length,3,50)){
      showSuccess(input);
      result = true;
    }else{
      showError(input,"El género debe de estar entre 3 y 50 caracteres.")
    }
  }else{
    showError(input,"Este campo es obligatorio.")
  }
  return result;
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
function checkNationalityInput(input){
  let result = false;
  if(isRequired(input.value)){
    if(isBetween(input.value.length,3,50)){
      showSuccess(input);
      result = true;
    }else{
      showError(input,"La nacionalidad debe de estar entre 3 y 50 caracteres.")
    }
  }else{
    showError(input,"Este campo es obligatorio.")
  }
  return result;
}

/**
 * 
 * @param {HTMLInputElement} input 
 * @returns {boolean}
 */
function checkBirthdateInput(input){
  let result = false;
  if(isRequired(input.value)){
    if(isBetween(input.value.length,3,50)){
      showSuccess(input);
      result = true;
    }else{
      showError(input,"La fecha de nacimiento debe de estar entre 3 y 50 caracteres.")
    }
  }else{
    showError(input,"Este campo es obligatorio.")
  }
  return result;
}

/**
 * 
 * @param {Event} event 
 */
function validateInput(event){
  const name = event.target.name;

  switch (name) {
    case "nameInput":
      checkNameInput(event.target);
      break;
    case "genreInput":
      checkGenreInput(event.target);
      break;
    case "nationalityInput":
      checkNationalityInput(event.target);
      break;
    case "birthdateInput":
      checkBirthdateInput(event.target);
      break;
  
    default:
      break;
  }
}

function submitForm(event){
  const nameInput = document.getElementById("nameInput");
  const genreInput = document.getElementById("genreInput");
  const nationalityInput = document.getElementById("nationalityInput");
  const birthdateInput = document.getElementById("birthdateInput");

  const validateNameInput = checkNameInput(nameInput);
  const validateGenreInput = checkGenreInput(genreInput);
  const validateNationalityInput = checkNationalityInput(nationalityInput);
  const validateBirthdateInput = checkBirthdateInput(birthdateInput);
  if(validateNameInput && validateGenreInput
    && validateNationalityInput && validateBirthdateInput){
    
  }
}
