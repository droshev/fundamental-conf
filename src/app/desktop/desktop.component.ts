import { Component, OnInit, Input } from '@angular/core';
import * as data from '../speakers.json';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  speakerData: any = (data as any).default;
  speakers: any[] = [];
  totalNumSpeaker: number = 0;

  options = { threshold: 0.6 };
  
  @Input() conferenceTime: string = '';
  @Input() timezone: string = '';

  constructor() { }

  ngOnInit(): void {
    this.speakers = this.speakerData.speakers;
    this.totalNumSpeaker = this.speakers.length;
    this.initializeAnimation();
  }
  
  getImgSrc(name: string): string {
    return "../../assets/speakers/" + name + ".jpeg";
  }

  initializeAnimation(): void {
    const observer = new IntersectionObserver(this.navCheck, this.options);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  navCheck(entries: any): void {
    entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
          const dateSection = document.querySelector('.date') as HTMLElement;
          const speakerSection = document.querySelector('.speakers') as HTMLElement;
          const infoCards = document.querySelectorAll('.card');

          // reset all sections
          dateSection.classList.remove('active');
          speakerSection.classList.remove('active');
          infoCards.forEach((card) => {
            (card as HTMLElement).classList.remove('active');
          })

          const className = entry.target.className;
          if (className === 'date' || className === 'speakers') {
            const activeSection = document.querySelector(`.${className}`) as HTMLElement;
            activeSection.classList.add('active');
          } else if (className === 'info') {
            infoCards.forEach((card) => {
              (card as HTMLElement).classList.add('active');
            });
          }
        }
    });
  }

}
