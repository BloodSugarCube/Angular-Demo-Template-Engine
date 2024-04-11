import { Component, ElementRef, Input, Output, QueryList, ViewChildren, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "color-picker",
    standalone: true,
    imports: [CommonModule],
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.css']
})
export class ColorPicker {
    readonly CLASS_CELL_CONTAINER: string = 'cell-container';
    readonly CLASS_ACTIVE_CELL: string = 'cell_active';
    readonly INIT_COLORS: string[] = [ColorPicker.randomColor, ColorPicker.randomColor, ColorPicker.randomColor, ColorPicker.randomColor];

    @Input() id: string;
    @ViewChildren('cell') cells: QueryList<ElementRef>;

    @Output() selectColor = new EventEmitter<string>();

    public newColors(event: Event): void {
        let targetElement: HTMLElement = event.target as HTMLElement;

        if (!targetElement.classList.contains(this.CLASS_CELL_CONTAINER)) {
            return;
        }

        for (let cell of this.cells) {
            if (!cell.nativeElement.classList.contains(this.CLASS_ACTIVE_CELL)) {
                cell.nativeElement.style.backgroundColor = ColorPicker.randomColor;
            }
        }
    }

    public select(event: Event): void {
        let targetCell: HTMLElement = event.target as HTMLElement;

       this.resetActiveColor();

        targetCell.classList.add(this.CLASS_ACTIVE_CELL);
        this.selectColor.emit(targetCell.style.backgroundColor);
    }

    private resetActiveColor(): void {
        for (let cell of this.cells) {
            cell.nativeElement.classList.remove(this.CLASS_ACTIVE_CELL);
        }
    }

    public initSelectedColor(color: string, cellNumber: number): void {
        let cell: ElementRef | null = null;

        // Обратиться по индексу this.cells[cellNumber] в данном случае не получится
        this.cells.forEach((cellRef: ElementRef, index: number) => {
            if (index == cellNumber) {
                cell = cellRef;
            }
        })

        if (cell === null) {
            console.log('Такой ячейки цвета нет');
            return;
        }

        this.resetActiveColor();
        cell.nativeElement.style.backgroundColor = color;
        cell.nativeElement.classList.add(this.CLASS_ACTIVE_CELL);
    }

    static get randomColor(): string {
        let letters: string = '0123456789ABCDEF';
        let color: string = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }
}