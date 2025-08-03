"use client"
import dynamic from 'next/dynamic'
import { ToggleAudio } from "./components/ToggleAudio"
import Bg from "./components/bg";
import SettingsPanel from "./components/settingsPanel";
import { SettingsProvider } from "./components/settingsContext";
const Clock = dynamic(() => import('./components/clock'), { ssr: false })

const page = () => {
  return (
    <SettingsProvider>
      <div>
        <Bg />
        <Clock />
        <ToggleAudio />
        <SettingsPanel />
        <div className="fixed inset-0 -z-10 overflow-hidden">
        </div>
      </div>
    </SettingsProvider>
  )
}

export default page

