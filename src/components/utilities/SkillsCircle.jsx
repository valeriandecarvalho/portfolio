import { OrbitingCircles } from "./OrbitingCircles";
import { arduino, cplusplus, csharp, docker, git, intellij, java, javascript, python, raspberry, stackoverflow, vitejs, vscode, } from "../../assets/skills";

export function SkillsCircle() {
    const skills = [
        { name: "arduino", icon: arduino },
        { name: "cplusplus", icon: cplusplus },
        { name: "csharp", icon: csharp },
        { name: "docker", icon: docker },
        { name: "git", icon: git },
        { name: "intellij", icon: intellij },
        { name: "java", icon: java },
        { name: "javascript", icon: javascript },
        { name: "python", icon: python },
        { name: "raspberry", icon: raspberry },
        { name: "stackoverflow", icon: stackoverflow },
        { name: "vitejs", icon: vitejs },
        { name: "vscode", icon: vscode },
    ];

    return (
        <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
            <OrbitingCircles iconSize={45}>
                {skills.map((skill, index) => (
                    <Icon key={index} src={skill.icon} />
                ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                {[...skills].reverse().map((skill, index) => (
                    <Icon key={index} src={skill.icon} />
                ))}
            </OrbitingCircles>
        </div>
    );
}

const Icon = ({ src }) => (
    <img src={src} className="duration-200 rounded-sm hover:scale-110" alt="" />
);
