"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage() {
    const root = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const transition = document.querySelector(
                ".transition-scene",
            ) as HTMLElement | null;

            const transitionBackground = transition?.querySelector(
                ".transition-background",
            ) as HTMLElement | null;

            const transitionPortal = transition?.querySelector(
                ".transition-portal",
            ) as HTMLElement | null;

            const transitionWord = transition?.querySelector(
                ".transition-word",
            ) as HTMLElement | null;

            const transitionNumber = transition?.querySelector(
                ".transition-number",
            ) as HTMLElement | null;

            const transitionTop = transition?.querySelector(
                ".transition-top",
            ) as HTMLElement | null;

            const transitionBottom = transition?.querySelector(
                ".transition-bottom",
            ) as HTMLElement | null;

            const header = document.querySelector(
                ".about-header",
            ) as HTMLElement | null;

            const number = document.querySelector(
                ".about-number",
            ) as HTMLElement | null;

            const title = document.querySelector(
                ".about-content h1",
            ) as HTMLElement | null;

            const description = document.querySelector(
                ".about-content p",
            ) as HTMLElement | null;

            const footer = document.querySelector(
                ".about-footer",
            ) as HTMLElement | null;

            /*
             * ----------------------------------------------------
             * NORMAL ENTRY
             * ----------------------------------------------------
             *
             * If About is opened directly, there is no transition
             * scene. Use the normal page reveal.
             */
            if (!transition || !transitionWord || !title) {
                gsap.from(".about-reveal", {
                    y: 80,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.08,
                    ease: "power4.out",
                    delay: 0.15,
                });

                return;
            }

            /*
             * Keep About hidden underneath the transition.
             */
            gsap.set(
                [header, number, title, description, footer].filter(Boolean),
                {
                    opacity: 0,
                },
            );

            /*
             * The title starts lower and slightly rotated.
             */
            gsap.set(title, {
                y: 100,
                rotateX: -25,
                transformOrigin: "center bottom",
            });

            /*
             * Prepare individual title lines.
             */
            const titleText = title.childNodes;

            gsap.set(titleText, {
                opacity: 1,
            });

            /*
             * Give the transition a moment to settle after
             * Next has mounted the new route.
             */
            const enterTimer = window.setTimeout(() => {
                const tl = gsap.timeline({
                    defaults: {
                        ease: "power4.inOut",
                    },

                    onComplete: () => {
                        transition.remove();

                        document.body.dataset.transitioning = "false";
                    },
                });

                /*
                 * ------------------------------------------------
                 * PHASE 1
                 *
                 * Giant ABOUT starts collapsing.
                 * ------------------------------------------------
                 */

                tl.to(
                    transitionWord,
                    {
                        scale: 0.72,
                        y: "-=8vh",
                        opacity: 0.9,
                        duration: 0.55,
                        ease: "power4.in",
                    },
                    0,
                )

                    /*
                     * Number pulls away.
                     */
                    .to(
                        transitionNumber,
                        {
                            x: -30,
                            opacity: 0,
                            duration: 0.4,
                        },
                        0,
                    )

                    /*
                     * ------------------------------------------------
                     * PHASE 2
                     *
                     * About's actual typography appears underneath.
                     * ------------------------------------------------
                     */

                    .to(
                        title,
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.9,
                            ease: "power4.out",
                        },
                        0.25,
                    )

                    /*
                     * The supporting content begins appearing.
                     */
                    .to(
                        [header, number],
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.55,
                            stagger: 0.06,
                            ease: "power3.out",
                        },
                        0.5,
                    )

                    .to(
                        description,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.out",
                        },
                        0.62,
                    )

                    /*
                     * ------------------------------------------------
                     * PHASE 3
                     *
                     * Yellow field opens away from the page.
                     * ------------------------------------------------
                     */

                    .to(
                        transitionBackground,
                        {
                            scale: 0.82,
                            opacity: 0,
                            duration: 1.05,
                            ease: "power4.inOut",
                        },
                        0.55,
                    )

                    /*
                     * Metadata disappears as the actual page
                     * takes control.
                     */
                    .to(
                        [transitionTop, transitionBottom],
                        {
                            opacity: 0,
                            duration: 0.35,
                        },
                        0.65,
                    )

                    /*
                     * Portal itself lifts away.
                     */
                    .to(
                        transitionPortal,
                        {
                            scale: 0.7,
                            y: "-=14vh",
                            opacity: 0,
                            duration: 0.85,
                            ease: "power4.in",
                        },
                        0.75,
                    )

                    /*
                     * Footer arrives last.
                     */
                    .to(
                        footer,
                        {
                            opacity: 1,
                            duration: 0.5,
                            ease: "power2.out",
                        },
                        0.95,
                    );
            }, 80);

            return () => {
                window.clearTimeout(enterTimer);
            };
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={root} className="about-page">
            <header className="about-header about-reveal">
                <Link href="/">← BACK HOME</Link>

                <span>ABOUT PAGE</span>
            </header>

            <section className="about-content">
                <div className="about-reveal about-number">01</div>

                <h1 className="about-reveal">
                    THINGS
                    <br />
                    WITH
                    <br />
                    PURPOSE.
                </h1>

                <p className="about-reveal">
                    USEFULL THINGS is a growing collection of digital
                    experiments, interfaces, interactions and ideas.
                </p>
            </section>

            <footer className="about-footer about-reveal">
                <span>USEFULL THINGS / 447</span>

                <span>ABOUT / 2026</span>
            </footer>
        </main>
    );
}
