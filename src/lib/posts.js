"use client";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
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
        archived: false,
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

export async function setPostArchived(id, archived) {
    await updateDoc(doc(db, "posts", id), {
        archived: Boolean(archived),
        updatedAt: serverTimestamp(),
    });
}

/** Admin: archived posts (filtered client-side so legacy docs without the field still work). */
export async function listArchivedPosts() {
    const snapshot = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc")),
    );
    return snapshot.docs
        .map((item) => {
            const data = item.data();
            const createdAt = data.createdAt?.toDate?.() ?? null;
            return {
                id: item.id,
                title: data.title ?? "",
                body: data.body ?? "",
                archived: Boolean(data.archived),
                createdAt: createdAt ? createdAt.toISOString() : null,
            };
        })
        .filter((post) => post.archived);
}
