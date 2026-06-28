type Tile = {
  color: string;
  className: string;
  label?: string;
  labelClassName?: string;
};

const tiles: readonly Tile[] = [
  {
    color: "blue",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
  },
  {
    color: "cream",
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-1"
  },
  {
    color: "pink",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
  },
  {
    color: "mint",
    className: "col-span-1 row-span-2 md:col-span-1 md:row-span-2"
  },
  {
    color: "orange",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1"
  },
  {
    color: "mauve",
    className: "col-span-2 row-span-1 md:col-span-3 md:row-span-1",
    label: "MAKE IT WEIRD",
    labelClassName: "items-center justify-start text-left text-ink"
  },
  {
    color: "coral",
    className: "col-span-1 row-span-1 md:col-span-1 md:row-span-1"
  },
  {
    color: "cream",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1"
  },
  {
    color: "mint",
    className: "col-span-2 row-span-1 md:col-span-1 md:row-span-1"
  },
  {
    color: "blue",
    className: "col-span-1 row-span-2 md:col-span-1 md:row-span-2"
  },
  {
    color: "orange",
    className: "col-span-1 row-span-1 md:col-span-2 md:row-span-1"
  },
  {
    color: "pink",
    className: "col-span-2 row-span-1 md:col-span-3 md:row-span-1",
    label: "MAKE IT WORK",
    labelClassName: "items-center justify-end text-right text-ink"
  }
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="h-[calc(100svh-82px)] border-b-[4px] border-ink bg-cream px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto flex h-full max-w-7xl">
        <div className="w-full flex-1 overflow-hidden rounded-[28px] border-[3px] border-ink bg-ink p-[3px]">
          <div className="h-full overflow-hidden rounded-[24px]">
            <div className="grid h-full min-h-0 w-full grid-cols-4 grid-rows-[repeat(7,minmax(0,1fr))] gap-[3px] bg-ink md:grid-cols-6 md:grid-rows-[repeat(4,minmax(0,1fr))]">
              {tiles.map((tile, index) => (
                <div
                  key={`${tile.color}-${index}`}
                  className={`flex h-full min-h-0 ${tile.className} ${getColorClass(tile.color)} ${tile.labelClassName ?? ""}`}
                >
                  {tile.label ? (
                    <span className="inline-flex w-fit whitespace-nowrap px-4 py-3 font-display text-[clamp(1.5rem,3.8vw,4.5rem)] uppercase leading-none tracking-normal sm:px-5 sm:py-4 lg:px-6">
                      {tile.label}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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
