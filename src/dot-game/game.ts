const xor = (a: boolean, b: boolean) => (a || b) && (a !== b);
const indexOfAll = <T>(items: T[], searchFor: T): number[] => {
    const results = [];
    for ( let i=0; i < items.length; i++ ){
        if ( items[i] === searchFor ){
            results.push( i );
        }
    }
    return results;
}

export default class DotGameGame {
    static colors = [
        'rgb(0, 89, 255)',
        'red',
        'green',
        'rgb(195, 169, 0)'
    ];
    static colorsDimmed = [
        'rgb(126, 171, 255)',
        '#ff8080',
        '#83ff83',
        'rgb(255, 236, 112)'
    ];
    static dotRadius = 0.1;
    static lineWidth = 0.05;

    scale: number;

    ctxSquares: CanvasRenderingContext2D;
    ctxLines: CanvasRenderingContext2D;
    ctxNewLine: CanvasRenderingContext2D;
    ctxDots: CanvasRenderingContext2D;
    // playerDivs: HTMLCollection;

    hoverPos: [number, number] | undefined;
    hoverDot: [number, number] | undefined;
    mouseDown = false;
    drawFromDot: [number, number] | undefined;

    playerTurn = 0;
    playerCount = 2;
    playerScores: number[];
    totalLines = 0;

    onGameEnded: ((winners: number[]) => void) | undefined;

    constructor(
        public width: number,
        public height: number,
        public canvasSquares: HTMLCanvasElement,
        public canvasLines: HTMLCanvasElement,
        public canvasNewLine: HTMLCanvasElement,
        public canvasDots: HTMLCanvasElement,
    ) {
        this.scale = this.getRenderedSize().height * window.devicePixelRatio / height;

        this.canvasSquares.width = width * this.scale;
        this.canvasSquares.height = height * this.scale;
        this.ctxSquares = this.canvasSquares.getContext("2d")!;

        this.canvasLines.width = width * this.scale;
        this.canvasLines.height = height * this.scale;
        this.ctxLines = this.canvasLines.getContext("2d", { willReadFrequently: true })!;

        this.canvasNewLine.width = width * this.scale;
        this.canvasNewLine.height = height * this.scale;
        this.ctxNewLine = this.canvasNewLine.getContext("2d")!;

        this.canvasDots.width = width * this.scale;
        this.canvasDots.height = height * this.scale;
        this.ctxDots = this.canvasDots.getContext("2d")!;

        // this.playerDivs = document.getElementById("players")!.children;

        this.drawDots();
        this.canvasDots.onmousemove = this.canvasDots.ontouchmove = this.onMouseMove.bind(this);
        this.canvasDots.onmouseleave = this.canvasDots.ontouchcancel = this.onMouseLeave.bind(this);
        this.canvasDots.onmousedown = this.canvasDots.ontouchstart = this.onMouseDown.bind(this);
        this.canvasDots.onmouseup = this.canvasDots.ontouchend = this.onMouseUp.bind(this);

        this.playerScores = Array(this.playerCount).fill(0);
    }

    drawDot(x: number, y: number, hover = false) {
        ([x, y] = this.getDotPosition(x, y));
        this.ctxDots.beginPath();
        this.ctxDots.fillStyle = hover ? "black" : "gray";
        this.ctxDots.arc(x, y, DotGameGame.dotRadius * this.scale, 0, 2 * Math.PI);
        this.ctxDots.closePath();
        this.ctxDots.fill();
    }

    getDotPosition(x: number, y: number): [number, number] {
        x = (x + 0.5) * this.scale;
        y = (y + 0.5) * this.scale;
        return [x, y];
    }

    drawDots() {
        for (let k = 0; k < this.height; k++) {
            for (let j = 0; j < this.height; j++) {
                this.drawDot(k, j);
            }
        }
    }

