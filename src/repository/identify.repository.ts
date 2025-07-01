import { and, eq, or } from "drizzle-orm";

import db from "./db"
import { contacts } from "./schema"

export async function addNewContactToDB(payload: { email: string, phone: string, linkPrecedence: string, linkedId?: number }) {
    try {
        const insertPayload = {
            email: payload.email,
            phone: payload.phone,
            linkedId: payload.linkedId ?? null,
            linkPrecedence: payload.linkPrecedence,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(contacts).values(insertPayload)
    } catch (error) {
        throw error;
    }
}

export async function checkIfEmailOrPhoneExists(payload: { email: string, phone: string }) {
    try {
        return await db.select().from(contacts).where(or(eq(contacts.email, payload.email), eq(contacts.phone, payload.phone)))
    } catch (error) {
        throw error;
    }
}

export async function fetchContacts(payload: { email: string, phone: string }) {
    try {
        return await db.select().from(contacts).where(and(eq(contacts.email, payload.email), eq(contacts.phone, payload.phone)))
    } catch (error) {
        throw error;
    }
}

export async function updateContact(payload: { id: number, linkedId: number }) {
    try {
        await db.update(contacts).set({ linkedId: payload.linkedId, linkPrecedence: "secondary", updatedAt: new Date() }).where(eq(contacts.id, payload.id))
    } catch (error) {
        throw error;
    }
}