var CatalogBlock = document.getElementsByClassName("catalog-block")
var BalanceInt = document.getElementById("balance-int")
var AsideBlock = document.querySelector("aside")
var SortButton = document.querySelector(".btn-sort-price")

var Balance = 0
var basketPrice = 0
var SortBool = false

var k = 0

var basket = []

var Books = [
    ["Название 1", "img/img1.png", 150, 0, 0, 1],
    ["Название 2", "img/img1.png", 250, 0, 0, 2],
    ["Название 3", "img/img1.png", 350, 0, 0, 3],
    ["Название 4", "img/img1.png", 150, 0, 0, 4],
    ["Название 5", "img/img1.png", 250, 0, 0, 5],
    ["Название 6", "img/img1.png", 350, 0, 0, 6],
    ["Название 7", "img/img1.png", 150, 0, 0, 7],
    ["Название 8", "img/img1.png", 250, 0, 0, 8],
    ["Название 9", "img/img1.png", 350, 0, 0, 9],
]

for(var i = 0; i < Books.length; i++){
    var FigureTemp = document.createElement("figure")
    var ImgTemp = document.createElement("img")
    var NameTemp = document.createElement("h3")
    var BuyButtonTemp = document.createElement("button")
    var FigCTemp = document.createElement("figcaption")

    CatalogBlock[0].append(FigureTemp)
    FigureTemp.append(ImgTemp)
    FigureTemp.append(NameTemp)
    FigureTemp.append(BuyButtonTemp)
    FigureTemp.append(FigCTemp)

    ImgTemp.setAttribute("src", Books[i][1])
    NameTemp.innerHTML = Books[i][0]
    BuyButtonTemp.textContent = "В корзину"
    BuyButtonTemp.classList.add("btn-buy")
    BuyButtonTemp.setAttribute("onclick", "AddItem(Books[" + i + "])")
    FigCTemp.innerHTML = Books[i][2] + " руб."
}

function AddItem(Element){
    if(Element[3] == 0){
        basket.push(Element[5])
        Element[3]++
        Element[4] += Element[2]
        var DivTemp = document.createElement("div")
        var ImgTemp = document.createElement("img")
        var BasketTemp = document.createElement("div")
        var H3Temp = document.createElement("h3")
        var IntTemp = document.createElement("div")
        var PriceTemp = document.createElement("div")
        var DeleteButtonTemp = document.createElement("button")
    
        AsideBlock.append(DivTemp)
        DivTemp.append(ImgTemp)
        DivTemp.append(BasketTemp)
        BasketTemp.append(H3Temp)
        BasketTemp.append(IntTemp)
        BasketTemp.append(PriceTemp)
        BasketTemp.append(DeleteButtonTemp)

        DivTemp.classList.add("item-to-buy")
        ImgTemp.setAttribute("src", Element[1])
        BasketTemp.classList.add("basket-block")
        H3Temp.innerHTML = Element[0]
        IntTemp.innerHTML = Element[3] + " шт."
        IntTemp.classList.add("Int")
        PriceTemp.innerHTML = Element[4] + " руб."
        PriceTemp.classList.add("Price")
        DeleteButtonTemp.classList.add("btn-delete")
        DeleteButtonTemp.innerHTML = "Удалить"
        DeleteButtonTemp.setAttribute("onclick", "ChangeData(" + Element[5] + ", Books[" + (Element[5]-1) + "], false)")
    }
    else{
        Element[3]++
        Element[4] += Element[2]
    }
    
    basketPrice += Element[2]
    ChangeData(Element[5], Element, true)
    console.log(basket)
}

