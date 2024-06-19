export class FormValidator {
    static validateForm(fields, formBtn) {
        const isValid = fields.every(item => item.valid);
        if (isValid) {
            formBtn.removeAttribute('disabled');
        } else {
            formBtn.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }
}