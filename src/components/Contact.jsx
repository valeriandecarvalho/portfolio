import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "./utilities";
import { Particles, SectionWrapper } from "./utilities";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showAlertMessage = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log("From submitted:", formData);
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    to_name: import.meta.env.VITE_CONTACT_TARGET_NAME,
                    from_email: formData.email,
                    to_email: import.meta.env.VITE_CONTACT_TARGET_EMAIL,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setIsLoading(false);
            setFormData({ name: "", email: "", message: "" });
            showAlertMessage("success", "Votre message a bien été envoyé !");
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            showAlertMessage("erreur", "Une erreur est survenue, veuillez réessayer !");
        }
    };

    return (
        <SectionWrapper
            className="relative c-space section-spacing scroll-mt-12"
            id="contacter"
        >
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            {showAlert && <Alert type={alertType} text={alertMessage} />}
            <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
                <div className="flex flex-col items-start w-full gap-5 mb-10">
                    <h2 className="text-heading">Discutons-en</h2>
                    <p className="font-normal text-neutral-400">
                        Que ce soit pour un stage, un projet étudiant, ou toute collaboration, je suis prêt à vous aider à le réaliser.
                    </p>
                </div>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="feild-label">
                            Nom et Prénom
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="field-input field-input-focus"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="feild-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="field-input field-input-focus"
                            placeholder="JohnDoe@email.com"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="feild-label">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="field-input field-input-focus"
                            placeholder="Laissez votre message ici..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
                    >
                        {!isLoading ? "Envoyer" : "Envoi en cours..."}
                    </button>
                </form>
            </div>
        </SectionWrapper>
    );
};

export default Contact;
