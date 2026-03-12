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
 * @desc Program that exemplifies the PROBLEM of not using a Singleton
 * when dealing with an entity that MUST be unique, like a Government.
 * For academic purposes, all classes involved will be declared and 
 * implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/singleton}
 */

/**
 * @desc Class representing a Country's Government.
 * @remark
 * Without a strict creation control, clients can instantiate it multiple
 * times, causing a severe fragmentation of the system's memory and state.
 */
export class Government {
  /**
   * @desc The constructor allows infinite instantiations from the outside.
   * @param leaderName The name of the president/leader.
   */
  constructor(private readonly leader: string) {}

  /**
   * @desc Simulates passing a law printing it to terminal.
   * @param law The law to be passed.
   */
  passLaw(law: string): void {
    console.log(`The government led by ${this.leader} passes the law: ${law}`);
  }
}

/**
 * @desc Main entry point for the program.
 */
export function main() {
  console.log('--- Starting Country Simulation (Problem) ---\n');

  // PROBLEM: The client code has the power to manufacture new states.
  // This fragments the memory into two completely independent objects. 
  const officialGovernment = new Government('President Alice');
  const rebelGovernment = new Government('General Bob');
  
  // We now have data desynchronization. Two entities are acting as the single source of truth.
  officialGovernment.passLaw('Increase education budget.');
  rebelGovernment.passLaw('Ban all taxes.');

  // Verification: They occupy different memory addresses.
  console.log(`\nAre they the exact same entity in memory? ${officialGovernment === rebelGovernment}`);
}

main();
