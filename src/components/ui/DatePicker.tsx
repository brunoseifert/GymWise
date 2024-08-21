import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";

interface DatePickerPopUpProps {
  placeholder?: string;
  id?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

export function DatePickerPopUp({
  placeholder = "Selecione",
  id,
  value,
  onChange,
  className,
}: DatePickerPopUpProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      onChange(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left text-white bg-grayOne max-w-fit font-normal",
            !date && "text-muted-foreground",
            className
          )}
          id={id}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {date ? (
            format(date, "PPP", { locale: ptBR })
          ) : (
            <span className="text-white">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          required
        />
      </PopoverContent>
    </Popover>
  );
}
