const items = Array.from(document.querySelector(".faq").querySelectorAll(".item"))
items.forEach(item => {
    const h3 = item.querySelector("h3");
    h3.onclick = () => {
        item.classList.toggle("active")
    }
})