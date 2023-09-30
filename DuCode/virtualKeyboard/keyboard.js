const Keyboard = {

    /**
     * Keyboard elements.
     * @property {Object} elements
     */
    elements: {
        keyboardWrapper: null, // div class="keyboard keyboard--hidden"
        keysContainer: null, // div class="keyboard__keys"
        keys: [] // An array of all html <button>'s for keyboard with <br> delimiters
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
        // TODO: Create keyboardWrapper and keysContainer elements (2 lines of code)


        // TODO: Setup keyboardWrapper and keysContainer elements (2 lines of code)


        // TODO: Put keysContainer to keyboardWrapper (1 line of code)


        // TODO: create the buttons for keyboard and put to the 'keys' property (1 line of code)


        // TODO: Add to the DOM the keyboard (2 lines of code)


        // TODO: Open keyboard by clicking on an element '.use-keyboard-input'.
        //  And create the arrow function that will be sending the 'outputString'
        //  to the textarea or in other words that synchronizing
        //  buffer of all pressed keys with <textarea> value (recommended 6 lines of code)

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

            // TODO: (in cycle) Create the specified button html tag


            // TODO: (in cycle) Add attributes/classes to the specified button


            // TODO: (in cycle) Create some logic for the clicked button that includes different
            //  logic for special keys such as "backspace", "caps", "enter", "space" and "done".
            //  The default keys are numeric and letter's.
            switch (keyName) {
                case "backspace":
                    // TODO: ...

                    break;

                // TODO: ...

                default:
                    // TODO: (in cycle) Do some logic that will output to 'textarea'
                    //  lower/upper case letter or symbol by clicking on this button

                    break;
            }

            // TODO: (in cycle) Add the specified button to the buttons container


            // TODO: (in cycle) Create new row of keys if need it on this iteration



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

        return undefined;
    },

    /**
     * Calling oninput method of pressed key
     * @param {string} keyValue Value of pressed key
     * @private
     */
    _handlePressedKey(keyValue) {
        // TODO: call some function or method to add to textarea one more value of pressed key

    },

    /**
     * Toggles caps lock by flipping case of current keys.
     * @private
     */
    _toggleCapsLock() {
        // TODO: change "Caps Lock" state


        // TODO: change '.textContext' for an every letter's key to the uppercase or the lowercase

    },

    /**
     * Opens the keyboard overlay with initial value of output text.
     * @param {string} [initialValue] Initial value of output text
     * @param {Function} oninput Input callback handler that synchronizing
     *                           buffer of all pressed keys with <textarea> value
     */
    open(initialValue, oninput) {
        // TODO: initialize initial values for output string and 'oninput event handler' property
        //  and do some logic to show keyboard using 'keyboard--hidden' selector\

    },

    /**
     * Closes the keyboard overlay.
     */
    close() {
        // TODO: do some logic to hide keyboard using 'keyboard--hidden' selector
        //  and reset initial values for output string and 'oninput event handler' property

    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});


