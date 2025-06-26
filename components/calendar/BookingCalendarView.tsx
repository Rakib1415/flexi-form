"use client";

import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingCalendarCard } from "./BookingCalendarCard";
import { CalendarHeaderCard } from "./CalendarHeaderCard";

const barberData = [
  {
    id: 1,
    name: "Mike ware",
    bookings: [{ id: 1, name: "Jerome Bell", time: "8:00 am-9:00 am" }],
    time: "8:00 - 6:00 pm",
  },
  {
    id: 2,
    name: "Cody Fisher",
    bookings: [{ id: 2, name: "Courtney Henry", time: "11:00 am-12:00 pm" }],
    time: "8:00 - 7:00 pm",
  },
  {
    id: 3,
    name: "Cody Fisher",
    bookings: [{ id: 1, name: "Jerome Bell", time: "1:00 pm-2:00 pm" }],
    time: "10:00 - 8:00 pm",
  },
  {
    id: 4,
    name: "Cody Fisher",
    bookings: [
      { id: 1, name: "Jerome Bell", time: "10:00 pm-11:00 pm" },
      { id: 2, name: "Jerome Bell", time: "9:00 am-10:00 am" },
    ],
    time: "9:00 - 6:00 pm",
  },
];

const timeSlots = [
  { id: 1, time: "8:00", timeFormat: "am" },
  { id: 2, time: "9:00", timeFormat: "am" },
  { id: 3, time: "10:00", timeFormat: "am" },
  { id: 4, time: "11:00", timeFormat: "am" },
  { id: 5, time: "12:00", timeFormat: "pm" },
  { id: 6, time: "1:00", timeFormat: "pm" },
  { id: 7, time: "2:00", timeFormat: "pm" },
  { id: 8, time: "3:00", timeFormat: "pm" },
  { id: 9, time: "4:00", timeFormat: "pm" },
  { id: 10, time: "5:00", timeFormat: "pm" },
  { id: 11, time: "6:00", timeFormat: "pm" },
  { id: 12, time: "7:00", timeFormat: "pm" },
  { id: 13, time: "8:00", timeFormat: "pm" },
  { id: 14, time: "9:00", timeFormat: "pm" },
  { id: 15, time: "10:00", timeFormat: "pm" },
  { id: 16, time: "11:00", timeFormat: "pm" },
  { id: 17, time: "12:00", timeFormat: "am" },
  { id: 18, time: "1:00", timeFormat: "am" },
  { id: 19, time: "2:00", timeFormat: "am" },
  { id: 20, time: "3:00", timeFormat: "am" },
  { id: 21, time: "4:00", timeFormat: "am" },
  { id: 22, time: "5:00", timeFormat: "am" },
  { id: 23, time: "6:00", timeFormat: "am" },
  { id: 24, time: "7:00", timeFormat: "am" },
];

