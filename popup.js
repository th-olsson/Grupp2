const buy = document.querySelector(".buy")
buy.addEventListener("click", pop);

function pop () {
    localStorage.removeItem("cartNumbers")
    localStorage.removeItem("productsInCart")

    const cover = document.createElement("div");
    cover.classList.add('cover');
    const alert = document.createElement("div");
    alert.classList.add('alert');
    let text = document.createElement("h1");
    text.classList.add('buy-text');
    text.textContent = "Tack för ditt köp!"; 
    let secondText = document.createElement("span");
    secondText.classList.add('text');
    secondText.textContent = "En orderbekräftelse skickas snart till din mail";

    const btn = document.createElement("button");
    btn.textContent="X";
    btn.onclick = () => cover.remove();

    alert.appendChild(text);
    alert.appendChild(secondText);
    alert.appendChild(btn);
    cover.appendChild(alert);
    document.body.appendChild(cover);
}
