import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { GlobalContext } from "~/context/globalcontext";

export function DatePickerWRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const DateContext = React.useContext(GlobalContext);

  if (DateContext)
    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !DateContext?.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {DateContext?.date?.from ? (
                DateContext?.date.to ? (
                  <>
                    {format(DateContext?.date.from, "LLL dd, y")} -{" "}
                    {format(DateContext?.date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(DateContext?.date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={DateContext?.date?.from}
              selected={DateContext?.date}
              //@ts-expect-error
              onSelect={DateContext?.setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  else {
    return <></>;
  }
}
