export interface BookingCalendarCardProps {
    name: string;
    time: string;
    icon: any;
    serviceType: string;
    bgColor: string;
    borderColor: string;
  }
  
  export function BookingCalendarCard({ name, time, icon, serviceType, borderColor, bgColor }: BookingCalendarCardProps) {
    return (
      <div
        style={{ borderColor, backgroundColor: bgColor }}
        className="flex cursor-pointer items-end justify-between gap-x-2 rounded-[10px] border-b-[0px] border-l-[8px] border-r-[0px] border-t-[0px] px-4 py-[10px]"
      >
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">{name}</span>
          <span className="text-xs font-medium text-[#666666]">{time}</span>
          <span className="text-xs font-medium text-[#333333]">{serviceType}</span>
        </div>
        {icon}
      </div>
    );
  }