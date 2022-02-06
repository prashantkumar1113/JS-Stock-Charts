async function main() {
    const timeChartCanvas = document.querySelector("#time-chart");
    const highestPriceChartCanvas = document.querySelector(
        "#highest-price-chart"
    );
    const averagePriceChartCanvas = document.querySelector(
        "#average-price-chart"
    );

    //Test code
    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {},
    };
    const myChart = new Chart(timeChartCanvas, config);
}

main();
