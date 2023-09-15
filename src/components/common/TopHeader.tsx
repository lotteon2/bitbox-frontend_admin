import React from "react";
import Badge from "../common/Badge";

export default function TopHeader() {
    return <div className="h-16 relative">
        <div className="absolute right-10 top-5 flex flex-row gap-5">
            {/* TODO: Badge props String으로 받고 있음 여기도 편한대로 수정해서 하면 될듯!!*/}
            <Badge status={"매니저"}/>
            <div className="mt-2 font-bold">이름</div>
            <div className="w-[50px] h-[50px] mt-[-4px] rounded-full bg-black"></div>
        </div>
    </div>
}