import Maze from './maze'
import DFSGenerator from './generators/dfs-generator'
import RandomGenerator from './generators/random-generator'
import MatrixGenerator from './generators/grid-generator'
import BFSSolver from './solvers/bfs-solver'
import DFSSolver from './solvers/dfs-solver'
import AStarSolver from './solvers/aStar-solver'
import { resetPathDistance } from './util'

export const bindAll = ctx => {
  const maze = new Maze(ctx, 'medium');
  $('#generate').click( ()=>{
    $('.arrow-container').hide();
    disableButtons();
    const mazeSize = rangeText[$("#maze-size").val()].toLowerCase();
    maze.reset(mazeSize)
    const generatorType = $("input[name='generator']:checked").val();
    let generator;
    switch (generatorType) {
      case 'random':
        generator = new RandomGenerator(maze)
        break;
      case 'dfs':
        generator = new DFSGenerator(maze)
        break;
      case 'matrix':
        generator = new MatrixGenerator(maze)
        break;
    }
    ctx.clearRect(0,0,780,480)
    generator.generate();
  })
  $('#generate-fast').click( ()=>{
    $('.arrow-container').hide();
    disableButtons();
    const mazeSize = rangeText[$("#maze-size").val()].toLowerCase();
    maze.reset(mazeSize)
    const generatorType = $("input[name='generator']:checked").val();
    let generator;
    switch (generatorType) {
      case 'random':
        generator = new RandomGenerator(maze)
        break;
      case 'dfs':
        generator = new DFSGenerator(maze)
        break;
      case 'matrix':
        generator = new MatrixGenerator(maze)
    }
    ctx.clearRect(0,0,780,480)
    generator.generateFast();
  })

  $('#reset-button').click( ()=>{
    maze.unSolve();
  })

  $('#solve').click( ()=>{
    resetPathDistance();
    disableButtons();
    maze.unSolve();
    const solverType = $("input[name='solver']:checked").val();
    let solver;
    switch (solverType) {
      case 'bfs':
        solver = new BFSSolver(maze)
        break;
      case 'dfs':
        solver = new DFSSolver(maze)
        break;
      case 'aStar':
        solver = new AStarSolver(maze)
        break;
    }
    solver.solve();
  })

  $('#random-both').click( ()=>{
    resetPathDistance();
    maze.unSolve();
    maze.randomize('both')
  })

  $('#range-text').text(rangeText[$("#maze-size").val()])
  $('#maze-size').on('input change', () => {
    $('#range-text').text(rangeText[$("#maze-size").val()])
  })
}

const rangeText = {
  '1' : 'Small',
  '2' : 'Medium',
  '3' : 'Large'
}

const disableButtons = () => {
  $("button").prop('disabled', true)
}

export const enableButtons = () => {
  $("button").prop('disabled', false)
}
