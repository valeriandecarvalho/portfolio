import { mySocials } from "../config/GetSocials.js";

const Footer = () => {
    return (
        <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
            <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
            <div className="flex gap-2">
                <p>Conditions générales</p>
                <p>|</p>
                <p>Politique de confidentialité</p>
            </div>
            <div className="flex gap-3">
                {mySocials.map((social, index) => (
                    <a href={social.href} key={index}>
                        <img src={social.icon} className="w-5 h-5" alt={social.name} />
                    </a>
                ))}
            </div>
            <p>© 2025 Valérian. Tous droits réservés.</p>
        </section>
    );
};

export default Footer;
