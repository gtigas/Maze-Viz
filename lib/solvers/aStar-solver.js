import { enableButtons } from '../binders'
import { colorPath } from '../util'

class AStarSolver {
  constructor(maze){
    this.maze = maze
    this.frontier = [maze.start]
    this.solve = this.solve.bind(this)
    this.getBestCell = this.getBestCell.bind(this)
  }

  solve(i = 1){
    if (this.solved) {
      return
    }
    setTimeout( () => {
      const currentCell = this.getBestCell();
      currentCell.head = true
      this.maze.draw('solve');
      currentCell.visited = true
      currentCell.i = i
      let cellNeighbors = currentCell.unvisitedConnectedCells()
      cellNeighbors.forEach( cell => {
        cell.parent = currentCell
        cell.distance = cell.getDistance(this.maze.end)
      })
      this.frontier = this.frontier.concat(cellNeighbors)
      currentCell.head = false;
      if (this.maze.end === currentCell) {
        colorPath(this.maze.end)
        enableButtons();
        this.solved = true
      } else {
        i++
        this.solve(i);
      }
    }, 0)

  }

  getBestCell(){
    let closestCell = null;
    let distance = 10000;
    this.frontier.forEach( cell => {
      if (cell.distance < distance) {
        closestCell = cell
        distance = cell.distance
      }
    });


    this.frontier.splice(this.frontier.indexOf(closestCell), 1)
    return closestCell
  }
}

export default AStarSolver
