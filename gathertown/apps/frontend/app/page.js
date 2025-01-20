"use client"
import Conference from "@/components/Conference";
import Space from "@/components/selectSpace";
import Landing from "@/components/Landing";
import RemoteArea from "@/components/RemoteArea";
import { useView } from "@/contextApi/View";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const {view ,viewChange}=useView();
  const state={
    default:<Landing />,
    space:<Space />,
    remote:<RemoteArea />,
    conference:<Conference />
  }

  return (
    <div>
      hello
      {state[view]}
    </div>
  );
}
