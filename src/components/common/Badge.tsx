import React from "react";

interface propsType {
    status: string;
}
export default function Badge(props: propsType) {
    return <div className={props.status === "매니저" ? "w-[80px] h-[40px] text-center pt-2 bg-grayscale5 rounded-lg text-grayscale1 font-bold" : props.status === "강사" ? "w-[80px] h-[40px] bg-[#3056D3] rounded-lg text-grayscale1 font-bold" : "w-[80px] h-[40px] bg-secondary1 rounded-lg text-grayscale1 font-bold"}>{props.status}</div>
}