export class Link {
    private element: HTMLLinkElement;
    private href: string;
    private id: string | null;
    private description: string;

    constructor(element: Element, description: string = 'HELLO FROM MODEL') {
        this.element = element as HTMLLinkElement;
        this.id = this.findClosestProjectId(element);
        this.href = this.element.href;
        this.description = description;
    }

    // TODO: get id from bullet href link
    private findClosestProjectId(element: Element) {
        const project = element.closest('div.project');
        return project ? project.getAttribute('projectid') : null;
    }

    public getId() {
        return this.id;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getElement() {
        return this.element;
    }

    static create(element: Element) {
        return new Link(element);
    }
}