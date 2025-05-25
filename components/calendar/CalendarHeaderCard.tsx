import { ChevronDown } from "lucide-react";


export function CalendarHeaderCard({ name, time }: { name: string; time: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-b-[1px] border-l-0 border-r-[1px] border-t-0 border-[#DBDBDB] p-4">
      <div className="flex items-center gap-x-3">
        <img className="h-[44px] w-[44px] rounded-full" src="/images/avatar.png" alt="image" />
        <div className="flex flex-col gap-y-1">
          <span className="text-[15px] font-semibold text-black">{name}</span>
          <span className="text-xs font-medium text-[#666666]">{time}</span>
        </div>
        <ChevronDown className="cursor-pointer text-lg" />
      </div>
    </div>
  );
}