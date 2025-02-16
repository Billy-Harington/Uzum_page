// heroSlider.ts
export class HeroSlider {
    private container: HTMLElement;
    private track: HTMLElement;
    private slides: HTMLElement[];
    private prevControl: HTMLElement;
    private nextControl: HTMLElement;
    private dotsContainer: HTMLElement;
    private dots: HTMLElement[];
    private currentIndex: number = 0;
    private autoSlideIntervalId?: number;
    private autoSlideTime: number;
  
    constructor(containerSelector: string, autoSlideTime: number = 5000) {
      const container = document.querySelector(containerSelector);
      if (!container) {
        throw new Error(`Container ${containerSelector} not found`);
      }
      this.container = container as HTMLElement;
  
      // Элементы, использующие новые классы
      const track = this.container.querySelector(".slider__track");
      if (!track) throw new Error("Slider track not found");
      this.track = track as HTMLElement;
      // Слайды — дети track
      this.slides = Array.from(this.track.children) as HTMLElement[];
  
      const prevBtn = this.container.querySelector(".slider__control--prev");
      const nextBtn = this.container.querySelector(".slider__control--next");
      if (!prevBtn || !nextBtn) {
        throw new Error("Slider control buttons not found");
      }
      this.prevControl = prevBtn as HTMLElement;
      this.nextControl = nextBtn as HTMLElement;
  
      const dotsCont = this.container.querySelector(".slider__dots");
      if (!dotsCont) throw new Error("Slider dots container not found");
      this.dotsContainer = dotsCont as HTMLElement;
      this.dots = [];
  
      this.autoSlideTime = autoSlideTime;
  
      this.initControls();
      this.initDots();
      this.update();
      this.startAutoSlide();
    }
  
    private initControls(): void {
      this.prevControl.addEventListener("click", () => {
        this.prevSlide();
        this.resetAutoSlide();
      });
      this.nextControl.addEventListener("click", () => {
        this.nextSlide();
        this.resetAutoSlide();
      });
    }
  
    private initDots(): void {
      // Очистка контейнера на случай, если он не пуст
      this.dotsContainer.innerHTML = "";
      this.slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("slider__dot");
        dot.setAttribute("data-slide", index.toString());
        dot.addEventListener("click", () => {
          this.goToSlide(index);
          this.resetAutoSlide();
        });
        this.dotsContainer.appendChild(dot);
        this.dots.push(dot);
      });
    }
  
    private update(): void {
      // Смещение слайдов по горизонтали
      const offset = -this.currentIndex * 100;
      this.track.style.transform = `translateX(${offset}%)`;
  
      // Обновление классов для индикаторов
      this.dots.forEach((dot, index) => {
        dot.classList.toggle("slider__dot--active", index === this.currentIndex);
      });
    }
  
    private prevSlide(): void {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.update();
    }
  
    private nextSlide(): void {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.update();
    }
  
    private goToSlide(index: number): void {
      this.currentIndex = index;
      this.update();
    }
  
    private startAutoSlide(): void {
      this.autoSlideIntervalId = window.setInterval(() => {
        this.nextSlide();
      }, this.autoSlideTime);
    }
  
    private resetAutoSlide(): void {
      if (this.autoSlideIntervalId) {
        clearInterval(this.autoSlideIntervalId);
      }
      this.startAutoSlide();
    }
  }
  