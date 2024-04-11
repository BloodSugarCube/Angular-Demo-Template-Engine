import { Component, ElementRef, Output, ViewChild, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: "iframe-site",
    standalone: true,
    templateUrl: './iframe-site.component.html',
    styleUrls: ['./iframe-site.component.css']
})
export class FrameSite {
    readonly SITE_BACKGROUND_PROPERTY: string = '--main-bg-color';
    readonly SITE_TEXT_PROPERTY: string = '--main-text-color';

    private src: string = "http://localhost:4200/assets/demo-hotel";
    public safeUrl: SafeResourceUrl;
    
    @ViewChild('iframe', { static: false }) private iframe: ElementRef;

    @Output() isLoad = new EventEmitter<true>();

    public onLoad(event: Event): void {
        this.isLoad.emit(true);
    }

    constructor(private sanitizer: DomSanitizer) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }

    private get iframeDocumentElement(): HTMLElement {
        return this.iframe.nativeElement.contentWindow
            .document.documentElement;
    }

    get backgroundColor(): string {
        return getComputedStyle(this.iframeDocumentElement)
            .getPropertyValue(this.SITE_BACKGROUND_PROPERTY);
    }

    get textColor(): string {
        return getComputedStyle(this.iframeDocumentElement)
            .getPropertyValue(this.SITE_TEXT_PROPERTY);
    }

    set textColor(newColor: string) {
        this.iframeDocumentElement.style.setProperty(this.SITE_TEXT_PROPERTY, newColor);
    }

    set backgroundColor(newColor: string) {
        this.iframeDocumentElement.style.setProperty(this.SITE_BACKGROUND_PROPERTY, newColor);
    }
}