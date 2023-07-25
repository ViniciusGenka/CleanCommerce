export default class Role {
    public id: string | null;
    public name: string;

    constructor(
        name: string,
        id: string = null,
    ) {
        this.id = id;
        this.name = name;
    }
}
