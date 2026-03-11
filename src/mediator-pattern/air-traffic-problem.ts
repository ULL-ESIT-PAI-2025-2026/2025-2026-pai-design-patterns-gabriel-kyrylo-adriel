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
 * @desc Demonstrates the problem of direct communication between
 * Airplane and Runway classes without a Mediator.
 * @see {@link https://refactoring.guru/design-patterns/mediator}
 */

/**
 * @desc Represents a runway that airplanes can land on or take off from.
 * Tracks whether the runway is currently available (clear) or occupied.
 */
export class Runway {
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
 * @desc Represents an airplane that can attempt to land on one of several runways.
 * Communicates directly with runways (no mediator), which leads to tight coupling.
 */
export class Airplane {
  /**
   * @desc Creates an airplane with the given identifier.
   * @param name - Unique name or identifier for this airplane
   */
  constructor(private readonly name: string) {}

  /**
   * @desc Returns the airplane's identifier.
   * @returns The name of this airplane
   */
  getName(): string {
    return this.name;
  }

  /**
   * @desc Attempts to land on the first available runway from the given list.
   * Directly checks and mutates runway state (problematic without a mediator).
   * @param runways - Array of runways to try landing on, in order
   */
  land(runways: Runway[]): void {
    for (const runway of runways) {
      if (runway.isClear()) {
        console.log(`${this.getName()} is landing directly on a runway.`);
        runway.setClear(false);
        return;
      }
    }
    console.log(`${this.getName()} could not find an empty runway to land.`);
  }
}

/**
 * @desc Entry point: creates airplanes and runways and demonstrates direct
 * airplane–runway communication without a mediator (race conditions possible).
 */
export function main(): void {
  const planeOne: Airplane = new Airplane('Plane 1');
  const planeTwo: Airplane = new Airplane('Plane 2');
  const planeThree: Airplane = new Airplane('Plane 3');
  const runwayOne: Runway = new Runway();
  const runwayTwo: Runway = new Runway();
  const runwayThree: Runway = new Runway();

  const allRunways: Runway[] = [runwayOne, runwayTwo, runwayThree];

  planeOne.land(allRunways);
  planeTwo.land(allRunways);
  planeThree.land(allRunways);
}

main();