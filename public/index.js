async function main() {
    // tweleveData API key 1f32e5a721c54c20b757a6963e0052d8
    // 4 stocks we need to get GME, MSFT, DIS, and BNTX
    let symbols = "GME,MSFT,DIS,BNTX";
    let interval = "1day";
    const apikey = "1f32e5a721c54c20b757a6963e0052d8";
    const url = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&format=JSON&apikey=${apikey}`;
    let response = await fetch(url);
    const { GME, MSFT, DIS, BNTX } = await response.json();
    // const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    // console.log(stocks);

    const timeChartCanvas = document.querySelector("#time-chart");
    const highestPriceChartCanvas = document.querySelector(
        "#highest-price-chart"
    );
    const averagePriceChartCanvas = document.querySelector(
        "#average-price-chart"
    );

    function getColor(stock) {
        if (stock === "GME") {
            return "rgba(61, 161, 61, 0.7)";
        }
        if (stock === "MSFT") {
            return "rgba(209, 4, 25, 0.7)";
        }
        if (stock === "DIS") {
            return "rgba(18, 4, 209, 0.7)";
        }
        if (stock === "BNTX") {
            return "rgba(166, 43, 158, 0.7)";
        }
    }

    function getHighestValue(stockArr) {
        // console.log("stock " + stockArr);
        // let highVal = 0;
        // stockArr.forEach((stock) => {
        //     if (parseFloat(stock) > highVal) {
        //         highVal = parseFloat(stock);
        //     }
        // });
        // // console.log(highVal);
        // return "" + highVal;
        return Math.max(...stockArr);
    }

    function getAverageValue(stockArr) {
        // let average = stockArr.reduce((a, b) => a + b, 0) / stockArr.length;
        let total = 0;
        stockArr.map((stock) => (total += parseFloat(stock)));
        // console.log(total / stockArr.length, total, stockArr.length);
        return total / stockArr.length;
    }

    new Chart(timeChartCanvas.getContext("2d"), {
        type: "line",
        data: {
            labels: stocks[0].values.reverse().map((value) => value.datetime),
            datasets: stocks.map((stock) => ({
                label: stock.meta.symbol,
                data: stock.values.map((value) => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            })),
        },
    });

    new Chart(highestPriceChartCanvas.getContext("2d"), {
        type: "bar",
        data: {
            labels: stocks.map((stock) => stock.meta.symbol),
            datasets: [
                {
                    label: "Highest Price",
                    data: stocks.map((stock) =>
                        getHighestValue(stock.values.map((value) => value.high))
                    ),
                    backgroundColor: stocks.map((stock) =>
                        getColor(stock.meta.symbol)
                    ),
                    borderColor: stocks.map((stock) =>
                        getColor(stock.meta.symbol)
                    ),
                },
            ],
        },
    });
    new Chart(averagePriceChartCanvas.getContext("2d"), {
        type: "doughnut",
        data: {
            labels: stocks.map((stock) => stock.meta.symbol),
            datasets: [
                {
                    label: "Price",
                    data: stocks.map((stock) =>
                        getAverageValue(stock.values.map((value) => value.high))
                    ),
                    backgroundColor: stocks.map((stock) =>
                        getColor(stock.meta.symbol)
                    ),
                    borderColor: stocks.map((stock) =>
                        getColor(stock.meta.symbol)
                    ),
                },
            ],
        },
    });
}

main();
