import { Component, ElementRef, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portafolio-Web-AxelJQ';

  private items: HTMLElement[] = [];
  private active = 3;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSlider();
    }
  }

  initializeSlider(): void {
    this.items = Array.from(
      this.elRef.nativeElement.querySelectorAll('.slider .item')
    );

    const next = this.elRef.nativeElement.querySelector('#next');
    const prev = this.elRef.nativeElement.querySelector('#prev');

    if (next) {
      this.renderer.listen(next, 'click', () => this.nextSlide());
    }

    if (prev) {
      this.renderer.listen(prev, 'click', () => this.prevSlide());
    }

    this.loadShow();
  }

  loadShow(): void {
    let stt = 0;

    // Reset the active item
    this.applyStyles(this.items[this.active], {
      transform: 'none',
      zIndex: '1',
      filter: 'none',
      opacity: '1'
    });

    // Apply styles for items after the active item
    for (let i = this.active + 1; i < this.items.length; i++) {
      stt++;
      this.applyStyles(this.items[i], {
        transform: `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`,
        zIndex: `${-stt}`,
        filter: 'blur(3px)',
        opacity: stt > 2 ? '0' : '0.6'
      });
    }

    // Apply styles for items before the active item
    stt = 0;
    for (let i = this.active - 1; i >= 0; i--) {
      stt++;
      this.applyStyles(this.items[i], {
        transform: `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`,
        zIndex: `${-stt}`,
        filter: 'blur(3px)',
        opacity: stt > 2 ? '0' : '0.6'
      });
    }
  }

  nextSlide(): void {
    this.active = this.active + 1 < this.items.length ? this.active + 1 : this.active;
    this.loadShow();
  }

  prevSlide(): void {
    this.active = this.active - 1 >= 0 ? this.active - 1 : this.active;
    this.loadShow();
  }

  applyStyles(element: HTMLElement, styles: { [key: string]: string }): void {
    Object.keys(styles).forEach((key) => {
      this.renderer.setStyle(element, key, styles[key]);
    });
  }
}
