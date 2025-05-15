import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Testimon() {
    return (
        <section id="testimonials" className="position-relative">
            <div className="container">
                <div className="row">
                    <div className="review-content position-relative">
                        {/* Previous Arrow */}
                        <div className="swiper-icon swiper-arrow swiper-arrow-prev position-absolute d-flex align-items-center">
                            <svg className="chevron-left"></svg>
                        </div>

                        {/* Swiper Component */}
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            spaceBetween={50}
                            slidesPerView={1}
                            className="testimonial-swiper"
                        >
                            {/* Slide 1 */}
                            <SwiperSlide>
                                <div className="swiper-slide text-center d-flex justify-content-center" style={{background: "#aeb6bf"}}>
                                    <div className="review-item col-md-10">
                                        <i className="icon icon-review"></i>
                                        <blockquote>
                                            “Tempus oncu enim pellen tesque este pretium in neque,
                                            elit morbi sagittis lorem habi mattis Pellen tesque
                                            pretium feugiat vel morbi suspen dise sagittis lorem habi
                                            tasse morbi.”
                                        </blockquote>
                                        <div className="rating">
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-half"></svg>
                                            <svg className="star star-empty"></svg>
                                        </div>
                                        <div className="author-detail">
                                            <div className="name text-dark text-uppercase pt-2">
                                                Emma Chamberlin
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Slide 2 */}
                            <SwiperSlide>
                                <div className="swiper-slide text-center d-flex justify-content-center" style={{background: "#aeb6bf"}}>
                                    <div className="review-item col-md-10">
                                        <i className="icon icon-review"></i>
                                        <blockquote>
                                            “A blog is a digital publication that can complement a
                                            website or exist independently. A blog may include
                                            articles, short posts, listicles, infographics, videos,
                                            and other digital content.”
                                        </blockquote>
                                        <div className="rating">
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-fill"></svg>
                                            <svg className="star star-half"></svg>
                                            <svg className="star star-empty"></svg>
                                        </div>
                                        <div className="author-detail">
                                            <div className="name text-dark text-uppercase pt-2">
                                                Jennie Rose
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                        {/* Next Arrow */}
                        <div className="swiper-icon swiper-arrow swiper-arrow-next position-absolute d-flex align-items-center">
                            <svg className="chevron-right"></svg>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <div className="swiper-pagination"></div>
        </section>
    );
}

export default Testimon;



// import React from 'react'

// function Testimon() {
//     return (
//         <section id="testimonials" class="position-relative">
//         <div class="container">
//           <div class="row">
//             <div class="review-content position-relative">
//               <div
//                 class="swiper-icon swiper-arrow swiper-arrow-prev position-absolute d-flex align-items-center"
//               >
//                 <svg class="chevron-left">
                  
//                 </svg>
//               </div>
//               <div class="swiper testimonial-swiper">
//                 <div class="quotation text-center">
//                   <svg class="quote">
                    
//                   </svg>
//                 </div>
//                 <div class="swiper-wrapper">
//                   <div
//                     class="swiper-slide text-center d-flex justify-content-center"
//                   >
//                     <div class="review-item col-md-10">
//                       <i class="icon icon-review"></i>
//                       <blockquote>
//                         “Tempus oncu enim pellen tesque este pretium in neque,
//                         elit morbi sagittis lorem habi mattis Pellen tesque
//                         pretium feugiat vel morbi suspen dise sagittis lorem habi
//                         tasse morbi.”
//                       </blockquote>
//                       <div class="rating">
//                         <svg class="star star-fill">
                          
//                         </svg>
//                         <svg class="star star-fill">
                         
//                         </svg>
//                         <svg class="star star-fill">
                          
//                         </svg>
//                         <svg class="star star-half">
                      
//                         </svg>
//                         <svg class="star star-empty">
                         
//                         </svg>
//                       </div>
//                       <div class="author-detail">
//                         <div class="name text-dark text-uppercase pt-2">
//                           Emma Chamberlin
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     class="swiper-slide text-center d-flex justify-content-center"
//                   >
//                     <div class="review-item col-md-10">
//                       <i class="icon icon-review"></i>
//                       <blockquote>
//                         “A blog is a digital publication that can complement a
//                         website or exist independently. A blog may include
//                         articles, short posts, listicles, infographics, videos,
//                         and other digital content.”
//                       </blockquote>
//                       <div class="rating">
//                         <svg class="star star-fill">
                        
//                         </svg>
//                         <svg class="star star-fill">
                          
//                         </svg>
//                         <svg class="star star-fill">
                        
//                         </svg>
//                         <svg class="star star-half">
                         
//                         </svg>
//                         <svg class="star star-empty">
                         
//                         </svg>
//                       </div>
//                       <div class="author-detail">
//                         <div class="name text-dark text-uppercase pt-2">
//                           Jennie Rose
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 class="swiper-icon swiper-arrow swiper-arrow-next position-absolute d-flex align-items-center"
//               >
//                 <svg class="chevron-right">
                 
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div class="swiper-pagination"></div>
//       </section>
//     )
// }

// export default Testimon
