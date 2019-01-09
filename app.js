//Jorge Chiquín Valderrama <jorgechiquinv@gmail.com>

function PriorityQueue() {
    this.dataStore = Array.prototype.slice.call(arguments, 0);
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.isEmpty = isEmpty;

    function enqueue(element, priority) {
        this.dataStore.push({ element, priority });
    }

    function dequeue() {
        var priority = this.dataStore[0].priority;
        var priorizedItem = 0;
        this.dataStore.forEach(function (item, index) {
            if (item.priority < priority) {
                priority = item.priority;
                priorizedItem = index;
            }
        });
        return this.dataStore.splice(priorizedItem, 1)[0].element;
    }

    function isEmpty() {
        return this.dataStore.length == 0;
    }
}

const cities = {
    "Arad": {
        H: 366,
        neighbors: [
            {
                name: "Zerind",
                G: 75
            },
            {
                name: "Timisoara",
                G: 118
            },
            {
                name: "Sibiu",
                G: 140
            }
        ]
    },
    "Oradea": {
        H: 366,
        neighbors: [
            {
                name: "Zerind",
                G: 71
            },
            {
                name: "Sibiu",
                G: 151
            }
        ]
    },
    "Zerind": {
        H: 366,
        neighbors: [
            {
                name: "Oradea",
                G: 71
            },
            {
                name: "Arad",
                G: 75
            }
        ]
    },
    "Sibiu": {
        H: 366,
        neighbors: [
            {
                name: "Arad",
                G: 140
            },
            {
                name: "Oradea",
                G: 151
            },
            {
                name: "Fagaras",
                G: 99
            },
            {
                name: "Rimnicu Vilcea",
                G: 80
            }
        ]
    },
    "Timisoara": {
        H: 329,
        neighbors: [
            {
                name: "Arad",
                G: 118
            },
            {
                name: "Lugoj",
                G: 111
            }
        ]
    },
    "Lugoj": {
        H: 244,
        neighbors: [
            {
                name: "Timisoara",
                G: 111
            },
            {
                name: "Mehadia",
                G: 70
            }
        ]
    },
    "Fagaras": {
        H: 178,
        neighbors: [
            {
                name: "Sibiu",
                G: 99
            },
            {
                name: "Bucharest",
                G: 211
            }
        ]
    },
    "Rimnicu Vilcea": {
        H: 193,
        neighbors: [
            {
                name: "Sibiu",
                G: 80
            },
            {
                name: "Pitesti",
                G: 97
            },
            {
                name: "Craiova",
                G: 146
            }
        ]
    },
    "Mehadia": {
        H: 241,
        neighbors: [
            {
                name: "Lugoj",
                G: 70
            },
            {
                name: "Drobeta",
                G: 75
            }
        ]
    },
    "Drobeta": {
        H: 242,
        neighbors: [
            {
                name: "Mehadia",
                G: 75
            },
            {
                name: "Craiova",
                G: 120
            }
        ]
    },
    "Craiova": {
        H: 160,
        neighbors: [
            {
                name: "Pitesti",
                G: 138
            },
            {
                name: "Drobeta",
                G: 120
            },
            {
                name: "Rimnicu Vilcea",
                G: 146
            }
        ]
    },
    "Pitesti": {
        H: 98,
        neighbors: [
            {
                name: "Craiova",
                G: 138
            },
            {
                name: "Bucharest",
                G: 101
            },
            {
                name: "Rimnicu Vilcea",
                G: 97
            }
        ]
    },
    "Bucharest": {
        H: 0,
        neighbors: [
            {
                name: "Fagaras",
                G: 211
            },
            {
                name: "Pitesti",
                G: 101
            },
            {
                name: "Giurgiu",
                G: 90
            },
            {
                name: "Urziceni",
                G: 85
            }
        ]
    },
    "Giurgiu": {
        H: 77,
        neighbors: [
            {
                name: "Bucharest",
                G: 90
            }
        ]
    },
    "Urziceni": {
        H: 80,
        neighbors: [
            {
                name: "Bucharest",
                G: 85
            },
            {
                name: "Hirsova",
                G: 96
            },
            {
                name: "Vaslui",
                G: 142
            }
        ]
    },
    "Hirsova": {
        H: 151,
        neighbors: [
            {
                name: "Eforie",
                G: 86
            },
            {
                name: "Urziceni",
                G: 96
            }
        ]
    },
    "Eforie": {
        H: 161,
        neighbors: [
            {
                name: "Hirsova",
                G: 86
            }
        ]
    },
    "Vaslui": {
        H: 199,
        neighbors: [
            {
                name: "Urziceni",
                G: 142
            },
            {
                name: "Iasi",
                G: 92
            }
        ]
    },
    "Iasi": {
        H: 226,
        neighbors: [
            {
                name: "Neamt",
                G: 87
            },
            {
                name: "Vaslui",
                G: 92
            }
        ]
    },
    "Neamt": {
        H: 234,
        neighbors: [
            {
                name: "Iasi",
                G: 87
            }
        ]
    }
}

const [start, end] = ["Arad", "Bucharest"]
let came_from = {}
let cost_so_far = {}
came_from[start] = null
cost_so_far[start] = 0

let priorityQ = new PriorityQueue;
priorityQ.enqueue(start, 0)

while (!priorityQ.isEmpty()) {
    let current = priorityQ.dequeue();
    if (current === end)
        break;

    for (let next of cities[current].neighbors) {
        const new_cost = cost_so_far[current] + next.G
        if (!cost_so_far.hasOwnProperty(next.name) || new_cost < cost_so_far[next.name]) {
            cost_so_far[next.name] = new_cost
            const priority = new_cost + cities[next.name].H
            priorityQ.enqueue(next.name, priority)
            came_from[next.name] = current
        }
    }

}
let path = [end]
for (let next = came_from[end]; next ; next = came_from[next])
    path.unshift(next)

const output = `Desde ${start} a ${end} se debe tomar el siguiente recorrido:
${path.join(", ")}
Con una distancia mínima de ${cost_so_far[end]} kms`
console.log(output)