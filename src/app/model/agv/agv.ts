import { WorkArea } from '../work-area/work-area';

export class Agv {
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    constructor(private _id: number) {
    }
}
