import {writeAndTrackCost, eraseAndTrackCost} from './text-processors';

export class Pencil {
    constructor(config = {}) {
        const {pointDurability, length, eraserDurability} = config;

        this.pointDurability = pointDurability || 10;
        this.initialPointDurability = pointDurability || 10;
        this.length = length || 10;
        this.eraserDurability = eraserDurability || 10;
    }

    write(paper, textToWrite) {
        const {processedText, remainder} = writeAndTrackCostHelper(textToWrite, this.pointDurability);
        
        this.pointDurability = remainder;
        paper.setText(paper.getText() + processedText);
    }

    sharpen() {
        if (this.length > 0) {
            this.pointDurability = this.initialPointDurability;
            this.length -= 1;
        }
    }

    erase(paper, textToErase) {
        const currentText = paper.getText();
        const {processedText, remainder} = eraseAndTrackCost(currentText, textToErase, this.eraserDurability);

        this.eraserDurability = remainder;
        paper.setText(processedText);
    }
};

const WHITE_SPACE_MASK = ' ';
function writeAndTrackCostHelper(textToWrite, pointDurability) {
    return writeAndTrackCost(textToWrite, pointDurability, () => WHITE_SPACE_MASK);
}
