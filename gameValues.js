
export class GameValues {
    constructor(money, multiplier, priceMultiplier, power) {
        this.gameValues = {
            money: {
                element: document.getElementById("money"),
                value: money, //0
            },
            multiplier: {
                value: multiplier, //0.01
            },
            priceMultiplier: {
                value: priceMultiplier, //10
            },
            power: {
                value: power, //0.012
            }
        };
    }

    getGameValues() {
        return gameValues;
    }

    editGameValues() {

    }

    refresher() {
        const valueKeys = Object.keys(gameValues);
        valueKeys.forEach((valueKey) => {
            if (gameValues[valueKey].hasOwnProperty("element")) {
                gameValues[valueKey].element.innerHTML =
                    gameValues[valueKey].value.toFixed(3);
            }
        });
    };


}    
