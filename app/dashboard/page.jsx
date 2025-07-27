import Clock from "./components/clock"
import { ToggleAudio } from "./components/ToggleAudio"


const page = () => {
  return (
    <div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
      </div>
      <ToggleAudio />
      <Clock />
    </div>
  )
}

export default page