    getRenderedSize() {
        const containerWidth = this.canvasDots.clientWidth, containerHeight = this.canvasDots.clientHeight;

        const originalRatio = this.width / this.height;
        const containerRatio = containerWidth / containerHeight;
        let targetWidth = 0;
        let targetHeight = 0;
        const test = (originalRatio > containerRatio);

        if (test) {
            targetWidth = containerWidth;
            targetHeight = targetWidth / originalRatio;
        } else {
            targetHeight = containerHeight;
            targetWidth = targetHeight * originalRatio;
        }

        return {
            width: targetWidth,
            height: targetHeight,
            x: (containerWidth - targetWidth) / 2,
            y: (containerHeight - targetHeight) / 2
        };
    }

    trimLineLength(startX: number, startY: number, endX: number, endY: number, maxLength: number, multiplyLength = 1): [number, number] {
        const dX = endX - startX, dY = endY - startY;
        let length = Math.hypot(dX, dY);
        const angle = Math.atan2(dX, dY);

        length = Math.min(length, maxLength);
        const newDX = Math.sin(angle) * length * multiplyLength, newDY = Math.cos(angle) * length * multiplyLength;
        return [startX + newDX, startY + newDY];
    }

    onMouseMove(e: MouseEvent|TouchEvent) {

        const rect = this.canvasDots.getBoundingClientRect();
        const offsetX = e instanceof MouseEvent ? e.offsetX : e.targetTouches[0].pageX - rect.left;
        const offsetY = e instanceof MouseEvent ? e.offsetY : e.targetTouches[0].pageY - rect.top;

        this.hoverDot && this.drawDot(...this.hoverDot, false);
        const realSize = this.getRenderedSize();
        const viewPortX = (offsetX - realSize.x) / realSize.width;
        const viewPortY = (offsetY - realSize.y) / realSize.height;
        const x = Math.floor(viewPortX * this.width);
        const y = Math.floor(viewPortY * this.height);

        if (this.drawFromDot) {
            this.ctxNewLine.clearRect(0, 0, this.canvasNewLine.width, this.canvasNewLine.height);
            this.ctxNewLine.strokeStyle = DotGameGame.colors[this.playerTurn];
            this.ctxNewLine.lineWidth = DotGameGame.lineWidth * this.scale;
            this.ctxNewLine.beginPath();
            const startPoint = this.getDotPosition(...this.drawFromDot);
            this.ctxNewLine.moveTo(...startPoint);
            this.ctxNewLine.lineTo(...this.trimLineLength(...startPoint, viewPortX * this.canvasNewLine.width, viewPortY * this.canvasNewLine.height, this.scale));
            this.ctxNewLine.closePath();
            this.ctxNewLine.stroke();

            this.drawDot(...this.drawFromDot, true);
        }

        this.drawDot(x, y, true);
        this.hoverDot = [x, y];
        this.hoverPos = [viewPortX * this.canvasDots.width, viewPortY * this.canvasDots.height]
    }

    onMouseLeave(e?: MouseEvent|TouchEvent) {
        this.hoverDot && this.drawDot(...this.hoverDot, false);
        this.onMouseUp();
    }

    onMouseDown(e: MouseEvent|TouchEvent) {

        this.onMouseMove(e);
        if (e instanceof TouchEvent || e.button === 0) {
            this.mouseDown = true;
            this.drawFromDot = this.hoverDot;
        }
    }

