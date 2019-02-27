export class Link {
    private element: HTMLLinkElement;
    private href: string;
    private id: string;

    constructor(element: Element) {
        this.element = element as HTMLLinkElement;
        this.id = this.findClosestProjectId(element) as string;
        this.href = this.element.href;
    }

    private findClosestProjectId(element: Element) {
        const project = <Element> element.closest('div.project');
        return project.getAttribute('projectid');
    }

    public getId() {
        return this.id;
    }

    public getElement() {
        return this.element;
    }

    static create(element: Element) {
        return new Link(element);
    }
}