class Dijkstra {
    constructor(nodes, edges) {
        this.nodes = nodes.map(node => node.id);
        this.edges = edges;
        this.adjacencyList = {};
        this.createAdjacencyList();
    }

    createAdjacencyList() {
        this.nodes.forEach(node => {
            this.adjacencyList[node] = [];
        });

        this.edges.forEach(edge => {
            const { source, target, distance } = edge;
            if (this.adjacencyList[source] && this.adjacencyList[target]) {
                const weight = parseFloat(distance);
                this.adjacencyList[source].push({ node: target, weight });
                this.adjacencyList[target].push({ node: source, weight });
            } else {
                console.error(`Error: Edge (${source} -> ${target}) references undefined node.`);
            }
        });
    }

    findShortestPath(startNode, endNode) {
        let distances = {};
        let previous = {};
        let pq = new PriorityQueue(this.nodes.length * this.nodes.length);

        distances[startNode] = 0;

        this.nodes.forEach(node => {
            if (node !== startNode) {
                distances[node] = Infinity;
            }
            pq.enqueue(node, distances[node]);
            previous[node] = null;
        });

        while (!pq.isEmpty()) {
            let minNode = pq.dequeue().element;

            if (minNode === endNode) {
                let path = [];
                let currentNode = endNode;
                while (currentNode) {
                    path.unshift(currentNode);
                    currentNode = previous[currentNode];
                }
                return {
                    distance: distances[endNode],
                    path: path
                };
            }

            if (minNode || distances[minNode] !== Infinity) {
                this.adjacencyList[minNode].forEach(neighbor => {
                    let alt = distances[minNode] + neighbor.weight;

                    if (alt < distances[neighbor.node]) {
                        distances[neighbor.node] = alt;
                        previous[neighbor.node] = minNode;
                        pq.enqueue(neighbor.node, alt);
                    }
                });
            }
        }

        return {
            distance: distances[endNode],
            path: []
        };
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element, priority) {
        let newNode = { element, priority };
        let added = false;

        for (let i = 0; i < this.collection.length; i++) {
            if (newNode.priority < this.collection[i].priority) {
                this.collection.splice(i, 0, newNode);
                added = true;
                break;
            }
        }

        if (!added) {
            this.collection.push(newNode);
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

export default Dijkstra;
