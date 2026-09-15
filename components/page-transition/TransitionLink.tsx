"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useRef } from "react";
import gsap from "gsap";

type TransitionLinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    number?: string;
    label: string;
};

export default function TransitionLink({
    href,
    children,
    className = "",
    number = "01",
    label,
}: TransitionLinkProps) {
    const router = useRouter();
    const linkRef = useRef<HTMLAnchorElement>(null);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const link = linkRef.current;

        if (!link) {
            router.push(href);
            return;
        }

        if (document.body.dataset.transitioning === "true") return;

        document.body.dataset.transitioning = "true";

        /*
         * Tell the current page to destroy its composition.
         */
        window.dispatchEvent(
            new CustomEvent("page-transition-start", {
                detail: {
                    href,
                    number,
                    label,
                },
            }),
        );

        /*
         * The actual menu text.
         */
        const menuName = link.querySelector(".menu-name") as HTMLElement | null;

        if (!menuName) {
            router.push(href);
            document.body.dataset.transitioning = "false";
            return;
        }

        const rect = menuName.getBoundingClientRect();
        const styles = window.getComputedStyle(menuName);

        /*
         * Create transition scene.
         */
        const transition = document.createElement("div");

        transition.className = "transition-scene";

        transition.innerHTML = `
      <div class="transition-background"></div>

      <div class="transition-content">

        <div class="transition-top">
          <span>USEFULL THINGS</span>
          <span>447 / TRANSITION</span>
        </div>

        <div class="transition-portal">

          <div class="transition-number">
            ${number}
          </div>

          <div class="transition-word-mask">
            <div class="transition-word">
              ${label}
            </div>
          </div>

        </div>

        <div class="transition-bottom">
          <span>ENTERING NEW VIEW</span>
          <span>2026</span>
        </div>

      </div>
    `;

        document.body.appendChild(transition);

        const background = transition.querySelector(
            ".transition-background",
        ) as HTMLElement;

        const content = transition.querySelector(
            ".transition-content",
        ) as HTMLElement;

        const portal = transition.querySelector(
            ".transition-portal",
        ) as HTMLElement;

        const wordMask = transition.querySelector(
            ".transition-word-mask",
        ) as HTMLElement;

        const word = transition.querySelector(
            ".transition-word",
        ) as HTMLElement;

        const transitionNumber = transition.querySelector(
            ".transition-number",
        ) as HTMLElement;

        /*
         * Scene.
         */
        gsap.set(transition, {
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            pointerEvents: "none",
            overflow: "hidden",
        });

        /*
         * Yellow field starts as a tiny circle.
         */
        gsap.set(background, {
            position: "absolute",
            inset: 0,
            background: "#d8ff38",
            scale: 0,
            transformOrigin: "center center",
            willChange: "transform",
        });

        /*
         * Content exists above the yellow field.
         */
        gsap.set(content, {
            position: "absolute",
            inset: 0,
            opacity: 0,
            color: "#0a0a09",
        });

        /*
         * Start exactly where the clicked menu text is.
         */
        gsap.set(portal, {
            position: "absolute",

            left: rect.left,
            top: rect.top,

            width: rect.width,
            height: rect.height,

            display: "flex",
            alignItems: "center",

            transformOrigin: "center center",

            willChange: "left,top,width,height,transform",
        });

        gsap.set(wordMask, {
            width: "100%",
            height: "100%",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
        });

        /*
         * IMPORTANT:
         *
         * Copy the real menu typography.
         * This is what makes the element feel like
         * the original menu item rather than a new object.
         */
        gsap.set(word, {
            position: "relative",

            width: "auto",
            height: "auto",

            display: "block",

            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            fontStyle: styles.fontStyle,
            lineHeight: styles.lineHeight,
            letterSpacing: styles.letterSpacing,
            textTransform: styles.textTransform,

            color: "#0a0a09",

            whiteSpace: "nowrap",

            transformOrigin: "left center",

            willChange: "transform,font-size,letter-spacing",
        });

        gsap.set(transitionNumber, {
            position: "absolute",
            left: "-2rem",
            bottom: 0,

            fontSize: "10px",
            lineHeight: 1,
            letterSpacing: "0.1em",

            opacity: 0,
            x: -12,
        });

        /*
         * Make the real menu item disappear
         * just as its clone takes over.
         */
        gsap.to(link, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
        });

        /*
         * Transition timeline.
         */
        const tl = gsap.timeline({
            defaults: {
                overwrite: "auto",
            },

            onComplete: () => {
                router.push(href);
            },
        });

        /*
         * 1 — The clicked word detaches from the menu.
         */
        tl.to(
            word,
            {
                scale: 1.08,
                duration: 0.25,
                ease: "power2.out",
            },
            0,
        )

            /*
             * 2 — Number appears beside it.
             */
            .to(
                transitionNumber,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    ease: "power3.out",
                },
                0.08,
            )

            /*
             * 3 — The menu word travels toward the center.
             */
            .to(
                portal,
                {
                    left: "50%",
                    top: "50%",

                    xPercent: -50,
                    yPercent: -50,

                    duration: 0.75,

                    ease: "power4.inOut",
                },
                0.12,
            )

            /*
             * 4 — At the same moment the yellow field
             * starts expanding from behind it.
             */
            .to(
                background,
                {
                    scale: 1,

                    duration: 1.05,

                    ease: "power4.inOut",
                },
                0.28,
            )

            /*
             * 5 — UI metadata appears.
             */
            .to(
                content,
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                },
                0.48,
            )

            /*
             * 6 — The actual word becomes huge.
             */
            .to(
                word,
                {
                    fontSize: "clamp(8rem, 22vw, 18rem)",

                    fontWeight: 700,

                    letterSpacing: "-0.07em",

                    scale: 1,

                    duration: 1,

                    ease: "power4.inOut",
                },
                0.55,
            )

            /*
             * 7 — Slight physical tilt.
             */
            .to(
                portal,
                {
                    rotation: -2,
                    scale: 1.035,

                    duration: 0.7,

                    ease: "power3.inOut",
                },
                0.72,
            )

            /*
             * 8 — Tiny settling movement.
             */
            .to(
                portal,
                {
                    y: "-=8",
                    duration: 0.35,
                    ease: "power2.out",
                },
                1.35,
            )

            /*
             * Keep the final frame for a moment,
             * then navigate.
             */
            .to(
                {},
                {
                    duration: 0.18,
                },
            );
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
