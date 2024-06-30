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
        else {
            const textarea = sections[currentSection].querySelector("textarea");
            if (textarea) textarea.focus();
        }
    }, 300);
}

// Used to handle input from textarea
const initInputCounter = () => {
    const counter = sections[currentSection].querySelector(".max");
    const input = sections[currentSection].querySelector("textarea");
    const nextButton = sections[currentSection].querySelector(".next");
    if (!counter || !input) return;

    const max = input.getAttribute("maxlength");
    counter.textContent = max;

    input.addEventListener("input", () => {
        counter.textContent = max - input.value.length;
        nextButton.disabled = !input.value > 0;
    });
}

// Used to handle input from decimal input
const initAmountListener = () => {
    const input = sections[currentSection].querySelector("input");
    if (!input || input.inputMode != "decimal") return;

    const nextButton = sections[currentSection].querySelector(".next");

    input.addEventListener("input", () => {
        // Replace all non-numeric characters with empty string and replace all dots with commas
        input.value = input.value.replace(/[^0-9,.]/g, "").replace(/\./g, ",");
        // If the first character is a comma, add a 0 before it
        if (input.value[0] == ",") input.value = `0${input.value}`
        // If there are more than one comma remove all but the first one and round on two decimals
        const parts = input.value.split(",");
        input.value = `${parts[0]},${parts[1].slice(0, 2)}`

        nextButton.disabled = !input.value > 0;
    });
}

nextSection();