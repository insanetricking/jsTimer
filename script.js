'use strict'


const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        // getSum: function name(params) {

        // }
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 600,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 800,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
};

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 400
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 200
    },
    cheese: {
        name: 'Сыр',
        price: 700,
        kcall: 150
    }
}


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

for (let element of btnPlusOrMinus) {
    element.addEventListener('click', function () {
        plusOrMinus(this);
    })
}

function plusOrMinus(element) {

    // closest() - метод подключается кродительскому элементу.

    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol');


    if (elementData == '+') {
        product[parentId].amount++;


    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;

    }

    productAmount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}

const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function () {
        addExtraProduct(this);
    })
}


function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elAttribute = element.getAttribute('data-extra');

    product[parentId][elAttribute] = element.checked;

    if (product[parentId][elAttribute] == true) {

        product[parentId].price += extraProduct[elAttribute].price;
        product[parentId].kcall += extraProduct[elAttribute].kcall;

    } else if (product[parentId][elAttribute] == false) {
        product[parentId].price -= extraProduct[elAttribute].price;
        product[parentId].kcall -= extraProduct[elAttribute].kcall;
    }

    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptWindow = document.querySelector('.receipt__window');

let arrProduct = [],
    totalPrice = 0,
    totalKcall = 0,
    totalName = '';

addCart.addEventListener('click', function () {
    receipt.classList.remove('active');
    receipt.style.display = 'flex';
    receipt.style.opacity = 1;


    for (const key in product) {
        if (product[key].amount > 0) {
            arrProduct.push(product[key])
            for (const newKey in product[key]) {
                if (product[key][newKey] === true) {
                    product[key].name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        product[key].price = product[key].Sum;
        product[key].kcall = product[key].Kcall;

    }

    for (let value of arrProduct) {
        let el = value;
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n' + el.name + '\n';

    }

    document.querySelector('body').style.overflow = 'hidden';

    document.body.addEventListener('touchmove', function (e) { e.preventDefault(); }); document.body.addEventListener('touchstart', function (e) { e.preventDefault(); });


    //    disableScrolling();

    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость ${totalPrice}`;

    receiptWindow.style.cssText = `
   display: flex;
   flex-direction: column;
   align-items: center;
   background: #fff;
   padding: 100px;
   `;

    document.body.style.overflow = 'hidden';

});


// function disableScrolling(){
//     let x=window.scrollX;
//     let y=window.scrollY;
//     window.onscroll=function(){window.scrollTo(x, y);};
// }






const lvlTimer = document.querySelector('.header__timer-extra');


function startLvlTimer() {
    if (lvlTimer.innerHTML < 50) {
        lvlTimer.innerHTML++;
        setTimeout(startLvlTimer, 300);
    } else if (lvlTimer.innerHTML >= 50 && lvlTimer.innerHTML < 100) {
        lvlTimer.innerHTML++;
        setTimeout(startLvlTimer, 1000);
    }

}

startLvlTimer();





const viewBlocks = document.querySelectorAll('.main__product-info'),

    viewOpen = document.querySelector('.view'),
    viewClose = document.querySelector('.view__close'),
    viewImg = viewOpen.querySelector('img');


for (let viewBlock of viewBlocks) {


    viewBlock.addEventListener('dblclick', function open() {

        let blockImg = this.querySelector('img');


        viewOpen.classList.add('active');
        let src = blockImg.getAttribute('src');

        viewImg.setAttribute('src', `${src}`);

    })

}


viewClose.addEventListener('click', function () {
    viewOpen.classList.remove('active');
})



let alertBlock = document.createElement('div');

document.querySelector('.receipt__window-btn').onclick = function () {

    if (totalPrice == 0) {

        if (alertBlock.isConnected) {
            
            receipt.removeChild(alertBlock);
            addAlertBlock(alertBlock);

        } else {

            addAlertBlock(alertBlock);
        }

    } else {
        location.reload();

    }
};

function addAlertBlock(alertBlock) {

    alertBlock.style.cssText = `
    margin:15px auto 30px auto
    display:flex;
    align-items:center;
    justify-content:center;
    background:#fff;
    font-size:25px;
    color:#000;
    padding: 50px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    position: absolute;
    top:20px;
    box-shadow: 10px 10px 10px #000;
    
    `;

    alertBlock.innerHTML = 'Вы ничего не выбрали!!!';

    receipt.appendChild(alertBlock);
}