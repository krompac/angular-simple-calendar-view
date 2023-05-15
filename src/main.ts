import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

export interface Event {
  title: string;
  start: Date;
  end: Date;
}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <table>
  <thead>
    <tr>
      <th>Time</th>
      <th *ngFor="let day of days">{{ day }}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let hour of hours">
      <td class="hour">{{hour}}:00</td>
      <td class="event" *ngFor="let day of days" [ngClass]="{'has-event': hasEvent(hour, day)}">
        <div class="event-wrapper" *ngIf="hasEvent(hour, day)">
          <div class="event-title">{{ getEventTitle(hour, day) }}</div>
        </div>
      </td>
    </tr>
  </tbody>
</table>


  `,
})
export class App {
  name = 'Angular';

  days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  events: any[] = [
    {
      title: 'Meeting',
      start: new Date(2023, 4, 16, 9),
      end: new Date(2023, 4, 16, 10),
    },
    {
      title: 'Lunch',
      start: new Date(2023, 4, 16, 12),
      end: new Date(2023, 4, 16, 13),
    },
    {
      title: 'Dinner',
      start: new Date(2023, 4, 17, 18),
      end: new Date(2023, 4, 17, 19),
    },
    {
      title: 'Movie',
      start: new Date(2023, 4, 17, 20),
      end: new Date(2023, 4, 17, 22),
    },
    {
      title: 'Shopping',
      start: new Date(2023, 4, 18, 14),
      end: new Date(2023, 4, 18, 16),
    },
  ];

  hasEvent(hour: number, day: string): boolean {
    const start = new Date(2023, 4, 13 + this.days.indexOf(day), hour, 0, 0);
    const end = new Date(2023, 4, 13 + this.days.indexOf(day), hour, 59, 59);
    return this.events.some(
      (event) => start <= event.end && end >= event.start
    );
  }

  getEventTitle(hour: number, day: string): string {
    const start = new Date(2023, 4, 13 + this.days.indexOf(day), hour, 0, 0);
    const end = new Date(2023, 4, 13 + this.days.indexOf(day), hour, 59, 59);
    const event = this.events.find(
      (event) => start <= event.end && end >= event.start
    );
    return event ? event.title : '';
  }

  formatDateTime(date: Date): string {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }
}

bootstrapApplication(App);
