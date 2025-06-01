import { Diamond } from "@/components/ui/diamond";

export function Divider() {
  return (
    <section className="-mx-3 flex items-center justify-center md:-mx-12">
      <hr className="grid-border-color w-full border-t" />
    </section>
  );
}

export function SectionDidiver() {
  return (
    <>
      <Divider />
      <section className="relative h-4 w-full px-4 sm:px-6">
        <Diamond top left />
        <Diamond top right />
        <Diamond bottom left />
        <Diamond bottom right />
        <svg className="pointer-events-none absolute inset-0 [z-index:-1] size-full text-blue-300 opacity-30 select-none dark:text-blue-400/10 dark:opacity-60">
          <defs>
            <pattern
              id=":R1pefknq6ja:"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
              ></line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#:R1pefknq6ja:)"></rect>
        </svg>
      </section>
      <Divider />
    </>
  );
}
