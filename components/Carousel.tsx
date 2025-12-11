import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '@/styles/Carousel.module.scss';

interface CarouselProps {
    children: React.ReactNode[];
    autoplay?: boolean;
    autoplayDelay?: number;
    showNavigation?: boolean;
    showPagination?: boolean;
}

export default function Carousel({
    children,
    autoplay = false,
    autoplayDelay = 3000,
    showNavigation = true,
    showPagination = true,
}: Readonly<CarouselProps>) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    const slidesCount = children.length;

    const slides = [children[slidesCount - 1], ...children, children[0]];

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    const goToActualSlide = (index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index + 1);
    };

    useEffect(() => {
        if (!isTransitioning) return;

        const transitionTimeout = setTimeout(() => {
            setIsTransitioning(false);

            if (currentIndex === 0) {
                setCurrentIndex(slidesCount);
            } else if (currentIndex === slidesCount + 1) {
                setCurrentIndex(1);
            }
        }, 500);

        return () => clearTimeout(transitionTimeout);
    }, [currentIndex, isTransitioning, slidesCount]);

    useEffect(() => {
        if (!autoplay) return;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            nextSlide();
        }, autoplayDelay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [autoplay, autoplayDelay, currentIndex, nextSlide]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            nextSlide();
        } else if (distance < -minSwipeDistance) {
            prevSlide();
        }

        setTouchStart(0);
        setTouchEnd(0);
    };

    const getActualIndex = () => {
        if (currentIndex === 0) return slidesCount - 1;
        if (currentIndex === slidesCount + 1) return 0;
        return currentIndex - 1;
    };

    return (
        <div className={styles.carousel_container}>
            <div
                className={styles.carousel_wrapper}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={styles.carousel_track}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                    }}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className={styles.carousel_slide}>
                            {slide}
                        </div>
                    ))}
                </div>

                {showNavigation && (
                    <>
                        <button
                            className={`${styles.carousel_buttons} ${styles.carousel_buttons_prev}`}
                            onClick={prevSlide}
                            aria-label="Previous slide"
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                            </svg>
                        </button>
                        <button
                            className={`${styles.carousel_buttons} ${styles.carousel_buttons_next}`}
                            onClick={nextSlide}
                            aria-label="Next slide"
                        >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                            </svg>
                        </button>
                    </>
                )}
            </div>

            {showPagination && (
                <div className={styles.carousel_pagination}>
                    {children.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.carousel_pagination_dot} ${getActualIndex() === index ? styles.carousel_pagination_dot_active : ''
                                }`}
                            onClick={() => goToActualSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
