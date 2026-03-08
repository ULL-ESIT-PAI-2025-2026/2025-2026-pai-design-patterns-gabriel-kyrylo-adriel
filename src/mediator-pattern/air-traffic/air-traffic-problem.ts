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
 * Represents a runway that airplanes can land on or take off from.
 * Tracks whether the runway is currently available (clear) or occupied.
 */
export class Runway {
  private clear = true;

  /**
   * Returns whether the runway is currently clear for use.
   * @returns true if the runway is available, false if occupied
   */
  public isClear(): boolean {
    return this.clear;
  }

  /**
   * Sets the runway's availability status.
   * @param clear - true to mark the runway as available, false to mark it as occupied
   */
  public setClear(clear: boolean): void {
    this.clear = clear;
  }
}

/**
 * Represents an airplane that can attempt to land on one of several runways.
 * Communicates directly with runways (no mediator), which leads to tight coupling.
 */
export class Airplane {
  /**
   * Creates an airplane with the given identifier.
   * @param name - Unique name or identifier for this airplane
   */
  constructor(private readonly name: string) {}

  /**
   * Returns the airplane's identifier.
   * @returns The name of this airplane
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Attempts to land on the first available runway from the given list.
   * Directly checks and mutates runway state (problematic without a mediator).
   * @param runways - Array of runways to try landing on, in order
   */
  public land(runways: Runway[]): void {
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
 * Entry point: creates airplanes and runways and demonstrates direct
 * airplane–runway communication without a mediator (race conditions possible).
 */
export function main(): void {
  const planeOne = new Airplane('Plane 1');
  const planeTwo = new Airplane('Plane 2');
  const planeThree = new Airplane('Plane 3');
  const runwayOne = new Runway();
  const runwayTwo = new Runway();
  const runwayThree = new Runway();

  const allRunways = [runwayOne, runwayTwo, runwayThree];

  planeOne.land(allRunways);
  planeTwo.land(allRunways);
  planeThree.land(allRunways);
}

main();