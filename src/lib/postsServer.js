import { initializeApp, getApps } from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import { firebaseConfig } from "@/lib/firebaseConfig";

function getDb() {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return getFirestore(app);
}

function serializePost(snapshot) {
    const data = snapshot.data();
    const createdAt = data.createdAt?.toDate?.() ?? null;
    return {
        id: snapshot.id,
        title: data.title ?? "",
        body: data.body ?? "",
        createdAt: createdAt ? createdAt.toISOString() : null,
    };
}

export async function getPosts() {
    const postsQuery = query(collection(getDb(), "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);
    return snapshot.docs.map(serializePost);
}

export async function getPost(id) {
    const snapshot = await getDoc(doc(getDb(), "posts", id));
    if (!snapshot.exists()) return null;
    return serializePost(snapshot);
}
