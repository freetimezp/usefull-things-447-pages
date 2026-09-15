"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";

import gsap from "gsap";

import TransitionLink from "@/components/page-transition/TransitionLink";

const menuItems = [
    { number: "01", label: "ABOUT", href: "/about" },
    { number: "02", label: "WORK", href: "/work" },
    { number: "03", label: "ARCHIVE", href: "/archive" },
    { number: "04", label: "CONTACT", href: "/contact" },
];

export default function Home() {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleTransition = (event: Event) => {
            const customEvent = event as CustomEvent<{
                href: string;
                number: string;
                label: string;
            }>;

            const { href } = customEvent.detail;

            const lines = gsap.utils.toArray<HTMLElement>(".hero-line");

            const words = gsap.utils.toArray<HTMLElement>(".hero-word");

            const description = document.querySelector(".hero-description");

            const heroMeta = gsap.utils.toArray<HTMLElement>(".hero-meta");

            const menu = document.querySelector(".menu");

            const nav = document.querySelector(".main-nav");

            /*
             * Different direction for different destinations.
             */
            const direction =
                href === "/about" ? -1 : href === "/work" ? 1 : -1;

            const tl = gsap.timeline();

            /*
             * MENU
             *
             * It doesn't disappear immediately.
             * It slightly freezes in place.
             */
            tl.to(
                menu,
                {
                    scale: 0.96,
                    opacity: 0.5,

                    duration: 0.25,

                    ease: "power2.out",
                },
                0,
            )

                /*
                 * DESCRIPTION leaves first.
                 */
                .to(
                    description,
                    {
                        y: 30,
                        opacity: 0,

                        duration: 0.45,

                        ease: "power3.in",
                    },
                    0,
                )

                /*
                 * Meta information disappears.
                 */
                .to(
                    heroMeta,
                    {
                        y: 20,
                        opacity: 0,

                        duration: 0.45,

                        stagger: 0.02,

                        ease: "power3.in",
                    },
                    0,
                )

                /*
                 * HERO LINES START SEPARATING.
                 *
                 * This is the important part.
                 */
                .to(
                    lines[0],
                    {
                        xPercent: direction * 18,
                        yPercent: -8,
                        rotate: direction * -2,

                        opacity: 0,

                        duration: 0.75,

                        ease: "power4.in",
                    },
                    0.15,
                )

                .to(
                    lines[1],
                    {
                        xPercent: direction * -24,
                        yPercent: 5,
                        rotate: direction * 3,

                        opacity: 0,

                        duration: 0.8,

                        ease: "power4.in",
                    },
                    0.2,
                )

                .to(
                    lines[2],
                    {
                        xPercent: direction * 30,
                        yPercent: 10,
                        rotate: direction * -4,

                        opacity: 0,

                        duration: 0.85,

                        ease: "power4.in",
                    },
                    0.25,
                )

                /*
                 * Individual words continue moving.
                 *
                 * This gives the impression that the
                 * composition is physically breaking.
                 */
                .to(
                    words,
                    {
                        z: -300,
                        stagger: {
                            each: 0.035,
                            from: "center",
                        },

                        duration: 0.8,

                        ease: "power4.in",
                    },
                    0.15,
                )

                /*
                 * Navigation fades only after
                 * the composition has started breaking.
                 */
                .to(
                    nav,
                    {
                        y: -15,
                        opacity: 0,

                        duration: 0.4,

                        ease: "power3.in",
                    },
                    0.35,
                );
        };

        window.addEventListener("page-transition-start", handleTransition);

        return () => {
            window.removeEventListener(
                "page-transition-start",
                handleTransition,
            );
        };
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>(".hero-word");
            const description = document.querySelector(".hero-description");
            const scrollBox = document.querySelector(".hero-scroll");
            const meta = gsap.utils.toArray<HTMLElement>(".hero-meta");
            const nav = document.querySelector(".main-nav");
            const menu = document.querySelector(".menu");

            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            gsap.set(words, {
                yPercent: 120,
                rotateX: -75,
                opacity: 0,
                transformOrigin: "center bottom",
            });

            gsap.set(description, {
                y: 30,
                opacity: 0,
            });

            gsap.set(scrollBox, {
                y: 40,
                opacity: 0,
            });

            gsap.set(menu, {
                y: 30,
                opacity: 0,
            });

            gsap.set(meta, {
                y: 20,
                opacity: 0,
            });

            gsap.set(nav, {
                y: -20,
                opacity: 0,
            });

            tl.to(nav, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.15,
            })
                .to(
                    meta,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                    },
                    "-=0.65",
                )
                .to(
                    words,
                    {
                        yPercent: 0,
                        rotateX: 0,
                        opacity: 1,
                        duration: 1.15,
                        stagger: 0.075,
                    },
                    "-=0.45",
                )
                .to(
                    description,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                    },
                    "-=0.65",
                )
                .to(
                    scrollBox,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                    },
                    "-=0.75",
                )
                .to(
                    menu,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                    },
                    "-=0.85",
                );
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={root} className="home">
            <div className="home-grid" />
            <div className="home-noise" />

            <nav className="main-nav">
                <Link href="/" className="brand">
                    <span>USEFULL</span>
                    <span>THINGS</span>
                </Link>

                <div className="nav-status">
                    <span className="status-dot" />
                    <span>ONLINE / 447</span>
                </div>

                <div className="nav-location">
                    <span>UA</span>
                    <span>2026</span>
                </div>
            </nav>

            <div className="hero-meta hero-meta-top">
                <span>001 — INDEX</span>
                <span>SELECTED DIGITAL OBJECTS</span>
            </div>

            <section className="hero">
                <div className="hero-title">
                    <div className="hero-line">
                        <div className="hero-word-mask">
                            <span className="hero-word">THE</span>
                        </div>

                        <div className="hero-word-mask">
                            <span className="hero-word hero-word-outline">
                                INTERNET
                            </span>
                        </div>
                    </div>

                    <div className="hero-line">
                        <div className="hero-word-mask">
                            <span className="hero-word">IS</span>
                        </div>

                        <div className="hero-word-mask">
                            <span className="hero-word">FULL</span>
                        </div>
                    </div>

                    <div className="hero-line hero-line-last">
                        <div className="hero-word-mask">
                            <span className="hero-word hero-accent">OF</span>
                        </div>

                        <div className="hero-word-mask">
                            <span className="hero-word">USEFULL</span>
                        </div>

                        <div className="hero-word-mask">
                            <span className="hero-word hero-word-outline">
                                THINGS
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hero-bottom">
                    <div className="hero-description">
                        <span className="description-number">01</span>

                        <p>
                            A continuously evolving collection
                            <br />
                            of useful, strange and beautiful
                            <br />
                            digital experiments.
                        </p>
                    </div>

                    <div className="hero-scroll">
                        <span>SCROLL TO EXPLORE</span>

                        <div className="scroll-line">
                            <span />
                        </div>
                    </div>
                </div>
            </section>

            <div className="hero-meta hero-meta-bottom">
                <span>47.498° N</span>
                <span>31.768° E</span>
                <span>NO. 447 / 001</span>
            </div>

            <div className="menu">
                <span className="menu-label">NAVIGATE</span>

                <div className="menu-items">
                    {menuItems.map((item) => (
                        <TransitionLink
                            key={item.number}
                            href={item.href}
                            number={item.number}
                            label={item.label}
                            className="menu-item"
                        >
                            <span className="menu-number">{item.number}</span>

                            <span className="menu-name">{item.label}</span>

                            <span className="menu-arrow">↗</span>
                        </TransitionLink>
                    ))}
                </div>
            </div>
        </main>
    );
}
