class ColorRangeMaker {
    option = {};

    constructor(option) {
        let vRange = option.value[1] - option.value[0];
        if (option.color.length == 2) {//仅有两个颜色
            let rA = (option.color[1][0] - option.color[0][0]) / vRange;
            let gA = (option.color[1][1] - option.color[0][1]) / vRange;
            let bA = (option.color[1][2] - option.color[0][2]) / vRange;
            this.option = { vRange, rA, gA, bA, option };
        } else {//两个以上颜色
            const makers = [];
            let vA = vRange / (option.color.length - 1);
            for (let i = 1; i < option.color.length; i++) {
                const maker = new ColorRangeMaker({
                    color: [option.color[i - 1], option.color[i]],
                    value: [option.value[0] + vA * (i - 1),
                    option.value[0] + vA * i]
                });
                makers.push(maker);
            }
            this.option = { makers, vA, option };
        }
    }

    make(value) {
        const { makers, vRange, rA, gA, bA, vA, option } = this.option;
        if (value < option.value[0]) {
            return option.color[0];
        } else if (value > option.value[option.value.length - 1]) {
            return option.color[option.color.length - 1];
        } else {
            if (option.color.length == 2) {//仅有两个颜色
                let color = option.color[0].map(a => a);
                let vATmp = value - option.value[0];
                color[0] += parseInt(rA * vATmp);
                color[1] += parseInt(gA * vATmp);
                color[2] += parseInt(bA * vATmp);
                return color;
            } else {
                for (let i = 1; i < option.color.length; i++) {
                    if (value <= option.value[0] + vA * i) {
                        return makers[i - 1].make(value);
                    }
                }
            }
        }
    }
}
export default ColorRangeMaker;
