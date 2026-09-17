"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";

import gsap from "gsap";

export default function WorkPage() {
    const root = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const transition = document.querySelector(
                ".transition-scene",
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

            const elements = [
                header,
                number,
                title,
                description,
                footer,
            ].filter(Boolean);

            /*
             * --------------------------------
             * DIRECT LOAD
             * --------------------------------
             */

            if (!transition) {
                gsap.set(elements, {
                    opacity: 0,
                });

                gsap.set(title, {
                    y: 100,
                    transformOrigin: "center bottom",
                });

                gsap.set(description, {
                    y: 40,
                });

                gsap.set(footer, {
                    y: 25,
                });

                const tl = gsap.timeline({ delay: 1 });

                tl.to(header, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                })
                    .to(
                        number,
                        {
                            opacity: 1,
                            duration: 0.4,
                        },
                        "-=0.25",
                    )
                    .to(
                        title,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power4.out",
                        },
                        "-=0.15",
                    )
                    .to(
                        description,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.out",
                        },
                        "-=0.5",
                    )
                    .to(
                        footer,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out",
                        },
                        "-=0.3",
                    );

                return;
            }

            /*
             * --------------------------------
             * PAGE TRANSITION
             * --------------------------------
             */

            gsap.set(elements, {
                opacity: 0,
            });

            gsap.set(title, {
                y: 120,
                transformOrigin: "center bottom",
            });

            gsap.set(description, {
                y: 45,
            });

            gsap.set(footer, {
                y: 25,
            });

            /*
             * About starts while transition
             * is still covering the screen.
             */

            const tl = gsap.timeline({ delay: 2 });

            tl.to(
                {},
                {
                    duration: 0.12,
                },
            )

                /*
                 * TITLE
                 */
                .to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: "power4.out",
                })

                /*
                 * HEADER
                 */
                .to(
                    header,
                    {
                        opacity: 1,
                        duration: 0.45,
                        ease: "power3.out",
                    },
                    "-=0.75",
                )

                /*
                 * NUMBER
                 */
                .to(
                    number,
                    {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                    },
                    "-=0.25",
                )

                /*
                 * DESCRIPTION
                 */
                .to(
                    description,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.2",
                )

                /*
                 * Let the About animation breathe.
                 */
                .to(
                    {},
                    {
                        duration: 0.25,
                    },
                )

                /*
                 * Remove transition UI.
                 */
                .to(
                    transition.querySelectorAll(
                        ".transition-top, .transition-bottom, .transition-grid, .transition-noise, .transition-caption, .transition-coordinates, .transition-number",
                    ),
                    {
                        opacity: 0,
                        duration: 0.35,
                        ease: "power3.inOut",
                    },
                )

                /*
                 * Portal / rings leave.
                 */
                .to(
                    transition.querySelector(".transition-portal"),
                    {
                        scale: 1.7,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power3.in",
                    },
                    "<",
                )

                .to(
                    transition.querySelectorAll(".transition-ring"),
                    {
                        scale: 1.5,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power3.in",
                    },
                    "<",
                )

                /*
                 * Footer arrives.
                 */
                .to(
                    footer,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=0.15",
                )

                /*
                 * Dark veil disappears last.
                 */
                .to(
                    transition.querySelector(".transition-veil"),
                    {
                        opacity: 0,
                        duration: 0.65,
                        ease: "power3.inOut",
                    },
                    "-=0.35",
                )

                /*
                 * Cleanup.
                 */
                .call(() => {
                    transition.remove();

                    document.body.dataset.transitioning = "false";
                });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={root} className="about-page">
            <header className="about-header about-reveal">
                <Link href="/">← BACK HOME</Link>

                <span>WORK PAGE</span>
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

                <span>WORK / 2026</span>
            </footer>
        </main>
    );
}
