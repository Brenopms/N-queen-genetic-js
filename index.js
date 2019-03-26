N = 8; //board size
popSize = 50;
genNumber = 100;
population = []
fitness = [];
parentsConsidered = 5;
optimalSolution = 0
numOfParents = 2;

/**
 *
 * return an array [0, 1, 2, 3, ..., max-1]
 * @param {number} max
 * @returns Array<any>
 */
const range = (max) => {
    return [...Array(max).keys()];
}


const getIndividual = () => {
    let solution = [];
    individual = {
        solution: [],
        fitness: 0
    }

    for (let i of range(8)) {
        individual.solution.push(Math.round(N * Math.random()));
    }
    individual.fitness = getFitness(individual.solution);
    return individual;
}

const getPopulation = (popSize) => {
    let population = [];
    for (let i of range(popSize)) {
        population.push(getIndividual());
    }

    return population
}

const getFitness = (individual) => {
    fitness = 0;
    let n = individual.length;
    for (let i of range(n)) {
        for (let j of range(n)) {
            if ((Math.abs(i - j) == Math.abs(individual[i] - individual[j])) && i !== j)
                fitness += 1;
        }
    }
    return fitness;
}

const sortAccordingToFitness = (population) => {
    population.sort((a, b) => a.fitness - b.fitness);
    return population;
}

const getParents = (population, parentsConsidered, numOfParents) => {
    const allParents = getRandomElements(population, parentsConsidered);
    const parents = (sortAccordingToFitness(allParents)).slice(0, numOfParents);
    return parents;
}

const getRandomElements = (array, n) => {
    const popAux = [...population];
    elements = [];
    for (i = 0; i < n; i++) {
        const index = Math.round(Math.random() * popAux.length);
        const random = popAux.splice(index, 1)[0];
        elements.push(random);
    }
    return elements;
}

const CutAndCrossfill_Crossover = (parents) => {
    let offspring = [[], []];
    const N = parents[0].length;
    const pos = Math.floor(1 + N * Math.random());
    offspring[0].push(...(parents[0].slice(0, pos)));
    offspring[1].push(...(parents[1].slice(0, pos)));
    let s1 = pos;
    let s2 = pos;

    for (let i of range(N)) {
        let check1 = 0;
        let check2 = 0;
        for (j of range(pos)) {
            if (parents[1][i] == offspring[0][j]) {
                check1 = 1;
            }

            if (parents[0][i] == offspring[1][j]) {
                check2 = 1;
            }
        }
        if (check1 == 0) {
            offspring[0][s1] = parents[1][i]
            s1 += 1;
        }

        if (check2 == 0) {
            offspring[1][s2] = parents[0][i]
            s2 += 1;
        }

    }

    return offspring;
}

const getChildren = (parents) => {
    const childrenSolution = CutAndCrossfill_Crossover(parents.map(parent => parent.solution));
    const children = childrenSolution.map(child => { 
        return { solution: child, fitness: getFitness(child) } 
    });
    return children;
}

population = getPopulation(popSize);
let sortedPopulation = sortAccordingToFitness(population);
let parents = getParents(sortedPopulation, parentsConsidered, numOfParents);
let children = getChildren(parents);
console.log(children);