export function BookingCalendarView() {
  const [currentTimePosition, setCurrentTimePosition] = useState(0);
  const [elements, setElements] = useState<any>([]);

  // Function to handle placing elements
  const addElement = (row: number, col: number) => {
    setElements((prev: any) => [...prev, { row, col }]);
  };

  useEffect(() => {
    const updateCurrentTimePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      const totalMinutes =
        currentHour * 60 + currentMinutes + currentSeconds / 60;
      const minutesSince7AM = totalMinutes - 420;

      const position = Math.max(0, (minutesSince7AM / 1440) * 1895);
      // const totalHeight = 1840;
      // const totalSeconds = currentHour * 3600 + currentMinutes * 60 + currentSeconds;
      // const position = totalSeconds * (totalHeight / 86400);

      // console.log({ position });

      setCurrentTimePosition(position);
    };

    updateCurrentTimePosition(); // Set initial position
    const interval = setInterval(updateCurrentTimePosition, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const findRowForTimeSlot = (
    startHour: string,
    endHour: string,
    timeFormat: "am" | "pm"
  ) => {
    if (startHour === "8" && endHour === "9" && timeFormat === "am") return 0;
    else if (startHour === "9" && endHour === "10" && timeFormat === "am")
      return 1;
    else if (startHour === "10" && endHour === "11" && timeFormat === "am")
      return 2;
    else if (startHour === "11" && endHour === "12" && timeFormat === "am")
      return 3;
    else if (startHour === "12" && endHour === "1" && timeFormat === "pm")
      return 4;
    else if (startHour === "1" && endHour === "2" && timeFormat === "pm")
      return 5;
    else if (startHour === "2" && endHour === "3" && timeFormat === "pm")
      return 6;
    else if (startHour === "3" && endHour === "4" && timeFormat === "pm")
      return 7;
    else if (startHour === "4" && endHour === "5" && timeFormat === "pm")
      return 8;
    else if (startHour === "5" && endHour === "6" && timeFormat === "pm")
      return 9;
    else if (startHour === "6" && endHour === "7" && timeFormat === "pm")
      return 10;
    else if (startHour === "7" && endHour === "8" && timeFormat === "pm")
      return 11;
    else if (startHour === "8" && endHour === "9" && timeFormat === "pm")
      return 12;
    else if (startHour === "9" && endHour === "10" && timeFormat === "pm")
      return 13;
    else if (startHour === "10" && endHour === "11" && timeFormat === "pm")
      return 14;
    else if (startHour === "11" && endHour === "12" && timeFormat === "pm")
      return 15;
    else if (startHour === "12" && endHour === "1" && timeFormat === "am")
      return 16;
    else if (startHour === "1" && endHour === "2" && timeFormat === "am")
      return 17;
    else if (startHour === "2" && endHour === "3" && timeFormat === "am")
      return 18;
    else if (startHour === "3" && endHour === "4" && timeFormat === "am")
      return 19;
    else if (startHour === "4" && endHour === "5" && timeFormat === "am")
      return 20;
    else if (startHour === "5" && endHour === "6" && timeFormat === "am")
      return 21;
    else if (startHour === "6" && endHour === "7" && timeFormat === "am")
      return 22;
    else if (startHour === "7" && endHour === "8" && timeFormat === "am")
      return 23;
  };

  useEffect(() => {
    barberData?.forEach((barber: any, index: number) => {
      barber?.bookings?.forEach((item: any) => {
        const [startTime, endTime] = item?.time?.split("-");
        const timeFormat = startTime?.split(" ")[1];
        const startHour = startTime?.split(" ")[0]?.split(":")[0];
        const endHour = endTime?.split(" ")[0]?.split(":")[0];
        const row: any = findRowForTimeSlot(startHour, endHour, timeFormat);
        console.log({
          startTime,
          endTime,
          timeFormat,
          startHour,
          endHour,
          row,
        });
        setElements((prev: any) => [
          ...prev,
          { ...item, row: row + 1, col: index },
        ]);
      });
    });
  }, []);

  return (
    <div>
      {/* Calendar Header start */}
      <div className="grid grid-cols-12">
        <div className="col-span-1 flex flex-col items-center justify-center border border-b-[1px] border-l-0 border-r-[1px] border-t-0 border-[#DBDBDB] p-4">
          <span className="text-sm font-bold text-black">Day</span>
          <span className="text-xs font-semibold text-[#666666]">
            GMT +5:30
          </span>
        </div>
        <div className="col-span-11">
          <div
            className="grid w-full overflow-x-auto"
            style={{
              gridTemplateColumns: `repeat(${
                barberData?.length || 1
              }, minmax(300px, 1fr))`,
            }}
          >
            {barberData?.map((item) => (
              <CalendarHeaderCard
                key={item?.id}
                name={item?.name}
                time={item?.time}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Calendar Header end */}

      <div className="grid grid-cols-12">
        {/* Days Hours section start  */}
        <div className="col-span-1 flex h-full flex-col border border-b-0 border-l-0 border-r-[1px] border-t-0 border-[#DBDBDB]">
          {timeSlots?.map((timeSlot) => (
            <div
              key={timeSlot?.id}
              className="relative flex h-[80px] items-end justify-end gap-x-2"
            >
              <div className="absolute bottom-[-17px] right-12 text-[13px] font-medium text-[#858585]">
                {timeSlot?.time} <br /> {timeSlot?.timeFormat}
              </div>
              <div className="h-[2px] w-[40px] bg-[#CCCCCC]"></div>
            </div>
          ))}
        </div>
        {/* Days Hours section end  */}

        <div className="col-span-11 bg-white">
          <div
            className="grid h-0"
            style={{
              gridTemplateColumns: `repeat(${
                barberData?.length || 1
              }, minmax(0, 1fr))`,
            }}
          >
            {barberData?.map((item, col) => (
              <div
                key={item?.id}
                className="relative flex h-full flex-col border border-b-0 border-l-0 border-r-[1px] border-t-0 border-[#DBDBDB]"
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: `repeat(24, 80px)`,
                  }}
                >
                  {Array.from({ length: 24 }).map((_, row) => (
                    <div className="relative cursor-pointer" key={row}>
                      <div
                        className="absolute left-0 right-0 z-50"
                        style={{
                          top: `${currentTimePosition}px`,
                          transition: "top 0.5s linear",
                        }}
                      >
                        {row === 0 && col === 0 && (
                          <div className="ml-3 flex items-center">
                            <div className="h-[11px] w-[11px] rounded-full bg-[#FF7C56]"></div>
                            <div className="h-[2px] w-full bg-[#FF7C56]"></div>
                          </div>
                        )}
                        {row === 0 && col > 0 && (
                          <div className="flex items-center">
                            <div className="h-[11px]"></div>
                            <div className="h-[2px] w-full bg-[#FF7C56]"></div>
                          </div>
                        )}
                      </div>
                      <div className="h-[80px] border border-b-2 border-l-0 border-r-0 border-t-0 border-[#CCCCCC]">
                        <div className="h-[20px] border border-b-[1px] border-l-0 border-r-0 border-t-0 border-[#EBEBEB]"></div>
                        <div className="h-[20px] border border-b-[1px] border-l-0 border-r-0 border-t-0 border-[#EBEBEB]"></div>
                        <div className="h-[20px] border border-b-[1px] border-l-0 border-r-0 border-t-0 border-[#EBEBEB]"></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Render Placed Elements */}
                {elements.map((element: any, index: number) =>
                  element.col === col ? (
                    <div
                      key={index}
                      className="absolute w-full px-3 py-1"
                      style={{
                        top: `${element.row * 80}px`,
                        left: "0px",
                      }}
                    >
                      <BookingCalendarCard
                        name={element?.name}
                        time={element?.time}
                        serviceType="Eyebrow waxing"
                        bgColor="#DBFFE0"
                        borderColor="#27A439"
                        icon={<Calendar className="text-lg" />}
                      />
                    </div>
                  ) : null
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
