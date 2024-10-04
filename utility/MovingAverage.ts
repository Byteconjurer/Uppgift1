export class MovingAverage {
    private windowSize: number;
    private values: number[] = [];
    private sum: number = 0;

    constructor(windowSize: number) {
        this.windowSize = windowSize;
    }

    public addValue(value: number): number {
        // Add new value to the window
        this.values.push(value);
        this.sum += value;

        // Remove the oldest value if the window is full
        if (this.values.length > this.windowSize) {
            const removedValue = this.values.shift()!;
            this.sum -= removedValue;
        }

        // Return the current moving average
        return this.sum / this.values.length;
    }
}