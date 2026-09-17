"use client";

import Link from "next/link";
import { MouseEvent, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

type TransitionLinkProps = {
    href: string;
    number: string;
    label: string;
    children: React.ReactNode;
    className?: string;
};

export default function TransitionLink({
    href,
    number,
    label,
    children,
    className = "",
}: TransitionLinkProps) {
    const router = useRouter();
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (document.body.dataset.transitioning === "true") {
            return;
        }

        const link = linkRef.current;

        if (!link) {
            router.push(href);
            return;
        }

        document.body.dataset.transitioning = "true";

        window.dispatchEvent(
            new CustomEvent("page-transition-start", {
                detail: {
                    href,
                    number,
                    label,
                },
            }),
        );

        const rect = link.getBoundingClientRect();

        const scene = document.createElement("div");
        scene.className = "transition-scene";

        scene.innerHTML = `
            <div class="transition-veil"></div>

            <div class="transition-grid"></div>

            <div class="transition-noise"></div>

            <div class="transition-top">
                <span>USEFULL THINGS</span>
                <span>TRANSITION / ${number}</span>
            </div>

            <div class="transition-bottom">
                <span>ENTERING — ${label}</span>
                <span>2026 / UA</span>
            </div>

            <div class="transition-content">

                <div class="transition-center">

                    <div class="transition-portal">
                        <div class="transition-ring transition-ring-1"></div>
                        <div class="transition-ring transition-ring-2"></div>
                        <div class="transition-ring transition-ring-3"></div>
                    </div>

                    <div class="transition-number">
                        ${number}
                    </div>

                    <div class="transition-word">
                        ${label}
                    </div>

                    <div class="transition-coordinates">
                        <span>48°51'12"N</span>
                        <span>02°20'55"E</span>
                    </div>

                    <div class="transition-caption">
                        ENTERING — NEW VIEW
                    </div>

                    <div class="transition-progress">
                        <span></span>
                    </div>

                </div>

            </div>

            <div class="transition-scan"></div>
        `;

        document.body.appendChild(scene);

        const veil = scene.querySelector(".transition-veil") as HTMLElement;

        const grid = scene.querySelector(".transition-grid") as HTMLElement;

        const noise = scene.querySelector(".transition-noise") as HTMLElement;

        const content = scene.querySelector(
            ".transition-content",
        ) as HTMLElement;

        const portal = scene.querySelector(".transition-portal") as HTMLElement;

        const rings = scene.querySelectorAll(".transition-ring");

        const word = scene.querySelector(".transition-word") as HTMLElement;

        const transitionNumber = scene.querySelector(
            ".transition-number",
        ) as HTMLElement;

        const coordinates = scene.querySelector(
            ".transition-coordinates",
        ) as HTMLElement;

        const caption = scene.querySelector(
            ".transition-caption",
        ) as HTMLElement;

        const progress = scene.querySelector(
            ".transition-progress span",
        ) as HTMLElement;

        const top = scene.querySelector(".transition-top") as HTMLElement;

        const bottom = scene.querySelector(".transition-bottom") as HTMLElement;

        const scan = scene.querySelector(".transition-scan") as HTMLElement;

        /*
         * Position the portal exactly over the clicked menu item.
         */
        gsap.set(portal, {
            x: rect.left + rect.width / 2 - window.innerWidth / 2,
            y: rect.top + rect.height / 2 - window.innerHeight / 2,
            scale: 0.1,
        });

        /*
         * Initial state.
         */
        gsap.set(veil, {
            clipPath: `circle(0px at ${rect.left + rect.width / 2}px ${
                rect.top + rect.height / 2
            }px)`,
        });

        gsap.set(grid, {
            opacity: 0,
            scale: 1.15,
        });

        gsap.set(noise, {
            opacity: 0,
        });

        gsap.set(content, {
            opacity: 1,
        });

        gsap.set(word, {
            opacity: 0,
            scale: 0.7,
            y: 30,
        });

        gsap.set(transitionNumber, {
            opacity: 0,
            y: 20,
        });

        gsap.set(coordinates, {
            opacity: 0,
            y: 15,
        });

        gsap.set(caption, {
            opacity: 0,
            y: 15,
        });

        gsap.set(progress, {
            scaleX: 0,
            transformOrigin: "left center",
        });

        gsap.set(top, {
            opacity: 0,
            y: -15,
        });

        gsap.set(bottom, {
            opacity: 0,
            y: 15,
        });

        gsap.set(scan, {
            opacity: 0,
            y: "-100%",
        });

        gsap.set(rings, {
            opacity: 0,
            scale: 0.5,
        });

        const tl = gsap.timeline();

        /*
         * PHASE 1
         * Portal expands from clicked menu item.
         */
        tl.to(
            portal,
            {
                duration: 0.65,
                x: 0,
                y: 0,
                scale: 1,
                ease: "power4.inOut",
            },
            0,
        )

            .to(
                veil,
                {
                    duration: 0.9,
                    clipPath: `circle(150vmax at ${
                        rect.left + rect.width / 2
                    }px ${rect.top + rect.height / 2}px)`,
                    ease: "power4.inOut",
                },
                0.05,
            )

            .to(
                grid,
                {
                    duration: 0.9,
                    opacity: 1,
                    scale: 1,
                    ease: "power3.out",
                },
                0.3,
            )

            .to(
                noise,
                {
                    duration: 0.5,
                    opacity: 0.055,
                },
                0.4,
            )

            /*
             * UI enters.
             */
            .to(
                top,
                {
                    duration: 0.45,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.45,
            )

            .to(
                bottom,
                {
                    duration: 0.45,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.5,
            )

            /*
             * Center content.
             */
            .to(
                rings,
                {
                    duration: 0.8,
                    opacity: 1,
                    scale: 1,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                0.55,
            )

            .to(
                transitionNumber,
                {
                    duration: 0.4,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.65,
            )

            .to(
                word,
                {
                    duration: 0.7,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power4.out",
                },
                0.65,
            )

            .to(
                coordinates,
                {
                    duration: 0.4,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.85,
            )

            .to(
                caption,
                {
                    duration: 0.4,
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.9,
            )

            .to(
                progress,
                {
                    duration: 1,
                    scaleX: 1,
                    ease: "power2.inOut",
                },
                0.55,
            )

            /*
             * SCAN.
             */
            .to(
                scan,
                {
                    duration: 0.7,
                    opacity: 1,
                    y: "100vh",
                    ease: "power2.inOut",
                },
                0.85,
            )

            /*
             * =====================================================
             * CRITICAL PART
             * =====================================================
             */
            .call(
                () => {
                    router.push(href);
                },
                [],
                1.15,
            )

            /*
             * Give the new page time to mount and START its animation.
             */
            .to(
                {},
                {
                    duration: 0.55,
                },
            )

            /*
             * Then remove the transition layer.
             */
            .to(
                [
                    word,
                    transitionNumber,
                    coordinates,
                    caption,
                    top,
                    bottom,
                    grid,
                    noise,
                ],
                {
                    duration: 0.45,
                    opacity: 0,
                    y: (i) => (i % 2 === 0 ? -15 : 15),
                    ease: "power3.inOut",
                },
            )

            .to(
                portal,
                {
                    duration: 0.45,
                    scale: 2,
                    opacity: 0,
                    ease: "power3.in",
                },
                "<",
            )

            .to(
                veil,
                {
                    duration: 0.65,
                    opacity: 0,
                    ease: "power3.inOut",
                },
                "-=0.25",
            )

            .call(() => {
                scene.remove();
                document.body.dataset.transitioning = "false";
            });
    };

    return (
        <Link
            ref={linkRef}
            href={href}
            onClick={handleClick}
            className={className}
        >
            {children}
        </Link>
    );
}
