const containerData = document.querySelector('#data');

const userValue = (e) => {
    e.preventDefault()

    const value = document.querySelector('#value').value.trim()

    if (value.length == 0) {
        return mostrarError('Hay campos vacios')
    }

    spinner()
    apiData(value)
}

const apiData = async(city) => {
    const apiKey = '9c7854ef1790034497d28fff023b846a'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    try {
        const data = await fetch(url) 
        const json = await data.json()
    
        const {name, sys:{country}, main:{temp}} = json

        containerData.innerHTML = `
            <h1>${name}</h1>
            <span>${country}</span>
            <p class="${tempColor(temp)}">Temperatura ${json.main.temp}°</p>
        `
    } catch (error) {
        mostrarError('Ciudad invalida')
    }
}

const spinner = () => {
    containerData.innerHTML = `
    <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    </div>
    `
}

const mostrarError = (msg) => {
    containerData.innerHTML = `
        <div class="error">
            <span>Error</span>
            <span>${msg}</span>
        </div>
    `
    setTimeout(() => {
        containerData.textContent = ''
    }, 4000)
}

const tempColor = (temp) => {
    return temp >= 19 && temp <= 27 ? 'cool' : temp >= 28 ? 'hot' : 'cold'
}

document.querySelector('#consButton').addEventListener("click", userValue)


