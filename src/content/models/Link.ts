export class Link {
    private element: HTMLLinkElement;
    private href: string;
    private id: string | null;

    constructor(element: Element) {
        this.element = element as HTMLLinkElement;
        this.id = this.findClosestProjectId(element);
        this.href = this.element.href;
    }

    // TODO: get id from bullet href link
    private findClosestProjectId(element: Element) {
        console.log('CLOSEST BULLET', element.closest('a.bullet'));
        
        const project = element.closest('div.project');
        return project ? project.getAttribute('projectid') : null;
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