export const ADMIN_UID = "b4fw5YcvyhPaVA5sEJlqGypZoS32";

export function isAdminUser(user) {
    return Boolean(user && user.uid === ADMIN_UID);
}
