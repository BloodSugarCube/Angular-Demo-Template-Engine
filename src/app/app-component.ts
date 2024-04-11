import { Component, ViewChild, ViewChildren } from "@angular/core";
import { ColorPicker } from "./color-picker/color-picker.component";
import { FrameSite } from "./iframe-site/iframe-site.component";

@Component({
    selector: 'app-component',
    standalone: true,
    imports: [FrameSite, ColorPicker],
    templateUrl: './app-component.html',
    styleUrls: ['./app-component.css']
})

export class AppComponent {
    readonly ID_COLOR_PICKER_BACKGROUND = 'color-picker-background';
    readonly ID_COLOR_PICKER_TEXT = 'color-picker-text';

    @ViewChild(FrameSite) frame: FrameSite;
    @ViewChildren(ColorPicker) colorPickers: ColorPicker[];

    public syncColors(): void {
        for (let colorPicker of this.colorPickers) {
            if (colorPicker.id === this.ID_COLOR_PICKER_BACKGROUND) {
                colorPicker.initSelectedColor(this.frame.backgroundColor, 1);
                continue;
            }
            if (colorPicker.id === this.ID_COLOR_PICKER_TEXT) {
                colorPicker.initSelectedColor(this.frame.textColor, 1);
            }
        }
    }

    public randomSiteBackground(): void {
        this.frame.backgroundColor = ColorPicker.randomColor;
        this.syncColors();
    }

    public randomSiteText(): void {
        this.frame.textColor = ColorPicker.randomColor;
        this.syncColors();
    }

    public changeSiteBackground(color: string): void {
        this.frame.backgroundColor = color;
    }

    public changeSiteText(color: string): void {
        this.frame.textColor = color;
    }
}