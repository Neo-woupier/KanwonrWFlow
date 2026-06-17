"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-zinc-100", // ปรับตัวหนังสือหัวข้อให้สว่าง
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-14 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute -left-3 text-zinc-100 border-zinc-800 hover:bg-zinc-800"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-14 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute -right-8 text-zinc-100 border-zinc-800 hover:bg-zinc-800"
        ),
        weekdays: "flex",
        weekday: "text-zinc-400 rounded-md w-8 sm:w-9 font-normal text-[0.8rem]", // ปรับสีชื่อวัน (อา.-ส.) ให้เห็นชัด
        week: "flex w-full mt-2",
        day: "p-0 text-center text-sm relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-zinc-800/50 [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 sm:h-9 sm:w-9 p-0 font-normal text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 rounded-md aria-selected:opacity-100" // 🎯 ปรับให้ตัวเลขวันที่เป็นสีขาว ไม่จมดินแล้วครับ!
        ),
        selected: "bg-zinc-100 text-zinc-950 hover:bg-zinc-100 hover:text-zinc-950 focus:bg-zinc-100 focus:text-zinc-950 rounded-md", // วันที่กดเลือก ให้พื้นขาวตัวหนังสือดำเด่นๆ
        today: "bg-zinc-800 text-zinc-100 rounded-md",
        outside: "day-outside text-zinc-600 opacity-50 aria-selected:bg-zinc-800/50 aria-selected:text-zinc-400 aria-selected:opacity-30",
        disabled: "text-zinc-600 opacity-50",
        range_middle: "aria-selected:bg-zinc-800 aria-selected:text-zinc-100",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 text-zinc-100" />
          }
          return <ChevronRight className="h-4 w-4 text-zinc-100" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }