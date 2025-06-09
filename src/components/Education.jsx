import React from 'react';
import {SectionWrapper} from './utilities';
import { Card3D, CardBody, CardItem } from './utilities/Card3D';
import { myCertifications } from "../config/GetCertifications.js";
import { myEducations } from "../config/GetEducations.js";

const CertificationCard = ({ title, company, period, description }) => (
    <Card3D containerClassName="max-w-sm mx-auto">
        <CardBody className="bg-tertiary rounded-xl p-6 shadow-lg text-neutral-300">
            <CardItem as="h3" className="text-white font-bold text-2xl mb-2" translateZ={30}>
                {title}
            </CardItem>
            <CardItem as="p" className="italic text-sm mb-4 text-neutral-400" translateZ={15}>
                {company} — {period}
            </CardItem>
            {description.map((line, i) => (
                <CardItem key={i} as="p" className="text-sm mb-2" translateZ={10} translateY={i * 5}>
                    {line}
                </CardItem>
            ))}
        </CardBody>
    </Card3D>
);

const Education = () => (
    <SectionWrapper id="formations">

        <h2 className="text-heading text-white text-4xl font-bold mb-12">Formations</h2>
        <div className="mb-12 space-y-8">
            {myEducations.map(({ title, job, date, contents, logo }, idx) => (
                <div key={idx} className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 aspect-square rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {logo ? (
                                <img src={logo} alt={`${title} logo`} className="w-8 h-8 object-contain" />
                            ) : (
                                <div className="w-4 h-4 bg-black rounded-sm" />
                            )}
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white">{title}</h4>
                            <p className="italic text-sm text-neutral-400">
                                {job} — {date}
                            </p>
                        </div>
                    </div>

                    <div className="pl-14">
                        {contents.map((line, i) => (
                            <p key={i} className="text-sm mb-1 text-neutral-300">
                                {line}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <h3 className="text-2xl font-bold text-white ">Certifications</h3>
        <div className="flex flex-wrap gap-10 justify-center">
            {myCertifications.map((exp) => (
                <CertificationCard key={exp.id} {...exp} />
            ))}
        </div>
    </SectionWrapper>
);

export default Education;
