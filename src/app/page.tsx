// "use client";
// import { Bell, CircleCheck, CircleX, Cloud, History, Landmark, Recycle, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// import metal from "@/assets/aluminium.jpg";
// import bottle from "@/assets/bottle.jpg";
// import glass from "@/assets/glass.jpg";
// import paper from "@/assets/paper.jpg";
// import Contact from "@/components/contact";
// import SpinLoading from "@/components/loading/SpinLoading";

// export interface ApiResponse {
//     message: string;
//     userData: UserData;
// }

// export interface UserData {
//     city: string;
//     email: string;
//     isVerified: boolean;
//     isWorker: boolean;
//     phoneNumber: string;
//     profilePicture: string;
//     state: string;
//     totalPointsEarned: number;
//     userDescription: string;
//     username: string;
//     wasteDumped: any[]; // You might want to define a type for wasteDumped if it has a specific structure
// }
// interface MaterialData {
//     [key: string]: {
//         merits: string;
//         demerits: string;
//     };
// }

// const materialData: MaterialData = {
//     Plastic: {
//         merits: "Plastic is versatile and lightweight.",
//         demerits: "Plastic is non-biodegradable and contributes to pollution.",
//     },
//     Glass: {
//         merits: "Glass is recyclable and does not degrade over time.",
//         demerits: "Glass production requires a lot of energy.",
//     },
//     Paper: {
//         merits: "Paper is biodegradable and recyclable.",
//         demerits: "Paper production can lead to deforestation.",
//     },
//     Metal: {
//         merits: "Metal is durable and can be recycled repeatedly.",
//         demerits: "Metal extraction and processing can be energy-intensive.",
//     },
// };

// const Page = () => {
//     const [user, setUserData] = useState<ApiResponse | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [openNotification, setOpenNotification] = useState<boolean>(false);
//     const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null); // State to hold the selected material
//     const [openModal, setOpenModal] = useState<boolean>(false);

//     const getUserData = async () => {
//         try {
//             const response = await fetch(`/api/auth/profile`);
//             const data = await response.json();
//             console.log(data);
//             setUserData(data);
//             setLoading(false);
//             return data;
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//             return [];
//         }
//     };

//     useEffect(() => {
//         getUserData();
//     }, []);

//     // Function to handle opening the modal and setting the selected material
//     const handleMaterialClick = (material: string) => {
//         setSelectedMaterial(material);
//         setOpenModal(true);
//     };

//     const calculateTotalCO2Saved = () => {
//         if (!user || !user.userData || !user.userData.wasteDumped) return 0;

//         let totalCO2Saved = 0;

//         user.userData.wasteDumped.forEach((waste) => {
//             // Assuming wasteDumped objects have a property named wastePoints indicating CO2 saved
//             totalCO2Saved += waste.wastePoints || 0;
//         });

//         return totalCO2Saved;
//     };

//     return (
//         <section className="flex flex-col gap-3 pt-2">
//             {loading ? (
//                 <div className="min-h-screen flex justify-center items-center">
//                     <SpinLoading />
//                 </div>
//             ) : (
//                 <>
//                     {user ? (
//                         <section className=" p-2 flex flex-col gap-8 relative">
//                             <div className="flex items-center justify-between ">
//                                 <Link href={"/profile"} className="flex items-center gap-3">
//                                     <img src={user.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className=" w-12 h-12 rounded-xl" alt="" />
//                                     <div className="flex flex-col gap-0">
//                                         <h1 className=" font-semibold text-xl capitalize">Hi,{user?.userData?.username || "Unknown"}</h1>
//                                         <span className=" text-sm font-medium opacity-70 ">
//                                             {user?.userData?.state || "Unknown"} , {user?.userData?.city || "Unknown"}
//                                         </span>
//                                     </div>
//                                 </Link>

