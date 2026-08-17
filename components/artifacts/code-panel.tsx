"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * A code excerpt rendered as type rather than as a screenshot: it stays sharp
 * at any zoom, it is selectable and searchable, and it inherits the site's
 * palette instead of importing a foreign editor theme.
 *
 * The highlighter below is intentionally small — it covers the Python that
 * actually appears in these excerpts and nothing more.
 */

type Kind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "decorator"
  | "number"
  | "fn";

/* The five spectrum hues double as the syntax palette. */
const HUE: Record<Kind, string> = {
  plain: "var(--bone-dim)",
  comment: "var(--bone-faint)",
  string: "var(--s2)",
  keyword: "var(--s1)",
  decorator: "var(--s4)",
  number: "var(--s5)",
  fn: "var(--bone)",
};

const KEYWORDS =
  "def|class|return|yield|if|elif|else|for|while|in|not|and|or|is|None|True|False|async|await|import|from|as|try|except|finally|raise|with|pass|lambda|global|nonlocal|del|assert|break|continue";

// Ordered by precedence: comments and strings win over everything, so a `#`
// inside a docstring is never mistaken for a comment.
const TOKEN = new RegExp(
  [
    "(#[^\\n]*)", // group 1 — comment
    "(\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')", // 2 — string
    `\\b(?:${KEYWORDS})\\b`, // no group — keyword falls through to the default
    "(@[A-Za-z_][\\w.]*)", // 3 — decorator
    "\\b(\\d+(?:\\.\\d+)?)\\b", // 4 — number
    "([A-Za-z_]\\w*)(?=\\s*\\()", // 5 — callable
  ].join("|"),
  "g",
);

type Tok = { t: string; k: Kind };

/** Tokenise the whole excerpt, then break tokens across lines so multi-line
 *  strings keep their highlighting and the gutter stays correct. */
function tokenize(code: string): Tok[][] {
  const lines: Tok[][] = [[]];

  const push = (text: string, k: Kind) => {
    const parts = text.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ t: part, k });
    });
  };

  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) push(code.slice(last, at), "plain");

    let kind: Kind = "plain";
    if (m[1]) kind = "comment";
    else if (m[2]) kind = "string";
    else if (m[3]) kind = "decorator";
    else if (m[4]) kind = "number";
    else if (m[5]) kind = "fn";
    else kind = "keyword"; // the keyword alternative is non-capturing

    push(m[0], kind);
    last = at + m[0].length;
  }
  if (last < code.length) push(code.slice(last), "plain");

  return lines;
}

function CodeBody({
  code,
  startLine,
  size,
}: {
  code: string;
  startLine: number;
  size: "sm" | "lg";
}) {
  const lines = tokenize(code);
  const text = size === "lg" ? "text-[13px]" : "text-[11px]";
  const lead = size === "lg" ? "leading-[1.75]" : "leading-[1.6]";

  return (
    <pre
      className={`font-mono ${text} ${lead} w-max min-w-full tabular-nums`}
      aria-label="Source excerpt"
    >
      <code>
        {lines.map((toks, i) => (
          <span key={i} className="flex">
            <span
              aria-hidden
              className="sticky left-0 mr-4 w-9 shrink-0 select-none bg-ink-raise/85 pr-2 text-right text-bone-faint/55"
            >
              {startLine + i}
            </span>
            <span className="whitespace-pre">
              {toks.length === 0 ? (
                " "
              ) : (
                toks.map((tok, j) => (
                  <span
                    key={j}
                    style={{ color: HUE[tok.k] }}
                    className={tok.k === "comment" ? "italic" : undefined}
                  >
                    {tok.t}
                  </span>
                ))
              )}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

export function CodePanel({
  file,
  lines,
  code,
  accent,
  badge,
  action,
}: {
  file: string;
  lines: string;
  code: string;
  accent: string;
  /** Small marker shown left of the file name, e.g. the proof number. */
  badge?: string;
  /** Optional control rendered in the header's trailing slot. */
  action?: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const startLine = Number(lines.split(/[–-]/)[0]) || 1;

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const header = (
    <div className="flex shrink-0 items-center gap-3 border-b border-hair px-3 py-2">
      {badge ? (
        <span className="label shrink-0" style={{ color: accent }}>
          {badge}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-bone-dim">
        {file}
        <span className="text-bone-faint">
          {" : "}
          {lines}
        </span>
      </span>
      {action}
    </div>
  );

  return (
    <>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-hair bg-ink-raise/70">
        {header}

        <div className="relative min-h-0 min-w-0 flex-1">
          <div className="h-full min-w-0 overflow-auto p-3">
            <CodeBody code={code} startLine={startLine} size="sm" />
          </div>
          {/* Reads a part-line at the fold as an invitation to scroll rather
              than as a clipping bug. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-ink-raise to-transparent"
          />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-hair px-3 py-2">
          <span className="label text-bone-faint">Verbatim excerpt</span>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            data-cursor
            data-cursor-label="Zoom"
            className="label cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: accent }}
            aria-label={`Enlarge the excerpt from ${file}`}
          >
            Enlarge ↗
          </button>
        </div>
      </div>

      {/* Portalled to the body: the deck's horizontal transform would otherwise
          become the containing block for `fixed`, and the sticky viewport's
          overflow would clip the overlay. */}
      {typeof document === "undefined"
        ? null
        : createPortal(
      <AnimatePresence>
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex flex-col bg-ink/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${file}, lines ${lines}`}
          >
            <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden border border-hair bg-ink-raise">
              <div className="flex shrink-0 items-center gap-4 border-b border-hair px-4 py-3">
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-bone-dim">
                  {file}
                  <span className="text-bone-faint">
                    {" : "}
                    {lines}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  aria-label="Close excerpt"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-hair text-bone-dim transition-colors hover:border-bone-dim hover:text-bone"
                >
                  <X size={15} strokeWidth={1.5} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
                <CodeBody code={code} startLine={startLine} size="lg" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
            document.body,
          )}
    </>
  );
}
