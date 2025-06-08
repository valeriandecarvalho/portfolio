import React from 'react'
import { Card3D, CardBody, CardItem } from './utilities/Card3D'  // adapte le chemin

const experiences = [
    {
        id: 1,
        title: "Développeur Frontend React",
        company: "Entreprise A",
        period: "Jan 2023 - Présent",
        description: [
            "Création d'interfaces dynamiques et responsives.",
            "Travail collaboratif avec l'équipe design.",
        ],
    },
    {
        id: 2,
        title: "Ingénieur Logiciel Backend",
        company: "Entreprise B",
        period: "Mai 2021 - Déc 2022",
        description: [
            "Conception et maintenance d'API sécurisées.",
            "Optimisation des performances serveur.",
        ],
    },
];

const ExperienceCard = ({ title, company, period, description }) => (
    <Card3D containerClassName="max-w-sm mx-auto">
        <CardBody className="bg-tertiary rounded-xl p-6 shadow-lg text-neutral-300">
            <CardItem
                as="h3"
                className="text-white font-bold text-2xl mb-2"
                translateZ={30}
            >
                {title}
            </CardItem>
            <CardItem
                as="p"
                className="italic text-sm mb-4 text-neutral-400"
                translateZ={15}
            >
                {company} — {period}
            </CardItem>
            {description.map((line, i) => (
                <CardItem
                    key={i}
                    as="p"
                    className="text-sm mb-2"
                    translateZ={10}
                    translateY={i * 5}
                >
                    {line}
                </CardItem>
            ))}
        </CardBody>
    </Card3D>
);

const Experience = () => {
    return (
        <section
            id="experiences"
            className="c-space section-spacing scroll-mt-12 max-w-6xl mx-auto px-4"
        >
            <h2 className="text-heading text-white text-4xl font-bold mb-12">
                Expériences
            </h2>

            <div className="flex flex-wrap gap-10 justify-center">
                {experiences.map((exp) => (
                    <ExperienceCard key={exp.id} {...exp} />
                ))}
            </div>
        </section>
    );
};

export default Experience;