class HashMap {
    public keyMap: any;

    constructor(size = 53) {
        this.keyMap = new Array(size);
    }

    protected _hash(key: string): number {
        let count = 0;
        const prime_number = 31;
        let value: number;

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            value = key[i].charCodeAt(0) - 96;

            count = (count * prime_number + value) % this.keyMap.length;
        }

        return count;
    }

    set(key: string, value: string): void {
        const index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        this.keyMap[index].push([key, value]);
    }

    get(key: string): undefined | string {
        const index = this._hash(key);

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }

        return undefined;
    }

    keys() {
        const arr = new Array();

        for (let i = 0; i < this.keyMap.length; i++) {
            if (Array.isArray(this.keyMap[i])) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!arr.includes(this.keyMap[i][0])) {
                        arr.push(this.keyMap[i][j][0]);
                    }
                }
            }
        }

        return arr;
    }

    values() {
        const arr = new Array();

        for (let i = 0; i < this.keyMap.length; i++) {
            if (Array.isArray(this.keyMap[i])) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!arr.includes(this.keyMap[i][0])) {
                        arr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }

        return arr;
    }
}

export default HashMap;
