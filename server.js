import express from "express";
import path from "path"; // Import path module for joining paths
import bodyParser from "body-parser";

const __dirname = path.dirname(new URL(
    import.meta.url).pathname);

const app = express();

var fromLoc = "";
var toLoc = "";

class Location {
    constructor(name, imagelink, level, viewcode, description) {
        this.name = name;
        this.imagelink = imagelink;
        this.level = level,
        this.viewcode = viewcode;
        this.desc = description;
    }
}

const locationData = {
    // Special Locations
    "ecotrail": new Location("EcoTrail @ RV", "ecotrail-mini.jpeg", 0, "TLeKFwI914", "Something about the eco-trail. It is green. It is eco. It is a trail."),
    "library": new Location("Renovated Library", "library-mini.jpeg", 0, "hU7i4X8Rcj", "A sanctuary of stories. Now fresher than ever."),
    "new-basketball-court": new Location("New Basketball Court", 0, "basketball-court-mini.jpg", "XmV0S1QzLP", "Every bounce is a challenge. It's not just a court, it's a battlefield"),
    "good-news-cafe": new Location("Good News Café", "gnc-mini.jpg", 0, "Wc82IialIq", "The taste that lingers. It's flavor. It's comfort. It's your new obsession."),
    "school-track": new Location("School Track", "track-mini.jpg", 0, "tXA0EeT77o", "The path where endurance meets determination."),
    "the-spring": new Location("The Spring", "spring-mini.jpg", 0, "nwE79dyoOX", "The finest mental health support Singapore has to offer."),

    // Block F Location
    "fce-room": new Location("FCE Room", "fce-room-mini.jpg", 2, "5ASV5TvQwW", "Where ingredients become masterpieces."),
    "big-e": new Location("Big E", "big-e-mini.jpg", 1, "A7rQMrzlGA", "A hub for problem-solvers."),
    "table-tennis-room": new Location("Table Tennis Room", "table-tennis-room-mini.jpg", 4, "ilsi8v3GxJ", "Where every serve is a strategy."),
    "art-room": new Location("Art Room", "art-room-mini.jpg", 1, "HTDqWcnLoO", "Where imagination meets canvas."),
    "slda-room": new Location("SLDA Room", "slda-room-mini.jpg", 1, "9GSOZlhFUO", "The forge where leaders are shaped."),
    "dnt-room": new Location("D&T Workshop", "dnt-room-mini.jpg", 1, "FHNPWPBRuy", "Craft, create, and conquer the future.")
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/directions", (req, res) => {
    res.render("dir");
});

app.get("/3d-tour", (req, res) => {
    res.render("tour3d");
});

app.get("/facilities", (req, res) => {
    res.render("tour");
});

app.post("/directions", (req, res) => {
    const fromLocation = req.body.fromLocation;
    const toLocation = req.body.toLocation;

    // Handle the submitted data
    fromLoc = fromLocation;
    toLoc = toLocation;

    res.redirect("/directions/path")
});

app.get("/directions/path", (req, res) => {
    res.render("directionresults", {
        "from": fromLoc,
        "to": toLoc,
        "fromLoc": locationData[fromLoc],
        "toLoc": locationData[toLoc]
    });
});

app.post('/directions/path', (req, res) => {

    res.redirect("/facilities");
    const { from, to } = req.body;

    fromLoc = from;
    toLoc = to;
});

app.get("/facilities/*", (req, res) => {
    const facName = req.params[0];
    res.render("facility", {
        "facilityData": locationData[facName]
    });
});

app.post("/facilities", (req, res) => {
    const location = req.body.location;
    res.redirect(`/facilities/${location}`)
});

app.get("/blank", (req, res) => {
    res.render("404");
});

const PORT = 6969;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
