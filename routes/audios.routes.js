if (process.env.NODE_ENV !== "production") require("dotenv").config();
const router = require("express").Router();
const SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

spotifyApi.clientCredentialsGrant().then(
    function(data) {
        console.log("Access Token Will Expire In", data.body["expires_in"]);

        spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function(err) {
        console.log("Error while retrieving access token", err.message);
    }
);

/**
 * @route /audio/search?term="keyword(s)",
 * @description Search songs using keyword(s)[song name, artist name, album name]
 * @access public
 */
router.get("/search", (req, res) => {
    let term = req.query.term
    spotifyApi
        .searchTracks(term, { limit: 20 })
        .then((data) => {
            let results = data.body;
            res.send(results)
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/features', (req, res) => {
    let id = req.query.id;
    spotifyApi.getAudioFeaturesForTrack(id).then((data) => {
        let results = data.body;
        res.status(200).json({
            results,
            success: true
        })
    }).catch(err => {
        res.status(err.body.error.status).json({
            err
        })
    })
})

router.post('/analysis', (req, res) => {
    let id = req.query.id;
    spotifyApi.getAudioAnalysisForTrack(id).then((data) => {
        let results = data.body;
        res.status(200).json({
            results,
            success: true
        })
    }).catch(err => {
        res.status(err.body.error.status).json({
            err
        })
    })
})

module.exports = router;