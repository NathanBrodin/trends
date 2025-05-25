export function SideLines() {
  return (
    <svg className="pointer-events-none absolute inset-0 [z-index:-1] size-full [mask-image:linear-gradient(to_left,_#ffffffad,_transparent)] text-blue-300 opacity-60 select-none dark:text-blue-400/10 dark:opacity-80">
      <defs>
        <pattern
          id=":r1nn:"
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
      <rect width="100%" height="100%" fill="url(#:r1nn:)"></rect>
    </svg>
  );
}
