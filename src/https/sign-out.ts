export const signOutRedirect = (): void => {
    const clientId = '2noitmshfthr2ha1s1amr8iafp';
    const logoutUri = 'http://localhost:8080/signout';
    const cognitoDomain = 'https://exercise-tracker-domain.auth.us-east-1.amazoncognito.com';
    const responseType = 'code';

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}&redirect_uri=${encodeURIComponent(logoutUri)}&response_type=${responseType}`;
};