function Sort(){
    switch(SortBool){
        case true:
            k = Books.length
            for(var j = 0; j < k; j++){
                for(var i = 0; i < Books.length-1; i++){
                    if(Books[i][2] < Books[i+1][2]){
                        var FigureTemp = document.createElement("figure")
                        var ImgTemp = document.createElement("img")
                        var NameTemp = document.createElement("h3")
                        var BuyButtonTemp = document.createElement("button")
                        var FigCTemp = document.createElement("figcaption")
                    
                        CatalogBlock[0].append(FigureTemp)
                        FigureTemp.append(ImgTemp)
                        FigureTemp.append(NameTemp)
                        FigureTemp.append(BuyButtonTemp)
                        FigureTemp.append(FigCTemp)
                    
                        ImgTemp.setAttribute("src", Books[i][1])
                        NameTemp.innerHTML = Books[i][0]
                        BuyButtonTemp.textContent = "В корзину"
                        BuyButtonTemp.classList.add("btn-buy")
                        FigCTemp.innerHTML = Books[i][2] + " руб."
    
                        var ObjectToDestroy = document.querySelectorAll("figure")[i]
                        ObjectToDestroy.remove()
    
                        Books.push(Books[i])
                        Books.splice(i, 1)
                    }
                }
            }
            
            SortButton.innerHTML = "&darr;"
            SortBool = false
            break
        case false:
            k = Books.length
            for(var j = 0; j < k; j++){
                for(var i = 0; i < Books.length-1; i++){
                    if(Books[i][2] > Books[i+1][2]){
                        var FigureTemp = document.createElement("figure")
                        var ImgTemp = document.createElement("img")
                        var NameTemp = document.createElement("h3")
                        var BuyButtonTemp = document.createElement("button")
                        var FigCTemp = document.createElement("figcaption")
                    
                        CatalogBlock[0].append(FigureTemp)
                        FigureTemp.append(ImgTemp)
                        FigureTemp.append(NameTemp)
                        FigureTemp.append(BuyButtonTemp)
                        FigureTemp.append(FigCTemp)
                    
                        ImgTemp.setAttribute("src", Books[i][1])
                        NameTemp.innerHTML = Books[i][0]
                        BuyButtonTemp.textContent = "В корзину"
                        BuyButtonTemp.classList.add("btn-buy")
                        
                        FigCTemp.innerHTML = Books[i][2] + " руб."
    
                        var ObjectToDestroy = document.querySelectorAll("figure")[i]
                        ObjectToDestroy.remove()
    
                        Books.push(Books[i])
                        Books.splice(i, 1)
                    }
                }
            }
            SortButton.innerHTML = "&uarr;"
            SortBool = true
            break
    }
    for(var i = 0; i < Books.length; i++){
        Books[i][5] = i+1
        var BuyButtonTemp = document.querySelectorAll(".btn-buy")[i]
        BuyButtonTemp.setAttribute("onclick", "AddItem(Books[" + i + "])")
    }
    event.preventDefault()
    console.log(Books)
}

function ChangeData(BookId, Element, Change_Remove){
    
    switch(Change_Remove){
        case true:
            for(var i = 0; i < basket.length; i++){
                if(basket[i] == BookId){
                    document.querySelectorAll(".Int")[i].innerHTML = Element[3] + " шт."
                    document.querySelectorAll(".Price")[i].innerHTML = Element[4] + " руб."
                    document.querySelector(".btn-buy-items").style.display = "inline"
                    break
                }
            }
            break
        case false:
            for(var i = 0; i < basket.length; i++){
                if(basket[i] == BookId){
                    if(Element[3] == 1){
                        var ObjectToDestroy = document.querySelectorAll(".item-to-buy")[i]
                        ObjectToDestroy.remove()
                        basket.splice(i, 1)
                        Element[3]--
                        Element[4] -= Element[2]
                        if(basket.length == 0){
                            document.querySelector(".btn-buy-items").style.display = "none"
                        }
                    }
                    else{
                        Element[3]--
                        Element[4] -= Element[2]
                        ChangeData(Element[5], Element, true)
                    }
                    basketPrice -= Element[2]
                    break
                }
            }
            break
    }
    
    document.querySelector("aside h1").innerHTML = "Корзина(" + basketPrice + " руб.)"
    document.querySelector("p").style.display = "none"
}

function BalanceChange(ChangeInt){
    Balance += ChangeInt
    BalanceInt.innerHTML = Balance + " руб."
    document.querySelector("aside h1").innerHTML = "Корзина(" + basketPrice + " руб.)"
}

function Buy(){
    if(Balance >= basketPrice){
        
        for(var i = document.querySelectorAll(".item-to-buy").length-1; i >= 0; i--){
            console.log(i)
            Books[i][3] = 0
            Books[i][4] = 0
            var ObjectToDestroy = document.querySelectorAll(".item-to-buy")[i]
            ObjectToDestroy.remove()
            basket.pop()
        }
        BalanceChange(-basketPrice)
        
        basketPrice = 0
        document.querySelector("aside h1").innerHTML = "Корзина(" + basketPrice + " руб.)"
        document.querySelector(".btn-buy-items").style.display = "none"
        document.querySelector("p").style.display = "block"
        document.querySelector("p").innerHTML = "Покупка успешно совершена"
        
    }
    else{
        document.querySelector(".btn-buy-items").style.display = "none"
        document.querySelector("p").style.display = "block"
        document.querySelector("p").innerHTML = "Недостаточно средств"
    }
    console.log(basket)
}

BalanceChange(10000)
