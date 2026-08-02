"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { Card, Text, Flex, Button } from "@radix-ui/themes";
import { isAdminUser } from "@/lib/admin";

export default function AdminPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    const handleSignIn = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    const isAdmin = isAdminUser(user);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Card>
                    <Flex direction="column" gap="4">
                        {!user ? (
                            <>
                                <Text size="5" weight="bold">Admin</Text>
                                <Text size="3" color="gray">Sign in to manage Firebase</Text>
                                <Button onClick={handleSignIn}>Sign in with Google</Button>
                            </>
                        ) : (
                            <>
                                <Text size="5" weight="bold">Welcome</Text>
                                <Text size="3" color="gray">{user.email}</Text>
                                <Text size="2" color="gray">UID: {user.uid}</Text>
                                <Text size="2" color={isAdmin ? "green" : "red"}>
                                    Admin: {isAdmin ? "yes" : "no"}
                                </Text>
                                <Flex gap="3">
                                    <Button onClick={handleSignOut} color="red">Sign out</Button>
                                </Flex>
                            </>
                        )}
                    </Flex>
                </Card>
            </main>
        </div>
    );
}
