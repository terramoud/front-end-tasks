const Keyboard = {

    /**
     * Keyboard elements.
     * @property {Object} elements
     */
    elements: {
        keyboardWrapper: null,
        keysContainer: null,
        keys: []
    },

    /**
     * Keyboard event handlers. Contains function for pressed key
     * @property {Object} eventHandlers
     */
    eventHandlers: {
        oninput: null
    },

    /**
     * Keyboard properties.
     * The outputString is a buffer that contains all pressed keys that
     * represents output string of text
     * @property {Object} properties
     */
    properties: {
        outputString: "",
        isCapsLockPressed: false
    },

    /**
     * Initialize the keyboard by creating the elements and attaching event listeners.
     */
    init() {
        this.elements.keyboardWrapper = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.keyboardWrapper.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.keyboardWrapper.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.keyboardWrapper);

        const textField = document.querySelector(".use-keyboard-input");
        textField.addEventListener("focus", () => {
            this.open(textField.value, currentPressedKeyValue => {
                textField.value = currentPressedKeyValue;
            });
        });
    },

    /**
     * Creates the HTML for the keyboard keys.
     * @returns {DocumentFragment} Fragment containing the key elements
     * @private
     */
    _createKeys() {
        // The initial values for keyboard
        const buttonsContainer = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this._createHTMLIconForButton("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.outputString =
                            this.properties.outputString.substring(0, this.properties.outputString.length - 1);
                        this._handlePressedKey(this.properties.outputString);
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = this._createHTMLIconForButton("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.isCapsLockPressed);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = this._createHTMLIconForButton("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.outputString += "\n";
                        this._handlePressedKey(this.properties.outputString);
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = this._createHTMLIconForButton("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.outputString += " ";
                        this._handlePressedKey(this.properties.outputString);
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = this._createHTMLIconForButton("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.outputString += this.properties.isCapsLockPressed ? key.toUpperCase() : key.toLowerCase();
                        this._handlePressedKey(this.properties.outputString);
                    });

                    break;
            }

            buttonsContainer.appendChild(keyElement);

            if (insertLineBreak) {
                buttonsContainer.appendChild(document.createElement("br"));
            }
        });

        return buttonsContainer;
    },

    /**
     * Creates HTML for an icon
     * @param {string} icon_name Icon name
     * @returns {string} Html tag that represent material icon
     * @private
     */
    _createHTMLIconForButton(icon_name) {
        return `<i class="material-icons">${icon_name}</i>`;
    },

    /**
     * Calling oninput method of pressed key
     * @param {string} keyValue Value of pressed key
     * @private
     */
    _handlePressedKey(keyValue) {
        if (typeof this.eventHandlers.oninput == "function") {
            this.eventHandlers.oninput(keyValue);
        }
    },

    /**
     * Toggles caps lock by flipping case of current keys.
     * @private
     */
    _toggleCapsLock() {
        this.properties.isCapsLockPressed = !this.properties.isCapsLockPressed;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.isCapsLockPressed ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    /**
     * Opens the keyboard overlay with initial value of output text.
     * @param {string} [initialValue] Initial value of output text
     * @param {Function} oninput Input callback handler that
     */
    open(initialValue, oninput) {
        this.properties.outputString = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.elements.keyboardWrapper.classList.remove("keyboard--hidden");
    },

    /**
     * Closes the keyboard overlay.
     */
    close() {
        this.properties.outputString = "";
        this.eventHandlers.oninput = null;
        this.elements.keyboardWrapper.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});


