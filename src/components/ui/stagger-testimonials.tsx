"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Gak nyesel pilih konsep Ready Concept-nya. Ilustrasinya bener-bener beda dari template pasaran. Tamu-tamu pada muji aesthetic banget!",
    by: "Hanno & Gemilang",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 1,
    testimonial: "Paling suka fitur RSVP-nya sih. Gak perlu pusing rekap manual siapa yang dateng, semua datanya rapi. Sangat memudahkan buat persiapan katering.",
    by: "Sekar & Habib",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 2,
    testimonial: "Bisa dapet domain willyzidane.undangku.com itu bener-bener bikin undangan kita terasa lebih 'official' dan personal. Makasih Undangku!",
    by: "Willy & Zidane",
    imgSrc: "https://i.pravatar.cc/150?img=13"
  },
  {
    tempId: 3,
    testimonial: "Anak-anak kantor pada seneng dapet undangan ultah gini. Tinggal share ke grup, langsung bisa liat lokasi via maps di dalem undangannya. Top!",
    by: "Andreas",
    imgSrc: "https://i.pravatar.cc/150?img=14"
  },
  {
    tempId: 4,
    testimonial: "Awalnya bingung mau desain gimana, tapi Studio Collection-nya ngebantu banget. Link-nya juga cepet banget jadinya, tinggal masukin data langsung live!",
    by: "Andra & Andin",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
  {
    tempId: 5,
    testimonial: "Buat acara wisudaan jadi lebih seru pake undangan digital. Temen-temen kampus pada kaget pas buka link-nya, desainnya unik dan gak kaku.",
    by: "Ellina",
    imgSrc: "https://i.pravatar.cc/150?img=16"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-3 p-8 transition-all duration-500 ease-in-out rounded-[24px]",
        isCenter 
          ? "z-10 bg-navy text-white border-navy" 
          : "z-0 bg-white text-navy border-navy hover:border-coral/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "8px 8px 0px 0px var(--color-navy)" : "4px 4px 0px 0px var(--color-navy)"
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-muted object-cover object-top border-2 border-navy rounded-lg"
        style={{
          boxShadow: "3px 3px 0px var(--color-navy)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium font-caveat leading-relaxed",
        isCenter ? "text-white" : "text-navy"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm font-bold",
        isCenter ? "text-yellow" : "text-coral"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - Math.floor(testimonialsList.length / 2)
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-4 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-all",
            "bg-white border-3 border-navy text-navy rounded-full hover:bg-yellow hover:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy shadow-[4px_4px_0_var(--color-navy)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-12 w-12 items-center justify-center text-2xl transition-all",
            "bg-white border-3 border-navy text-navy rounded-full hover:bg-yellow hover:scale-110",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy shadow-[4px_4px_0_var(--color-navy)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
