"use client"

import Link from "next/link"
export default function Home() {
  return (<>
    <nav className=" w-screen z-9 flex justify-between fixed py-4 px-8">
      <span className="fontStencil">Sg</span>
      <div className="flex justify-between gap-4">
        <Link href={''}>Home</Link>
        <Link href={''}>About</Link>
        <Link href={'dashboard'}>App</Link>
        <Link href={''}>Login</Link>
      </div>
    </nav>

    <div className="h-screen duration-200 snap-y snap-mandatory scroll-container overflow-y-scroll">
      <div className="snap-start fontStencil z-1 text-9xl w-screen h-screen flex justify-center items-center">
        Study Galaxy
      </div>
      <div className="snap-start h-screen w-[50vw] flex p-20 ">
        <div className="my-auto flex gap-4 flex-col">
          <span className="text-5xl fontStencil">About</span>
          <p className="text-2xl ">productivity should be joyful, comfortable, and truly yours. Our customizable workspace helps you stay focused, track your progress, and enjoy your study or work sessions through beautiful visuals and soothing sounds. Whether you’re here for a quick boost or to build deep work habits, we make sure it all feels uniquely welcoming.</p>
        </div>
      </div>
    </div>

  </>)
}
