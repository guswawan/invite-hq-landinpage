"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { events } from "@/data/events"
import { ChevronRight } from "lucide-react"

interface Card {
  id: number
  contentType: number
  data: {
    title: string
    description: string
    image: string
    previewUrl: string
    eventName: string
    categoryLink: string
  }
}

// Get all events from the events data
const allCollections = events.flatMap(event =>
  event.collections.map(item => ({
    ...item,
    eventName: event.name,
    categoryLink: event.link
  }))
)

const initialCards: Card[] = allCollections.map((item, index) => ({
  id: index + 1,
  contentType: index,
  data: {
    title: item.name,
    description: item.category || item.tag,
    image: item.image,
    previewUrl: item.previewUrl,
    eventName: item.eventName,
    categoryLink: item.categoryLink
  }
}))

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -20 },
  { scale: 0.9, y: -52 },
]

// const exitAnimation = {
//   y: 10,
//   scale: 1,
//   zIndex: 10,
// }

// const enterAnimation = {
//   y: 80,
//   scale: 0.8,
// }

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({ data }: { data: Card['data'] }) {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex h-[280px] w-full items-center justify-center overflow-hidden rounded-[22px] border-2 border-navy bg-cream">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          className="h-full w-full select-none object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-clash font-bold text-lg text-navy">{data.title}</span>
          <span className="text-sm font-medium text-navy/60">{data.description}</span>
        </div>
        <button
          data-preview={data.previewUrl}
          className="destination-card flex h-10 shrink-0 cursor-pointer select-none items-center gap-1 rounded-full bg-navy px-4 text-[13px] font-bold text-cream hover:bg-coral transition-colors"
        >
          Preview
          <ChevronRight className="w-4 h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card
  index: number
  isAnimating: boolean
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={{ ...initialAnim, filter: "blur(10px)", opacity: 0 }}
      animate={{ y, scale, filter: "blur(0px)", opacity: 1 }}
      exit={{ ...exitAnim }}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 }
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[340px] w-[380px] items-center justify-center overflow-hidden rounded-t-[32px] border-x-3 border-t-3 border-navy bg-white p-2.5 shadow-[4px_0_0_var(--color-navy)] will-change-transform"
    >
      <CardContent data={card.data} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextIndex, setNextIndex] = useState(3)

  const handleAnimate = () => {
    if (isAnimating) return
    setIsAnimating(true)

    // Delay setting isAnimating to false to match transition
    setTimeout(() => {
      const nextItem = allCollections[nextIndex % allCollections.length]

      setCards(prev => {
        const newCards = [...prev.slice(1)]
        newCards.push({
          id: Date.now(), // Unique ID for each animation cycle
          contentType: nextIndex,
          data: {
            title: nextItem.name,
            description: nextItem.category || nextItem.tag,
            image: nextItem.image,
            previewUrl: nextItem.previewUrl,
            eventName: nextItem.eventName,
            categoryLink: nextItem.categoryLink
          }
        })
        return newCards
      })

      setNextIndex(prev => prev + 1)
      setIsAnimating(false)
    }, 50)
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", y: 40 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: "easeIn",
      }}
      className="w-full flex flex-col items-center justify-center pt-2"
    >
      {/* DESKTOP: Stacked Cards */}
      <div className="hidden lg:flex relative h-[480px] -mt-24 w-full overflow-hidden sm:w-[500px] flex-col items-center">
        <div className="relative h-[480px] w-full">
          <AnimatePresence initial={false}>
            {cards.slice(0, 3).map((card, index) => (
              <AnimatedCard key={card.id} card={card} index={index} isAnimating={isAnimating} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden lg:flex relative z-10 -mt-px flex w-full items-center justify-center py-0">
        <button
          onClick={handleAnimate}
          className="flex h-12 cursor-pointer select-none items-center justify-center gap-2 overflow-hidden rounded-xl border-3 border-navy bg-yellow px-8 font-bold text-navy shadow-[4px_4px_0_var(--color-navy)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-navy)] active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Lihat Desain Lainnya
        </button>
      </div>


      {/* MOBILE & TABLET: Infinite Looping Marquee (Non-interactive) */}
      <div className="lg:hidden w-full overflow-hidden relative py-4 pointer-events-none select-none">
        <div
          className="absolute inset-y-0 left-0 w-20 z-10"
          style={{ background: "linear-gradient(to right, var(--color-cream), transparent)" }}
        ></div>
        <div
          className="absolute inset-y-0 right-0 w-20 z-10"
          style={{ background: "linear-gradient(to left, var(--color-cream), transparent)" }}
        ></div>

        <motion.div
          className="flex gap-4 px-4"
          animate={{
            x: [0, -(allCollections.length * (240 + 16))],
          }}
          transition={{
            duration: allCollections.length * 4, // 4 seconds per item for a consistent speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate items for infinite effect */}
          {[...allCollections, ...allCollections, ...allCollections].map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[240px] h-[320px] bg-white border-3 border-navy rounded-[32px] overflow-hidden shadow-[4px_4px_0_var(--color-navy)] relative"
            >
              <div className="h-[230px] w-full overflow-hidden border-b-2 border-navy">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-center h-[90px]">
                <span className="font-clash font-bold text-base truncate text-navy">{item.name}</span>
                <span className="text-[12px] font-medium text-navy/60">{item.category || item.tag}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
