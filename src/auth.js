export function authWithEmailAndPass(email, pass) {
    const API = "AIzaSyCtSSzPAuLCGDh8pPS5NJobmqfgSOmOTMw";
    return fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
        {
            method: "POST",
            body: JSON.stringify({ email, pass, returnSecureToken: true }),
            headers: {
                "Content-type": "application/json",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => console.log(data));
}
