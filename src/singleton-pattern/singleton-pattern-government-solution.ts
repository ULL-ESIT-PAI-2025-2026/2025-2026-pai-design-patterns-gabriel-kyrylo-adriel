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
 * @desc Program that exemplifies the SOLUTION using the Singleton design pattern.
 * It strictly ensures only one Government instance exists throughout the app.
 * Note: While useful, Singleton violates the Single Responsibility Principle.
 * For academic purposes, all classes involved will be declared and 
 * implemented in this same file.
 * @see {@link https://refactoring.guru/design-patterns/singleton}
 */

/**
 * @desc Singleton class representing a Country's Government.
 */
class Government {
  /**
   * @remark Holds the single, static instance of the class.
   *         It is private so it cannot be tampered with from the outside.
   */
  private static instance: Government;

  /**
   * @desc Global access point to the singleton instance. Implements Lazy Initialization.
   * @remark Acts as a safe window: if the instance doesn't exist, it creates it. 
   *         Otherwise, it returns the cached one.
   * @returns The single instance of the Government.
   */
  static getInstance(): Government {
    if (!Government.instance) {
      Government.instance = new Government();
    }
    return Government.instance;
  }
  
  /**
   * @remark The internal state of the singleton.
   *         This represents the single source of truth for the government's leadership.
   */
  private leader: string;

  /**
   * @remark Private constructor revokes the client's ability to use the `new` keyword.
   *         The initialization logic is locked inside, centralizing creation control.
   */
  private constructor() {
    this.leader = 'President Alice';
    console.log(`[SYSTEM] The official government of ${this.leader} has been established.`);
  }

  /**
   * @desc  Allows changing the internal state of the single instance.
   * @param newLeader The name of the new leader.
   */
  electNewLeader(newLeader: string): void {
    console.log(`\n[ELECTION] ${this.leader} steps down. ${newLeader} is the new leader.`);
    this.leader = newLeader;
  }

  /**
   * @desc Simulates passing a law using the current state.
   * @param law The law to be passed.
   */
  passLaw(law: string): void {
    console.log(`The government led by ${this.leader} passes the law: ${law}`);
  }
}

/**
 * @desc Main entry point for the program.
 */
function main() {
  console.log('--- Starting Country Simulation (Solution) ---\n');
  
  // SOLUTION: The client is forced to use the global access point.
  // const fakeGov = new Government(); // Error: Constructor is private.
  
  const MinistryOfHealth = Government.getInstance();
  const MinistryOfDefense = Government.getInstance();
  
  // Both variables point to the exact same memory address.
  MinistryOfHealth.passLaw('Fund new hospitals.');
  
  // If one reference mutates the state...
  MinistryOfDefense.electNewLeader('President Bob');

  // ...the other reference immediately reflects the change. No desynchronization.
  MinistryOfHealth.passLaw('Increase nurse salaries.');

  // Verification: They are strictly the same object.
  console.log(`\nAre MinistryOfHealth and MinistryOfDefense talking to the same memory space? ${MinistryOfHealth === MinistryOfDefense}`); // true
}

main();

export {};