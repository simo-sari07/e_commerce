"use client";

import { ArrowRight } from "lucide-react";

const promotions = [
  {
    tag: "POUR VOUS",
    title: "Découvrez notre cure pour un regard frais et illuminé",
    image:
      "https://cdn.aroma-zone.com/d_default_placeholder.png/c_fit,q_auto,f_auto,w_774/b_none/v1/cf/0xsz2r7o7t3z/5XkEWQxrjjhQZzkjrGUw3h/54170e7b6a6d60d8de48960d3c98ecd9/serum_contour_des_yeux_model.jpg",
  },
  {
    tag: "SÉLECTION",
    title: "Tout pour des cheveux fortifiés et sains",
    image:
      "https://cdn.aroma-zone.com/d_default_placeholder.png/c_fit,q_auto,f_auto,w_774/b_none/v1/cf/0xsz2r7o7t3z/6TiGHouLcn4Ygw6f5kjqrx/c1d0db6105cdfee60f5a8b56c43b1dca/GammeNeutre-Cheveux.jpg",
  },
  {
    tag: "FAVORIS",
    title: "Sérum Spilanthes, véritable anti-âge global",
    image:
      "https://cdn.aroma-zone.com/d_default_placeholder.png/c_fit,q_auto,f_auto,w_774/b_none/v1/cf/0xsz2r7o7t3z/6vow1DfSeER1QhoBHifZoR/02dad05aa3170884e4849c375061407b/06_NOUVEAU_Serum-Spilathes-et-Acide-Hyaluronique_v3_1250x730.jpg",
  },
  {
    tag: "BILAN BEAUTÉ",
    title: "Quels sont les sérums faits pour vous ?",
    image:
      "https://cdn.aroma-zone.com/d_default_placeholder.png/c_fit,q_auto,f_auto,w_774/b_none/v1/cf/0xsz2r7o7t3z/4BlKAdJ0rCeIwpEKkzPvKe/93ae09d8ab2dfe6b8e7baf5bad0c41f2/Design_sans_titre__1_.png",
  },
];

export default function HeroSection() {
  return (
    <div className="bg-[#f9f4f0]">
      {/* Hero Section */}
      <div className="relative w-full min-h-[400px] lg:min-h-[500px] bg-[#FAF7F2] overflow-hidden px-4 md:px-8 lg:px-16">
        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto h-full pt-16 lg:pt-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="relative z-10">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#1A1A1A] leading-tight mb-4">
                Discover Nos Huiles Essenteille
              </h1>
              <p className="text-gray-600 mb-8 max-w-lg">
                Familiarisez-vous avec les bienfaits des huiles essentielles
                100% pures et naturelles pour tous vos besoins en aromathérapie.
              </p>
              <button className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Reviews Section */}
              <div className="mt-12">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm max-w-md">
                  <div className="flex -space-x-4">
                    <img
                      src="https://patyka.com/cdn/shop/files/FORMAT-WISP-HUILE_DEMAQUILLANTE_ECLAIR-600x600-v1.jpg?v=1737372339&width=1000"
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://st3.depositphotos.com/9881890/16379/i/450/depositphotos_163790740-stock-photo-woman-with-body-oil.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://cdn.shopify.com/s/files/1/0812/9642/5293/files/huiles-vegetales-1024x683.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://www.leshuilesdumonde.com/wp-content/uploads/2020/06/huile-vegetale-argan.jpg"
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium">100K+ Worldwide Users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Collage */}
            <div className="relative hidden lg:block min-h-[600px]  pt-28">
              {/* Curved connecting line */}
              <svg
                className="absolute inset-0 w-full h-full pt-20"
                viewBox="0 0 600 400"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M50,200 C150,100 450,300 550,200"
                  stroke="#E5E5E5"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Image Ovals */}
              <div className="relative w-full h-full">
                {/* First Oval */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[180px] h-[240px]">
                  <div className="relative w-full h-full rounded-[100px] overflow-hidden">
                    <img
                      src="https://mademoiselle-biloba.fr/cdn/shop/collections/Oden-marque.jpg?v=1721392265"
                      alt="Beauty Product 1"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>

                {/* Second Oval */}
                <div className="absolute left-[20%] top-1/2 translate-y-[20%] w-[160px] h-[200px]">
                  <div className="relative w-full h-full rounded-[80px] overflow-hidden">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0812/9642/5293/files/huiles-vegetales-1024x683.jpg"
                      alt="Beauty Product 2"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>

                {/* Center Oval */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[280px]">
                  <div className="relative w-full h-full rounded-[110px] overflow-hidden">
                    <img
                      src="https://st3.depositphotos.com/9881890/16379/i/450/depositphotos_163790740-stock-photo-woman-with-body-oil.jpg"
                      alt="Beauty Product 3"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>

                {/* Fourth Oval */}
                <div className="absolute right-[20%] top-1/2 translate-y-[20%] w-[160px] h-[200px]">
                  <div className="relative w-full h-full rounded-[80px] overflow-hidden">
                    <img
                      src="https://patyka.com/cdn/shop/files/FORMAT-WISP-HUILE_DEMAQUILLANTE_ECLAIR-600x600-v1.jpg?v=1737372339&width=1000"
                      alt="Beauty Product 4"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>

                {/* Fifth Oval */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[180px] h-[240px]">
                  <div className="relative w-full h-full rounded-[100px] overflow-hidden">
                    <img
                      src="https://waamcosmetics.com/modules/brlstories/img/vignettes/26_70098_vignette-467-41.png"
                      alt="Beauty Product 5"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Sections */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] hover:shadow-xl transition-all duration-300"
            >
              <img
                src={promo.image || "/placeholder.svg"}
                alt={promo.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <span className="inline-block px-3 py-1 bg-[#FFE4C8] text-[#945D2D] text-xs md:text-sm font-medium rounded-full mb-2">
                  {promo.tag}
                </span>
                <h3 className="text-white text-sm md:text-lg font-medium leading-tight mb-2 md:mb-4">
                  {promo.title}
                </h3>
                <div className="flex items-center text-white text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
