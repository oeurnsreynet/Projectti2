import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";

function SlideShow() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/slideshows/')
      .then((res) => res.json())
      .then((data) => {
        setSlides(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch slides:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading slideshow...</p>;
  }

  return (
    <section id="billboard" className="position-relative overflow-hidden bg-light-blue">
      <div className="swiper main-swiper" style={{ marginTop: '100px' }}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="swiper-slide">
                <div className="container">
                  <div className="row d-flex align-items-center">
                    <div className="col-md-6">
                      <div className="banner-content">
                        <h1 className="display-4 text-uppercase text-dark pb-3">
                          {slide.title}
                        </h1>
                        <p>{slide.description}</p>
                        <a
                          href="#"
                          className="btn btn-medium btn-dark text-uppercase btn-rounded-none"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="image-holder">
                        <img
                          src={`http://127.0.0.1:8000/storage/${slide.image}`}
                          alt={slide.title}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SlideShow;
