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
  // ICON
  // =====================================

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Grocery":
        return "grocery";

      case "Shopping":
        return "shopping";

      case "Restaurant":
        return "restaurant";

      case "Travel":
        return "travel";

      case "Medical":
        return "medical";

      case "Entertainment":
        return "entertainment";

      case "Bills & Utilities":
        return "bills";

      case "Transportation":
        return "transportation";

      case "Education":
        return "education";

      case "Personal Care":
        return "personalCare";

      case "Subscriptions":
        return "subscriptions";

      case "Other":
        return "other";

      default:
        return "other";
    }
  };

  // =====================================
  // COLOR
  // =====================================

  const getCategoryColor = (category) => {
    switch (category) {
      case "Grocery":
        return "#22C55E";

      case "Shopping":
        return "#A855F7";

      case "Restaurant":
        return "#EF4444";

      case "Travel":
        return "#3B82F6";

      case "Medical":
        return "#EC4899";

      case "Entertainment":
        return "#F59E0B";

      case "Bills & Utilities":
        return "#6366F1";

      case "Transportation":
        return "#14B8A6";

      case "Education":
        return "#8B5CF6";

      case "Personal Care":
        return "#F97316";

      case "Subscriptions":
        return "#06B6D4";

      case "Other":
        return "#64748B";

      default:
        return "#64748B";
    }
  };

  // =====================================
  // SLIDER
  // =====================================

  const totalSlides = Math.ceil(categories.length / visibleCount);

  const maxIndex = Math.max(totalSlides - 1, 0);

  const nextSlide = () => {
    setCurrentIndex((previous) => (previous >= maxIndex ? 0 : previous + 1));
  };

  const previousSlide = () => {
    setCurrentIndex((previous) => (previous <= 0 ? maxIndex : previous - 1));
  };

  // =====================================
  // RESET
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

  const cardWidth = 100 / visibleCount;

  return (
    <section
      className="category-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* HEADER */}

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

      {/* CAROUSEL */}

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {categories.map((category) => {
            const amount = categoryTotals[category] || 0;

            const color = getCategoryColor(category);

            return (
              <div
                className="carousel-slide"
                key={category}
                style={{
                  flex: `0 0 ${cardWidth}%`,
                }}
              >
                <div
                  className="category-card"
                  style={{
                    "--category-color": color,
                  }}
                >
                  <div className="category-icon">
                    <Icon name={getCategoryIcon(category)} />
                  </div>

                  <div className="category-name">{category}</div>

                  <div className="category-amount">
                    ₹{amount.toLocaleString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOTS */}

      {totalSlides > 1 && (
        <div className="carousel-dots">
          {Array.from(
            {
              length: totalSlides,
            },
            (_, index) => (
              <button
                type="button"
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to category slide ${index + 1}`}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}

export default CategoryCarousel;
