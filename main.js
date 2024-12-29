var PPS = 0
var POINTS = 0
var BASECLICK = 1
var MODIFIERS = {
    GLOBAL_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: []
    },
    CLICK_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: []
    },
    AUTO_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: []
    }
}
class Upgrade{
    constructor(cost, rewardtype, reward){
        this.cost = cost
        this.purchased = false
        this.rewardtype = rewardtype
        this.reward = reward
    }

    purchase(Points) {
        if(Points >= this.cost){
            Points -= this.cost
            this.purchased = true
            switch(this.rewardtype){
                case "add":
                    MODIFIERS.CLICK_MODIFIERS.Addition.push(this.reward)
                    break;
                case "mult":
                    MODIFIERS.CLICK_MODIFIERS.Multipliers.push(this.reward)
                    break;
                case "exp":
                    MODIFIERS.CLICK_MODIFIERS.Exponents.push(this.reward)
                    break;
                case "spc":
                    MODIFIERS.CLICK_MODIFIERS.Specials.push(this.reward)
                    break;
            }
            return Points
        }
        return Points
    }
}
var UPGRADES = {
    n1: new Upgrade(10),
    n2: new Upgrade(50),
    n3: new Upgrade(100),
    n4: new Upgrade(500),
    n5: new Upgrade(1000),
    n6: new Upgrade(10000),
    n7: new Upgrade(2000000),
    n8: new Upgrade(300000000),
    n9: new Upgrade(50000000000),
    n10: new Upgrade(90000000000000),
    
}


function updatepps(Points){
    var pps = document.getElementById("pps")
    pps.innerHTML = `Points Per Second: ${Points}`
}
function updatepoints(value){
    var points = document.getElementById("points")
    POINTS += value
    points.innerHTML = `Points: ${POINTS}`
}
function simclick(){
    let click = BASECLICK
    for(x of MODIFIERS.CLICK_MODIFIERS.Addition){
        click += x
    }
    updatepoints(click)
}
function purchaseupgrade(upgrade_id){
    let upg = UPGRADES[upgrade_id]
    POINTS = upg.purchase(POINTS)
    if(upg.purchased == true){

    }
}

var INTERVALS = []
INTERVALS.push(setInterval(updatepps, 5, PPS))
{
    let upgrades = document.getElementById("upgrades")
    for(let x = 0; x<10; x++){
        let upgrade_button = document.createElement("button")
        upgrade_button.type = "button"
        upgrade_button.classList = "upgrade"
        upgrade_button.onclick = `purchaseupgrade(${x})`
        upgrade_button.id = `n${x}`

        let upgrade_button_desc = document.createElement("div")
        upgrade_button_desc.classList = "upgrade_desc"
        let upgrade_button_desc_text = document.createElement("span")
        upgrade_button_desc_text.classList = "upgrade_desc_text"
        upgrade_button_desc_text.appendChild(document.createTextNode("This is a test"))
        upgrade_button_desc.appendChild(upgrade_button_desc_text)



        upgrade_button.appendChild(document.createTextNode(`Upgrade ${x}`))
        upgrade_button.appendChild(upgrade_button_desc)
        upgrades.appendChild(upgrade_button)

    }
}