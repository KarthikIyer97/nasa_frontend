import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import toast, { Toaster } from 'react-hot-toast';
import { FiSend } from 'react-icons/fi';
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const buttonVariants = {
    hover: { scale: 1.05 }, // Button hover effect
    tap: { scale: 0.95 }, // Button tap effect
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};
        if (!formData.name) errors.name = "Name is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.message) errors.message = "Message is required";
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsSending(true);

            emailjs
                .send(
                    "service_0n5t0f7",
                    "template_v7hlxlp",
                    formData,
                    "0wIiROxogLnF3SiHT"
                )
                .then((response) => {
                    toast.success("Message sent successfully");
                    setFormData({ name: "", email: "", message: "" });
                })
                .catch((error) => {
                    console.log("FAILED... ", error);
                    toast.error("Failed to send message. Please try again later.");
                })
                .finally(() => {
                    setIsSending(false);
                });
        }
    };

    return (
        <motion.div
            className='p-4 lg:w-3/4 mx-auto'
            id='contact'
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
        >
            <Toaster />
            <motion.h2
                className='my-8 text-center text-4xl font-semibold tracking-tighter'
                variants={itemVariants}
            >
                 Let's Connect — Ask Me Anything About Space 🪐
            </motion.h2>
            <form onSubmit={handleSubmit}>
                {/* Name and Email side by side */}
                <div className="mb-4 flex space-x-4">
                    <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={formData.name}
                            placeholder='Name'
                            onChange={handleChange}
                            className='mb-2 w-full appearance-none rounded-lg border border-stone-50/30 bg-transparent px-3 py-2 text-sm focus:border-stone-400 focus:outline-none'
                        />
                        {errors.name && (
                            <p className='text-sm text-rose-800'>{errors.name}</p>
                        )}
                    </motion.div>
                    <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={formData.email}
                            placeholder='Email'
                            onChange={handleChange}
                            className='mb-2 w-full appearance-none rounded-lg border border-stone-50/30 bg-transparent px-3 py-2 text-sm focus:border-stone-400 focus:outline-none'
                        />
                        {errors.email && (
                            <p className='text-sm text-rose-800'>{errors.email}</p>
                        )}
                    </motion.div>
                </div>

                {/* Message field */}
                <motion.div className="mb-10 pt-5 w-full" variants={itemVariants}>
                    <textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        placeholder='Message'
                        onChange={handleChange}
                        className='mb-2 w-full appearance-none rounded-lg border border-stone-50/30 bg-transparent px-3 py-2 text-sm focus:border-stone-400 focus:outline-none'
                        rows="6"
                    />
                    {errors.message && (
                        <p className='text-sm text-rose-800'>{errors.message}</p>
                    )}
                </motion.div>

                {/* Send Button */}
                <motion.button
                    type='submit'
                    className={`mb-8 w-full rounded border-stone-50/30 bg-stone-200 px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-300 ${isSending ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={isSending}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className='flex items-center justify-center gap-2'>
                        {isSending ? "Sending..." : "Send"}
                        <FiSend />
                    </div>
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ContactForm;