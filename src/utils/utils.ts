export const internationalizePhoneNumber = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/[^0-9]/g, '');

    if (cleaned.startsWith('0')) {
        return '+254' + cleaned.slice(1);
    }

    if (cleaned.startsWith('254')) {
        return '+254' + cleaned.slice(3);
    }

    if (cleaned.startsWith('7') || cleaned.startsWith('1')) {
        return '+254' + cleaned;
    }

    throw new Error('Invalid Kenyan phone number format');
};