//                                 <div className="flex gap-3">
//                                     <Link href={"/history"}>
//                                         <History size={30} className=" opacity-60" />
//                                     </Link>
//                                     <Bell size={30} className=" opacity-60 relative " onClick={() => setOpenNotification(!openNotification)} />
//                                     <div className={` w-44 h-56 z-50 overscroll-y-scroll absolute bg-white ${openNotification ? " scale-100" : "scale-0"} duration-200 rounded-lg top-16 shadow-md shadow-black/40 right-5 border-2 border-black/10`}></div>
//                                 </div>
//                             </div>

//                             <div className=" bg-red-600 shadow-2xl p-6 shadow-black/30 rounded-lg w-full ">
//                                 <div className="flex items-center justify-between gap-4 p-4 text-white">
//                                     <div className="flex flex-col justify-center items-center">
//                                         <div className="border-2 rounded-full p-1">
//                                             <Landmark size={32} />
//                                         </div>
//                                         <span className=" font-semibold uppercase text-lg">{user?.userData.totalPointsEarned}</span>
//                                         <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Points</span>
//                                     </div>

//                                     <div className=" h-16 w-[3px] bg-white/40"></div>

//                                     <div className="flex flex-col justify-center items-center">
//                                         <div className="border-2 rounded-full p-1">
//                                             <Cloud size={32} />
//                                         </div>
//                                         <span className=" font-semibold uppercase text-lg">{calculateTotalCO2Saved()}G</span>
//                                         <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Saved CO2</span>
//                                     </div>

//                                     <div className=" h-16 w-[3px] bg-white/40"></div>

//                                     <div className="flex flex-col justify-center items-center">
//                                         <div className="border-2 rounded-full p-1">
//                                             <Recycle size={32} />
//                                         </div>
//                                         <span className=" font-semibold uppercase text-lg">{user?.userData?.wasteDumped?.length}</span>
//                                         <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Recycled</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex flex-col gap-3 ">
//                                 <div className="flex justify-between items-center">
//                                     <h1 className=" font-semibold  opacity-90 text-red-900 text-2xl tracking-wide">Materials</h1>
//                                 </div>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div onClick={() => handleMaterialClick("Plastic")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
//                                         <Image src={bottle} alt="bottle" height={200} className=" h-24 w-24" width={200} />
//                                         <h1>Plastic</h1>
//                                     </div>
//                                     <div onClick={() => handleMaterialClick("Glass")} className="flex justify-center items-center flex-col  gap-2 shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
//                                         <Image src={glass} alt="bottle" height={200} className=" h-24 w-24" width={200} />
//                                         <h1>Glass</h1>
//                                     </div>
//                                     <div onClick={() => handleMaterialClick("Paper")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
//                                         <Image src={paper} alt="bottle" height={200} className=" h-24 w-24" width={200} />
//                                         <h1>Paper</h1>
//                                     </div>
//                                     <div onClick={() => handleMaterialClick("Metal")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
//                                         <Image src={metal} alt="bottle" height={200} className=" h-24 w-24" width={200} />
//                                         <h1>Metal</h1>
//                                     </div>
//                                 </div>
//                             </div>
//                         </section>
//                     ) : (
//                         <h1 className=" text-3xl font-bold text-red-500 min-h-screen">Error loading user profile</h1>
//                     )}
//                 </>
//             )}
//             <div className={`w-full min-h-screen bg-black/70 fixed top-0 left-0 right-0 z-50 ${openModal ? "scale-100" : "scale-0"} duration-200`}>
//                 <div className="flex justify-center items-center min-h-screen rounded-lg">
//                     <div className=" bg-white rounded-xl w-[90%] h-72 shadow-lg shadow-white/10 overflow-y-scroll ">
//                         <div className="flex justify-end items-end p-4">
//                             <X size={40} onClick={() => setOpenModal(!openModal)} />
//                         </div>
//                         {selectedMaterial && (
//                             <div className="p-4 flex flex-col gap-3">
//                                 <h2 className="text-2xl font-semibold">{selectedMaterial}</h2>
//                                 <p className="text-xl font-bold">
//                                     <CircleCheck size={20} color="red" /> {materialData[selectedMaterial].merits}
//                                 </p>
//                                 <p className=" gap-3 items-center text-xl font-medium ">
//                                     <div className=" text-xl font-bold">
//                                         <CircleX color="red" size={20} /> {materialData[selectedMaterial].demerits}
//                                     </div>
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <Contact />
//         </section>
//     );
// };

