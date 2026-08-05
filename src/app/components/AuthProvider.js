"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
    ArchivedPostsList,
    BlogComposer,
} from "@/app/components/BlogAdminControls";
import { auth, googleProvider } from "@/lib/firebaseClient";
import { isAdminUser } from "@/lib/admin";

const AuthContext = createContext({
    user: null,
    isAdmin: false,
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        return () => unsub();
    }, []);

    const handleSignIn = async () => {
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError(err.message || "Sign-in failed.");
        }
    };

    const handleSignOut = async () => {
        setError("");
        await signOut(auth);
        setOpen(false);
    };

    const isAdmin = isAdminUser(user);
    const value = useMemo(() => ({ user, isAdmin }), [user, isAdmin]);

    return (
        <AuthContext.Provider value={value}>
            {children}

            <button
                type="button"
                aria-label="Admin"
                onClick={() => setOpen((current) => !current)}
                className="fixed bottom-3 left-3 z-50 h-4 w-4 rounded-full opacity-0 hover:opacity-30 focus:opacity-40"
                style={{ background: "var(--gray-8)" }}
            />

            {open && (
                <div className="fixed bottom-10 left-3 z-50 w-[280px] rounded-lg border border-[var(--gray-a5)] bg-[var(--color-panel-solid)] p-3 shadow-lg">
                    <Flex direction="column" gap="2">
                        <Text size="2" weight="medium">
                            Admin
                        </Text>
                        {!user ? (
                            <Button size="1" onClick={handleSignIn}>
                                Sign in with Google
                            </Button>
                        ) : (
                            <>
                                <Text size="1" color="gray">
                                    {user.email}
                                </Text>
                                <Text size="1" color={isAdmin ? "green" : "red"}>
                                    {isAdmin ? "Posting enabled" : "Not authorized"}
                                </Text>
                                {isAdmin && (
                                    <BlogComposer onOpenChange={() => setOpen(false)} />
                                )}
                                {isAdmin && <ArchivedPostsList />}
                                <Button size="1" color="red" variant="soft" onClick={handleSignOut}>
                                    Sign out
                                </Button>
                            </>
                        )}
                        {error && (
                            <Text size="1" color="red">
                                {error}
                            </Text>
                        )}
                    </Flex>
                </div>
            )}
        </AuthContext.Provider>
    );
}
