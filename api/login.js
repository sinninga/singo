export default async function handler(req, res) {
    var scope = "streaming \
                user-read-email \
                user-read-private \
                user-read-playback-state \
                user-modify-playback-state"

    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "https://slingo.vercel.app/auth/callback",
        state: state
    })

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
}