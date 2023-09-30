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
        // TODO: Create main elements (2 lines of code)
        this.elements.keyboardWrapper = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // TODO: Setup main elements (3 lines of code)
        this.elements.keyboardWrapper.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        // TODO: initialize the 'keys' property (1 line of code)
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // TODO: Add to the DOM the keyboard (2 lines of code)
        this.elements.keyboardWrapper.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.keyboardWrapper);

        // TODO: Automatically use keyboard for element with .use-keyboard-input (min 4 lines of code)
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

        // TODO: implement logic for creation every key from 'key layout' that breaking to rows by delimiter
        keyLayout.forEach(key => {
            // TODO: (in cycle) Create the specified button html tag
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // TODO: (in cycle) Add attributes/classes to the specified button
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            // TODO: (in cycle) Create some logic for the clicked button that includes different
            //  logic for special keys such as "backspace", "caps", "enter", "space" and "done".
            //  The default keys are numeric and letter's.
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
                    // TODO: (in cycle) Do some logic that will output lower/upper case letter
                    //  or symbol by clicking on this button
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.outputString += this.properties.isCapsLockPressed ? key.toUpperCase() : key.toLowerCase();
                        this._handlePressedKey(this.properties.outputString);
                    });

                    break;
            }

            // TODO: (in cycle) Add the specified button to the buttons container
            buttonsContainer.appendChild(keyElement);

            // TODO: (in cycle) Create new row of keys if need it on this iteration
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
        // TODO: create and return <i> tag with material-icons class and name from parameter
        return `<i class="material-icons">${icon_name}</i>`;
    },

    /**
     * Calling oninput method of pressed key
     * @param {string} keyValue Value of pressed key
     * @private
     */
    _handlePressedKey(keyValue) {
        // TODO: call some function or method to add to textarea one more value of pressed key
        if (typeof this.eventHandlers.oninput == "function") {
            this.eventHandlers.oninput(keyValue);
        }
    },

    /**
     * Toggles caps lock by flipping case of current keys.
     * @private
     */
    _toggleCapsLock() {
        // TODO: change "Caps Lock" state
        this.properties.isCapsLockPressed = !this.properties.isCapsLockPressed;

        // TODO: change name for an every key to the uppercase or the lowercase
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
        // TODO: initialize initial values for output string and 'oninput event handler' property
        //  and do some logic to show keyboard using 'keyboard--hidden' selector
        this.properties.outputString = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.elements.keyboardWrapper.classList.remove("keyboard--hidden");
    },

    /**
     * Closes the keyboard overlay.
     */
    close() {
        // TODO: do some logic to hide keyboard using 'keyboard--hidden' selector
        //  and reset initial values for output string and 'oninput event handler' property
        this.properties.outputString = "";
        this.eventHandlers.oninput = null;
        this.elements.keyboardWrapper.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});


