const loadJSON = async (file) => {
    const res = await fetch("./assets/" + file)
    return res.json()
}

const calculateParcent = (maxValue, value) => {
    return Math.round((value / maxValue * 100) - 10) 
}

window.onload = async () => {
    const chart = document.querySelector(".main-chart")
    const data = await loadJSON("data.json")
    const maxValue = data.toSorted((a, b) => {
        if (a.amount > b.amount) {
            return -1
        } else if (a.amount < b.amount) {
            return 1
        }
        return 0
    })[0]
    const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const date = new Date().getDay() 
    for(let v of data) {
        const percent = calculateParcent(maxValue.amount, v.amount)
        console.log(v.day === week[date])
        if (v.day === week[date]) {
            chart.innerHTML += `<div class="chart-item" style="height: ${percent}%;" day="${v.day}" amount="${v.amount}" current></div>`
        } else {
            chart.innerHTML += `<div class="chart-item" style="height: ${percent}%;" day="${v.day}" amount="${v.amount}"></div>`
        }
    }
}