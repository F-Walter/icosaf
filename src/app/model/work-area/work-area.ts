import { Agv } from '../agv/agv';

export class WorkArea {
    public get agvList(): Agv[] {
        return this._agvList;
    }
    public set agvList(value) {
        this._agvList = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }



    constructor(private _id: number, private _agvList: Agv[]) {
    }


}
