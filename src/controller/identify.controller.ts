import { addNewContactToDB, checkIfEmailOrPhoneExists, fetchContacts, updateContact } from "../repository/identify.repository";
import { formatResponse } from "../utils/response.utils";

export async function identifyContact(payload: { email: string, phone: string }) {
    try {
        // if contact is present return contact in prescribed format
        const contacts = await fetchContacts(payload);
        if (contacts && contacts.length > 0) {
            return formatResponse(contacts);
        }


        // if contact is not present create new one
        // if incoming request has either email or phone in db then incoming service will create secondary contact and link it to primary contact
        const contact = await checkIfEmailOrPhoneExists(payload);
        // check if email or phone is new 
        const isEmailNew = !contact?.some((contact) => contact.email === payload.email);
        const isPhoneNew = !contact?.some((contact) => contact.phone === payload.phone);
        // && (contactWithEmail !== undefined && contactWithPhone !== undefined)
        if (contact && (isEmailNew || isPhoneNew)) {
            // sort contacts by createdAt to find older contact
            const olderContact = contact.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            // add new contact to db with linkPrecedence secondary and linkedId as contact id
            await addNewContactToDB({ ...payload, linkPrecedence: "secondary", linkedId: olderContact[0].id });
            const contacts = await fetchContacts(payload);
            return formatResponse(contacts);
        }
        // if both email and phone are present as different entries
        else if (contact && !isEmailNew && !isPhoneNew) {
            // fetch the younger contact and update its linkPrecedence to secondary and linkedId to older contact id
            const olderContact = contact.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            // need to check if contact is already linked to older contact
            if (olderContact[olderContact.length - 1].linkedId === olderContact[0].id) {
                console.log("Contact is already linked to older contact");
                const contacts = await checkIfEmailOrPhoneExists(payload);
                return formatResponse(contacts);
            }

            await updateContact({
                id: olderContact[olderContact.length - 1].id,
                linkedId: olderContact[0].id
            })
            const contacts = await checkIfEmailOrPhoneExists(payload);
            return formatResponse(contacts);
        }

        // if incoming request doesn't have both email and phone then incoming service will create primary contact
        await addNewContactToDB({ ...payload, linkPrecedence: "primary" });
        return formatResponse(await fetchContacts(payload));

    } catch (error) {
        throw error;
    }
}