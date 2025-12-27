"use client"

import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"


import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const { theme, setTheme } = useTheme();

  // البيانات كـ Object
  const doctorsData = [
    {
      name: "دكتور سيد الشبراوي",
      services: [
        { service: "ايكو للكبار", price: 350 },
        { service: "ايكو اطفال و حديثي الولادة و الاجنة", price: 450 },
        { service: "هولتر 24 ساعه", price: 450 },
        { service: "هولتر 48 ساعه", price: 800 },
        { service: "كشف", price: 600 },
      ],
    },
    {
      name: "دكتور اكرم",
      services: [
        { service: "دوبلر ملون علي الشرايين و الاوردة", price: 400 },
        { service: "سونار علي بطن و الحوض", price: 400 },
        { service: "دوبلر علي الخصيتين", price: 400 },
      ],
    },
  ];



  return (
    <div className="overflow-x-hidden min-h-[200vh]">
      <header className=" fixed top-0 bg-[#bd334ae3]/60 w-full backdrop-blur-[3px] z-50">
        <nav className="flex items-center justify-between p-4 ">
          <div className="flex items-center justify-center">
            <a href="tel:+201127779055">
              <Badge className="bg-[#bd334ae3] mx-1 p-2 h-6"
              >
                اتصل بنا
              </Badge>
            </a>
            <Badge className="bg-[#bd334ae3] mx-1 p-2 h-6"
              onClick={() =>
                toast("العنوان", {
                  position: "top-center",
                  description: " أمام مستشفى الباطنة والقصر العيني الفرنساوي، فوق صيدلية الشمس، الدور الثالث.",
                  action: {
                    label: "Maps",
                    onClick: () => { window.location.href = "https://www.google.com/maps/place/%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D9%84%D8%A9+%D9%84%D9%84%D8%A7%D8%B4%D8%B9%D8%A9%E2%80%AD/@30.0298901,31.2324764,20z/data=!4m6!3m5!1s0x14584756accf3fd1:0xb4b505f7ae0166ef!8m2!3d30.029936!4d31.232703!16s%2Fg%2F11b5pj4tb6?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D" }
                    ,
                  },
                })
              }
            >
              العنوان
            </Badge>
          </div>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="bg-[#bd334ae3]/60"
          >
            {theme === "light" ? <Sun /> : <Moon />}
          </Button>
        </nav>

      </header>
      <main className="flex flex-col">
        <div className="grid justify-items-center overflow-x-hidden mt-20">
          <h1 className="arFont text-[10vw] font-extrabold select-all text-right ">
            مركز رسالة للقلب
          </h1>
          <Badge className="arFont bg-[#bd334ae3]/50 mt-4 text-foreground">
            .استلام اشعه فوري و بارخص سعر
          </Badge>
        </div>
        <div className="flex justify-between px-10 mt-8">
          <Link href={"/chat"}>
            <Button className="bg-[#bd334ae3]/50 text-foreground">
              Ai # اضغط هنا للتواصل
            </Button>

          </Link>
          <a href="https://wa.me/+201127779055" rel="noopener noreferrer">
            <Button className="bg-[#8fc08de3] text-foreground">
              Whatsapp<FaWhatsapp />
            </Button>
          </a>
        </div>
        <Image
          className="heart"
          src="/ruby.png"
          alt="Next.js logo"
          width={900}
          height={400}
          priority
        />

        <div className="space-y-6 px-4">
          {doctorsData.map((doctor) => (
            <Card
              key={doctor.name}
              className="bg-muted/30 border-dashed border-black/20 dark:border-white/50 border"
            >
              <CardHeader className="py-3">
                <CardTitle className="text-sm text-right font-medium">
                  <Badge variant={"outline"}
                    className="p-3 h-4">
                    {doctor.name}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col gap-3 pt-0">
                <div
                  className="w-full p-3 
                 bg-linear-to-b dark:from-[#000000] dark:to-[#333333] 
                 from-[#ffffff] to-[#dfdfdf]
                  border-dashed border-black/20 dark:border-white/50 border
                   rounded-md shadow-2xl dark:shadow-white/20 text-sm"
                >
                  {doctor.services.map((service, idx) => (
                    <div key={idx}
                      className="flex justify-between  items-center mb-2 border-b pb-2">
                      <span className="text-xs text-muted-foreground">{service.price} ج.م</span>
                      <span className="font-bold text-primary">{service.service}</span>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
