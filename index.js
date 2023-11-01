const toggleTabs = function(event, tab_id, group) {
    const navbar_to_deactivate = event.currentTarget.parentElement.querySelector(".navbar-element.active");
    if (navbar_to_deactivate) navbar_to_deactivate.classList.remove('active');
    event.currentTarget.classList.add("active");

    const tab_to_deactivate = document.querySelector(`.${group}.active`)
    if (tab_to_deactivate) tab_to_deactivate.classList.remove('active');
    document.getElementById(tab_id).classList.add('active');
}

const changeTheme = function(theme_name) {
    document.querySelector('body').attributes.theme.value = theme_name;
} 

const SKILLS = {
    "R": "comfortable",
    "JavaScript":  "intermediate",
    "Python": "intermediate",
    "SQL": "working",
    "Linux": "working",
    "Webdev": "working"
};

// calculate age for general information //
document.querySelector('#current-age').innerHTML = Math.abs(new Date(Date.now() - new Date('1996-09-04')).getUTCFullYear() - 1970);

// set theme //
changeTheme(document.querySelector("#change-theme").value);

// skill meter //
class SkillMetter {
    constructor(container_id) {
        this.container_id = container_id;
        this.container = document.getElementById(container_id);

        this.widget = document.createElement("div");
        Object.assign(this.widget.style, {
            'background-color': 'transparent',
            'height': '3em',
            'border': '2px dashed grey',
            'text-align': 'center',
            'border-radius': '1.5em',
            'letter-spacing': '.2em'
        });

        this.description = document.createElement("span");
        this.description.innerHTML = "Click on a skill to show details"
        Object.assign(this.description.style, {
            'font-size': "2.5em",
            'font-weight': 'bold',
            'width': '100%',
            'position': 'relative',
            'top': '.05em',
            'z-index': '10'
        });

        this.meter = document.createElement("div");
        this.meter.attributes.id = `skill_meter_barb`;
        Object.assign(this.meter.style, {
            'width': "0%",
            'height': "100%",
            'position': 'relative',
            'top': '-2.9em',
            'border-radius': '1.4em 0 0 1.4em',
            'transition': 'background 1s'
        });

        
        this.widget.appendChild(this.description);
        this.widget.appendChild(this.meter);

        this.levels = {
            "master":       ["#6A058C", "100%", "Master"],
            "comfortable":  ["#8FC0A9", "90%",  "Comfortable"],
            "intermediate": ["#F5F1A6", "60%", "Intermediate"], // TODO: not visible in greyscale
            "working":      ["#FAA275", "40%",  "Working knowledge"],
            "basic":        ["#A31621", "20%",  "Basic"]
        };

        this.container.innerHTML = this.widget.outerHTML; 
    }

    setMeter(level) {
        if (!Object.keys(this.levels).includes(level)) throw new Error(`setMeter: Unknown skill level: ${level}`);
        if (level === "master") throw new Error("setMeter: Master is not a valid skill level, you can always be better!");

        Object.assign(this.meter.style, {
            'background': `linear-gradient(90deg, ${this.levels[level][0]} 0%, ${this.levels[level][0]} 65%, transparent)`,
            'width': this.levels[level][1]
        });

        this.description.innerHTML = this.levels[level][2];

        this.container.innerHTML = this.widget.outerHTML;
    } 
}

const skill_meter = new SkillMetter("skill-meter");

// techstack //
Array.from(document.querySelectorAll(".techstack li")).map(element => {
    element.addEventListener('mouseenter', function(e) {
        Array.from(document.querySelectorAll(`.techtechs span.${e.currentTarget.id}`)).map(element => {
            element.classList.add("active-tech");
        });
        Array.from(document.querySelectorAll(".techtechs span:not(.active-tech)")).map(element => {
            element.classList.add("hidden-tech");
        });

    });
    element.addEventListener('mouseleave', function(e) {
        Array.from(document.querySelectorAll(".techtechs span")).map(element => {
            element.classList.remove("active-tech");
            element.classList.remove("hidden-tech");
        })
    })
});