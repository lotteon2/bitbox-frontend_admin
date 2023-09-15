import React from "react";
import Header from "../components/common/Header";
import TopHeader from "../components/common/TopHeader";
import {Outlet} from "react-router-dom";

export default function MainLayout() {
    return <div className="w-[1920px] h-screen flex flex-row">
        <div className="w-[300px] h-full font-regular text-3xl">
            <Header />
        </div>
        <div className="w-full h-full">
            <TopHeader />
            <Outlet />
        </div>
    </div>;
}