// Import required modules
import express from "express";
import path from "path"; // Import path module for joining paths
import bodyParser from "body-parser";
import fs from "fs";

// Set up __dirname for ES modules
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of Express
const app = express();

var fromLoc = "";
var toLoc = "";

const badgeIDs = {
    "?": "danger",
    "A": "warning",
    "B": "info",
    "C": "success"
}

// Define the Location class to hold data for each facility
class Location {
    constructor(code, name, viewcode, description, block) {
        this.name = name;
        this.imagelink = `bg_${code}.png`;
        this.pfplink = `${code}_mini.jpg`;
        this.viewcode = viewcode;
        this.desc = description;
        this.block = block;
        this.badgeID = badgeIDs[block]
    }
}

const locationData = {
    // Special Locations
    "ecotrail": new Location("ecotrail", "EcoTrail @ RV", "https://my.matterport.com/show/?m=poaeVuV77Ro", "A winding path that blends nature with campus life. Discover the green within.", "?"),
    "library": new Location("library", "Renovated Library", "https://my.matterport.com/show/?m=RCoRDd7Li9u", "A sanctuary of stories. Now fresher than ever.", "?"),
    "new-basketball-court": new Location("bbc", "New Basketball Court", "https://panoraven.com/en/embed/zbFyWcWLXo", "Every bounce is a challenge. It's not just a court, it's a battlefield", "?"),
    "canteen": new Location("canteen", "School Canteen", "https://panoraven.com/en/embed/i0s8Ls8ekZ", "The daily hub of flavor and chatter, served fresh.", "?"),
    "scholars-court": new Location("scholar", "Scholar's Court", "https://panoraven.com/en/embed/YhRO2FnwMW", "Where minds meet and ideas take root. A space for quiet brilliance.", "?"),
    "the-spring": new Location("spring", "The Spring", "https://panoraven.com/en/embed/nwE79dyoOX", "The finest mental health support Singapore has to offer.", "?"),
    "rejuvenate": new Location("reju", "Rejuvenate!", "https://panoraven.com/en/embed/rhL2j8pgkg", "A place to pause, unwind, and recharge. Comfort meets necessity.", "?"),

    // NPC Ahh Locations
    "auditorium": new Location("audi", "Auditorium", "https://my.matterport.com/show/?m=ZPw8SBYkJ8d", "The stage for everything that matters.", "?"),
    "good-news-cafe": new Location("gnc", "Good News Café", "https://panoraven.com/en/embed/Wc82IialIq", "The taste that lingers. It's flavor. It's comfort. It's your new obsession.", "?"),
    "field": new Location("field", "Field", "https://panoraven.com/en/embed/MMosdULmaN", "Where games are played, dreams are chased, and every blade of grass has a story.", "?"),
    "grandstand": new Location("grandstand", "Grandstand", "https://panoraven.com/en/embed/w9GqbCFDvg", "Where pride is raised and history stands tall. Flags fly, spirits rise.", "?"),
    "foyer": new Location("foyer", "Foyer", "https://panoraven.com/en/embed/3u1CkASOn7", "The gateway to everything.", "?"),
    "fce-kitchen": new Location("fce", "FCE Kitchen", "https://panoraven.com/en/embed/d4au2Pumvu", "Where ingredients become masterpieces.", "?"),
    "big-e": new Location("big_e", "Big E", "https://panoraven.com/en/embed/ucWg5XLYTe", "A hub for problem-solvers.", "?"),
    "fitness-corner": new Location("fitness", "Fitness Corner", "https://panoraven.com/en/embed/bM4Yg7riwj", "Where strength is built and limits are tested. Push past the usual.", "?"),
    "table-tennis-room": new Location("tt", "Table Tennis Room", "https://panoraven.com/en/embed/McMSU2wQKK", "Where every serve is a strategy.", "?"),
    "art-room": new Location("art", "Art Room", "https://panoraven.com/en/embed/HTDqWcnLoO", "Where imagination meets canvas.", "?"),
    "slda-room": new Location("slda", "SLDA Room", "https://panoraven.com/en/embed/JTzbzU5LhW", "The forge where leaders are shaped.", "?"),
    "dnt-room": new Location("dntr", "D&T Workshop", "https://panoraven.com/en/embed/FHNPWPBRuy", "Craft, create, and conquer the future.", "?"),

    // Additional Locations
    "chemistry-lab": new Location("chem", "Chemistry Lab", "https://panoraven.com/en/embed/6zlKgNLEUa", "Where reactions speak louder than words.", "?"),
    "dnt-studio": new Location("dnts", "D&T Studio", "https://panoraven.com/en/embed/sxQuGjX6xh", "From blueprints to breakthroughs.", "?"),
    "physics-in-action-lab": new Location("pia", "Physics in Action Lab", "https://panoraven.com/en/embed/8e7W2cTRBi", "Hands-on with the universe.", "?"),
    "lecture-theater-1": new Location("lt", "Lecture Theater 1", "https://panoraven.com/en/embed/gCL630uxnJ", "Echoes of ideas, amplified.", "?"),
    "collaboration-hub": new Location("collab", "Collaboration Hub", "https://panoraven.com/en/embed/yGpcajTqBs", "Built for brains that think better together.", "?"),
    "senior-high-lounge": new Location("lounge", "Senior High Lounge", "https://panoraven.com/en/embed/vd3ibq3Roe", "The calm after the academic storm.", "?"),
    "chinese-orchestra-room": new Location("co", "Chinese Orchestra Room", "https://panoraven.com/en/embed/k1Qa2xHfe0", "Where tradition strikes a chord.", "?"),
    "band-room": new Location("band", "Band Room", "https://panoraven.com/en/embed/jcOh1XoGDM", "Where sound becomes soul.", "?"),
    "icode-lab": new Location("icode", "iCode Lab", "https://panoraven.com/en/embed/Nx52Zc18CE", "Type fast. Think faster.", "?"),
    "ecg-room": new Location("ecg", "Education and Career Guidance Room", "https://panoraven.com/en/embed/CudguwcHTJ", "Plan smarter. Dream bigger.", "?"),
    "mla-room": new Location("mla", "Mathematics Leaders Academy Room", "https://panoraven.com/en/embed/LqnDAwDqnB", "Shaping thinkers. Crafting problem solvers.", "?")
};

