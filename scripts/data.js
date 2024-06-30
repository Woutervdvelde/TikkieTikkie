class TikkieTikkie {
    constructor(name, description, amount = false) {
        this.name = name;
        this.description = description;
        this.amount = amount;
    }

    toString() {
        return JSON.stringify(this);
    }

    // Generates the URL to the pay page with the data encoded in the URL
    generateUrl() {
        const data = encode(this.toString());
        const base = getBaseUrl();
        return `${base}/pay?data=${data}`;
    }

    getShareMessage() {
        const url = this.generateUrl();
        return `Please could you pay me for '${this.name}' at\n${url}\n\nThis link has no expiration date.`;
    }

    /**
     * Parses a string into a TikkieTikkie object if possible
     * @param {string} string 
     * @returns 
     */
    static fromString(string) {
        try {
            const object = JSON.parse(string);
            return new TikkieTikkie(object.name, object.description, object.amount);
        } catch (e) { console.error(e) } 
        return null
    }
}