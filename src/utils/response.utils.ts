export function formatResponse(contacts: any) {
    // Find the primary contact
    const primaryContact = contacts.find((c: any) => c.linkPrecedence === 'primary');
    if (!primaryContact) {
        throw new Error('No primary contact found');
    }
    // Get all unique emails and phone numbers, primary first
    const emails = [primaryContact.email, ...contacts.filter((c: any) => c.id !== primaryContact.id && c.email && c.email !== primaryContact.email).map((c: any) => c.email)]
        .filter((v, i, a) => v && a.indexOf(v) === i);
    const phoneNumbers = [primaryContact.phone, ...contacts.filter((c: any) => c.id !== primaryContact.id && c.phone && c.phone !== primaryContact.phone).map((c: any) => c.phone)]
        .filter((v, i, a) => v && a.indexOf(v) === i);
    // Get all secondary contact IDs
    const secondaryContactIds = contacts.filter((c: any) => c.linkPrecedence === 'secondary').map((c: any) => c.id);

    return {
        contact: {
            primaryContatctId: primaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        }
    };
}