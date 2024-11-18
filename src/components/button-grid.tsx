import { SquareLibrary, BookmarkPlus, Telescope } from 'lucide-react'
import { toast, Bounce } from "react-toastify";

export default function HomeButtons() {
  const buttons = [
    { icon: SquareLibrary, text: 'Bookshelf' },
    { icon: BookmarkPlus, text: 'Register' },
    { icon: Telescope, text: 'Explore' },
  ]

  return (
    <div className="flex items-center justify-center h-[380px] rounded-lg bg-white">
      <div className="flex gap-10">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="group flex flex-col items-center justify-center w-[220px] h-[200px] rounded-3xl bg-[#f0e8dd] transition-all duration-300 ease-in-out "
            onClick={() => {
              index == 0 ? window.location.href = '/bookshelf' : toast.warning(
                "In Construction.",
                {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  transition: Bounce,
                }
              );
            }}
          >
            <div className="p-4 rounded-full bg-white mb-2 group-hover:border-[#867070] group-hover:border">
              <button.icon className="w-8 h-8 rounded-lg text-[#867070]" />
            </div>
            <span className="text-[#867070] rounded-lg font-medium">{button.text}</span>
            <div className="absolute w-[220px] h-[200px] border-2 rounded-lg border-[#867070] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>
    </div>
  )
}