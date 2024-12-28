import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { GlobalContext } from "~/context/globalcontext"

const assets = [
  {
    value: "bitcoin",
    label: "BTC",
  },
  {
    value: "ethereum",
    label: "ETH",
  },
  {
    value: "solana",
    label: "SOL",
  },
  {
    value: "ripple",
    label: "XRP",
  },
  {
    value: "binancecoin",
    label: "BNB",
  },
  {
    value: "dogecoin",
    label: "DOGE",
  },
  {
    value: "avalanche-2",
    label: "AVAX",
  }
]

export function ChartSelector() {
  const [open, setOpen] = React.useState(false)
  const ChartContext = React.useContext(GlobalContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {ChartContext?.value_obj
            ? assets.find((framework) => framework.value === ChartContext?.value_obj.value)?.label
            : "Select a currency..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search asset..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {assets.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    ChartContext?.setValue({value: currentValue === ChartContext.value_obj.value ? "" : currentValue, label: framework.label})
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      ChartContext?.value_obj.value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
