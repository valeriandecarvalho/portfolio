import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "./utilities/index.js";
import SectionWrapper from "../SectionWrapper.jsx";

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
            className="relative c-space section-spacing scroll-mt-12 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
            id="contacter"
        >
            {showAlert && <Alert type={alertType} text={alertMessage} />}

            {/* Effets d'arrière-plan animés */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-500"></div>

                {/* Particules flottantes */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute top-20 right-16 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute bottom-10 right-10 w-2 h-2 bg-purple-300 rounded-full animate-pulse animation-delay-500"></div>
                <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce animation-delay-300"></div>
            </div>
            <div className="flex flex-col items-center justify-center max-w-lg p-8 mx-auto border border-white/20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl relative z-10 hover:shadow-purple-500/10 transition-all duration-500 hover:border-white/30">
                {/* Effet de lueur sur la carte */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex flex-col items-start w-full gap-6 mb-12 relative z-10">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">Discutons-en</h2>
                    <p className="font-normal text-gray-300 leading-relaxed text-lg">
                        Que ce soit pour un stage, un projet étudiant, ou toute collaboration, je suis prêt à vous aider à le réaliser.
                    </p>
                </div>
                <form className="w-full space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="group relative">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-3 transition-colors duration-300 group-focus-within:text-purple-300">
                            Nom et Prénom
                        </label>
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/30 hover:bg-white/8"
                                placeholder="John Doe"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="group relative">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3 transition-colors duration-300 group-focus-within:text-purple-300">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/30 hover:bg-white/8"
                                placeholder="john.doe@email.com"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                    <div className="group relative">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-3 transition-colors duration-300 group-focus-within:text-purple-300">
                            Message
                        </label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none hover:border-white/30 hover:bg-white/8"
                                placeholder="Laissez votre message ici..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:to-pink-500/10 transition-all duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-4 text-lg font-semibold text-white text-center rounded-xl cursor-pointer bg-gradient-to-b from-royal to-lavender border-purple-400/50 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                        disabled={isLoading}
                    >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute w-1 h-1 bg-white rounded-full animate-ping top-2 left-4"></div>
                            <div className="absolute w-1 h-1 bg-white rounded-full animate-ping top-4 right-6 animation-delay-200"></div>
                            <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse bottom-3 left-8 animation-delay-400"></div>
                            <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse bottom-2 right-4 animation-delay-600"></div>
                            <div className="absolute w-1 h-1 bg-pink-200 rounded-full animate-ping top-3 left-1/2 animation-delay-300"></div>
                            <div className="absolute w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse bottom-4 left-1/3 animation-delay-800"></div>
                        </div>
                        <span className="relative z-10">
                            {!isLoading ? "Envoyer Message ✉️" : "Envoi en cours... 📡"}
                        </span>
                    </button>
                </form>
            </div>
        </SectionWrapper>
    );
};

export default Contact;