const GITHUB_BASE = "https://woutervdvelde.github.io/TikkieTikkie";

const getBaseUrl = () => {
    if (window.location.href.startsWith(GITHUB_BASE)) {
        return GITHUB_BASE;
    } else {
        return `${window.location.protocol}//${window.location.host}`;
    }
}

Array.from(document.querySelectorAll(".base-url")).forEach(element => {
    element.href = getBaseUrl();
});