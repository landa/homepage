"use client";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

function plainTextFromHtml(html) {
    return String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export async function createPost({ title, body }) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !plainTextFromHtml(body)) {
        throw new Error("Title and body are required.");
    }

    const ref = await addDoc(collection(db, "posts"), {
        title: trimmedTitle,
        body,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return ref.id;
}

export async function updatePost(id, { title, body }) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !plainTextFromHtml(body)) {
        throw new Error("Title and body are required.");
    }

    await updateDoc(doc(db, "posts", id), {
        title: trimmedTitle,
        body,
        updatedAt: serverTimestamp(),
    });
}

export async function deletePost(id) {
    await deleteDoc(doc(db, "posts", id));
}
