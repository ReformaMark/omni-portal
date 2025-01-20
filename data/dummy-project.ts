
export interface ProjectDummyType {
    projectName: string;
    tagName: string;
    projectLocation: string;
    photo?: string | null;
}

export const projectDummy: ProjectDummyType[] = [
    {
        projectLocation: "Bacoor, Rizal",
        projectName: "Living Water Subdivision",
        tagName: "LWS",
        photo: "/living-water.jfif",
    },
    {
        projectLocation: "Quezon City, Metro Manila",
        projectName: "Skyline Residences",
        tagName: "SR",
        photo: "/hhe.png",
    },
    {
        projectLocation: "Makati, Metro Manila",
        projectName: "Greenbelt Parkplace",
        tagName: "GP",
        photo: "/living-water.jfif",
    },
    {
        projectLocation: "Taguig, Metro Manila",
        projectName: "Bonifacio Global City",
        tagName: "BGC",
        photo: "/hhe.png",
    },
    {
        projectLocation: "Pasig, Metro Manila",
        projectName: "Ortigas Center",
        tagName: "OC",
        photo: "/living-water.jfif",
    },
];
