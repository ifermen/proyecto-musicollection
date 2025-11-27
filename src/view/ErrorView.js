/**
 * 
 * @param {HTMLDivElement} main 
 */
export function ErrorView(main,textError) {
  main.innerHTML = "";

  const div = document.createElement("div");
  div.className = "card shadow p-3";

  const h2 = document.createElement("h2");
  h2.textContent = "Error";
  div.appendChild(h2);

  const p = document.createElement("p");
  p.textContent = textError;
  div.appendChild(p);

  main.appendChild(div);
}
