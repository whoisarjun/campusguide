// Import required modules
import express from "express";
import path from "path"; // Import path module for joining paths
import bodyParser from "body-parser";

// Set up __dirname for ES modules
const __dirname = path.dirname(new URL(
    import.meta.url).pathname);

// Create an instance of Express
const app = express();

var fromLoc = "";
var toLoc = "";

// Define the Location class to hold data for each facility
class Location {
    constructor(name, imagelink, level, viewcode, description) {
        this.name = name;
        this.imagelink = imagelink;
        this.level = level;
        this.viewcode = viewcode;
        this.desc = description;
    }
}

// Map of all locations and their corresponding details
const locationData = {
    // Special Locations
    "ecotrail": new Location("EcoTrail @ RV", "bg_ecotrail.png", 0, "https://my.matterport.com/show/?m=poaeVuV77Ro&dh=0", "A winding path that blends nature with campus life. Discover the green within."),
    "library": new Location("Renovated Library", "bg_library.png", 0, "https://my.matterport.com/show/?m=RCoRDd7Li9u&dh=0", "A sanctuary of stories. Now fresher than ever."),
    "new-basketball-court": new Location("New Basketball Court", "bg_court.png", 0, "https://panoraven.com/en/embed/zbFyWcWLXo", "Every bounce is a challenge. It's not just a court, it's a battlefield"),
    "canteen": new Location("School Canteen", "bg_canteen.png", 0, "https://panoraven.com/en/embed/i0s8Ls8ekZ", "The daily hub of flavor and chatter, served fresh."),
    "scholars-court": new Location("Scholar's Court", "bg_scholar.png", 0, "https://panoraven.com/en/embed/YhRO2FnwMW", "Where minds meet and ideas take root. A space for quiet brilliance."),
    "the-spring": new Location("The Spring", "bg_spring.png", 0, "https://panoraven.com/en/embed/nwE79dyoOX", "The finest mental health support Singapore has to offer."),
    "rejuvenate": new Location("Rejuvenate!", "bg_rejuvenate.png", 0, "https://panoraven.com/en/embed/rhL2j8pgkg", "A place to pause, unwind, and recharge. Comfort meets necessity."),


    // NPC Ahh Locations
    "auditorium": new Location("Auditorium", "bg_audi.png", 0, "https://my.matterport.com/show/?m=ZPw8SBYkJ8d", "The stage for everything that matters."),
    "good-news-cafe": new Location("Good News Café", "bg_gnc.png", 0, "https://panoraven.com/en/embed/Wc82IialIq", "The taste that lingers. It's flavor. It's comfort. It's your new obsession."),
    "field": new Location("Field", "bg_field.png", 0, "https://panoraven.com/en/embed/MMosdULmaN", "Where games are played, dreams are chased, and every blade of grass has a story."),
    "grandstand": new Location("Grandstand", "bg_grandstand.png", 0, "https://panoraven.com/en/embed/w9GqbCFDvg", "Where pride is raised and history stands tall. Flags fly, spirits rise."),
    "foyer": new Location("Foyer", "bg_foyer.png", 0, "https://panoraven.com/en/embed/3u1CkASOn7", "The gateway to everything."),
    "fce-room": new Location("FCE Room", "bg_fce.png", 2, "https://panoraven.com/en/embed/5ASV5TvQwW", "Where ingredients become masterpieces."),
    "big-e": new Location("Big E", "bg_big_e.png", 1, "https://panoraven.com/en/embed/A7rQMrzlGA", "A hub for problem-solvers."),
    "fitness-corner": new Location("Fitness Corner", "bg_fitness_corner.png", 1, "https://panoraven.com/en/embed/bM4Yg7riwj", "Where strength is built and limits are tested. Push past the usual."),
    "table-tennis-room": new Location("Table Tennis Room", "bg_tt_room.png", 4, "https://panoraven.com/en/embed/McMSU2wQKK", "Where every serve is a strategy."),
    "art-room": new Location("Art Room", "bg_art.png", 1, "https://panoraven.com/en/embed/HTDqWcnLoO", "Where imagination meets canvas."),
    "slda-room": new Location("SLDA Room", "bg_slda.png", 1, "https://panoraven.com/en/embed/9GSOZlhFUO", "The forge where leaders are shaped."),
    "dnt-room": new Location("D&T Workshop", "bg_dnt.png", 1, "https://panoraven.com/en/embed/FHNPWPBRuy", "Craft, create, and conquer the future.")
}

// Middleware to serve static files and parse incoming request bodies
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.set('views', 'views');

// Route to render the homepage
app.get("/", (req, res) => {
    res.render("home");
});

// Route to render the directions page
app.get("/directions", (req, res) => {
    res.render("dir");
});

// Route to redirect 3D tour to homepage
app.get("/3d-tour", (req, res) => {
    res.redirect("/")
    // res.render("tour3d");
});

// Route to render the facilities tour page
app.get("/facilities", (req, res) => {
    res.render("tour");
});

// Route to render about RV page
app.get("/about-rv", (req, res) => {
    res.render("about");
});

// Render a specific facility based on its name
app.get("/facilities/*", (req, res) => {
    const facName = req.params[0];
    res.render("facility", {
        "facilityData": locationData[facName]
    });
});

// Redirect POST request to specific facility route
app.post("/facilities", (req, res) => {
    const location = req.body.location;
    res.redirect(`/facilities/${location}`)
});

// Route for fallback/blank page
app.get("/*", (req, res) => {
    res.render("404");
});

// Start the server
const PORT = 6969;
app.listen(PORT, () => {
    // Log when the server starts
    console.log(`Server started on port ${PORT}`);
});