    onMouseUp(e?: MouseEvent|TouchEvent) {
        this.mouseDown = false;
        this.ctxNewLine.clearRect(0, 0, this.canvasNewLine.width, this.canvasNewLine.height);
        if (this.drawFromDot) {
            this.drawDot(...this.drawFromDot, (this.drawFromDot[0] === this.hoverDot?.[0] && this.drawFromDot[0] === this.hoverDot[1]));
        }

        if (e && this.drawFromDot && this.hoverDot) { // not called from onMouseLeave

            // Check if the line is valid
            const dX = Math.abs(this.drawFromDot[0] - this.hoverDot[0]), dY = Math.abs(this.drawFromDot[1] - this.hoverDot[1]);
            if (dX < 2 && dY < 2 && xor(dX === 1, dY === 1) && !this.lineExists(...this.drawFromDot, ...this.hoverDot)) {

                // Draw the line
                this.totalLines++;
                this.drawLine(...this.drawFromDot, ...this.hoverDot, this.playerTurn);
                const squaresCompleted = this.checkSquares(...this.drawFromDot, ...this.hoverDot, this.playerTurn);
                this.playerScores[this.playerTurn] += squaresCompleted;
                // this.playerDivs[this.playerTurn].getElementsByClassName('score')[0].innerHTML = this.playerScores[this.playerTurn].toString();
                this.updatePlayerScores();

                if (squaresCompleted === 0) { // If the player has completed a square, he/she will have another free move. Otherwise the next player will take the turn.
                    // Change the turn
                    this.playerTurn = (this.playerTurn + 1) % this.playerCount;
                    // Update the states
                    this.updateTurn();
                    // for (let i = 0; i < this.playerCount; i++) {
                        // const playerDiv = this.playerDivs[i];
                        // if (i == this.playerTurn) {
                        //     playerDiv.classList.add('turn');
                        // } else {
                        //     playerDiv.classList.remove('turn');
                        // }
                    // }
                }

                if (this.totalLines >= (this.width - 1) * (this.height - 1) * 2 + (this.width - 1) + (this.height - 1)) { // All lines are drawn, game has ended
                    this.onGameEnded?.(indexOfAll(this.playerScores, Math.max(...this.playerScores)));
                }
            }
        }
        this.drawFromDot = undefined;
    }

    /** Checks if a line has created a complete square. If so, fills that square. Returns the number of squares completed. */
    checkSquares(x1: number, y1: number, x2: number, y2: number, player: number) {
        let squaresCompleted = 0;
        if (x1 === x2) { // Vertical line
            const startY = Math.min(y1, y2);
            if (this.checkSquareCompleted(x1, startY)) {
                this.fillSquare(x1, startY, player);
                squaresCompleted++;
            }
            if (this.checkSquareCompleted(x1 - 1, startY)) {
                this.fillSquare(x1 - 1, startY, player);
                squaresCompleted++;
            }
        } else { // Horizontal line
            const startX = Math.min(x1, x2);
            if (this.checkSquareCompleted(startX, y1)) {
                this.fillSquare(startX, y1, player);
                squaresCompleted++;
            }
            if (this.checkSquareCompleted(startX, y1 - 1)) {
                this.fillSquare(startX, y1 - 1, player);
                squaresCompleted++;
            }
        }
        return squaresCompleted;
    }

    checkSquareCompleted(x: number, y: number) {
        return this.lineExists(x, y, x + 1, y) && // Top line
            this.lineExists(x, y, x, y + 1) && // Left line
            this.lineExists(x + 1, y, x + 1, y + 1) && // Right line
            this.lineExists(x, y + 1, x + 1, y + 1); // Bottom line
    }

    lineExists(x1: number, y1: number, x2: number, y2: number) {
        const xMiddle = (x1 + x2 + 1) / 2 * this.scale,
            yMiddle = (y1 + y2 + 1) / 2 * this.scale;
        // Check if the pixel at xMiddle, yMiddle is empty
        const pixel = (new Uint32Array(this.ctxLines.getImageData(xMiddle, yMiddle, 1, 1).data.buffer))[0];
        return !!pixel;
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, player: number) {
        this.ctxLines.strokeStyle = DotGameGame.colors[player];
        this.ctxLines.lineWidth = DotGameGame.lineWidth * this.scale;
        this.ctxLines.beginPath();
        this.ctxLines.moveTo((x1 + 0.5) * this.scale, (y1 + 0.5) * this.scale);
        this.ctxLines.lineTo((x2 + 0.5) * this.scale, (y2 + 0.5) * this.scale);
        this.ctxLines.closePath();
        this.ctxLines.stroke();
    }

    fillSquare(x: number, y: number, player: number) {
        this.ctxSquares.fillStyle = DotGameGame.colorsDimmed[player];
        this.ctxSquares.fillRect((x + 0.5) * this.scale, (y + 0.5) * this.scale, this.scale, this.scale);
    }

    updatePlayerScores() { }
    updateTurn() {}
}