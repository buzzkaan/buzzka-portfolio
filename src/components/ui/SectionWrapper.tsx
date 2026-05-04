import { type ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";
import { CornerCross } from "@/components/decorative/Decorative";

interface SectionWrapperProps {
  heading: string;
  children: ReactNode;
  /** Renders corner cross decorations at all four corners. Requires position:relative (added automatically). */
  withCorners?: boolean;
}

/**
 * Shared outer shell for every resume section:
 * screen-line boundaries + SectionHeading.
 * Each section provides its own inner <div> for spacing control.
 */
export function SectionWrapper({ heading, children, withCorners }: SectionWrapperProps) {
  return (
    <section className="screen-line-before screen-line-after pixel-copy relative border-x border-edge">
      {withCorners && (
        <>
          <CornerCross position="top-left" />
          <CornerCross position="top-right" />
        </>
      )}
      <SectionHeading>{heading}</SectionHeading>
      {children}
      {withCorners && (
        <>
          <CornerCross position="bottom-left" />
          <CornerCross position="bottom-right" />
        </>
      )}
    </section>
  );
}
