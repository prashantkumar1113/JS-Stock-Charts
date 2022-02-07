async function main() {
    // tweleveData API key 1f32e5a721c54c20b757a6963e0052d8
    // 4 stocks we need to get GME, MSFT, DIS, and BNTX
    const url =
        "https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&format=JSON&apikey=1f32e5a721c54c20b757a6963e0052d8";
    let response = await fetch(url);
    const { GME, MSFT, DIS, BNTX } = await response.json();
    // const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(stocks);

    const timeChartCanvas = document.querySelector("#time-chart");
    const highestPriceChartCanvas = document.querySelector(
        "#highest-price-chart"
    );
    const averagePriceChartCanvas = document.querySelector(
        "#average-price-chart"
    );

    //Test code
    const labels = ["January", "February", "March", "April", "May", "June"];
    const graphColors = [
        "red",
        "blue",
        "purple",
        "aqua",
        "green",
        "brown",
        "black",
        "yellow",
    ];
    function getColor(stock) {
        if (stock === "GME") {
            return graphColors[0];
            return "rgba(61, 161, 61, 0.7)";
        }
        if (stock === "MSFT") {
            return graphColors[1];
            return "rgba(209, 4, 25, 0.7)";
        }
        if (stock === "DIS") {
            return graphColors[2];
            return "rgba(18, 4, 209, 0.7)";
        }
        if (stock === "BNTX") {
            return graphColors[3];
            return "rgba(166, 43, 158, 0.7)";
        }
    }

    // const data = {
    //     labels: labels,
    //     datasets: [
    //         {
    //             label: "2021-2-5", //"My First dataset",
    //             backgroundColor: "rgb(255, 99, 132)",
    //             borderColor: "rgb(255, 99, 132)",
    //             data: [0, 10, 5, 2, 20, 30, 45],
    //         },
    //     ],
    // };

    // const config = {
    //     type: "line",
    //     data: data,
    //     options: {},
    // };
    // const myChart = new Chart(timeChartCanvas, config);

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
}

main();