// export default Page;

"use client";
import { Bell, CircleCheck, CircleX, Cloud, History, Landmark, Recycle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import metal from "@/assets/aluminium.jpg";
// import bottle from "@/assets/bottle.jpg";
import cardboardImage from "@/assets/cardboard.png";
import eggCratesImage from "@/assets/egg.png";
import bottle from "@/assets/image1.png";
import paper from "@/assets/image2.png";
import glass from "@/assets/image3.png";
import Contact from "@/components/contact";
import SpinLoading from "@/components/loading/SpinLoading";

export interface ApiResponse {
    message: string;
    userData: UserData;
}

export interface UserData {
    city: string;
    email: string;
    isVerified: boolean;
    isWorker: boolean;
    phoneNumber: string;
    profilePicture: string;
    state: string;
    totalPointsEarned: number;
    userDescription: string;
    username: string;
    wasteDumped: any[];
}

interface MaterialData {
    [key: string]: {
        merits: string;
        demerits: string;
    };
}

const materialData: MaterialData = {
    Plastic: {
        merits: "Plastic is versatile and lightweight.",
        demerits: "Plastic is non-biodegradable and contributes to pollution.",
    },
    Glass: {
        merits: "Glass is recyclable and does not degrade over time.",
        demerits: "Glass production requires a lot of energy.",
    },
    Paper: {
        merits: "Paper is biodegradable and recyclable.",
        demerits: "Paper production can lead to deforestation.",
    },
    Metal: {
        merits: "Metal is durable and can be recycled repeatedly.",
        demerits: "Metal extraction and processing can be energy-intensive.",
    },
    "Egg Crates": {
        merits: "Egg crates made from molded pulp are biodegradable, recyclable, and made from recycled paper fibers. They provide good cushioning and protection for eggs.",
        demerits: "Molded pulp egg crates can absorb moisture easily, which may affect durability. Production involves water and energy consumption, and composting facilities may be limited.",
    },
    Cardboard: {
        merits: "Cardboard is widely recyclable, biodegradable, and made from renewable resources. It is strong and lightweight, ideal for packaging and shipping.",
        demerits: "Cardboard production can contribute to deforestation and uses water and energy. It can lose strength if exposed to moisture and may require recycling facilities to be effective.",
    },
};

const Page = () => {
    const [user, setUserData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const getUserData = async () => {
        try {
            const response = await fetch(`/api/auth/profile`);
            const data = await response.json();
            setUserData(data);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleMaterialClick = (material: string) => {
        setSelectedMaterial(material);
        setOpenModal(true);
    };

    const calculateTotalCO2Saved = () => {
        if (!user || !user.userData || !user.userData.wasteDumped) return 0;

        let totalCO2Saved = 0;
        user.userData.wasteDumped.forEach((waste) => {
            totalCO2Saved += waste.wastePoints || 0;
        });

        return totalCO2Saved;
    };

    return (
        <section className="flex flex-col gap-3 pt-2">
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <>
                    {user ? (
                        <section className="p-2 flex flex-col gap-8 relative">
                            <div className="flex items-center justify-between">
                                <Link href={"/profile"} className="flex items-center gap-3">
                                    <img
                                        src={
                                            user.userData?.profilePicture ||
                                            "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"
                                        }
                                        className="w-12 h-12 rounded-xl"
                                        alt=""
                                    />
                                    <div className="flex flex-col gap-0">
                                        <h1 className="font-semibold text-xl capitalize">
                                            Hi, {user?.userData?.username || "Unknown"}
                                        </h1>
                                        <span className="text-sm font-medium opacity-70">
                                            {user?.userData?.state || "Unknown"},{" "}
                                            {user?.userData?.city || "Unknown"}
                                        </span>
                                    </div>
                                </Link>

                                <div className="flex gap-3">
                                    <Link href={"/history"}>
                                        <History size={30} className="opacity-60" />
                                    </Link>
                                    <Bell
                                        size={30}
                                        className="opacity-60 relative"
                                        onClick={() => setOpenNotification(!openNotification)}
                                    />
                                    <div
                                        className={`w-44 h-56 z-50 overscroll-y-scroll absolute bg-slate-50 ${
                                            openNotification ? "scale-100" : "scale-0"
                                        } duration-200 rounded-lg top-16 shadow-md shadow-slate-300 right-5 border-2 border-slate-300`}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-indigo-600 shadow-2xl p-6 shadow-indigo-300 rounded-lg w-full">
                                <div className="flex items-center justify-between gap-4 p-4 text-white">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 border-white rounded-full p-1">
                                            <Landmark size={32} />
                                        </div>
                                        <span className="font-semibold uppercase text-lg">
                                            {user?.userData.totalPointsEarned}
                                        </span>
                                        <span className="uppercase text-xs opacity-70 font-semibold tracking-wider">
                                            Points
                                        </span>
                                    </div>

                                    <div className="h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 border-white rounded-full p-1">
                                            <Cloud size={32} />
                                        </div>
                                        <span className="font-semibold uppercase text-lg">
                                            {calculateTotalCO2Saved()}G
                                        </span>
                                        <span className="uppercase text-xs opacity-70 font-semibold tracking-wider">
                                            Saved CO2
                                        </span>
                                    </div>

                                    <div className="h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 border-white rounded-full p-1">
                                            <Recycle size={32} />
                                        </div>
                                        <span className="font-semibold uppercase text-lg">
                                            {user?.userData?.wasteDumped?.length}
                                        </span>
                                        <span className="uppercase text-xs opacity-70 font-semibold tracking-wider">
                                            Recycled
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <h1 className="font-semibold opacity-90 text-indigo-900 text-2xl tracking-wide">
                                        Materials
                                    </h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { name: "Plastic", img: bottle },
                                        { name: "Glass", img: glass },
                                        { name: "Paper", img: paper },
                                        { name: "Metal", img: metal },
                                        { name: "Egg Crates", img: eggCratesImage }, // <-- add your egg crate image import
                                        { name: "Cardboard", img: cardboardImage }, 
                                    ].map((item) => (
                                        <div
                                            key={item.name}
                                            onClick={() => handleMaterialClick(item.name)}
                                            className="flex justify-center items-center flex-col gap-2 shadow-lg rounded-xl p-3 border-2 border-slate-300 shadow-indigo-100 hover:shadow-indigo-200 transition-shadow"
                                        >
                                            <Image
                                                src={item.img}
                                                alt={item.name}
                                                height={200}
                                                width={200}
                                                className="h-24 w-24"
                                            />
                                            <h1>{item.name}</h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ) : (
                        <h1 className="text-3xl font-bold text-indigo-500 min-h-screen">
                            Error loading user profile
                        </h1>
                    )}
                </>
            )}

            {/* Modal */}
            <div
                className={`w-full min-h-screen bg-black/70 fixed top-0 left-0 right-0 z-50 ${
                    openModal ? "scale-100" : "scale-0"
                } duration-200`}
            >
                <div className="flex justify-center items-center min-h-screen rounded-lg">
                    <div className="bg-slate-50 rounded-xl w-[90%] h-72 shadow-lg shadow-indigo-200 overflow-y-scroll">
                        <div className="flex justify-end items-end p-4">
                            <X size={40} onClick={() => setOpenModal(!openModal)} />
                        </div>
                        {selectedMaterial && (
                            <div className="p-4 flex flex-col gap-3">
                                <h2 className="text-2xl font-semibold">{selectedMaterial}</h2>
                                <p className="text-xl font-bold flex items-center gap-2">
                                    <CircleCheck size={20} color="#4f46e5" />{" "}
                                    {materialData[selectedMaterial].merits}
                                </p>
                                <p className="text-xl font-bold flex items-center gap-2">
                                    <CircleX size={20} color="#4f46e5" />{" "}
                                    {materialData[selectedMaterial].demerits}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Contact />
        </section>
    );
};

export default Page;

