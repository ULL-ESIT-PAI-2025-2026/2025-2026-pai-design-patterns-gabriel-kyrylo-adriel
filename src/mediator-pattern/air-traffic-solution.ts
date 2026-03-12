/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2025-2026
 *
 * @author Adriel Reyes Suárez
 * @author Francisco Gabriel Ruiz Ruiz
 * @author Kyrylo Chvanov
 * @since Mar 8 2026
 * @desc Demonstrates the Mediator design pattern using an AirTrafficTower
 * to coordinate landings between Airplanes and Runways.
 * @see {@link https://refactoring.guru/design-patterns/mediator}
 */

/**
 * @desc Represents a runway that airplanes can land on or take off from.
 * Tracks whether the runway is currently available (clear) or occupied.
 */
export class Runway {
  /** Whether the runway is currently available (clear) or occupied. */
  private clear: boolean = true;

  /**
   * @desc Returns whether the runway is currently clear for use.
   * @returns true if the runway is available, false if occupied
   */
  isClear(): boolean {
    return this.clear;
  }

  /**
   * @desc Sets the runway's availability status.
   * @param clear - true to mark the runway as available, false to mark it as occupied
   */
  setClear(clear: boolean): void {
    this.clear = clear;
  }
}

/**
 * @desc Represents an airplane that requests landing through the tower (mediator).
 * Knows only the tower, not the runways—reducing coupling.
 */
export class Airplane {
  /**
   * @desc Creates an airplane with the given name and a reference to the control tower.
   * @param name - Unique name or identifier for this airplane
   * @param tower - The air traffic tower (mediator) used to request landings
   */
  constructor(private readonly name: string, private readonly tower: AirTrafficTower) {}

  /**
   * @desc Returns the airplane's identifier.
   * @returns The name of this airplane
   */
  getName(): string {
    return this.name;
  }

  /**
   * @desc Requests permission to land by delegating to the tower.
   * The tower assigns a runway if one is available.
   */
  land(): void {
    this.tower.requestLanding(this);
  }
}

/**
 * @desc Mediator that coordinates landings between airplanes and runways.
 * Centralizes runway assignment so airplanes do not communicate with runways directly.
 */
export class AirTrafficTower {
  /** The runways managed by the tower. */
  private runways: Runway[] = [];

  /**
   * @desc Registers a runway with the tower so it can be assigned for landings.
   * @param runway - The runway to add to the tower's managed runways
   */
  addRunway(runway: Runway): void {
    this.runways.push(runway);
  }

  /**
   * @desc Handles a landing request from an airplane: assigns the first clear runway
   * or instructs the plane to hold if all runways are occupied.
   * @param plane - The airplane requesting permission to land.
   */
  requestLanding(plane: Airplane): void {
    for (const runway of this.runways) {
      if (runway.isClear()) {
        console.log(`Tower: ${plane.getName()} is cleared to land.`);
        runway.setClear(false);
        return;
      }
    }
    console.log(`Tower: ${plane.getName()} must hold. All runways are occupied.`);
  }
}

/**
 * @desc Entry point: creates the tower (mediator), runways, and airplanes,
 * and demonstrates coordinated landings through the mediator.
 */
export function main(): void {
  const tower: AirTrafficTower = new AirTrafficTower();

  tower.addRunway(new Runway());
  tower.addRunway(new Runway());
  tower.addRunway(new Runway());

  // Planes only know about the tower, not the runways
  const planeOne: Airplane = new Airplane('Plane 1', tower);
  const planeTwo: Airplane = new Airplane('Plane 2', tower);
  const planeThree: Airplane = new Airplane('Plane 3', tower);

  planeOne.land();
  planeTwo.land();
  planeThree.land();
}

main();