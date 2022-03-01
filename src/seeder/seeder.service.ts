import { Injectable } from '@nestjs/common';
import { FrequencyService } from '../data/frequencies/frequency.service';
import { SourceService } from '../data/sources/source.service';

@Injectable()
export class SeederService {
  constructor(
    private frequencyService: FrequencyService,
    private sourcesService: SourceService,
  ) {}
  async seed() {
    const frequencies = [
      {
        name: { es: 'Semanal', en: 'Weekly' },
        details: { es: 'Cada semana', en: 'Every week' },
      },
      {
        name: { es: 'Quincenal', en: 'Bi-Weekly' },
        details: {
          es: 'Cada 15 y último día del mes',
          en: 'Each 15th and last day of month',
        },
      },
      {
        name: { es: 'Mensual', en: 'Monthly' },
        details: { es: 'Cada mes', en: 'Every month' },
      },
      {
        name: { es: 'Semestral', en: 'Twice a year' },
        details: { es: 'Cada 6 meses', en: 'Twice a year' },
      },
      {
        name: { es: 'Anual', en: 'Yearly' },
        details: { es: 'Una vez al año', en: 'Every year' },
      },
    ];

    const sources = [{ name: 'Cash', paymentType: 'Cash' }];
    try {
      console.log('start seeding frequencies');
      await Promise.all(
        frequencies.map((f) => this.frequencyService.upsert(f)),
      );
    } catch (error) {
      console.log(error);
    }
    try {
      console.log('start seeding sources');
      await Promise.all(sources.map((s) => this.sourcesService.upsert(s)));
    } catch (error) {
      console.log(error);
    }
  }
}
