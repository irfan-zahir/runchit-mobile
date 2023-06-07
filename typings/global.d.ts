import { ConfirmationResult } from "firebase/auth"

declare global {
    interface Window { confirmationResult: ConfirmationResult; }
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});