const copyBar = document.querySelector('.copy-bar');
const list = document.querySelector('.list');
const colorsContainer = document.querySelector('.colors-container');
const formatsElem = document.querySelectorAll('.select-container .list div');

let isCopied = false;
let currentFormat = 'hex';
let formatText = '';

const colors = [
    {
        id: 0,
        name: 'Bright Lilac',
        hex: '#cd84f1',
        rgb: 'rgb(205, 132, 241)'
    },
    {
        id: 1,
        name: 'Pretty Please',
        hex: '#ffcccc',
        rgb: 'rgb(255, 204, 204)'
    },
    {
        id: 2,
        name: 'Light Red',
        hex: '#ff4d4d',
        rgb: 'rgb(255, 77, 77)'
    },
    {
        id: 3,
        name: 'Mandarin Sorbet',
        hex: '#ffaf40',
        rgb: 'rgb(255, 175, 64)'
    },
    {
        id: 4,
        name: 'Unmellow Yellow',
        hex: '#fffa65',
        rgb: 'rgb(255, 250, 101)',
    },
    {
        id: 5,
        name: 'Light Purple',
        hex: '#c56cf0',
        rgb: 'rgb(197, 108, 240)'
    },
    {
        id: 6,
        name: 'Young Salmon',
        hex: '#ffb8b8',
        rgb: 'rgb(255, 184, 184)'
    },
    {
        id: 7,
        name: 'Red Orange',
        hex: '#ff3838',
        rgb: 'rgb(255, 56, 56)'
    },
    {
        id: 8,
        name: 'Radiant Yellow',
        hex: '#ff9f1a',
        rgb: 'rgb(255, 159, 26)'
    },
    {
        id: 9,
        name: 'Dorn Yellow',
        hex: '#fff200',
        rgb: 'rgb(255, 242, 0)'
    },
    {
        id: 10,
        name: 'Wintergreen',
        hex: '#32ff7e',
        rgb: 'rgb(50, 255, 126)'
    },
    {
        id: 11,
        name: 'Electric Blue',
        hex: '#7efff5',
        rgb: 'rgb(126, 255, 245)'
    },
    {
        id: 12,
        name: 'Neon Blue',
        hex: '#18dcff',
        rgb: 'rgb(24, 220, 255)'
    },
    {
        id: 13,
        name: 'Light Slate Blue',
        hex: '#7d5fff',
        rgb: 'rgb(125, 95, 255)'
    },
    {
        id: 14,
        name: 'Shadowed Steel',
        hex: '#4b4b4b',
        rgb: 'rgb(75, 75, 75)'
    },
    {
        id: 15,
        name: 'Weird Green',
        hex: '#3ae374',
        rgb: 'rgb(58, 227, 116)'
    },
    {
        id: 16,
        name: 'Hammam Blue',
        hex: '#67e6dc',
        rgb: 'rgb(103, 230, 220)'
    },
    {
        id: 17,
        name: 'Spiro Disco Ball',
        hex: '#17c0eb',
        rgb: 'rgb(23, 192, 235)'
    },
    {
        id: 18,
        name: 'Light Indigo',
        hex: '#7158e2',
        rgb: 'rgb(113, 88, 226)'
    },
    {
        id: 19,
        name: 'Baltic Sea',
        hex: '#3d3d3d',
        rgb: 'rgb(61, 61, 61)'
    }
];

colors.forEach(color => {
    const div = document.createElement('div');

    div.innerHTML += `<div class="color" style="background-color: ${color.rgb}">
                        <a href="javascript:void(0);"></a>
                        <div class="color-name">${color.name}</div>
                    </div>`;
    colorsContainer.appendChild(div);
});

document.querySelectorAll('.color').forEach((e, key) => console.log(e.getAttribute('style').split(':')[1]))

formatsElem.forEach(format => format.addEventListener('click', e => {
    currentFormat = e.currentTarget.getAttribute('data-format');

    list.classList.remove('active');

    if (currentFormat === 'hex') {
        formatText = 'hex (#AA1923)'
        currentFormat = 'hex'
    } else if (currentFormat === 'hex-#') {
        formatText = 'hex (AA1923)'
        currentFormat = 'hex-#'
    } else if (currentFormat === 'rgb') {
        formatText = 'rgb(1,2,3)'
        currentFormat = 'rgb'
    } else if (currentFormat === 'rgba') {
        formatText = 'rgba(1,2,3,0.4)'
        currentFormat = 'rgba'
    } else {
        formatText = 'hex (#AA1923)';
    }

    document.getElementById('format').innerHTML = `<span id="format">${formatText}</span>`;

    // console.log(currentFormat);

}));

document.querySelectorAll('.color').forEach(div => div.addEventListener('click', e => {
    const target = e.currentTarget;
    const color = target.getAttribute('style').split(':')[1];

    navigator.clipboard.writeText(color)
        .then(() => {
            if (!isCopied) {
                copy(color);
                isCopied = true;
            }
        })
}));

copyBar.addEventListener('click', (e) => {
    list.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.composedPath().includes(copyBar) && !e.composedPath().includes(list)) {
        list.classList.remove('active');
    }
})

function copy(value) {
    navigator.clipboard.writeText(value).then(() => {

        document.documentElement.style.setProperty('--color', value)

        const old_div = document.querySelector('.copied-area');

        if (old_div) {
            old_div.classList.remove('copied')
            old_div.parentElement.removeChild(old_div);
        }

        const div = document.createElement('div');
        div.className = 'copied-area';
        div.innerHTML += `<div class="copied-text">Copied!</div>
                          <div class="text">${value}</div>`;

        document.querySelector('main').appendChild(div);

        setTimeout(() => {
            document.querySelector('.copied-area').classList.add('copied');
            setTimeout(() => document.querySelector('.copied-area').classList.remove('copied'), 1000)
            isCopied = false;
        }, 1)
    });
}
