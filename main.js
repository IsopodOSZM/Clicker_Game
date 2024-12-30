var PPS = 0
var POINTS = 10
var BASECLICK = 1
var MODIFIERS = {
    GLOBAL_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: {
            Addition: [],
            Multipliers: [],
            Exponents: [],
        }
    },
    CLICK_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: {
            Addition: [],
            Multipliers: [],
            Exponents: [],
        }
    },
    AUTO_MODIFIERS: {
        Addition: [],
        Multipliers: [],
        Exponents: [],
        Specials: {
            Addition: [],
            Multipliers: [],
            Exponents: [],
        }
    }
}
class Upgrade{
    constructor(cost, [modifier_type, special_type], multiplier, desc="This isnt a Test", type){
        this.cost = cost
        this.purchased = false
        this.multipliertype = [modifier_type, special_type]
        this.multiplier = multiplier
        this.desc = desc
        this.type = type
    }

    purchase(Points) {
        if(Points >= this.cost && this.purchased == false){
            Points -= this.cost
            this.purchased = true
            var mod_type = ""
            switch(this.type){
                case "c":
                    mod_type = MODIFIERS.CLICK_MODIFIERS
                    break;
                case "a":
                    mod_type = MODIFIERS.AUTO_MODIFIERS
                    break;
                case "g":
                    mod_type = MODIFIERS.GLOBAL_MODIFIERS
                    break;
            }
            switch(this.multipliertype[0]){
                case "+":
                    mod_type.Addition.push(this.multiplier)
                    break;
                case "*":
                    mod_type.Multipliers.push(this.multiplier)
                    break;
                case "^":
                    mod_type.Exponents.push(this.multiplier)
                    break;
                case "?":
                    mod_type = mod_type.Specials

                    switch(this.multipliertype[1]){
                        case "+":
                            mod_type.Addition.push(this.multiplier)
                            break;
                        case "*":
                            mod_type.Multipliers.push(this.multiplier)
                            break;
                        case "^":
                            mod_type.Exponents.push(this.multiplier)
                            break;
                    }
                    break;
            }
            document.getElementById("ppc").innerHTML = `Points Per Click: ${calculate_click(BASECLICK)}`
        return Points
        }
        return Points
    }
}
var UPGRADES = {
    normal_upgrades: [
        new Upgrade(10, ["+", null], 1, "THIS IS A TEST","c"),
        new Upgrade(50, ["*", null], 5, "THIS IS A TEST","c"),
        new Upgrade(100, ["^", null], 3, "THIS IS A TEST","c"),
        new Upgrade(10000, ["?", "+"], 4, "THIS IS A TEST","c"),
        new Upgrade(100000, ["?", "^"], 2, "THIS IS A TEST","c"),
        
        ],
    index(n){
        return Object.entries(this)[n]
    }
}


function updatepps(Points){
    var pps = document.getElementById("pps")
    pps.innerHTML = `Points Per Second: ${Points}`
}
function updatepoints(value = 0){
    var points = document.getElementById("points")
    POINTS += value
    points.innerHTML = `Points: ${POINTS}`
}
function calculate_click(BClick){
    let click = BClick

    for(x of MODIFIERS.GLOBAL_MODIFIERS.Specials.Addition){
        click += x
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Specials.Addition){
        click += x
    }
    for(x of MODIFIERS.GLOBAL_MODIFIERS.Specials.Multipliers){
        click *= x
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Specials.Multipliers){
        click *= x
    }
    for(x of MODIFIERS.GLOBAL_MODIFIERS.Specials.Exponents){
        click = Math.pow(click,x)
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Specials.Exponents){
        click = Math.pow(click,x)
    }


    for(x of MODIFIERS.GLOBAL_MODIFIERS.Addition){
        click += x
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Addition){
        click += x
    }
    for(x of MODIFIERS.GLOBAL_MODIFIERS.Multipliers){
        click *= x
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Multipliers){
        click *= x
    }
    for(x of MODIFIERS.GLOBAL_MODIFIERS.Exponents){
        click = Math.pow(click,x)
    }
    for(x of MODIFIERS.CLICK_MODIFIERS.Exponents){
        click = Math.pow(click,x)
    }
    return click;
}
function simclick(){
    let click = BASECLICK
    click = calculate_click(click)
    updatepoints(click)
}
function purchaseupgrade(upgrade_id){
    let upg = UPGRADES.normal_upgrades[upgrade_id]
    POINTS = upg.purchase(POINTS)
    updatepoints()
    if(upg.purchased) document.getElementById(`n${upgrade_id}`).classList += " upgraded";
}

updatepoints()
var INTERVALS = []
INTERVALS.push(setInterval(updatepps, 5, PPS))
{
    let upgrades = document.getElementById("upgrades")
    for(let x in UPGRADES.normal_upgrades){
        let upgrade_button = document.createElement("button");
        upgrade_button.type = "button";
        upgrade_button.classList = "upgrade";
        upgrade_button.onclick = function() {purchaseupgrade(x)};
        upgrade_button.id = `n${x}`;

        let upgrade_button_desc = document.createElement("div")
        upgrade_button_desc.classList = "upgrade_desc"
        let upgrade_button_desc_text = document.createElement("span")
        upgrade_button_desc_text.classList = "upgrade_desc_text"
        upgrade_button_desc_text.appendChild(document.createTextNode(`Cost: ${UPGRADES.normal_upgrades[x].cost}`))
        upgrade_button_desc_text.appendChild(document.createElement("br"))
        let is_special = ""
        let counter = 0
        if(UPGRADES.normal_upgrades[x].multipliertype[0] == "?"){
            is_special = "Special: "
            counter++
        }
        switch(UPGRADES.normal_upgrades[x].multipliertype[counter]){
            case "+":
                upgrade_button_desc_text.appendChild(document.createTextNode(`${is_special}base click + ${UPGRADES.normal_upgrades[x].multiplier}`))
                break;
            case "*":
                upgrade_button_desc_text.appendChild(document.createTextNode(`${is_special}base click * ${UPGRADES.normal_upgrades[x].multiplier}`))
                break;
            case "^":
                upgrade_button_desc_text.appendChild(document.createTextNode(`${is_special}base click ^ ${UPGRADES.normal_upgrades[x].multiplier}`))
                break;
        }
        upgrade_button_desc_text.appendChild(document.createElement("br"))
        upgrade_button_desc_text.appendChild(document.createTextNode(`${UPGRADES.normal_upgrades[x].desc}`))
        upgrade_button_desc.appendChild(upgrade_button_desc_text)

        

        upgrade_button.appendChild(document.createTextNode(`Upgrade ${x}`))
        upgrade_button.appendChild(upgrade_button_desc)
        upgrades.appendChild(upgrade_button)

    }
}