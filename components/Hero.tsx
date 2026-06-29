"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Placement = {
  colSpan: number;
  rowSpan: number;
  colStart?: number;
  rowStart?: number;
};

type Tile = {
  color: string;
  mobile: Placement;
  desktop: Placement;
  label?: string;
  labelClassName?: string;
};

type ActiveMotion = {
  amount: number;
  axis: "x" | "y";
  index: number;
  intensity: "normal" | "extreme";
  mode: "expand" | "collapse";
};

type TrackState = {
  columnWeights: number[];
  rowWeights: number[];
  style: CSSProperties;
};

const MOBILE_COLUMNS = 4;
const MOBILE_ROWS = 6;
const DESKTOP_COLUMNS = 6;
const DESKTOP_ROWS = 4;
const TITLE_MIN_TRACK_WEIGHT = 0.58;
const TITLE_MIN_ROW_WEIGHT = 0.82;
const tiles: readonly Tile[] = [
  {
    color: "blue",
    mobile: { colSpan: 2, rowSpan: 2 },
    desktop: { colSpan: 3, rowSpan: 2 }
  },
  {
    color: "cream",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "pink",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "mint",
    mobile: { colSpan: 1, rowSpan: 2 },
    desktop: { colSpan: 1, rowSpan: 2 }
  },
  {
    color: "orange",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "cream",
    mobile: { colStart: 1, colSpan: 3, rowStart: 3, rowSpan: 1 },
    desktop: { colStart: 2, colSpan: 3, rowStart: 2, rowSpan: 1 },
    label: "MAKE IT WEIRD",
    labelClassName: "items-center justify-center text-center text-ink"
  },
  {
    color: "coral",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "cream",
    mobile: { colSpan: 2, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "mint",
    mobile: { colSpan: 2, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 2 }
  },
  {
    color: "blue",
    mobile: { colSpan: 1, rowSpan: 2 },
    desktop: { colSpan: 1, rowSpan: 2 }
  },
  {
    color: "orange",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  },
  {
    color: "cream",
    mobile: { colStart: 2, colSpan: 3, rowStart: 5, rowSpan: 1 },
    desktop: { colStart: 3, colSpan: 3, rowStart: 4, rowSpan: 1 },
    label: "MAKE IT WORK",
    labelClassName: "items-center justify-center text-center text-ink"
  },
  {
    color: "cream",
    mobile: { colSpan: 1, rowSpan: 1 },
    desktop: { colSpan: 1, rowSpan: 1 }
  }
] as const;

export function Hero() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [activeMotion, setActiveMotion] = useState<ActiveMotion | null>(null);
  const [baseTitleWidths, setBaseTitleWidths] = useState<Record<number, number>>({});
  const [titleWidths, setTitleWidths] = useState<Record<number, number>>({});
  const visibleMotion = reduceMotion ? null : activeMotion;
  const resolvedPlacements = useMemo(() => resolvePlacements(isDesktop), [isDesktop]);
  const trackState = useMemo(
    () => getTrackState(visibleMotion, isDesktop, resolvedPlacements),
    [isDesktop, resolvedPlacements, visibleMotion]
  );
  const titleElementsRef = useRef(new Map<number, HTMLDivElement>());

  useEffect(() => {
    if (reduceMotion) {
      startTransition(() => {
        setActiveMotion(null);
      });
      return;
    }

    let cycleTimer: ReturnType<typeof setTimeout> | undefined;
    let lastIndex = -1;
    let cancelled = false;

    const runCycle = () => {
      if (cancelled) {
        return;
      }

      const nextMotion = createMotion(isDesktop, lastIndex);
      lastIndex = nextMotion.index;

      startTransition(() => {
        setActiveMotion(nextMotion);
      });

      cycleTimer = setTimeout(runCycle, 1280 + Math.random() * 1100);
    };

    cycleTimer = setTimeout(runCycle, 600);

    return () => {
      cancelled = true;
      if (cycleTimer) {
        clearTimeout(cycleTimer);
      }
    };
  }, [isDesktop, reduceMotion]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const observers = new Map<number, ResizeObserver>();

    for (const [index, element] of titleElementsRef.current.entries()) {
      const observer = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width ?? 0;

        if (!width) {
          return;
        }

        setBaseTitleWidths((current) =>
          current[index]
            ? current
            : {
                ...current,
                [index]: width
              }
        );

        setTitleWidths((current) => {
          if (current[index] === width) {
            return current;
          }

          return {
            ...current,
            [index]: width
          };
        });
      });

      observer.observe(element);
      observers.set(index, observer);
    }

    return () => {
      for (const observer of observers.values()) {
        observer.disconnect();
      }
    };
  }, [isDesktop]);

  return (
    <section
      id="top"
      className="h-[calc(100svh-82px)] border-b-[4px] border-ink bg-cream px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto flex h-full max-w-7xl">
        <div className="w-full flex-1 overflow-hidden rounded-[28px] border-[3px] border-ink bg-ink p-[3px]">
          <div className="h-full overflow-hidden rounded-[24px]">
            <div
              className="hero-motion-grid grid h-full min-h-0 w-full grid-cols-4 grid-rows-[repeat(6,minmax(0,1fr))] bg-ink md:grid-cols-6 md:grid-rows-[repeat(4,minmax(0,1fr))]"
              style={trackState.style}
            >
              {tiles.map((tile, index) => {
                const placement = resolvedPlacements[index];
                const motion = visibleMotion?.index === index ? visibleMotion : null;
                const titleMetrics = tile.label
                  ? getTitleMetrics({
                      baseWidth: baseTitleWidths[index],
                      currentWidth: titleWidths[index]
                    })
                  : null;

                return (
                  <div
                    key={`${tile.color}-${index}`}
                    className={`hero-motion-tile flex h-full min-h-0 overflow-hidden ${getColorClass(tile.color)} ${tile.labelClassName ?? ""}`}
                    data-active={motion ? "true" : "false"}
                    ref={(element) => {
                      if (!tile.label) {
                        return;
                      }

                      if (element) {
                        titleElementsRef.current.set(index, element);
                      } else {
                        titleElementsRef.current.delete(index);
                      }
                    }}
                    style={getGridStyle(placement)}
                  >
                    {tile.label ? (
                      <span
                        className="hero-tile-label inline-flex h-full w-full min-w-0 items-center justify-center whitespace-nowrap px-4 py-3 uppercase leading-none tracking-normal sm:px-5 sm:py-4 lg:px-6"
                        style={
                          {
                            fontSize: titleMetrics?.fontSize ?? "clamp(1.2rem, 3.1vw, 3.9rem)",
                            fontVariationSettings: `"wght" 1000, "wdth" ${titleMetrics?.widthAxis ?? 800}`,
                            transform: `scaleX(${titleMetrics?.scaleX ?? 1})`
                          } as CSSProperties
                        }
                      >
                        {tile.label}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getTrackState(activeMotion: ActiveMotion | null, isDesktop: boolean, placements: Placement[]): TrackState {
  const columnCount = isDesktop ? DESKTOP_COLUMNS : MOBILE_COLUMNS;
  const rowCount = isDesktop ? DESKTOP_ROWS : MOBILE_ROWS;
  const columnWeights = Array.from({ length: columnCount }, () => 1);
  const rowWeights = Array.from({ length: rowCount }, () => 1);

  if (activeMotion) {
    const placement = placements[activeMotion.index];
    const extreme = activeMotion.intensity === "extreme";
    const primaryWeights = activeMotion.axis === "x" ? columnWeights : rowWeights;
    const primaryStart = activeMotion.axis === "x" ? placement.colStart ?? 1 : placement.rowStart ?? 1;
    const primarySpan = activeMotion.axis === "x" ? placement.colSpan : placement.rowSpan;
    const crossWeights = activeMotion.axis === "x" ? rowWeights : columnWeights;
    const crossStart = activeMotion.axis === "x" ? placement.rowStart ?? 1 : placement.colStart ?? 1;
    const crossSpan = activeMotion.axis === "x" ? placement.rowSpan : placement.colSpan;

    applyTrackShift({
      amount: activeMotion.amount,
      expand: activeMotion.mode === "expand",
      extreme,
      floor: activeMotion.mode === "expand" ? (extreme ? 0.12 : 0.58) : extreme ? 0.2 : 0.46,
      span: primarySpan,
      start: primaryStart,
      weights: primaryWeights
    });

    if (activeMotion.mode === "collapse" && crossSpan === 1) {
      applyTrackShift({
        amount: 1,
        expand: false,
        extreme: false,
        floor: 0.7,
        span: crossSpan,
        start: crossStart,
        weights: crossWeights
      });
    }

    enforceTitleTrackFloor(columnWeights, rowWeights, isDesktop);
  }

  return {
    columnWeights,
    rowWeights,
    style: {
      gridTemplateColumns: columnWeights.map((weight) => `minmax(0, ${weight}fr)`).join(" "),
      gridTemplateRows: rowWeights.map((weight) => `minmax(0, ${weight}fr)`).join(" ")
    }
  };
}

function applyTrackShift({
  amount,
  expand,
  extreme,
  floor,
  span,
  start,
  weights
}: {
  amount: number;
  expand: boolean;
  extreme: boolean;
  floor: number;
  span: number;
  start: number;
  weights: number[];
}) {
  const activeStart = start - 1;
  const activeEnd = Math.min(weights.length, activeStart + span);
  const grow = (expand ? (extreme ? 1.45 : 0.55) : extreme ? 0.55 : 0.28) * amount;
  const shrink = expand ? (extreme ? 0.82 : Math.min(0.16 * amount, 0.22)) : (extreme ? 0.95 : 0.42) * amount;

  for (let index = 0; index < weights.length; index += 1) {
    const insideActiveSpan = index >= activeStart && index < activeEnd;

    if (expand) {
      if (insideActiveSpan) {
        weights[index] += grow;
      } else {
        weights[index] = Math.max(floor, weights[index] - shrink);
      }
    } else if (insideActiveSpan) {
      weights[index] = Math.max(floor, weights[index] - shrink);
    } else {
      weights[index] += grow;
    }
  }
}

function enforceTitleTrackFloor(columnWeights: number[], rowWeights: number[], isDesktop: boolean) {
  for (const tile of tiles) {
    if (!tile.label) {
      continue;
    }

    const placement = isDesktop ? tile.desktop : tile.mobile;
    const colStart = (placement.colStart ?? 1) - 1;
    const colEnd = Math.min(columnWeights.length, colStart + placement.colSpan);
    const rowStart = (placement.rowStart ?? 1) - 1;
    const rowEnd = Math.min(rowWeights.length, rowStart + placement.rowSpan);

    for (let index = colStart; index < colEnd; index += 1) {
      columnWeights[index] = Math.max(TITLE_MIN_TRACK_WEIGHT, columnWeights[index]);
    }

    for (let index = rowStart; index < rowEnd; index += 1) {
      rowWeights[index] = Math.max(TITLE_MIN_ROW_WEIGHT, rowWeights[index]);
    }
  }
}

function getTitleMetrics({ baseWidth, currentWidth }: { baseWidth?: number; currentWidth?: number }) {
  if (!baseWidth || !currentWidth) {
    return {
      fontSize: "clamp(1.2rem, 3.1vw, 3.9rem)",
      scaleX: 1,
      widthAxis: 800
    };
  }

  const ratio = currentWidth / baseWidth;
  const safeRatio = clamp(ratio, 0.62, 1.45);
  const normalizedWidth = (safeRatio - 0.62) / 0.83;
  const minSize = 1 + (safeRatio - 0.62) * 0.12;
  const fluidSize = 2.35 + (safeRatio - 0.62) * 0.4;
  const maxSize = 3 + (safeRatio - 0.62) * 0.35;

  return {
    fontSize: `clamp(${minSize.toFixed(3)}rem, ${fluidSize.toFixed(3)}vw, ${maxSize.toFixed(3)}rem)`,
    scaleX: safeRatio,
    widthAxis: clamp(Math.round(normalizedWidth * 1000), 0, 1000)
  };
}

function createMotion(isDesktop: boolean, previousIndex: number): ActiveMotion {
  const columns = isDesktop ? DESKTOP_COLUMNS : MOBILE_COLUMNS;
  const rows = isDesktop ? DESKTOP_ROWS : MOBILE_ROWS;
  const index = getRandomTileIndex(previousIndex);
  const tile = tiles[index];
  const placement = isDesktop ? tile.desktop : tile.mobile;
  const isTitle = Boolean(tile.label);
  const intensity: ActiveMotion["intensity"] = Math.random() > 0.72 ? "extreme" : "normal";

  if (isTitle) {
    const maxExtra = Math.max(1, Math.min(intensity === "extreme" ? 3 : 2, columns - placement.colSpan));

    return {
      amount: 1 + Math.floor(Math.random() * maxExtra),
      axis: "x",
      index,
      intensity,
      mode: "expand"
    };
  }

  const horizontalRoom = columns - placement.colSpan;
  const verticalRoom = rows - placement.rowSpan;
  const possibleAxes: ActiveMotion["axis"][] = [];

  if (horizontalRoom > 0) {
    possibleAxes.push("x");
  }
  if (verticalRoom > 0) {
    possibleAxes.push("y");
  }

  const axis = possibleAxes[Math.floor(Math.random() * possibleAxes.length)] ?? "x";
  const room = axis === "x" ? horizontalRoom : verticalRoom;
  const maxExtra = Math.max(1, Math.min(intensity === "extreme" ? 3 : 2, room));
  const mode: ActiveMotion["mode"] = Math.random() > 0.58 ? "expand" : "collapse";

  return {
    amount: 1 + Math.floor(Math.random() * maxExtra),
    axis,
    index,
    intensity,
    mode
  };
}

function getRandomTileIndex(previousIndex: number) {
  if (tiles.length <= 1) {
    return 0;
  }

  let nextIndex = previousIndex;

  while (nextIndex === previousIndex) {
    nextIndex = Math.floor(Math.random() * tiles.length);
  }

  return nextIndex;
}

function getGridStyle(placement: Placement): CSSProperties {
  return {
    gridColumn: placement.colStart ? `${placement.colStart} / span ${placement.colSpan}` : `span ${placement.colSpan}`,
    gridRow: placement.rowStart ? `${placement.rowStart} / span ${placement.rowSpan}` : `span ${placement.rowSpan}`
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function resolvePlacements(isDesktop: boolean) {
  const columns = isDesktop ? DESKTOP_COLUMNS : MOBILE_COLUMNS;
  const occupancy = new Set<string>();

  return tiles.map((tile) => {
    const base = isDesktop ? tile.desktop : tile.mobile;

    if (base.colStart && base.rowStart) {
      markOccupied(occupancy, base.colStart, base.rowStart, base.colSpan, base.rowSpan);
      return base;
    }

    let row = 1;

    while (row <= 20) {
      for (let col = 1; col <= columns - base.colSpan + 1; col += 1) {
        if (canPlace(occupancy, col, row, base.colSpan, base.rowSpan, columns)) {
          markOccupied(occupancy, col, row, base.colSpan, base.rowSpan);

          return {
            ...base,
            colStart: col,
            rowStart: row
          };
        }
      }

      row += 1;
    }

    return {
      ...base,
      colStart: 1,
      rowStart: 1
    };
  });
}

function canPlace(occupancy: Set<string>, colStart: number, rowStart: number, colSpan: number, rowSpan: number, columns: number) {
  if (colStart + colSpan - 1 > columns) {
    return false;
  }

  for (let row = rowStart; row < rowStart + rowSpan; row += 1) {
    for (let col = colStart; col < colStart + colSpan; col += 1) {
      if (occupancy.has(`${col}:${row}`)) {
        return false;
      }
    }
  }

  return true;
}

function markOccupied(occupancy: Set<string>, colStart: number, rowStart: number, colSpan: number, rowSpan: number) {
  for (let row = rowStart; row < rowStart + rowSpan; row += 1) {
    for (let col = colStart; col < colStart + colSpan; col += 1) {
      occupancy.add(`${col}:${row}`);
    }
  }
}

function getColorClass(color: string) {
  const map: Record<string, string> = {
    blue: "bg-blue",
    cream: "bg-cream",
    pink: "bg-pink",
    mint: "bg-mint",
    orange: "bg-orange",
    mauve: "bg-mauve",
    coral: "bg-coral"
  };

  return map[color] ?? "bg-cream";
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const update = () => {
      setMatches(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, [query]);

  return matches;
}