const cca_socials = {
    "art_club": "rvhs_art",
    "chinese_calligraphy": "rvclcalligraphy",
    "chinese_orchestra": "_rvco_",
    "choir": "rivervalleysings",
    "concert_band": "cueandjerk",
    "dance_society": "rvdancesociety",
    "eagle_scouts": "rveaglescouts",
    "girl_guides": "rivervalleygirlguides/",
    "guitar_ensemble": "rv.guitar",
    "mathematics_leaders_academy": "rvhs.mla",
    "national_cadet_corps": "rvncc",
    "st_john_brigade": "rvsjb_",
    "science_leaders_academy": "rvhs_sla"
}

function getImagesDataByPrefix(prefix) {
    const imageDir = path.join(__dirname, "public", "images");
    const files = fs.readdirSync(imageDir);

    const result = [];

    const regex = new RegExp(`^${prefix}_(.+)_(\\d+)\\.(jpg|jpeg|png)$`, 'i');

    files.forEach(file => {
        const match = file.match(regex);
        if (match) {
            const rawType = match[1]; // e.g., "open_house" or "RV69"
            const imgPath = `/images/${file}`;

            const formattedType = rawType
                .split('_')
                .map(word => {
                    if (word.toUpperCase() === word || /^\d+$/.test(word)) return word;
                    if (/^[a-zA-Z]+\d+$/.test(word)) return word.toUpperCase();
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                })
                .join(' ');

            result.push({
                type: formattedType,
                img: imgPath
            });
        }
    });

    result.sort((a, b) => a.type.localeCompare(b.type));

    return result;
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

// Route to render the facilities tour page
app.get("/facilities", (req, res) => {
    res.render("tour", {
        "facilities": locationData
    });
});

// Route to render about RV page
app.get("/about-rv", (req, res) => {
    res.render("about", {
        "events": getImagesDataByPrefix("events"),
        "ccas": getImagesDataByPrefix("ccas"),
        "cca_socials": cca_socials
    });
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
