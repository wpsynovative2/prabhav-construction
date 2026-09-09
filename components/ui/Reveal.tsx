"use client";

import { useCallback, useState, type ElementType, type ReactNode } from "react";

/**
 * Fades content up as it scrolls into view. Content is rendered in the HTML
 * either way, so this costs nothing for SEO — and `prefers-reduced-motion`
 * collapses the transition to zero in globals.css.
 *
 * The observer is attached from a ref callback rather than an effect, so it is
 * wired up the moment the node mounts and torn down when it unmounts.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  const attach = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    // No IntersectionObserver (very old browsers): show everything immediately.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={attach}
      className={`reveal ${className}`}
      data-visible={visible ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
