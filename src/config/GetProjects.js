import { reactjs, tailwind } from '../assets';

export const myProjects = [
    {
        id: 1,
        title: "Portfolio & Espace Personnel",
        description:
            "Description",
        subDescription: [
            "SubDescription 1",
            "SubDescription 2",
        ],
        href: "",
        logo: "",
        image: "/projects/portfolio.webp",
        tags: [
            {
                id: 1,
                name: "React",
                path: reactjs,
            },
            {
                id: 2,
                name: "TailwindCSS",
                path: tailwind,
            },
        ],
    },
    {
        id: 2,
        title: "Coming Soon",
        description:
            "Coming Soon",
        subDescription: [
            "Coming Soon",
        ],
        href: "",
        logo: "",
        image: "/projects/soon.png",
        tags: [],
    }
];