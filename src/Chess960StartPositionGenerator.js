/**
 * Author: Stefan Haack (https://shaack.com)
 * Date: 2025-03-27
 */

const KRN = ["NNRKR", "NRNKR", "NRKNR", "NRKRN", "RNNKR", "RNKNR", "RNKRN", "RKNNR", "RKNRN", "RKRNN"]

export class Chess960StartPositionGenerator {
    static generateFen(id) {
        const pieces = this.generatePieces(id)
        return pieces.toLowerCase() + "/pppppppp/8/8/8/8/PPPPPPPP/" + pieces + " w KQkq - 0 1"
    }

    static generatePieces(id = Math.floor(Math.random() * 960)) {
        const pos = new Array(8).fill(null)
        // Determine the bishop positions
        let q = Math.floor(id / 4)
        let r = id % 4
        pos[r * 2 + 1] = "B" // Place the first bishop
        r = q % 4
        q = Math.floor(q / 4)
        pos[r * 2] = "B" // Place the second bishop
        // Determine the position of the queen
        r = q % 6
        q = Math.floor(q / 6)
        const emptyPositions = pos.map((value, index) => (value === null ? index : null)).filter(index => index !== null)
        pos[emptyPositions[r]] = "Q"
        // Place king, rooks and knight
        const krn = KRN[q].split("")
        pos.forEach((value, index) => {
            if (value === null) {
                pos[index] = krn.shift()
            }
        })
        return pos.join("")
    }
}