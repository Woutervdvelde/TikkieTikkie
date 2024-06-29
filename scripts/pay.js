const items = Array.from(document.querySelector(".faq").querySelectorAll(".item"))
items.forEach(item => {
    const h3 = item.querySelector("h3");
    h3.onclick = () => {
        item.classList.toggle("active")
    }
})

const params = new URLSearchParams(window.location.search);
const data = params.get("data");

if (!data) {
    window.location.href = "index.html";
} else {
    const tikkie = TikkieTikkie.fromString(decode(data));
    document.getElementById("name").innerText = tikkie.name;
    document.getElementById("description").innerText = tikkie.description;

    if (tikkie.amount != null) {
        document.getElementById("amount").value = tikkie.amount.toFixed(2).replace('.', ',');
        document.querySelector(".custom-amount").remove();
    }
}