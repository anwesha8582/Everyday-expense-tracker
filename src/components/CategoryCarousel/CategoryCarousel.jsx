import { useEffect, useState } from "react";
import useExpenseStats from "../../hooks/useExpenseStats";
import categories from "../../data/categories";
import Icon from "../Common/Icon";
import "./CategoryCarousel.css";

function CategoryCarousel() {
  const { categoryTotals } = useExpenseStats("month");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // =====================================
  // RESPONSIVE CARD COUNT
  // =====================================

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  // =====================================
  // SLIDER CALCULATIONS
  // =====================================

  const totalSlides = Math.ceil(categories.length / visibleCount);

  const maxIndex = Math.max(totalSlides - 1, 0);

  // =====================================
  // NEXT SLIDE
  // =====================================

  const nextSlide = () => {
    setCurrentIndex((previous) => (previous >= maxIndex ? 0 : previous + 1));
  };

  // =====================================
  // PREVIOUS SLIDE
  // =====================================

  const previousSlide = () => {
    setCurrentIndex((previous) => (previous <= 0 ? maxIndex : previous - 1));
  };

  // =====================================
  // RESET SLIDE WHEN SCREEN CHANGES
  // =====================================

  useEffect(() => {
    setCurrentIndex(0);
  }, [visibleCount]);

  // =====================================
  // AUTO SLIDE
  // =====================================

  useEffect(() => {
    if (isPaused || totalSlides <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous >= maxIndex ? 0 : previous + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, maxIndex, totalSlides]);

  // =====================================
  // CARD WIDTH
  // =====================================

  const cardWidth = 100 / visibleCount;

  return (
    <section
      className="category-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="category-carousel-header">
        <div>
          <h2>Spending Categories</h2>

          <p>This month's spending by category.</p>
        </div>

        <div className="carousel-buttons">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous categories"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next categories"
          >
            →
          </button>
        </div>
      </div>

      {/* =====================================
          CAROUSEL VIEWPORT
      ===================================== */}

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {categories.map((category) => {
            // IMPORTANT:
            // category is an object now
            // category.name = "Grocery"
            // category.icon = "grocery"
            // category.color = "#22C55E"

            const amount = categoryTotals[category.name] || 0;

            return (
              <div
                className="carousel-slide"
                key={category.name}
                style={{
                  flex: `0 0 ${cardWidth}%`,
                }}
              >
                <div
                  className="category-card"
                  style={{
                    "--category-color": category.color,
                  }}
                >
                  {/* ICON */}

                  <div className="category-icon">
                    <Icon name={category.icon} />
                  </div>

                  {/* NAME */}

                  <div className="category-name">{category.name}</div>

                  {/* AMOUNT */}

                  <div className="category-amount">
                    ₹{amount.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================
          DOTS
      ===================================== */}

      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              type="button"
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to category slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryCarousel;
