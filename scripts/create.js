const sections = Array.from(document.querySelectorAll(".section"));
let currentSection = -1;

const nextSection = () => {
    if (currentSection < sections.length - 1) {
        let current = sections[currentSection];
        if (current) current.classList.remove("active");
        currentSection++;
        sections[currentSection].classList.add("active");
        initInputCounter();
        initAmountListener();
        selectInput();
    } else {
        //done
    }
}

const selectInput = () => {
    // Wait for CSS animation to finish
    setTimeout(() => {
        const input = sections[currentSection].querySelector("input");
        if (input) input.focus();
        const textarea = sections[currentSection].querySelector("textarea");
        if (textarea) textarea.focus();
    }, 300);
}

const initInputCounter = () => {
    const counter = sections[currentSection].querySelector(".max");
    if (!counter) return;

    const input = sections[currentSection].querySelector("textarea");
    if (!input) return;

    const nextButton = sections[currentSection].querySelector(".next");

    const max = input.getAttribute("maxlength");
    counter.textContent = max;

    input.addEventListener("input", () => {
        counter.textContent = max - input.value.length;
        nextButton.disabled = !input.value > 0;
    });
}

const initAmountListener = () => {
    const input = sections[currentSection].querySelector("input");
    if (!input || input.inputMode != "decimal") return;

    const nextButton = sections[currentSection].querySelector(".next");

    input.addEventListener("input", () => {
        input.value = input.value.replace(/[^0-9,.]/g, "").replace(/\./g, ",");
        nextButton.disabled = !input.value > 0;
    });
}

nextSection();