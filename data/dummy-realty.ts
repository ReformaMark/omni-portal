import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface RealtyDummyType {
    realtyName: string;
    tagName: string;
    contactPerson: string;
    contactNumber: string;
    photo?: string | StaticImport;
}


export const realtyDummy: RealtyDummyType[] = [
    {
        realtyName: "Zonal",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "ZONAL",
        photo: "/zonal.png",
    },
    {
        realtyName: "Henceforth Realty & Management",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "HRM",
        photo: "/henceforth.png",
    },
    {
        realtyName: "One Realtor Properties Corp.",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "ORPC",
        photo: "/orpc.png",
    },
    {
        realtyName: "Primero Realty",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "PRIMERO",
        photo: "/primero.png",
    },
    {
        realtyName: "Teoland Realty",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "TEOLAND",
        photo: "/teoland.png",
    },
    {
        realtyName: "Go East Realty",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "GO EAST",
        photo: "/goeast.png",
    },
    {
        realtyName: "Jads Realty",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "JADS",
        photo: "/jads.png",
    },
    {
        realtyName: "Wisechoice",
        contactPerson: "John Kevin Ramos",
        contactNumber: "09255451981",
        tagName: "WISECHOICE",
        photo: "/wisechoice.png",
    },
];
