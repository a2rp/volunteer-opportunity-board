const getDateOffset = (days) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const volunteerOpportunities = [
    {
        id: "river-path-care",
        title: "Care for the river path",
        organization: "Northbank Green Team",
        cause: "Environment",
        location: "River Ward",
        address: "18 Market Lane",
        date: getDateOffset(2),
        startTime: "09:00",
        durationHours: 2,
        filled: 6,
        capacity: 12,
        summary:
            "Help clear the riverside path, sort litter, and leave the water's edge ready for a busy weekend.",
        details:
            "Meet the Green Team at the footbridge. Gloves, bags, and a short safety briefing are provided. Bring water and shoes you do not mind getting muddy.",
        image: "river-care.jpg",
        imageAlt: "A person standing near a wide waterfall",
        accent: "coral",
    },
    {
        id: "shelter-dog-walk",
        title: "Take shelter dogs outside",
        organization: "Paws & Paths Shelter",
        cause: "Animals",
        location: "Hilltop",
        address: "42 Cedar Avenue",
        date: getDateOffset(3),
        startTime: "10:30",
        durationHours: 1,
        filled: 4,
        capacity: 8,
        summary:
            "Give a friendly dog a calm walk and a little company between visits from their future family.",
        details:
            "A shelter volunteer will pair you with a dog and show you the nearby walking loop. No experience is needed. Volunteers must be 18 or older.",
        image: "dog-volunteer.jpg",
        imageAlt: "A person spending time with a dog on a grassy path",
        accent: "gold",
    },
    {
        id: "garden-bed-prep",
        title: "Prepare beds for spring planting",
        organization: "Cedar Street Garden",
        cause: "Food support",
        location: "Old Market",
        address: "7 Cedar Street",
        date: getDateOffset(4),
        startTime: "08:30",
        durationHours: 2,
        filled: 8,
        capacity: 14,
        summary:
            "Turn compost, label seed trays, and get the shared garden ready to grow food for nearby families.",
        details:
            "The garden team will share tools and a quick task rundown at the entrance. Wear clothes for outdoor work. You can take home a packet of seeds.",
        image: "trail-care.jpg",
        imageAlt: "A green hillside with a winding path",
        accent: "sage",
    },
    {
        id: "pantry-packing",
        title: "Pack pantry boxes",
        organization: "Northbank Community Pantry",
        cause: "Food support",
        location: "River Ward",
        address: "5 Market Lane",
        date: getDateOffset(5),
        startTime: "13:00",
        durationHours: 2,
        filled: 9,
        capacity: 15,
        summary:
            "Sort fresh produce and pack grocery boxes for neighbors picking up their weekly essentials.",
        details:
            "This indoor shift is seated or standing, with tasks available for different mobility needs. Please wear closed-toe shoes and check in at the front desk.",
        accent: "coral",
    },
    {
        id: "trail-planting",
        title: "Plant native shade trees",
        organization: "Friends of Hilltop Park",
        cause: "Environment",
        location: "Hilltop",
        address: "Hilltop Park north gate",
        date: getDateOffset(7),
        startTime: "09:30",
        durationHours: 3,
        filled: 5,
        capacity: 16,
        summary:
            "Work with the park crew to add young native trees along the walking loop and restore a shady stretch.",
        details:
            "The crew provides seedlings, gloves, and hand tools. Volunteers should be comfortable working outside and lifting a small watering can.",
        image: "forest-care.jpg",
        imageAlt: "A misty forest with tall trees",
        accent: "sage",
    },
    {
        id: "reading-pals",
        title: "Read with a young learner",
        organization: "Open Pages Project",
        cause: "Learning",
        location: "Civic Square",
        address: "2 Library Lane",
        date: getDateOffset(8),
        startTime: "15:30",
        durationHours: 1,
        filled: 3,
        capacity: 7,
        summary:
            "Share a story, help a child practice reading, and make the library feel like a place to belong.",
        details:
            "A coordinator will pair you with a learner and provide books for the session. A short orientation is included before your first visit.",
        accent: "gold",
    },
    {
        id: "shoreline-count",
        title: "Count birds along the shore",
        organization: "Riverwatch Neighbors",
        cause: "Environment",
        location: "Eastbank",
        address: "Eastbank boardwalk entrance",
        date: getDateOffset(10),
        startTime: "07:30",
        durationHours: 2,
        filled: 4,
        capacity: 10,
        summary:
            "Join a gentle shoreline walk and help record bird sightings for a local habitat study.",
        details:
            "No birding experience is required. A guide will bring checklists and binoculars to share. Dress for the weather and expect to walk about one mile.",
        image: "shoreline-care.jpg",
        imageAlt: "A rocky shoreline beside open water",
        accent: "coral",
    },
    {
        id: "welcome-table",
        title: "Welcome guests at the meal table",
        organization: "Warm Welcome Centre",
        cause: "Community",
        location: "Old Market",
        address: "11 Orchard Road",
        date: getDateOffset(12),
        startTime: "17:00",
        durationHours: 2,
        filled: 7,
        capacity: 12,
        summary:
            "Help set tables, greet guests, and make a shared neighborhood dinner feel warm and easy to join.",
        details:
            "Choose a setup or guest welcome role. The team will review the menu and allergy process together before doors open. Food is provided after the shift.",
        accent: "gold",
    },
];
