import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'diferencaDiasPipe' })
export class DiferencaDiasTarefaPipe implements PipeTransform {
    transform(value: Date | undefined): { days: number, isLate: boolean } {
        if (!value) return { days: 0, isLate: false };

        const currentDate = new Date();
        const taskDate = new Date(value);

        const diffTime = taskDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            days: diffDays,
            isLate: diffDays < 0
        };
    }
}